// build-db.mjs — compile the authored graphs into the queryable store.
// Plain Node ESM; uses Node 24's built-in node:sqlite (no dependencies).
// Run: node build-db.mjs   ->   build/ansci-knowledge.db
//
// The authored per-scheme files are the truth; this database is an access
// form compiled from them (see DESIGN.md, "Three access forms"). The schema
// mirrors the assertion envelope. The build NEVER resolves a conflict:
// rows from different schemes, or a scheme row and a ruling, coexist and
// are flagged at query time, not merged here.

import { readFileSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { parseYaml } from "./mini-yaml.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, "build");
mkdirSync(outDir, { recursive: true });
const dbPath = join(outDir, "ansci-knowledge.db");
rmSync(dbPath, { force: true });

const db = new DatabaseSync(dbPath);
db.exec(`
  CREATE TABLE assertions (
    id INTEGER PRIMARY KEY,
    subject TEXT NOT NULL,
    relation TEXT NOT NULL,
    object TEXT NOT NULL,
    scheme TEXT NOT NULL,
    source TEXT,
    ruling_ref TEXT,
    tier TEXT NOT NULL
  );
  CREATE TABLE rulings (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    scheme TEXT,
    title TEXT,
    statement TEXT,
    grounds TEXT,
    effect TEXT,
    record_source TEXT
  );
  CREATE TABLE flagged (
    id INTEGER PRIMARY KEY,
    subject TEXT, relation TEXT, object TEXT,
    scheme TEXT, attributed_to TEXT, status TEXT
  );
`);

const insA = db.prepare("INSERT INTO assertions (subject, relation, object, scheme, source, ruling_ref, tier) VALUES (?, ?, ?, ?, ?, ?, ?)");
const insR = db.prepare("INSERT INTO rulings (id, date, scheme, title, statement, grounds, effect, record_source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
const insF = db.prepare("INSERT INTO flagged (subject, relation, object, scheme, attributed_to, status) VALUES (?, ?, ?, ?, ?, ?)");

let na = 0, nr = 0, nf = 0;
for (const f of readdirSync(join(root, "schemes")).filter((x) => x.endsWith(".yaml"))) {
  const data = parseYaml(readFileSync(join(root, "schemes", f), "utf8"));
  for (const a of data.assertions ?? []) {
    insA.run(a.subject, a.relation, a.object, a.scheme, a.source ?? null, a.ruling_ref ?? null, a.tier);
    na++;
  }
  for (const fl of data.flagged_commentarial ?? []) {
    insF.run(fl.subject, fl.relation, fl.object, data.scheme, fl.attributed_to, fl.status);
    nf++;
  }
}
for (const f of readdirSync(join(root, "rulings")).filter((x) => x.endsWith(".yaml"))) {
  const r = parseYaml(readFileSync(join(root, "rulings", f), "utf8"));
  insR.run(r.id, r.date, r.scheme ?? null, r.title ?? null, r.statement ?? null, r.grounds ?? null, r.effect ?? null, r.record_source ?? null);
  nr++;
}
db.close();
console.log(`Built ${dbPath}: ${na} assertions, ${nr} rulings, ${nf} flagged commentarial rows.`);
