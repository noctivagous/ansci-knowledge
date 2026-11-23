// query.mjs — example queries against the compiled store.
// Run build-db.mjs first. Usage: node query.mjs [1|2|3]  (no arg = all three)
// Query semantics (DESIGN.md): a query may span schemes, but every row
// carries its scheme + citation; conflicts are returned flagged, never
// resolved by the store.

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const root = dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(join(root, "build", "ansci-knowledge.db"), { readOnly: true });

function show(title, rows, fmt) {
  console.log(`\n== ${title}`);
  if (!rows.length) console.log("  (no rows)");
  for (const r of rows) console.log("  " + fmt(r));
}

const which = process.argv[2];

if (!which || which === "1") {
  // Which class is the tiger chief of, per the Yueling scheme?
  const rows = db.prepare(
    "SELECT * FROM assertions WHERE relation = 'chief' AND object LIKE 'tiger%'"
  ).all();
  show("Q1: which class is the tiger chief of?", rows,
    (r) => `${r.subject} — chief: ${r.object} [scheme ${r.scheme}, tier ${r.tier}] source: ${r.source}`);
  const flagged = db.prepare(
    "SELECT * FROM flagged WHERE subject LIKE '%tiger%'"
  ).all();
  show("Q1b: flagged commentarial rows about tigers (returned flagged, not resolved)", flagged,
    (r) => `${r.subject} / ${r.relation} / ${r.object} — attributed: ${r.attributed_to} — status: ${r.status}`);
}

if (!which || which === "2") {
  // Everything about 倮 across the scheme and the rulings layer.
  const rows = db.prepare(
    "SELECT * FROM assertions WHERE subject LIKE '%倮%' OR object LIKE '%倮%' OR subject LIKE '%naked%' OR object LIKE '%naked%' ORDER BY relation, subject"
  ).all();
  show("Q2: all assertions touching 倮 (naked) in the scheme graph", rows,
    (r) => `${r.subject} / ${r.relation} / ${r.object} [tier ${r.tier}${r.ruling_ref ? ", ruling " + r.ruling_ref : ""}]`);
  const rul = db.prepare(
    "SELECT * FROM rulings WHERE scheme = 'CREATURE_CLASS_YUELING_V1' ORDER BY date, id"
  ).all();
  show("Q2b: the rulings layer for this scheme", rul,
    (r) => `${r.id} (${r.date}): ${r.title}`);
}

if (!which || which === "3") {
  // What element does the shelled class carry, and who are its clear members?
  const rows = db.prepare(
    "SELECT * FROM assertions WHERE (subject = '介 shelled' AND relation IN ('element','season')) OR object = '介 shelled' ORDER BY relation, subject"
  ).all();
  show("Q3: the shelled class (介) — element, season, members", rows,
    (r) => `${r.subject} / ${r.relation} / ${r.object} [scheme ${r.scheme}, tier ${r.tier}]`);
}

db.close();
