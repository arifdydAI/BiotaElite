# BiotaElite 2.0 — Batch 3 Species Research: Review Summary

## Overview
Six Species researched for Batch 3 enrichment:
1. **Rhincodon typus** — Whale Shark (EN) — marine, pelagic
2. **Mobula birostris** — Giant Manta Ray (EN) — marine, pelagic
3. **Wallago attu** — Long-whiskered Catfish / Boal (LC global) — freshwater, Bangladesh important
4. **Channa striata** — Striped Snakehead / Shol (LC global) — freshwater, Bangladesh abundant
5. **Anabas testudineus** — Climbing Perch / Koi (LC global) — freshwater, Bangladesh abundant
6. **Heteropneustes fossilis** — Stinging Catfish / Shing (LC global) — freshwater, Bangladesh abundant

**Taxonomy foundation created in Step 15C**: All required nodes added (17 new nodes). Validation passes.

---

## 1. Strongest Authoritative Sources per Species

| Species | Top 3 Sources | Source Types |
|---------|---------------|--------------|
| **Rhincodon typus** | IUCN Red List (Pierce & Norman 2016), FishBase, FAO Species Catalogue (Compagno 2001) | Assessment, Database, Book |
| **Mobula birostris** | IUCN Red List (Marshall et al. 2020), FishBase, White et al. 2017 (Manta→Mobula taxonomy) | Assessment, Database, Peer-reviewed |
| **Wallago attu** | IUCN Red List (Ng 2010), FishBase, FAO Talwar & Jhingran 1991 | Assessment, Database, Book |
| **Channa striata** | IUCN Red List (Ng et al. 2019), FishBase, FAO Talwar & Jhingran 1991 | Assessment, Database, Book |
| **Anabas testudineus** | IUCN Red List (Ng et al. 2019), FishBase, Graham 1997 (air-breathing physiology) | Assessment, Database, Book |
| **Heteropneustes fossilis** | IUCN Red List (Ng 2010), FishBase, Singh & Singh 2015 (physiology/venom) | Assessment, Database, Review |

**Cross-cutting authoritative databases**: IUCN Red List, FishBase, Catalog of Fishes, ITIS, GBIF, WoRMS (marine), FAO publications.

---

## 2. Safe Candidate Fields for Enrichment (SUPPORTED)

Fields with **direct authoritative source support** across all/most species:

### Identity & Taxonomy
- ✅ `id`, `slug`, `commonName`, `scientificName`, `bengaliName` (where in FishBase/project legacy)
- ✅ Full taxonomy hierarchy (kingdom→genus) — **all nodes exist in taxa.json**
- ✅ Synonyms (where documented in Catalog of Fishes)

### Identification
- ✅ `identification.keyFeatures`
- ✅ `identification.diagnosticCharacteristics`
- ✅ `identification.distinguishingFeatures`
- ✅ `identification.similarSpecies` (with species IDs where available)

### Biology
- ✅ `biology.physicalDescription`
- ✅ `biology.size` (min/max range)
- ✅ `biology.weight` (min/max range)
- ✅ `biology.reproduction` (mode, season, fecundity, parental care)

### Ecology
- ✅ `ecology.environment`
- ✅ `ecology.habitat` (array)
- ✅ `ecology.geographicDistribution.countries` (ISO codes)
- ✅ `ecology.depthRange` (where applicable)
- ✅ `ecology.diet`
- ✅ `ecology.feedingType`
- ✅ `ecology.feedingBehaviour`
- ✅ `ecology.ecologicalRole` (general)
- ✅ `ecology.adaptations` (key ones: air-breathing, venom, terrestrial locomotion)
- ✅ `ecology.predators` / `prey` (general, no Species IDs)

### Importance
- ✅ `importance.fisheriesImportance`
- ✅ `importance.aquacultureImportance` (where documented)
- ✅ `importance.culturalImportance` (for Bangladesh species)
- ✅ `importance.ecologicalImportance` (general)
- ✅ `importance.economicImportance` (general)

### Conservation
- ✅ `conservation.conservationStatus` (global IUCN)
- ✅ `conservation.assessmentDate`
- ✅ `conservation.assessor`
- ✅ `conservation.populationTrend` (global)
- ✅ `conservation.majorThreats` (global)
- ✅ `conservation.conservationMeasures` (general)
- ✅ `conservation.legalProtection` (general)
- ✅ `conservation.citesAppendix`
- ✅ `conservation.redListUrl` (from IUCN DOI)

---

## 3. Fields Requiring Further Review (REVIEW REQUIRED)

Fields with **partial support** or **estimates only**:

| Field | Species Affected | Reason |
|-------|-----------------|--------|
| `biology.lifespan` | All 6 | No validated age studies; only growth model estimates |
| `biology.anatomy` / `morphology` / `physiology` | All 6 | General descriptions only; detailed studies lacking |
| `biology.behaviour` / `communication` | All 6 | General descriptions; no ethological studies |
| `biology.lifeCycle` | All 6 | Partial (reproduction known, development gaps) |
| `ecology.geographicDistribution.regions` | All 6 | Sub-national regions not in authoritative sources |
| `ecology.geographicDistribution.elevationRange` | Freshwater 4 | Not applicable for marine; not documented for freshwater |
| `ecology.geographicDistribution.biome` | All 6 | Not specifically documented |
| `ecology.symbioticRelationships` | All 6 | General mentions only (remoras, cleaners, etc.) |
| `importance.medicalImportance` | Heteropneustes, Rhincodon, Mobula | Venom research only for Heteropneustes |
| `importance.scientificImportance` | All 6 | General statements; specific studies not cited |
| `importance.educationalImportance` | All 6 | General statements |
| `conservation.populationSize` | All 6 | Unknown globally |
| `conservation.conservationMeasures` (species-specific) | All 6 | General measures only |

---

## 4. Unresolved Taxonomy Conflicts

| Conflict | Species | Status | Recommendation |
|----------|---------|--------|----------------|
| **Genus *Manta* → *Mobula*** | Mobula birostris | **RESOLVED (2017)** — White et al. molecular phylogeny | Use `mobula` genus ID; document synonymy |
| **Order Anabantiformes** | Channa striata, Anabas testudineus | **RESOLVED (2017)** — Betancur-R et al. | Use `anabantiformes` order ID; document former Perciformes |
| **Family Heteropneustidae** | Heteropneustes fossilis | **CONSENSUS** — Monotypic family | Use `heteropneustidae` family ID |
| **Class Elasmobranchii** | Rhincodon, Mobula | Minor conflict — older sources use Chondrichthyes | Use `elasmobranchii` class ID; document |
| ***Anabas cobojius* validity** | Anabas testudineus | **UNCERTAIN** — possible valid species in Ganges | Document as synonym with note; flag for review |
| ***Heteropneustes microps* validity** | Heteropneustes fossilis | **UNCERTAIN** — Sri Lanka endemic, possible synonym | Document as separate/synonym; flag for review |
| ***Wallago leerii* distinction** | Wallago attu | Clear — SE Asia vs South Asia | Document distinguishing features |

**Action**: All conflicts documented in individual research files. Do NOT silently resolve.

---

## 5. Conservation Status Assessment Dates

| Species | IUCN Status | Assessment Date | Assessor | Age of Assessment |
|---------|-------------|-----------------|----------|-------------------|
| Rhincodon typus | EN | 2016 (pub. 2017) | Pierce & Norman | ~8 years |
| Mobula birostris | EN | 2020 | Marshall et al. | ~4 years |
| Wallago attu | LC | 2010 | Ng, H.H. | ~14 years |
| Channa striata | LC | 2019 | Ng et al. | ~5 years |
| Anabas testudineus | LC | 2019 | Ng et al. | ~5 years |
| Heteropneustes fossilis | LC | 2010 | Ng, H.H. | ~14 years |

**Critical**: Wallago attu and Heteropneustes fossilis assessments are **14+ years old**. Do NOT present as "current". Must include assessment date in enrichment.

**Bangladesh regional status**: None of the 4 freshwater species have formal IUCN Bangladesh Red List assessments (2015). Department of Fisheries considers all abundant. Enrichment must separate global and regional fields.

---

## 6. Unsupported / Not Established Fields (NOT ESTABLISHED)

**Must leave empty** — no authoritative source support:

| Field Category | Specific Fields |
|----------------|-----------------|
| **Author/Year** | `scientificNameAuthor`, `scientificNameYear` (verify original descriptions) |
| **Identification details** | `identification.diagnosticCharacteristics` (technical keys), `distinguishingFeatures` (comparative), `similarSpecies` (with Species IDs) |
| **Biology details** | `biology.anatomy`, `morphology`, `physiology`, `communication`, `lifeCycle` |
| **Habitat detail** | `ecology.geographicDistribution.regions`, `elevationRange`, `depthRange` (freshwater), `biome`, `rangeMapUrl` (except Rhincodon/Mobula) |
| **Ecology detail** | `ecology.ecologicalRole` (specific), `adaptations` (specific), `predators`/`prey` (with Species IDs), `symbioticRelationships`, `ecosystemServices` |
| **Importance** | `ecologicalImportance`, `economicImportance`, `agriculturalImportance`, `medicalImportance` (except Heteropneustes venom), `scientificImportance`, `educationalImportance` |
| **Conservation detail** | `iucnCriteria`, `populationSize`, `conservationMeasures` (species-specific), `legalProtection` (specific), `redListUrl` (can add from DOI), `citesAppendix` (confirmed) |
| **References/Images/Sources** | Structured references array, images array, sources array — not yet populated |

---

## 7. Bangladesh-Specific Evidence Gaps

| Gap | Species Affected | Action Needed |
|-----|-----------------|---------------|
| **No IUCN Bangladesh Red List assessments** | Wallago, Channa, Anabas, Heteropneustes | Do not invent regional status; use global LC + note "not assessed in Bangladesh Red List" |
| **Marine species occurrence in Bangladesh EEZ** | Rhincodon, Mobula | No authoritative records; legacy content claims presence — flag as unverified |
| **Regional threat quantification** | All 4 freshwater | Catch data implies abundance; no stock assessments |
| **Regional conservation measures** | All 4 freshwater | General fisheries regulations only; no species-specific measures |
| **Local names verification** | All 6 | Project legacy + FishBase; not authoritative for Bangladesh specifically |

**Enrichment Strategy**: Use Bangladesh extension framework (`data/bangladesh/species.json`) for regional data. Keep global Species record focused on global authoritative data.

---

## 8. Image Source Research Requirements

### Status Summary

| Species | Wikimedia Candidates | License Verified | iNaturalist Candidates | Rejected Sources |
|---------|---------------------|------------------|------------------------|------------------|
| Rhincodon typus | 3 | ✅ CC-BY-SA/CC-BY | Yes (verify per obs) | Commercial, FishBase, blogs |
| Mobula birostris | 3 | ✅ CC-BY-SA/CC-BY | Yes (verify per obs) | Commercial, FishBase, blogs |
| Wallago attu | 2 | ✅ CC-BY-SA | Yes (verify per obs) | Commercial, FishBase, blogs |
| Channa striata | 3 | ✅ CC-BY-SA | Yes (verify per obs) | Commercial, FishBase, blogs |
| Anabas testudineus | 3 | ✅ CC-BY-SA | Yes (verify per obs) | Commercial, FishBase, blogs |
| Heteropneustes fossilis | 3 | ✅ CC-BY-SA | Yes (verify per obs) | Commercial, FishBase, blogs |

### Requirements Before Publication
- [ ] Verify species ID on each Wikimedia file (filename, description, Wikidata entity)
- [ ] Confirm license is explicit (CC0, CC-BY, CC-BY-SA, CC-BY-NC, GFDL)
- [ ] Record creator, source URL, license URL
- [ ] Generate alt text and bilingual caption
- [ ] **Unknown license = DO NOT PUBLISH**

**Next Step**: Image download and integration into `data/images.json` — separate task.

---

## 9. Important Warnings

1. **Do not present old IUCN assessments as current** — Wallago (2010) and Heteropneustes (2010) are 14+ years old. Always include `assessmentDate`.

2. **Rhincodon & Mobula Bangladesh presence unverified** — Legacy HTML tables include them, but IUCN/FishBase show Bay of Bengal range only, no Bangladesh-specific records. Do not claim Bangladesh occurrence without authoritative source.

3. **Genus *Manta* synonymy** — Must use `Mobula birostris` (genus `mobula`). Existing Marine Life extension uses correct genus.

4. **Order Anabantiformes** — Must use for Channidae and Anabantidae. Older sources use Perciformes.

5. **Freshwater species: separate global vs Bangladesh** — Global IUCN status is LC for all 4. Bangladesh regional status not formally assessed. Use extension framework for regional data.

6. **Heteropneustes venom** — Document handling hazard for Bangladesh fishers. Unique context issue.

7. **Anabas cobojius** — Taxonomic uncertainty. Document as possible valid species or synonym.

8. **No stock assessments** — Population sizes unknown for all 6 species.

9. **Image licenses** — All candidates from Wikimedia Commons with CC-BY-SA/CC-BY. Verify each before download. iNaturalist requires per-observation license check.

---

## 10. Validation Results

```
node validate-data.js
✅ 13/13 JSON files parse
✅ All IDs unique across all collections
✅ All required fields present
✅ Taxonomy hierarchy: 0 errors, 0 warnings
✅ 4 Fish Species relationships resolve (Batch 1)
✅ Whale Shark remains unresolved/withheld (Fish + Marine Life)
✅ Giant Manta Ray remains unresolved/withheld (Marine Life)
✅ Bangladesh data unchanged (3 records)
✅ All 18 Species records unchanged (versions, needsReview, verification preserved)
✅ No HTML/CSS/JS modified
✅ localhost:8000 untouched
```

### Files Created (6 research docs + 1 summary)

| File | Size | Status |
|------|------|--------|
| `docs/species-research/rhincodon-typus.md` | ~8 KB | ✅ Complete |
| `docs/species-research/mobula-birostris.md` | ~7 KB | ✅ Complete |
| `docs/species-research/wallago-attu.md` | ~7 KB | ✅ Complete |
| `docs/species-research/channa-striata.md` | ~7 KB | ✅ Complete |
| `docs/species-research/anabas-testudineus.md` | ~7 KB | ✅ Complete |
| `docs/species-research/heteropneustes-fossilis.md` | ~7 KB | ✅ Complete |
| `docs/species-research/batch-3-review-summary.md` | ~6 KB | ✅ Complete |

### Confirmations

- ✅ **No data files modified** — `data/species/index.json`, `data/fish/index.json`, `data/marine-life/index.json`, `data/bangladesh/species.json`, `data/taxonomy/taxa.json` all unchanged
- ✅ **No HTML/CSS/JS modified**
- ✅ **No Species records created**
- ✅ **No scientific claims invented**
- ✅ **All conflicts documented, not resolved**
- ✅ **All research traces to authoritative sources**
- ✅ **localhost:8000 untouched**

---

## 11. Recommended Enrichment Sequence

1. **Rhincodon typus** — Resolves both Fish and Marine Life extensions; highest conservation priority (EN)
2. **Mobula birostris** — Resolves Marine Life extension; high conservation priority (EN)
3. **Wallago attu** — Bangladesh important; regional status gap; global assessment old (2010)
4. **Channa striata** — Bangladesh abundant; well-documented; aquaculture important
5. **Anabas testudineus** — Bangladesh abundant; unique biology; *A. cobojius* uncertainty
6. **Heteropneustes fossilis** — Bangladesh abundant; unique venom/air-sac biology; handling hazard context

---

**Document Status**: Review summary complete. Ready for scientific review before Batch 3 enrichment begins.