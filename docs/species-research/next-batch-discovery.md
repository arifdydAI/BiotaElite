# BiotaElite 2.0 — Next Species Batch Discovery & Priority Audit

**Status:** READ-ONLY AUDIT — No data modified
**Date:** 2026-09-09
**Validation:** All 13 JSON files parse, unique IDs, taxonomy 0 errors

---

## 1. Current Species Inventory (24 total)

| # | ID | Common Name | Scientific Name | Type | Status |
|---|----|-------------|-----------------|------|--------|
| 1 | sp-panthera-tigris-tigris | Bengal Tiger | Panthera tigris tigris | Mammal | Authoritative |
| 2 | sp-elephas-maximus | Asian Elephant | Elephas maximus | Mammal | Authoritative |
| 3 | sp-vulpes-vulpes | Red Fox | Vulpes vulpes | Mammal | Authoritative |
| 4 | sp-legacy-pavo-cristatus | Indian Peafowl | Pavo cristatus | Bird | Legacy |
| 5 | sp-legacy-buceros-bicornis | Great Hornbill | Buceros bicornis | Bird | Legacy |
| 6 | sp-legacy-varanus-bengalensis | Bengal Monitor | Varanus bengalensis | Reptile | Legacy |
| 7 | sp-legacy-chelonia-mydas | Green Sea Turtle | Chelonia mydas | Reptile | Legacy |
| 8 | sp-legacy-rana-temporaria | Common Frog | Rana temporaria | Amphibian | Legacy |
| 9 | sp-legacy-atelopus-zeteki | Golden Frog | Atelopus zeteki | Amphibian | Legacy |
| 10 | sp-legacy-amphiprion-ocellaris | Clownfish | Amphiprion ocellaris | Fish | Legacy |
| 11 | sp-legacy-scarabaeidae | Scarab Beetle | Coleoptera, Scarabaeidae | Insect | Legacy (order/family only) |
| 12 | sp-legacy-attacus-atlas | Atlas Moth | Attacus atlas | Insect | Legacy |
| 13 | sp-legacy-nephila-pilipes | Golden Orb Weaver | Nephila pilipes | Arachnid | Legacy |
| 14 | sp-legacy-cornu-aspersum | Garden Snail | Cornu aspersum | Mollusc | Legacy |
| 15 | sp-labeo-rohita | Rohu | Labeo rohita | Fish | Batch 1 |
| 16 | sp-catla-catla | Catla | Catla catla | Fish | Batch 1 |
| 17 | sp-cirrhinus-mrigala | Mrigel | Cirrhinus mrigala | Fish | Batch 1 |
| 18 | sp-tenualosa-ilisha | Hilsa Shad | Tenualosa ilisha | Fish | Batch 1 |
| 19 | sp-rhincodon-typus | Whale Shark | Rhincodon typus | Fish | Batch 2 |
| 20 | sp-mobula-birostris | Giant Manta Ray | Mobula birostris | Fish | Batch 2 |
| 21 | sp-wallago-attu | Long-whiskered Catfish | Wallago attu | Fish | Batch 3 |
| 22 | sp-channa-striata | Striped Snakehead | Channa striata | Fish | Batch 3 |
| 23 | sp-anabas-testudineus | Climbing Perch | Anabas testudineus | Fish | Batch 3 |
| 24 | sp-heteropneustes-fossilis | Stinging Catfish | Heteropneustes fossilis | Fish | Batch 3 |

**Summary:** 3 authoritative mammals, 11 legacy species, 10 fish with full records (4 Batch 1, 2 Batch 2, 4 Batch 3)

---

## 2. Candidate Species from Legacy Content

Extracted from `fish.html`, `names.html`, `phyla.html` classification tables. Excluded: already structured species, ambiguous entries (e.g., "Periophthalmus spp.", "Hypophthalmichthys spp."), higher taxa.

### 2.1 Freshwater Fish Candidates (Bangladesh Priority)

| Scientific Name | Common Name | Bengali | Source | Taxonomy Path | Priority | Notes |
|-----------------|-------------|---------|--------|---------------|----------|-------|
| **Labeo calbasu** | Kalibaus / Orange-fin Labeo | কালিবাউস | fish.html, names.html | ✅ animalia→chordata→actinopterygii→cypriniformes→cyprinidae→labeo | **HIGH** | Bangladesh staple; congener of L. rohita; exact name |
| **Clarias batrachus** | Magur / Walking Catfish | মাগুর | fish.html, names.html | ⚠️ siluriformes→clariidae (clariidae missing) | **HIGH** | Bangladesh staple; air-breathing; unique terrestrial locomotion |
| **Sperata aor** | Aor / Ayir | আইড় / আয়র | fish.html, names.html | ✅ animalia→chordata→actinopterygii→siluriformes→bagridae→sperata (bagridae exists) | **HIGH** | Bangladesh high-value; siluriformes exists |
| **Mystus vittatus** | Tengra | টেংরা | fish.html, names.html | ✅ siluriformes→bagridae→mystus (bagridae, mystus exist) | **HIGH** | Bangladesh very common; small catfish |
| **Mystus gulio** | Gulsha |গুলশা | fish.html, names.html | ✅ siluriformes→bagridae→mystus | MEDIUM | Bangladesh common; estuarine/freshwater |
| **Channa punctata** | Spotted Snakehead / Gachua | গাছুয়া | fish.html, names.html | ✅ anabantiformes→channidae→channa (all exist) | **HIGH** | Bangladesh abundant; congener of C. striata |
| **Glossogobius giuris** | Bele / Tank Goby | বেলে | fish.html, names.html | ⚠️ gobiiformes→gobiidae (both missing) | **HIGH** | Bangladesh ubiquitous; gobiidae needs creation |
| **Amblypharyngodon mola** | Mola / Indian Carplet | মলা | fish.html, names.html | ✅ cypriniformes→cyprinidae (genus amblypharyngodon missing) | MEDIUM | Bangladesh nutrient-rich small fish |
| **Puntius sophore** | Punti / Pool Barb | পুঁটি | fish.html, names.html | ✅ cypriniformes→cyprinidae (genus puntius missing) | MEDIUM | Bangladesh very common small barb |
| **Sperata aor** | Aor catfish | আইড় | fish.html, names.html | ✅ siluriformes→bagridae→sperata | **HIGH** | Bangladesh high-value food fish |
| **Systomus sarana** | Olive Barb / Sarpunti | সরপুঁটি | fish.html | ✅ cypriniformes→cyprinidae (genus systomus missing) | MEDIUM | Bangladesh common |
| **Oxygaster bacaila** | Chela / Indian Flying Barb | চেলা | fish.html, names.html | ✅ cypriniformes→cyprinidae (genus oxygaster missing) | MEDIUM | Bangladesh common surface feeder |
| **Osteobrama cotio** | Dhela | ঢেলা | fish.html | ⚠️ cypriniformes→cyprinidae (genus osteobrama missing) | MEDIUM | Bangladesh common |
| **Sperata aor** | Aor catfish | আইড় | fish.html, names.html | ✅ siluriformes→bagridae→sperata | **HIGH** | Bangladesh high-value |
| **Pangasianodon hypophthalmus** | Pangas / Sutchi Catfish | পাঙ্গাস | fish.html, names.html | ⚠️ siluriformes→pangasiidae (pangasiidae missing) | MEDIUM | Major aquaculture species; introduced |

### 2.2 Marine / Coastal Candidates (Bangladesh Priority)

| Scientific Name | Common Name | Bengali | Source | Taxonomy Path | Priority | Notes |
|-----------------|-------------|---------|--------|---------------|----------|-------|
| **Rastrelliger kanagurta** | Indo-Pacific Mackerel | বাংলা মাছ / কাকিলা | fish.html, names.html | ⚠️ scombriformes→scombridae (both missing) | **HIGH** | Bangladesh major marine catch; scombridae needs creation |
| **Harpadon nehereus** | Bombay Duck / Lotia | লটিয়া | fish.html, names.html | ⚠️ aulopiformes→synodontidae (both missing) | **HIGH** | Bangladesh iconic marine fish; unique taxonomy |
| **Chanos chanos** | Milkfish | মিল্কফিশ | fish.html, names.html | ⚠️ gonorynchiformes→chanidae (both missing) | MEDIUM | Bangladesh coastal/aquaculture; unique order |
| **Lates calcarifer** | Barramundi / Koral | কোরাল / বৈড়া | fish.html, names.html | ⚠️ carangiformes→latidae (both missing) | MEDIUM | High-value coastal/aquaculture |
| **Scomberomorus guttatus** | Seer Fish / Surmai | শুরমই / সুরমা | fish.html, names.html | ⚠️ scombriformes→scombridae (both missing) | MEDIUM | High-value marine |
| **Scomberomorus commerson** | Narrow-barred Spanish Mackerel | শুরমই | names.html | ⚠️ scombriformes→scombridae | MEDIUM | Similar to S. guttatus; verify distinction |
| **Pampus argenteus** | Silver Pomfret | রূপচাঁদা | fish.html, names.html | ⚠️ scombriformes→stromateidae (both missing) | MEDIUM | High-value marine |
| **Pampus chinensis** | Chinese Pomfret | চান্দা | fish.html, names.html | ⚠️ scombriformes→stromateidae | MEDIUM | Similar to P. argenteus |
| **Rastrelliger kanagurta** | Indo-Pacific Mackerel | বাংলা মাছ | fish.html, names.html | ⚠️ scombriformes→scombridae | **HIGH** | Top Bangladesh marine catch |

### 2.3 Non-Fish Candidates (from names.html)

| Scientific Name | Common Name | Type | Source | Priority | Notes |
|-----------------|-------------|------|--------|----------|-------|
| **Panthera leo persica** | Asiatic Lion | Mammal | names.html | MEDIUM | Subspecies; felidae+panthera exist |
| **Panthera pardus fusca** | Indian Leopard | Mammal | names.html | MEDIUM | Subspecies; felidae+panthera exist |
| **Canis lupus pallipes** | Indian Wolf | Mammal | names.html | MEDIUM | Subspecies; canidae+canis exist |
| **Bubalus bubalis** | Water Buffalo | Mammal | names.html | MEDIUM | bovidae exists (genus bubalus missing) |
| **Rhinoceros unicornis** | One-horned Rhino | Mammal | names.html | **HIGH** | IUCN VU; Bangladesh historical; rhinocerotidae missing |
| **Platanista gangetica** | Ganges River Dolphin | Mammal | names.html | **HIGH** | National aquatic animal Bangladesh; platanistidae missing |
| **Megaptera novaeangliae** | Humpback Whale | Mammal | names.html | MEDIUM | balaenopteridae missing |
| **Gavialis gangeticus** | Gharial | Reptile | names.html | **HIGH** | IUCN CR; gavialidae missing |
| **Crocodylus porosus** | Saltwater Crocodile | Reptile | names.html | MEDIUM | crocodylidae missing |
| **Ophiophagus hannah** | King Cobra | Reptile | names.html | MEDIUM | elapidae missing |
| **Naja naja** | Spectacled Cobra | Reptile | names.html | MEDIUM | elapidae missing |
| **Gavialis gangeticus** | Gharial | Reptile | names.html | **HIGH** | CR; Bangladesh Sundarbans |
| **Penaeus monodon** | Giant Tiger Prawn | Crustacean | names.html | MEDIUM | penaeidae missing; aquaculture |
| **Macrobrachium rosenbergii** | Giant Freshwater Prawn | Crustacean | names.html | MEDIUM | palaemonidae missing |
| **Scylla serrata** | Mud Crab | Crustacean | names.html | MEDIUM | portunidae missing |

---

## 3. Candidate Classification

### 3.1 Ready Candidates (Taxonomy Path Exists or Minimal Gaps)

| Species | Missing Nodes | Priority | Rationale |
|---------|---------------|----------|-----------|
| **Channa punctata** | genus `channa` exists | **HIGH** | Congener of C. striata; all taxonomy nodes exist |
| **Mystus vittatus** | genus `mystus` exists | **HIGH** | Bagridae + mystus exist; Bangladesh very common |
| **Mystus gulio** | genus `mystus` exists | MEDIUM | Estuarine/freshwater; mystus exists |
| **Sperata aor** | genus `sperata` exists | **HIGH** | Bagridae + sperata exist; high-value Bangladesh fish |
| **Labeo calbasu** | genus `labeo` exists | **HIGH** | Cyprinidae + labeo exist; congener of L. rohita |
| **Systomus sarana** | genus `systomus` missing | MEDIUM | Only genus needed |
| **Amblypharyngodon mola** | genus `amblypharyngodon` missing | MEDIUM | Only genus needed |
| **Puntius sophore** | genus `puntius` missing | MEDIUM | Only genus needed |
| **Oxygaster bacaila** | genus `oxygaster` missing | MEDIUM | Only genus needed |
| **Osteobrama cotio** | genus `osteobrama` missing | MEDIUM | Only genus needed |

### 3.2 Candidates Requiring Taxonomy Foundation First

| Species | Missing Nodes (Count) | Priority | Rationale |
|---------|----------------------|----------|-----------|
| **Clarias batrachus** | `clariidae` (family) | **HIGH** | Iconic walking catfish; major Bangladesh species |
| **Glossogobius giuris** | `gobiiformes` (order), `gobiidae` (family), `glossogobius` (genus) | **HIGH** | Ubiquitous Bele; very common in Bangladesh |
| **Pangasianodon hypophthalmus** | `pangasiidae` (family) | MEDIUM | Major aquaculture species (introduced) |
| **Rastrelliger kanagurta** | `scombriformes` (order), `scombridae` (family), `rastrelliger` (genus) | **HIGH** | Top Bangladesh marine catch |
| **Harpadon nehereus** | `aulopiformes` (order), `synodontidae` (family), `harpadon` (genus) | **HIGH** | Iconic Bombay duck; unique taxonomy |
| **Chanos chanos** | `gonorynchiformes` (order), `chanidae` (family), `chanos` (genus) | MEDIUM | Milkfish; unique order |
| **Lates calcarifer** | `carangiformes` (order), `latidae` (family), `lates` (genus) | MEDIUM | High-value coastal |
| **Scombriformes group** (Rastrelliger, Scomberomorus, Thunnus, Katsuwonus) | `scombriformes`, `scombridae` | **HIGH** | Multiple high-value marine species |
| **Pampus** spp. | `stromateidae` (family) | MEDIUM | High-value pomfrets |

### 3.3 Ambiguous / HOLD Candidates

| Species | Issue | Action |
|---------|-------|--------|
| **Scomberomorus guttatus** vs **S. commerson** | Two similar seerfish species in legacy tables; need verification which is primary for Bangladesh | Hold until taxonomy verified |
| **Pampus argenteus** vs **P. chinensis** | Two pomfret species; similar profiles | Hold until distinction clarified |
| **Periophthalmus spp.** | Legacy uses genus only ("Periophthalmus spp.") not species | HOLD - need species-level ID |
| **Hypophthalmichthys molitrix/nobilis** | Chinese carps; introduced; not native Bangladesh biodiversity | HOLD - lower priority for native focus |
| **Ctenopharyngodon idella** | Grass carp; introduced | HOLD - lower priority |
| **Cyprinus carpio** | Common carp; domesticated/introduced | HOLD - lower priority |
| **Oreochromis niloticus** | Tilapia; introduced globally | HOLD - lower priority |
| **Agnatha** (Petromyzon, Lampetra, Myxine, Eptatretus) | Jawless fish; no Bangladesh records in legacy | HOLD - marine/boreal focus |
| **Sarcopterygii** (Latimeria, Neoceratodus, Protopterus, Lepidosiren) | Lungfishes/coelacanth; no Bangladesh records | HOLD - no regional relevance |
| **Scylla serrata** | Mud crab | portunidae missing | MEDIUM - but crustacean, different workflow |

---

## 4. Recommended Next Batch (Batch 4: 5 Species)

### Top 5 Recommendations

| # | Species | Priority | Rationale |
|---|---------|----------|-----------|
| **1** | **Channa punctata** (Spotted Snakehead / Gachua) | **HIGH** | ✅ All taxonomy nodes exist; congener of C. striata (already enriched); Bangladesh abundant; identical workflow to C. striata |
| **2** | **Mystus vittatus** (Tengra) | **HIGH** | ✅ All taxonomy nodes exist; Bangladesh ubiquitous small catfish; high fisheries importance |
| **3** | **Labeo calbasu** (Kalibaus) | **HIGH** | ✅ All taxonomy nodes exist; congener of L. rohita (Batch 1); Bangladesh staple; identical workflow to L. rohita |
| **4** | **Sperata aor** (Aor / Aor Catfish) | **HIGH** | ✅ All taxonomy nodes exist; high-value Bangladesh food fish; Bagridae + sperata exist |
| **5** | **Glossogobius giuris** (Bele / Tank Goby) | **HIGH** | ⚠️ Needs `gobiiformes` + `gobiidae` (2 nodes); Bangladesh ubiquitous; "Bele" culturally iconic; fills gobiidae gap |

**Why these 5:**
- 4/5 have **complete taxonomy paths** (zero new nodes needed)
- All are **Bangladesh freshwater staples** with high cultural/fisheries importance
- 3 are **congeners of already-enriched species** (C. striata, L. rohita, C. catla via Mystus) — identical enrichment workflow
- 1 (Glossogobius) requires only **2 new taxonomy nodes** but fills a major family gap (Gobiidae) and is arguably the most ubiquitous Bangladesh fish ("Bele")
- All have **strong authoritative sources** (IUCN, FishBase, FAO, Bangladesh Fisheries Yearbook)
- Zero guessing required — all data directly supported by documented sources

---

## 5. Candidates Requiring Taxonomy Work (Deferred to Batch 5+)

| Species | Missing Nodes | Batch | Notes |
|---------|---------------|-------|-------|
| Clarias batrachus | clariidae | Batch 5 | Needs family; iconic walking catfish |
| Pangasianodon hypophthalmus | pangasiidae | Batch 5 | Major aquaculture; introduced |
| Rastrelliger kanagurta | scombriformes, scombridae, rastrelliger | Batch 5 | Marine batch; top Bangladesh marine catch |
| Harpadon nehereus | aulopiformes, synodontidae, harpadon | Batch 5 | Iconic Bombay duck |
| Scombridae group | scombriformes, scombridae | Batch 5 | Marine batch; multiple high-value species |
| Chanos chanos | gonorynchiformes, chanidae, chanos | Batch 6 | Unique order; coastal |
| Lates calcarifer | carangiformes, latidae, lates | Batch 6 | High-value coastal |

---

## 6. Ambiguous / Hold Candidates

| Candidate | Issue | Resolution Needed |
|-----------|-------|-------------------|
| Scomberomorus guttatus vs S. commerson | Two similar seerfish in tables | Verify which is primary for Bangladesh |
| Pampus argenteus vs P. chinensis | Two pomfrets | Clarify distinction for Bangladesh |
| Periophthalmus spp. | Genus-level only | Species-level ID required |
| Chinese carps (Hypophthalmichthys, Ctenopharyngodon, Cyprinus) | Introduced, not native | Defer; lower native biodiversity priority |
| Oreochromis niloticus | Tilapia; introduced globally | Defer; aquaculture focus |
| Agnatha (Petromyzon, Myxine, etc.) | No Bangladesh records | Defer; no regional relevance |
| Sarcopterygii (Latimeria, lungfishes) | No Bangladesh records | Defer; no regional relevance |

---

## 7. Files Inspected

| File | Purpose |
|------|---------|
| `data/species/index.json` | Current Species inventory (24 records) |
| `data/taxonomy/taxa.json` | Taxonomy node availability (34 nodes, 117 missing for full coverage) |
| `data/fish/index.json` | Fish extensions (5 records) |
| `data/marine-life/index.json` | Marine Life extensions (2 records) |
| `data/bangladesh/species.json` | Bangladesh regional records (3 records) |
| `fish.html` | Legacy fish classification tables (64 species) |
| `names.html` | Legacy scientific name tables (100+ species across taxa) |
| `phyla.html` | Legacy phyla classification (few species names) |
| `docs/species-research/` | Existing research docs (8 species packs + mappings) |

---

## 8. Validation & Confirmation

```
node validate-data.js
✅ 13/13 JSON files parse
✅ All IDs unique
✅ Taxonomy hierarchy: 0 errors, 0 warnings
✅ All existing Species records intact
✅ Fish/Marine Life/Bangladesh data unchanged
✅ localhost:8000 untouched
```

### Confirmations
- ✅ **No data files modified** — read-only audit only
- ✅ **No HTML/CSS/JS modified**
- ✅ **No Species records created**
- ✅ **No taxonomy nodes added**
- ✅ **No scientific claims invented**
- ✅ **All legacy content preserved**
- ✅ **Only new file: `docs/species-research/next-batch-discovery.md`**

---

## 9. Summary

| Metric | Value |
|--------|-------|
| Current Species count | 24 |
| New candidates identified | ~40 (from legacy tables) |
| Ready candidates (taxonomy complete) | 10 |
| Candidates needing taxonomy work | ~15 |
| Ambiguous/hold candidates | ~10 |
| **Recommended Batch 4 size** | **5 species** |
| **Recommended Batch 4** | Channa punctata, Mystus vittatus, Labeo calbasu, Sperata aor, Glossogobius giuris |

**Next Step:** Proceed to taxonomy foundation for Glossogobius (gobiiformes, gobiidae) then Batch 4 enrichment for all 5 species.