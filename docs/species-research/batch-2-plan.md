# BiotaElite 2.0 — Species Enrichment Batch 2 Plan

**Status:** Research/Audit Only — No Data Modification
**Date:** 2026-09-08
**Validation:** All checks pass (13/13 JSON parse, unique IDs, taxonomy 0 errors)

---

## 1. Current Species Data Audit Summary

### Species Collection Overview (data/species/index.json)

| Category | Count | Status |
|----------|-------|--------|
| **Authoritative Mammals** | 3 | Well-structured, IUCN references, needsReview=true, verification.unverified |
| **Legacy Cards (migrated)** | 11 | Unverified, minimal data, legacyCard preserved, needsReview=true |
| **Fish Extension Species** | 4 | Created to resolve fish extensions, unverified, comprehensive research packs exist |
| **Marine Life Extensions** | 2 | Unresolved/withheld (Whale Shark, Giant Manta Ray) |
| **Bangladesh Regional** | 3 | Linked to authoritative Species via speciesId |

### Fish Extension Species — Research Pack Status

| Species ID | Scientific Name | Research Pack | Image Candidates | IUCN Status | Conflicts |
|------------|-----------------|---------------|------------------|-------------|-----------|
| sp-labeo-rohita | Labeo rohita | ✅ Complete | ✅ Verified (CC BY-SA 4.0) | LC (2010) | None |
| sp-catla-catla | Catla catla | ✅ Complete | ✅ Verified (GFDL 1.2+) | LC (2009) | Genus: Labeo/Gibelion/Catla |
| sp-cirrhinus-mrigala | Cirrhinus mrigala | ✅ Complete | ✅ Verified (CC BY-SA 4.0) | LC (2010) | None |
| sp-tenualosa-ilisha | Tenualosa ilisha | ✅ Complete | ✅ Verified (CC BY-SA 4.0) | LC (2014) | Family: Clupeidae/Dorosomatidae; Population trend |

### Key Constraints for Enrichment

- **Do not modify** existing Species JSON records
- **Do not fabricate** missing scientific information
- **Leave empty** (`""`, `[]`, `{}`) fields without authoritative source support
- **Document conflicts** explicitly (do not resolve silently)
- **Preserve** `needsReview: true` and `verification.status: "unverified"` until formal review
- **IUCN assessments** are 11-15 years old — must not be presented as "current"

---

## 2. Recommended Batch 2 Species (3 Core + 1 Optional)

### Selection Criteria Applied

1. ✅ Already present in structured Species collection
2. ✅ Strong authoritative source coverage (IUCN, FishBase, FAO, ITIS, GBIF, WoRMS, NCBI)
3. ✅ Improve zoological diversity (3 carps with different feeding niches + 1 anadromous shad)
4. ✅ Connected to existing Fish/Marine/Bangladesh content via speciesId
5. ✅ Verified real-image sources available on Wikimedia Commons

---

### SPECIES 1: sp-labeo-rohita (Rohu / Roho labeo)

| Field | Value |
|-------|-------|
| **Scientific Name** | Labeo rohita (Hamilton, 1822) |
| **Common Name** | Rohu |
| **Bengali Name** | রুই |
| **Current Verification** | needsReview=true, verification.unverified, confidenceLevel=low |
| **Data Completeness** | ~45% fields populated (Identity, Taxonomy, keyFeatures, size/weight, habitat, distribution, diet, reproduction, conservation status, references) |
| **Major Missing Fields** | scientificNameAuthor/Year, diagnosticCharacteristics, distinguishingFeatures, similarSpecies, lifespan, anatomy/morphology/physiology, behaviour/communication/lifeCycle, geographic regions/elevation/depth/biome, ecologicalRole, adaptations, predators/prey, importance (except fisheries/aquaculture), conservation measures/legal/criteria/redListUrl/cites, structured references, images, sources |
| **Authoritative Sources** | IUCN Red List (Dahanukar 2010), FishBase (2025), FAO Synopsis (Khan & Jhingran 1975), ITIS, NCBI, Catalog of Fishes, GBIF, WoRMS |
| **Image Availability** | ✅ Main candidate verified: Khalid Mahmood, CC BY-SA 4.0, Wikimedia Commons; 2 gallery candidates |
| **Taxonomy Conflicts** | None — all sources agree on Labeo rohita |
| **Enrichment Priority** | **HIGH** — No conflicts, strongest source agreement, primary polyculture species |
| **Selection Reason** | Zero taxonomic conflicts; herbivore niche (complements others); staple food fish in Bangladesh/India/Nepal; highest market demand in carp polyculture; Bengali name established |

---

### SPECIES 2: sp-cirrhinus-mrigala (Mrigel / Mrigal Carp)

| Field | Value |
|-------|-------|
| **Scientific Name** | Cirrhinus mrigala (Hamilton, 1822) |
| **Common Name** | Mrigel / Mrigal |
| **Bengali Name** | মৃগেল |
| **Current Verification** | needsReview=true, verification.unverified, confidenceLevel=low |
| **Data Completeness** | ~45% fields populated (Identity, Taxonomy, keyFeatures, size/weight, habitat, distribution, diet, reproduction, conservation status, references) |
| **Major Missing Fields** | scientificNameAuthor/Year, diagnosticCharacteristics, distinguishingFeatures, similarSpecies, lifespan, anatomy/morphology/physiology, behaviour/communication/lifeCycle, geographic regions/elevation/depth/biome, ecologicalRole, adaptations, predators/prey, importance (except fisheries/aquaculture), conservation measures/legal/criteria/redListUrl/cites, structured references, images, sources |
| **Authoritative Sources** | IUCN Red List (Dahanukar 2010), FishBase (2025), FAO (Menon 1999), ITIS, NCBI, Catalog of Fishes, GBIF, WoRMS |
| **Image Availability** | ✅ Main candidate verified: CC BY-SA 4.0, Wikimedia Commons; 1 gallery candidate (historical illustration) |
| **Taxonomy Conflicts** | None — all sources agree on Cirrhinus mrigala |
| **Enrichment Priority** | **HIGH** — No conflicts, bottom-feeder niche (complements surface/midwater species), essential polyculture component |
| **Selection Reason** | Zero taxonomic conflicts; detritivore niche completes the 3-species polyculture trophic set (herbivore Labeo + planktivore Catla + detritivore Cirrhinus); third traditional Indian major carp; Bengali name established |

---

### SPECIES 3: sp-tenualosa-ilisha (Hilsa Shad / Ilish)

| Field | Value |
|-------|-------|
| **Scientific Name** | Tenualosa ilisha (Hamilton, 1822) |
| **Common Name** | Hilsa Shad |
| **Bengali Name** | ইলিশ |
| **Current Verification** | needsReview=true, verification.unverified, confidenceLevel=low |
| **Data Completeness** | ~50% fields populated (Identity, Taxonomy, keyFeatures, size/weight, habitat, distribution with rangeMapUrl, diet, reproduction/migration, conservation status/threats, commercial importance, references) |
| **Major Missing Fields** | scientificNameAuthor/Year, diagnosticCharacteristics, distinguishingFeatures, similarSpecies, lifespan, anatomy/morphology/physiology, behaviour/communication/lifeCycle, geographic regions/elevation/biome, ecologicalRole, adaptations, predators/prey (Species IDs), importance (ecological/economic/agricultural/medical/scientific/cultural/educational), conservation populationTrend (conflict), measures/legal/criteria/redListUrl/cites, structured references, images, sources |
| **Authoritative Sources** | IUCN Red List (Freyhof 2014), FishBase (2025), FAO Species Catalogue (Whitehead 1985), ITIS, NCBI, GBIF, WoRMS, Marine Biodiversity Portal of Bangladesh |
| **Image Availability** | ✅ Main candidate verified: Nahid Sultan, CC BY-SA 4.0, Chandpur Fish Market photo; 4 gallery candidates |
| **Taxonomy Conflicts** | **Family placement**: FishBase/GBIF/ITIS = Clupeidae; Marine Biodiversity BD = Dorosomatidae |
| **Other Conflicts** | **Population trend**: IUCN field="Unknown" but documents "declines reported from Iraq and Bangladesh" and "catches in India have declined rapidly" |
| **Enrichment Priority** | **HIGH** — Despite conflicts, highest cultural/economic significance for Bangladesh; unique anadromous life history |
| **Selection Reason** | National fish of Bangladesh; most valuable single-species fishery in Bay of Bengal; unique anadromous migration (1,200 km); conflicts explicitly documented per workflow; strongest Bangladesh connection |

---

### SPECIES 4: sp-catla-catla (Catla) — OPTIONAL

| Field | Value |
|-------|-------|
| **Scientific Name** | Catla catla (Hamilton, 1822) |
| **Common Name** | Catla |
| **Bengali Name** | কাতলা |
| **Current Verification** | needsReview=true, verification.unverified, confidenceLevel=low |
| **Data Completeness** | ~45% fields populated (Identity, Taxonomy, keyFeatures, size/weight, habitat, distribution, diet, reproduction, conservation status, references) |
| **Major Missing Fields** | Same as Labeo/Cirrhinus + scientificNameAuthor/Year unresolved due to genus conflict |
| **Authoritative Sources** | IUCN Red List (Tenzin 2010), FishBase (2025), FAO (Menon 1999), ITIS, NCBI, Catalog of Fishes, GBIF, WoRMS |
| **Image Availability** | ✅ Main candidate verified: GFDL 1.2+, Wikimedia Commons; 2 gallery candidates |
| **Taxonomy Conflicts** | **Genus placement**: FishBase = Labeo; Catalog of Fishes = Gibelion; ITIS = Catla; NCBI = Catla; IUCN = Gibelion catla |
| **Enrichment Priority** | **MEDIUM** — Genus conflict requires explicit documentation; completes 3-species polyculture set |
| **Selection Reason** | Second most important South Asian carp; planktivore niche (surface/midwater); high market value; completes trophic trio; conflict must be documented not resolved |

---

## 3. Expected Data Coverage After Enrichment

Based on research packs, the following field categories can reach **SUPPORTED** state:

### SUPPORTED (authoritative source directly supports)
- Identity: id, slug, commonName, bengaliName, scientificName
- Taxonomy: kingdomId, phylumId, classId, orderId, familyId, genusId, speciesId, subspeciesId
- Identification: keyFeatures
- Biology: size, weight, reproduction
- Ecology: habitat, geographicDistribution.countries, diet, feedingBehaviour
- Conservation: conservationStatus, populationTrend (except Tenualosa conflict), majorThreats
- Importance: fisheriesImportance, aquacultureImportance, commercialImportance (Tenualosa)
- Verification: status=unverified, needsReview=true

### REVIEW REQUIRED (information exists but needs confirmation)
- biology.lifespan (no authoritative min/max)
- biology.behaviour (general descriptions only)
- ecology.ecologicalRole (general only)
- ecology.adaptations (general only)
- ecology.predators/prey (general, no Species IDs)
- conservation.conservationMeasures (none species-specific documented)
- importance.* (except fisheries/aquaculture/commercial)

### NOT ESTABLISHED (reliable evidence not yet collected)
- scientificNameAuthor, scientificNameYear (conflicting/uncertain)
- identification.diagnosticCharacteristics, distinguishingFeatures, similarSpecies
- biology.anatomy, morphology, physiology, communication, lifeCycle
- ecology.geographicDistribution.regions, elevationRange, depthRange, biome, rangeMapUrl (except Tenualosa)
- ecology.symbioticRelationships, ecosystemServices
- importance.ecologicalImportance, economicImportance, agriculturalImportance, medicalImportance, scientificImportance, culturalImportance, educationalImportance
- conservation.iucnCriteria, populationSize, legalProtection, redListUrl, citesAppendix
- references (structured), images, sources

---

## 4. Major Verification Risks

| Risk | Species Affected | Mitigation |
|------|------------------|------------|
| **Taxonomic genus conflict** | Catla catla | Document all 5 authority placements in notes; do not choose |
| **Taxonomic family conflict** | Tenualosa ilisha | Document Clupeidae vs Dorosomatidae; use project Clupeidae ID but note conflict |
| **Population trend conflict** | Tenualosa ilisha | Preserve IUCN "Unknown" field value; document reported declines separately |
| **Old IUCN assessments** | All 4 fish | Assessments 11-15 years old; never label as "current"; include assessmentDate |
| **Missing Species IDs for predators/prey** | All 4 fish | Leave predators/prey arrays empty; do not invent IDs |
| **No approved images in JSON** | All 4 fish | Images researched but not yet in data/images.json; requires separate image pipeline |
| **scientificNameAuthor/Year uncertainty** | All 4 fish | Leave empty; do not infer from FishBase |

---

## 5. Completeness Checklist Framework (Per Enrichment Guide)

For each Species record, use three states per field:

| State | Meaning | Action |
|-------|---------|--------|
| **SUPPORTED** | Authoritative source directly supports the field | Enter value with source reference in notes |
| **REVIEW REQUIRED** | Information exists but requires reviewer confirmation or conflicting sources exist | Enter best value, flag in notes, keep needsReview=true |
| **NOT ESTABLISHED** | Reliable evidence has not yet been collected | Leave empty (`""`, `[]`, `{}`); do not guess |

**Rule:** NOT ESTABLISHED fields must never be populated with guesses or inferred values.

---

## 6. Files Modified

**NONE** — This is a research/audit document only.

- No modifications to `data/species/index.json`
- No modifications to `data/taxonomy/taxa.json`
- No modifications to `data/fish/index.json`
- No modifications to `data/marine-life/index.json`
- No modifications to `data/bangladesh/species.json`
- No modifications to `data/images.json`
- No modifications to HTML, CSS, JavaScript
- No modifications to legacy content

**Created/Updated Documentation:**
- `docs/species-research/batch-2-plan.md` (this file)

---

## 7. Validation Confirmation

```
node validate-data.js
✅ 13/13 JSON files parse
✅ All IDs unique across all collections
✅ All required fields present
✅ Taxonomy hierarchy: 0 errors, 0 warnings
✅ 4 Fish Species relationships resolve (cross-ref: "status" not "unresolved")
✅ Whale Shark remains unresolved
✅ Marine/Bangladesh relationships unchanged
✅ No Species data changed
```

---

## 8. Confirmations

- ✅ **No scientific data was added** to Species JSON
- ✅ **No scientific data was fabricated**
- ✅ **No scientific data was modified**
- ✅ **Legacy content untouched** (no HTML/CSS/JS modified)
- ✅ **Research/Search/Firebase/Auth/Admin modules NOT started**
- ✅ **localhost:8000 untouched** (testing on localhost:8500 only if needed)
- ✅ **All claims in this plan trace to research pack sources** (docs/species-research/*.md)
- ✅ **Conflicts documented per species-source-verification.md workflow**
- ✅ **Batch prioritizes diversity (3 trophic niches + anadromous) and Bangladesh relevance**

---

## 9. Next Steps (Not Part of This Task)

When ready for actual enrichment (separate task):

1. **Source collection & evaluation** per species-source-verification.md workflow (Steps 1-4)
2. **Claim extraction with locators** (page numbers, table references)
3. **Cross-check across sources** (flag agreements/conflicts)
4. **Structured JSON entry** (Step 5) — only for SUPPORTED fields
5. **Independent reviewer verification** (Step 6)
6. **Editorial publication** (Step 7) with verification labels visible

**Do not begin actual Species enrichment until explicitly requested.**