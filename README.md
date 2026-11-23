# ansci-knowledge

A cited scholarly knowledge graph of ancient Chinese correspondence
and classification material: the knowledge the AnSci project reasons
with, kept as scholarship in its own repo — read and checked against
its sources here, consumed by AnSci as a compiled snapshot by version
pin.

**Status: design draft awaiting the owner's judgment. AnSci does not
consume this repo yet.** The design is in [DESIGN.md](DESIGN.md);
comments and corrections go there first.

## The four layers

| Layer | What it holds | Discipline |
| :--- | :--- | :--- |
| **Sources** | The texts (cited by chapter) and the owner's founding documents (`docs/user-ref/` in ansci-git) | Layered by provenance; never silently harmonised |
| **Schemes** | Named, versioned correspondence tables — **one graph per scheme** | A scheme may disagree with another scheme, never with itself; schemes are never merged |
| **Rules** | The derivation machinery, stated once as data (mappings, cycles, composition) | Rules reference schemes; the closure is computed, not stored |
| **Rulings** | The owner's dated decisions, each with its reason | Recorded as rulings; a ruling never rewrites the source layer |

Every assertion carries the envelope: **subject · relation · object ·
scheme · source citation or ruling reference · tier** (attested /
derived / predicted).

## Three access forms

The authored graphs are the truth; two compiled forms provide access
(owner's decision, 2026-11-22):

1. **Authored per-scheme graphs** — one readable file per scheme in
   `schemes/` (restricted-subset YAML; see DESIGN.md for the format
   recommendation).
2. **Compiled SQLite database** — `node build-db.mjs` compiles all
   schemes + rulings into `build/ansci-knowledge.db`, schema mirroring
   the envelope. Queries may span schemes; every row carries its
   scheme + citation, and conflicts come back flagged — the store
   never resolves them. Try `node query.mjs` for three worked queries.
3. **Static vector index** *(designed, not yet built)* — build-time
   embeddings over node labels and glosses, shipped as a static table
   beside the database. Vectors propose, structure disposes: the index
   finds candidate nodes; answers are always read from the graphs with
   provenance. No runtime neural encoder.

The same node identifiers join all three forms.

## Current contents

- `DESIGN.md` — the design draft, the owner's 2026-11-22 decisions
  (both-forms + vector index; the trigram→hexagram→Wuxing→Luoshu/Hetu
  scope), the gate list, and the migration order.
- `schemes/creature-class-yueling-v1.yaml` — the worked example: the
  five creature classes of the *Liji, Yueling* （鱗 scaled → Wood ·
  羽 feathered → Fire · 倮 naked → Earth · 毛 furred → Metal ·
  介 shelled → Water), registered in AnSci as rule P2 (2026-11-15),
  with its flagged commentarial material kept out of the assertions
  and its AnSci application notes attached.
- `rulings/` — the three owner rulings on that scheme:
  `R-2026-11-15` (the naked class takes members by its criterion),
  `R-2026-11-16-insects` (insects are scaled; fine hair is not a
  covering), `R-2026-11-16-lifeform` (classified by the whole life
  form; the silkworm is scaled).
- `validate.mjs` — the mechanical gates (citation on every assertion;
  no intra-scheme contradiction; ruling references resolve).
  Run: `node validate.mjs`.
- `build-db.mjs` / `query.mjs` — the SQLite compile and example
  queries (Node 24, no dependencies).
- `mini-yaml.mjs` — the zero-dependency parser for the authoring
  format's restricted subset.

## Consumption model

AnSci will consume a compiled snapshot of this repo by version pin
(the paramorphic-submodule pattern), or by `file:` sibling checkout
during co-development (the Bihua pattern). Until the owner judges this
draft and says otherwise, the knowledge still lives and runs in
AnSci's own tree; this repo is its designated next home, prepared —
not yet moved into.
