// validate.mjs — the mechanically checkable gates (see DESIGN.md, "Gates").
// Plain Node ESM, no dependencies. Run: node validate.mjs
//   Gate 1: every assertion carries a source citation or a ruling reference.
//   Gate 2: no intra-scheme contradiction — within one scheme, the same
//           subject + relation never takes two different objects.
//   Gate 3 (cross-reference): every ruling_ref resolves to a ruling on file,
//           and every ruling belongs to a scheme on file.
// Exit code 0 = all gates pass; 1 = a gate failed (failures printed).

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseYaml } from "./mini-yaml.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const failures = [];
const notes = [];

function loadDir(dir) {
  return readdirSync(join(root, dir))
    .filter((f) => f.endsWith(".yaml"))
    .map((f) => ({ file: join(dir, f), data: parseYaml(readFileSync(join(root, dir, f), "utf8")) }));
}

const schemes = loadDir("schemes");
const rulings = loadDir("rulings");
const rulingIds = new Set(rulings.map((r) => r.data.id));
const schemeIds = new Set(schemes.map((s) => s.data.scheme));

let assertionCount = 0;
for (const { file, data } of schemes) {
  const seen = new Map(); // "subject|relation" -> object
  for (const a of data.assertions ?? []) {
    assertionCount++;
    const label = `${file}: ${a.subject} / ${a.relation} / ${a.object}`;
    // Gate 1
    if (!a.source && !a.ruling_ref) {
      failures.push(`GATE 1 (no citation or ruling reference): ${label}`);
    }
    if (a.scheme !== data.scheme) {
      failures.push(`ENVELOPE (assertion scheme mismatch): ${label} declares ${a.scheme}, file is ${data.scheme}`);
    }
    if (!["attested", "derived", "predicted"].includes(a.tier)) {
      failures.push(`ENVELOPE (unknown tier "${a.tier}"): ${label}`);
    }
    // Gate 3
    if (a.ruling_ref && !rulingIds.has(a.ruling_ref)) {
      failures.push(`GATE 3 (unresolved ruling_ref "${a.ruling_ref}"): ${label}`);
    }
    // Gate 2
    const key = `${a.subject}|${a.relation}`;
    if (seen.has(key) && seen.get(key) !== a.object) {
      failures.push(`GATE 2 (intra-scheme contradiction): ${file}: ${a.subject} / ${a.relation} -> "${seen.get(key)}" and "${a.object}"`);
    }
    seen.set(key, a.object);
  }
  notes.push(`${file}: ${data.assertions?.length ?? 0} assertions, scheme ${data.scheme}`);
}

for (const { file, data } of rulings) {
  if (!data.id || !data.date || !data.statement) {
    failures.push(`RULING SHAPE (id, date and statement are required): ${file}`);
  }
  if (data.scheme && !schemeIds.has(data.scheme)) {
    failures.push(`GATE 3 (ruling names a scheme not on file: "${data.scheme}"): ${file}`);
  }
  notes.push(`${file}: ruling ${data.id} (${data.date})`);
}

for (const n of notes) console.log(`  ${n}`);
console.log(`Checked ${assertionCount} assertions across ${schemes.length} scheme(s) and ${rulings.length} ruling(s).`);
if (failures.length) {
  console.log(`\nFAIL (${failures.length}):`);
  for (const f of failures) console.log(`  ${f}`);
  process.exit(1);
}
console.log("PASS: gate 1 (citation or ruling reference on every assertion), gate 2 (no intra-scheme contradiction), gate 3 (ruling references resolve).");
