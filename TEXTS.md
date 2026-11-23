# TEXTS — the ancient Chinese texts utilized in this repo

Every ancient Chinese text cited by any scheme, ruling, or the design
in this repo. The details section below says, per text, what was taken
and how it is integrated. Texts named in the design's goals or in the
owner's founding documents but not yet utilized by any scheme are
listed separately at the end — the main list is utilized texts only.

## The list

1. 尚書·洪範 (Shàngshū, Hóngfàn) — the "Great Plan" chapter of the Book of Documents
2. 黃帝內經·素問 (Huángdì Nèijīng, Sùwèn) — the Plain Questions: ch. 4 金匱真言論， ch. 5 陰陽應象大論
3. 黃帝內經·靈樞 (Huángdì Nèijīng, Língshū) — the Spiritual Pivot: ch. 56 五味
4. 禮記·月令 (Lǐjì, Yuèlìng) — the Monthly Ordinances chapter of the Book of Rites
5. 大戴禮記·曾子天圓 (Dà Dài Lǐjì, Zēngzǐ Tiānyuán) — a chapter of the Elder Dai's Book of Rites
6. 淮南子 (Huáinánzǐ) — ch. 3 天文訓， ch. 4 地形訓， ch. 5 時則訓， ch. 7 精神訓
7. 繫辭傳 (Xìcí zhuàn) — the Appended Statements, one of the Ten Wings of the Zhouyi (utilized via a ruling, not a scheme)

## Details

### 尚書·洪範 — Shangshu, Hongfan

- **What it is:** the "Great Plan" chapter of the Book of Documents;
  the AnSci record's earliest anchor source for the phases themselves.
- **Used by:** `schemes/correspondences-hongfan-v1.yaml`
  (CORRESPONDENCES_HONGFAN_V1).
- **What was taken:** the Five Phases passage — each phase's process
  （水曰润下， 火曰炎上， 木曰曲直， 金曰从革， 土爰稼穑） and the flavour
  each process produces （润下作咸， 炎上作苦， 曲直作酸， 从革作辛，
  稼穑作甘）. The root form of the flavour row every later table
  restates in its own keying.
- **Commentators used:** none.
- **Caveats:** the record's evidence level for these rows is B. The
  passage defines what the phases *do*; it is not an object taxonomy,
  and no object assignment may cite it directly except through a
  recorded process/property — the record's own qualification, carried
  on the scheme file.

### 黃帝內經·素問 — Suwen (Plain Questions)

- **What it is:** the Plain Questions, one half of the Huangdi
  Neijing (the Yellow Emperor's Inner Canon) — the medical
  tradition's core text.
- **Used by:** `schemes/correspondences-suwen-ch4-v1.yaml` and
  `schemes/correspondences-suwen-ch5-v1.yaml`.
- **What was taken:** ch. 4 金匱真言論 (Jin Gui Zhen Yan Lun) — the
  five-direction table entire (direction, colour, organ, orifice,
  flavour, class, animal, grain, planet, tone, number, tissue,
  smell), the seasons from its wind passages, and the centre's season
  长夏 from its seasonal passages. Ch. 5 陰陽應象大論 (Yin Yang Ying
  Xiang Da Lun) — the generation chains and the parallel table
  (climate, tissue, organ, colour, tone, voice, change, orifice,
  flavour, and the Neijing's emotion row 怒喜思忧恐）.
- **Commentators used:** none as scheme voices.
- **Caveats:** the two chapters' schemes are **not identical** —
  heart's orifice is 耳 in ch. 4 and 舌 in ch. 5; the kidney's is 二阴
  in ch. 4 and 耳 in ch. 5; the east's colour word is 青 in ch. 4 and
  苍 in ch. 5. A consumer must cite the chapter with the scheme; a
  merged "Neijing table" is the flattening the record forbids.
  Ch. 4's 稷 carries an approximate gloss in the record's textual
  notes. Neither chapter assigns an element to any time of day
  (the record's GAP-3). Ch. 22 carries a passage parallel to Lingshu
  ch. 56's closing re-keying — noted in the record as a parallel,
  not surveyed as a scheme here.

### 黃帝內經·靈樞 — Lingshu (Spiritual Pivot)

- **What it is:** the Spiritual Pivot, the other half of the Huangdi
  Neijing.
- **Used by:** `schemes/correspondences-lingshu-ch56-v1.yaml`.
- **What was taken:** ch. 56 五味 (Wuwei, "The Five Flavours") — the
  organising claim 五味各走其所喜 (each flavour goes first to the
  organ it favours), the four food lists （五谷， 五果， 五畜， 五菜）
  keyed by flavour, the five colours' flavour affinities, and the
  five prohibitions （五禁）.
- **Commentators used:** none.
- **Caveats:** every row is a **flavour correspondence** (the
  record's evidence level B), explicitly not a whole-entity
  classification of the food. The grain 麻 carries an UNCERTAIN gloss
  in the record ("hemp/sesame"). The chapter's own variant keyings —
  the 五宜 and the closing complementary re-keying of the same food
  sets — are recorded in the scheme file's notes, not asserted: the
  sets are constant, the organ each set is "suitable" for rotates.

### 禮記·月令 — Liji, Yueling (Monthly Ordinances)

- **What it is:** the Monthly Ordinances chapter of the Book of
  Rites — the ritual-calendrical tradition's correspondence scheme.
- **Used by:** `schemes/creature-class-yueling-v1.yaml`
  (CREATURE_CLASS_YUELING_V1) and
  `schemes/correspondences-yueling-v1.yaml`
  (CORRESPONDENCES_YUELING_V1, partial).
- **What was taken:** the five creature classes by season （春其蟲鱗，
  夏其蟲羽， 中央其蟲倮， 秋其蟲毛， 冬其蟲介） with the commentary
  tradition's phase membership stated outright — registered in AnSci
  as prediction rule P2 (2026-11-15). Beyond the classes, only what
  the record attests for the Yueling itself: the animal row (agreeing
  with Huainanzi Shize against Suwen ch. 4), the spring smell word
  羶， and the centre's placement 季夏.
- **Commentators used:** **Zheng Xuan** 鄭玄 — his gloss of the
  scaled class （龍蛇之屬） and his extension of the naked class to
  tigers and leopards (《鄭氏》以為虎豹之屬）, the latter transmitted
  as a flagged commentarial entry in the creature scheme and set
  aside by owner ruling R-2026-11-15. **Chen Hao** 陳澔 — his note
  on the Yueling transmits the earlier commentators, including
  人為倮蟲之長 ("the human is chief of the naked creatures") and the
  Zheng attribution itself.
- **Caveats:** the correspondence file is marked **PARTIAL** — the
  record reaches the Yueling's other families largely through the
  Huainanzi survey's comparisons, and the table was not completed
  from Shize (a different text that follows the Yueling tradition).
  Four source-scoped Earth placements stand across the catalogue
  （长夏 / 季夏 / 四季 / the 72-day reign); none is merged.

### 大戴禮記·曾子天圓 — Da Dai Liji, Zengzi Tianyuan

- **What it is:** a chapter of the Elder Dai's Book of Rites.
- **Used by:** `schemes/creature-class-yueling-v1.yaml` (the
  essence rows).
- **What was taken:** the five essences of the creature classes —
  鱗蟲之精者曰龍， 羽蟲之精者曰鳳， 介蟲之精者曰龜， 毛蟲之精者曰麟，
  裸蟲之精者曰聖人 (the essence of the naked creatures is the sage).
- **Commentators used:** none.
- **Caveats:** reached through quotation in the sources the AnSci
  survey assembled (its section 6), and cited as that record gives
  it.

### 淮南子 — Huainanzi

- **What it is:** the court compendium of Liu An, presented 139 BCE —
  in the survey's framing, the most systematically
  correspondence-minded text of the early Han.
- **Used by:** `schemes/correspondences-huainanzi-tianwen-v1.yaml`,
  `schemes/correspondences-huainanzi-shize-v1.yaml`,
  `schemes/correspondences-huainanzi-dixing-v1.yaml`,
  `schemes/correspondences-huainanzi-jingshen-v1.yaml`; the creature
  scheme's chief rows also rest on Gao You's glosses on this book.
- **What was taken, by chapter:** ch. 3 天文訓 (Tianwen) — the
  five-direction table under 何謂五星 (phase, thearch, assistant,
  implement, governance, planet, directional creature, tone,
  stem-days), the stems-and-branches phase assignments, the
  life-stage triads, the yang/yin overlay on the creature classes,
  and the generating cycle stated as a chain. Ch. 5 時則訓 (Shize) —
  the full seasonal correspondence rows (13 families), including the
  first-offered organ row. Ch. 4 地形訓 (Dixing) — the five-region
  peoples table; the controlling cycle stated as a chain; the
  five-state dynamics （壯老生囚死）, creature genealogies and the
  diet/land families are recorded in the survey but not tabulated as
  schemes. Ch. 7 精神訓 (Jingshen) — the organ–orifice and
  organ–weather passage.
- **Commentators used:** **Gao You** 高誘 — his commentary is
  interleaved in the surveyed Shize edition: he states the
  first-offered organ's controlling-cycle principle （春木勝土，言常
  食所勝也） and negotiates its two exceptions; his glosses treat the
  creature classes through their chiefs （鱗蟲龍為之長， 毛蟲虎為之長，
  甲蟲龜為之長） and include the fish in the scaled class.
- **Caveats:** the survey read four of the twenty-one chapters in
  depth. Jingshen was verified at **passage level only** (three
  independent quotations) — the survey's one method limit, flagged
  on its scheme file. Two Dixing passages are OCR-damaged in the
  fetched edition; no load-bearing claim rests on the damaged
  characters. The book's silences are recorded as findings: no
  five-emotion table, no phase assignment for any weather phenomenon
  or any time of day, and **no trigram–phase table** — the Huainanzi
  is not a source for the trigram material, early or late.

### 繫辭傳 — Xici zhuan (Appended Statements)

- **What it is:** the Appended Statements, one of the Ten Wings of
  the Zhouyi — the tradition's own account of the 象 (Semblances).
- **Used by:** `rulings/R-2026-11-15.yaml` — the ruling's grounds
  cite the Xici's sense of 象 as the governing method: things are
  figured by their material forms and their character, and placed by
  according with the semblance.
- **What was taken:** the method warrant for membership-by-criterion
  in the creature-class scheme. No correspondence table is drawn
  from this text.
- **Commentators used:** none.
- **Caveats:** utilized as a ruling's warrant, not as a scheme
  source. The Zhouyi text layer itself (judgments and line texts) is
  a migration goal — see the next section.

## Named in the design's goals or the founding documents — not yet utilized

These texts are named in DESIGN.md's migration order (the GAP-4
reception history and the hexagram text layer) or in the owner's
founding documents, but no scheme, ruling, or design table in this
repo yet draws on them. They are listed so the main list above stays
exactly what it claims to be: utilized texts only.

- **周易 (Zhouyi), with the Ten Wings** — the received text layer
  (judgments and line texts) is migration step 3, beside the
  hexagram composition rule. Only the 繫辭 is utilized so far, via a
  ruling (see the main list).
- **京房 (Jing Fang) and the received 京氏易傳 tradition** — the
  complete trigram scheme in dispersed form; seed material for the
  per-commentator trigram schemes (migration step 2, the GAP-4
  reception history).
- **漢書·卷七十四 (Hanshu, ch. 74)** — Wei Xiang's 魏相 memorial,
  giving six of the eight trigrams directionally (GAP-4 seed).
- **周易正義 (Zhouyi Zhengyi)** — Kong Yingda's 孔穎達 concise
  all-eight trigram statement (GAP-4 seed).
- **東坡易傳 (Dongpo Yizhuan)** — Su Shi's 蘇軾 rationale for the
  trigram assignments (GAP-4 seed).
- **春秋繁露 (Chunqiu Fanlu), 管子 (Guanzi), 左傳 (Zuo Zhuan)** —
  named in the owner's Taiji survey document
  (`nct-ancientscience-Taiji.txt`) among the early texts'
  contributions. The Zuo Zhuan's five-materials passage （天生五材，
  Duke Xiang 27) is catalogued in the AnSci record (WP1 §1.2), but
  no scheme in this repo draws on it yet.
- **爾雅 (Erya)** — named by the owner (2026-11-23) as a candidate
  for the top-level classification of things: the earliest surviving
  Chinese lexicon organises its entries under category headings
  (kinship, buildings, implements, music, heaven, earth, hills,
  waters, grasses, trees, insects, fish, birds, beasts, domestic
  animals). No scheme in this repo draws on it yet.
- **類書 (leishu, "category books")** — named by the owner
  (2026-11-23) as a candidate genre: encyclopedias arranging all
  knowledge by category tree (heaven, earth, seasons, human
  affairs, animals, plants, objects). A genre rather than a single
  text; no specific leishu has been surveyed, and no scheme in
  this repo draws on one yet.
- **本草綱目 (Bencao Gangmu)** — Li Shizhen's 李時珍 materia
  medica (1596), named by the owner (2026-11-23) as a candidate
  for its complete natural taxonomy: 16 divisions （部） and 60
  classes （類） ordered from water, fire, earth, metals and stones
  through plants and animals to humans. Distinct from the early
  bencao lineage (Tao Hongjing's 本草經集注） that underlies the
  record's mineral survey and flavour bridge; no scheme in this
  repo draws on it yet.
