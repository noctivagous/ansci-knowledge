# ansci-knowledge — design draft

*Status: design draft, prepared 2026-11-22, awaiting the owner's judgment.
Nothing in this repo is consumed by AnSci yet. This draft records the
design, the owner's decisions of 2026-11-22, and one worked example
(the Yueling creature-class scheme) migrated from the AnSci record.*

## Purpose

A cited scholarly knowledge graph of ancient Chinese correspondence and
classification material — the knowledge AnSci reasons with, extracted
from the AnSci codebase and its design documents into a repo of its
own, where it can be read, checked against its sources, versioned, and
consumed by pin. AnSci is the first consumer, not the only conceivable
one: the correctness standard here is scholarly, not conversational.

**The stated goal (owner's words, 2026-11-22):**

> "Our goal would be to have everything connected from the trigrams to
> the hexagrams to the Wuxing, including Luoshu and Hetu, in all of
> the databases and graphs."

## The four layers

The repo holds four kinds of material, kept apart. Mixing them is the
failure mode the layout exists to prevent.

### 1. Sources

The texts and documents the knowledge rests on, cited by chapter where
the record gives a chapter. Discipline: layer by provenance; **never
silently harmonise** — where two sources disagree, both stand and the
disagreement is flagged, not merged.

Provenance classes within the layer:

- **Transmitted texts and their commentary traditions** — *Liji,
  Yueling*; *Huainanzi*; *Da Dai Liji*; the commentators (Zheng Xuan,
  Gao You, Chen Hao transmitting the earlier commentators, and in the
  trigram material Jing Fang, Wei Xiang, Kong Yingda, Su Shi, …).
- **Owner-supplied documents** — a provenance class of their own. The
  seed of this layer is the owner's founding document collection,
  currently at `ansci-git/docs/user-ref/` (owner's own model and
  design documents for this whole undertaking):

  | Document | What it is |
  | :--- | :--- |
  | `AnSci-AI-Model.txt` | The founding model document: yin-yang, Wuxing and the trigrams as a functional knowledge base for an AI; worked example sentences generated from the graph; the Eight Trigrams linking seasons, time, astronomy, body, directions, temperature, emotions and geography; the 64 Hexagrams, composed of the trigrams, as the situation layer; bridges to modern material (weather systems, the Four Temperaments, electromagnetism, calculus, the periodic table); the five notes corresponding to the Five Elements |
  | `ai-classica-science-bridge-graph.txt` | The bridge graph: yin-yang and Wuxing readings of electromagnetism, chemistry (ions, electron affinity, odd/even electron counts), biology (photosynthesis/respiration and other paired processes), and mathematics (yin/yang of operations, algebra/geometry, integral/derivative, convergence/divergence) — closing with the statement that "there is more to number theory, as explained by Luoshu and Hetu" |
  | `charofempirsci.txt` | "Balancing on the Edge of Destruction": the character of empirical science read through Wuxing — modern technology as a reversal of the controlling cycle (Fire constrained inside Metal at its breaking point: rockets, engines, wires), against the moderation the cycles teach |
  | `nct-ai-ansciModel.txt` | The model/architecture note: an LLM helps construct the knowledge base and graph under a goal; LLM-API parity as an interface aim; open questions on intake of texts (the *Huangdi Neijing* read page by page into the model), question answering, and training |
  | `nct-ancientscience-Taiji.txt` | Taiji and yin-yang: the core principles (mutual generation, mutual restraint, interdependence, reciprocal transformation, ebb and flow), the 24 solar terms, and a survey of the early texts' contributions (*Zhouyi/Xici*, *Huangdi Neijing*, *Chunqiu Fanlu*, *Hongfan*, *Guanzi*, *Zuo Zhuan*, *Huainanzi*); states that the hexagrams and trigrams illustrate dynamic balance and cyclical change |
  | `nct-ancientscience-TrebleAndBass.txt` | A correspondence sketch: bass clef / low pitch / masculine and treble clef / high pitch / feminine, worked through yin-inside-yang — low, dark, still as yin characteristics within a yang association, high, bright, active as yang within a yin one |
  | `yinYangElectromagnetism.txt` | An AI-chat transcript the owner kept: the owner's prompt on yin-yang in electromagnetism (charge polarity, magnetic poles, mutual generation, perpendicular propagation) and the AI response it drew, developed at length |

  These documents are **founding documents**: they state the project's
  intent and many of its connections in the owner's own terms. Where
  they state a connection (trigram/hexagram/Wuxing/Luoshu/Hetu
  linkages, bridges to modern science), the connection is recorded in
  this design **attributed to the owner's document** — never presented
  as attestation from the classical corpus. Where a file's own text
  shows mixed provenance (the electromagnetism transcript is an owner
  prompt plus an AI response), that is noted, as in the table above.

### 2. Schemes

Named, versioned correspondence tables — **one graph per scheme**. A
scheme is a closed, internally consistent table with a named source:
the *Yueling* creature classes are one scheme; each commentator's
trigram assignments will be a scheme of its own. Schemes may disagree
*between* each other, never *within* themselves. Schemes are never
merged at the authoring level.

### 3. Rules

The derivation machinery, stated once, as data: class→element mappings
(the creature scheme's P2), the generating and controlling cycles,
hexagram composition (a hexagram is two trigrams), axis-coupling rules.
Rules reference schemes; they are the generators in the
derivation-closure sense — the authored store stays small because the
closure is computed, not written down.

### 4. Rulings

The owner's decisions as first-class, dated records, each with its
reason. A ruling may supersede a mechanical derivation or a survey's
recommendation, but it is recorded *as* a ruling — it never rewrites
the source layer to make the disagreement disappear. The three rulings
on the creature scheme are the worked examples in `rulings/`.

## The assertion envelope

Every assertion in a scheme carries the same envelope:

```
subject · relation · object · scheme · source citation or ruling reference · tier
```

Tier is one of **attested** (the source states it), **derived** (it
follows by a registered rule from attested material), **predicted**
(a ruling or a run extends the scheme to a case the source does not
name). Commentarial material transmitted with a scheme but not
asserted by it is kept in a separate flagged section of the scheme
file — visible, attributed, and out of the assertion list (the
creature scheme's Zheng Xuan entry is the example).

## Three access forms — the owner's decision, 2026-11-22

Asked "a set of graphs? a queryable database?", the owner answered:
**both** — and then added a vector index. The repo therefore has three
access forms over the same authored material:

1. **The authored per-scheme graphs are the truth.** One file per
   scheme; the set of files is the set of graphs. The creature-class
   scheme in `schemes/` is one graph among a future set.
2. **The compiled SQLite database is exact query.** A build step
   (`build-db.mjs`) compiles all scheme graphs + rules + rulings into
   one SQLite file. SQLite because: a single file, zero servers,
   queryable by CLI today and by HTTP range-request
   (SQLite-over-HTTP) from a browser later. Its schema mirrors the
   envelope — `subject, relation, object, scheme, source, ruling_ref,
   tier` — plus tables for rulings and for flagged commentarial rows.
   **Query semantics:** queries may span schemes, but every result row
   carries its scheme and citation; where schemes conflict, the
   database returns all conflicting rows flagged as a conflict — it
   never resolves, averages, or silently picks a winner. Resolution
   lives in the rulings layer and in the consumer, not in the store.
3. **The static vector index is easy entry.** Built at compile time
   from the same source: embeddings over node labels and glosses
   (Chinese terms + English glosses + scheme names), shipped as a
   static vector table beside the SQLite database. Its seat is the
   project's standing principle — **vectors propose, structure
   disposes**: a vector query returns candidate nodes/schemes by
   similarity (a user typing "bare-skinned animals", or a Chinese term
   in variant characters, lands on 倮 and its graph neighbourhood),
   but every actual answer is then read from the graphs/database with
   full scheme + citation provenance. The vector layer never answers
   by itself, carries no assertions, and holds no provenance of its
   own. Embeddings are generated at **build time** (offline); the
   shipped artefact is a static table — there is no runtime neural
   encoder (out under the owner's standing ruling unless separately
   ruled). At this corpus's scale — thousands of nodes, not millions —
   a flat Float32/quantised table plus a tiny cosine-scan query script
   is enough; no HNSW or serving infrastructure is warranted.

**Shared-ID discipline:** the same node identifiers join all three
forms. A node reached by similarity search is the same node the
database returns with citations and the same node in its scheme graph.
IDs are minted once, in the authored graphs, and carried through both
compiled forms unchanged.

**Consumption:** AnSci consumes a compiled snapshot by version pin —
the paramorphic-submodule pattern; during co-development, a `file:`
sibling checkout — the Bihua pattern. AnSci's code keeps only the
routes (e.g. the WordNet climb stops); the knowledge itself lives here.

## Authoring format — recommendation

**Recommendation (not settled): restricted-subset YAML**, one file per
scheme, as in the worked example. Reasons: it is readable top to
bottom and checkable against a text by eye, which is the authoring
act this repo exists for; it diffs cleanly; and a documented restricted
subset (block maps/lists, scalar values, no anchors or flow style) is
parseable by the zero-dependency validator in this repo
(`mini-yaml.mjs`), so the gates need no toolchain. Alternatives the
owner may prefer instead: Markdown tables (more readable still, weaker
structure), or TypeScript data modules (closest to today's AnSci code,
least readable as scholarship). The worked example is YAML so the
owner judges a concrete artefact, not a description of one.

## Gates

No gate, no entry. Mechanically checked today by `validate.mjs`:

1. **No citation → no entry** — every assertion carries a source
   citation or a ruling reference.
2. **Intra-scheme consistency** — within one scheme, the same
   subject + relation never takes two objects.
3. **Reference resolution** — every `ruling_ref` resolves to a ruling
   on file; every ruling names a scheme on file.

Procedural gates (human, at review):

4. **Inter-scheme conflicts flagged, never merged** — a new scheme
   that disagrees with an existing one is registered as its own
   scheme; the disagreement is recorded, not edited away.
5. **Every ruling dated, with its reason** — an undated or unreasoned
   ruling is not a ruling.
6. **No silent harmonisation of sources** — corrections and
   supersessions are layered notes, as the Huainanzi survey's
   2026-11-15 correction models.

## The intended graph set and migration order

The goal set, per the owner's scope statement: the Wuxing
correspondence families; the eight trigrams and their assignments;
the 64 hexagrams; Luoshu （洛書） and Hetu （河圖）. Migration order
(each step a registration task of its own; **only step 0 is done**):

0. **Creature classes, Yueling** — DONE as the worked example
   (`schemes/creature-class-yueling-v1.yaml` + its three rulings),
   migrated from the AnSci record (registration in
   `ansci-git/docs/ansci/repair-programme.md` Part E; implementation
   in `src/ansci/classify.ts`; survey evidence in
   `docs/ansci/wp1c-huainanzi-survey.md` §6).
1. **Wuxing correspondence tables** currently embedded in AnSci code —
   the correspondence families (seasons, directions, organs, emotions,
   flavours, colours, tones, grains, livestock…) as schemes per source
   voice.
2. **Trigram schemes** — the GAP-4 reception history in the AnSci
   record is the seed material: trigram→phase/direction assignments
   **per commentator voice** (Jing Fang's scheme in dispersed form,
   Wei Xiang's *Hanshu* 74 memorial — six of eight trigrams
   directional, Kong Yingda's *Zhouyi Zhengyi* statement, Su Shi's
   *Dongpo Yizhuan* rationale, …). Each commentator's scheme is its
   own graph; the reception history is precisely the record of their
   disagreements, and it migrates as a set, not a blend.
3. **Hexagrams** — composition from trigrams is a derivation rule
   (hexagram = two trigrams), stated in the rules layer; plus the
   received text layer: judgments and line texts cited to the *Zhouyi*
   and the Ten Wings.
4. **Luoshu** — a first-class scheme whose file carries the
   arrangement itself: the 3×3 number grid and its direction/phase
   mappings, as data, not prose about data.
5. **Hetu** — likewise: the number pairs and their generation
   pairings carried as data in the scheme file.
6. **The 50-substance mineral survey** and the remaining
   AnSci-embedded material (the H7 flavour bridge and its kin).

The owner's founding documents anticipate this set in the owner's own
terms — recorded here as attribution, not attestation: the trigram→
hexagram→Wuxing linkage is the founding model's architecture
(`AnSci-AI-Model.txt`: the Eight Trigrams linking the correspondence
families; the 64 Hexagrams composed of them as the situation layer);
the Taiji document states the trigrams and hexagrams as illustrating
dynamic balance and cyclical change; and the bridge graph names
Luoshu and Hetu as where the number theory deepens
(`ai-classica-science-bridge-graph.txt`).

### Migration candidates from the owner's documents (NOT schemes)

Material in the user-ref collection that is correspondence-shaped but
registered nowhere in the AnSci record. Listed plainly; none of it is
authored as a scheme in this pass:

- **The five notes ↔ Five Elements** correspondence, and the
  treble/bass pitch–voice–gender correspondence worked through
  yin-inside-yang (`AnSci-AI-Model.txt`; `nct-ancientscience-TrebleAndBass.txt`).
- **The bridge-graph correspondences to modern science** —
  electromagnetism, calculus (derivative ↔ yang, integral ↔ yin, with
  the document's own JSON sketch of the envelope-like shape),
  chemistry, paired biological processes, the Four Temperaments
  bridge, Wuxing compositions of periodic-table elements
  (`ai-classica-science-bridge-graph.txt`; `AnSci-AI-Model.txt`).
- **The controlling-cycle analysis of modern technology**
  (`charofempirsci.txt`) — an owner's-reading document: argument, not
  a correspondence table; a candidate for the sources layer's
  owner-documents class rather than for a scheme.

## Open questions for the owner

1. **Authoring format** — the YAML recommendation above, or Markdown
   tables, or TS data modules?
2. **Licence** — the repo carries cited classical material, the
   owner's documents, and derived tables; what licence (if any) should
   the repo itself carry?
3. **User-ref documents** — copied into this repo's sources layer, or
   referenced in place at `ansci-git/docs/user-ref/`? (Copying makes
   this repo self-contained; referencing keeps one home for them.)
4. **Snapshot cadence** — what marks a compilable state worth pinning
   (per-scheme registration? a version tag on demand)?
5. **The vector table's embedding source** — which build-time model
   generates the embeddings is a build decision for when the index is
   first compiled; the design only fixes that it happens offline.
