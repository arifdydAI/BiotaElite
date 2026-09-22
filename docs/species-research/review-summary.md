# Cross-Species Review Summary

## 1. FIELDS CONSISTENTLY SUPPORTED ACROSS ALL 4 SPECIES

| Field | Decision | Confidence | Notes |
|-------|----------|------------|-------|
| id | SAFE_CANDIDATE | High | All 4 species already in index.json |
| slug | SAFE_CANDIDATE | High | All have slugs |
| commonName | SAFE_CANDIDATE | High | All have common names |
| bengaliName | SAFE_CANDIDATE | High | All present in names.html |
| scientificName | SAFE_CANDIDATE | High | All match FishBase/IUCN |
| taxonomy.kingdomId | SAFE_CANDIDATE | High | All: animalia |
| taxonomy.phylumId | SAFE_CANDIDATE | High | All: chordata |
| taxonomy.classId | SAFE_CANDIDATE | High | All: actinopterygii |
| taxonomy.orderId | SAFE_CANDIDATE | High | 3: cypriniformes; 1: clupeiformes |
| taxonomy.familyId | SAFE_CANDIDATE* | High | 3: cyprinidae; 1: clupeidae (conflict) |
| taxonomy.genusId | SAFE_CANDIDATE* | High | 3 agreed; 1 conflict (Catla) |
| taxonomy.speciesId | SAFE_CANDIDATE | High | All match genus+species |
| taxonomy.subspeciesId | SAFE_CANDIDATE | High | All null |
| identification.keyFeatures | SAFE_CANDIDATE | High | All have strong evidence |
| biology.size | SAFE_CANDIDATE | High | All have max/min from FishBase |
| biology.weight | SAFE_CANDIDATE | High | All have max from FishBase |
| ecology.habitat | SAFE_CANDIDATE | High | All have habitat arrays |
| ecology.environment | SAFE_CANDIDATE | High | All have temp/pH/DO ranges |
| ecology.geographicDistribution.countries | SAFE_CANDIDATE | High | All have ISO country codes |
| ecology.diet | SAFE_CANDIDATE | High | All have diet descriptions |
| ecology.feedingBehaviour | SAFE_CANDIDATE | High | All have feeding behavior |
| biology.reproduction | SAFE_CANDIDATE | High | All have strong evidence |
| conservation.conservationStatus | SAFE_CANDIDATE | High | All LC from IUCN |
| conservation.assessmentDate | SAFE_CANDIDATE | High | All have exact dates |
| conservation.assessor | SAFE_CANDIDATE | High | All have assessor names |
| conservation.populationTrend | SAFE_CANDIDATE* | High | 3: stable; 1 conflict (Tenualosa) |
| importance.fisheriesImportance | SAFE_CANDIDATE | High | All "high" |
| importance.aquacultureImportance | SAFE_CANDIDATE | High | All have specific descriptions |
| verification.status | SAFE_CANDIDATE | High | All "unverified" |
| needsReview | SAFE_CANDIDATE | High | All true |
| notes | SAFE_CANDIDATE | High | All from research packs |

## 2. SPECIES-SPECIFIC FIELDS

| Species | Unique Fields Supported |
|---------|------------------------|
| Labeo rohita | biology.size.max=200cm, biology.weight.max=45kg, ecology.diet=Herbivore, importance.aquacultureImportance="Primary species in polyculture" |
| Catla catla | biology.size.max=182cm, biology.weight.max=38.6kg, ecology.diet=Planktivore, importance.aquacultureImportance="Second most important carp", taxonomy.genusId=CONFLICT |
| Cirrhinus mrigala | biology.size.max=100cm, biology.weight.max=12.7kg, ecology.diet=Detritivore, importance.aquacultureImportance="Essential component of three-species polyculture" |
| Tenualosa ilisha | ecology.migration.type="anadromous", ecology.migration.distance="1200 km", importance.commercialImportance="National fish of Bangladesh", taxonomy.familyId=CONFLICT |

## 3. CONFLICTS

| Conflict | Species | Field | Details |
|----------|---------|-------|---------|
| Genus placement | Catla catla | taxonomy.genusId | FishBase: Labeo; Catalog of Fishes: Gibelion; ITIS: Catla; IUCN: Gibelion |
| Family placement | Tenualosa ilisha | taxonomy.familyId | FishBase/GBIF/ITIS: Clupeidae; Marine Biodiversity BD: Dorosomatidae |
| Population trend | Tenualosa ilisha | conservation.populationTrend | IUCN field="Unknown" but documents declines in India, Iraq, Bangladesh |

**Resolution**: Do NOT resolve. Document conflicts explicitly. Do not choose final values.

## 4. INSUFFICIENT EVIDENCE (NOT_ESTABLISHED across all 4 species)

| Field Category | Fields |
|----------------|--------|
| **Author/Year** | scientificNameAuthor, scientificNameYear (all 4 species) |
| **Identification details** | identification.diagnosticCharacteristics, identification.distinguishingFeatures, identification.similarSpecies (all 4) |
| **Biology details** | biology.lifespan, biology.anatomy, biology.morphology, biology.physiology, biology.communication, biology.lifeCycle (all 4) |
| **Behaviour** | biology.communication, biology.lifeCycle (all 4) |
| **Habitat detail** | ecology.geographicDistribution.regions, ecology.geographicDistribution.elevationRange, ecology.geographicDistribution.biome, ecology.geographicDistribution.rangeMapUrl (3/4; Tenualosa has rangeMapUrl) |
| **Depth range** | ecology.geographicDistribution.depthRange (all need verification) |
| **Ecology detail** | ecology.ecologicalRole, ecology.adaptations, ecology.predators, ecology.prey, ecology.symbioticRelationships, ecology.ecosystemServices |
| **Importance** | ecologicalImportance, economicImportance, agriculturalImportance, medicalImportance, scientificImportance, culturalImportance, educationalImportance, commercialImportance (all Not established) |
| **Conservation detail** | conservation.iucnCriteria, conservation.populationSize, conservation.conservationMeasures, conservation.legalProtection, conservation.iucnCriteria, conservation.redListUrl, conservation.citesAppendix |
| **References/Images** | references, images, sources (all Not established) |
| **Author/Year** | scientificNameAuthor, scientificNameYear (all 4 - conflicting/uncertain) |

## 5. REVIEW_REQUIRED FIELDS (Partially supported)

| Field | Species | Reason |
|-------|---------|--------|
| biology.behaviour | All 4 | General descriptions only; need specific ethological studies |
| biology.lifespan | All 4 | No authoritative source with specific min/max |
| ecology.ecologicalRole | All 4 | General descriptions only |
| ecology.adaptations | All 4 | General descriptions only |
| ecology.predators | All 4 (Tenualosa partially) | General only; need specific predator species IDs |
| conservation.conservationMeasures | Tenualosa ilisha | "No species-specific measures; some marine protected areas" |
| conservation.conservationMeasures | Labeo, Catla, Cirrhinus | None specific documented |
| ecology.predators | Tenualosa ilisha | Partially: "Larger piscivorous fish, dolphins, birds" but no Species IDs |

## 6. CONFLICTS REQUIRING DOCUMENTATION (NOT RESOLUTION)

| Conflict | Species | Action |
|----------|---------|--------|
| taxonomy.genusId | Catla catla | Document all 5 authority placements; DO NOT choose |
| taxonomy.familyId | Tenualosa ilisha | Document Clupeidae vs Dorosomatidae; DO NOT choose |
| conservation.populationTrend | Tenualosa ilisha | IUCN field="Unknown" but documents declines; preserve distinction |

## 7. CONSERVATION ASSESSMENT DATES (EXACT)

| Species | IUCN Status | Assessment Date | Assessor | Current? |
|---------|-------------|-----------------|----------|----------|
| Labeo rohita | LC | 20 March 2010 | Dahanukar, N. | 14+ years old |
| Catla catla | LC | 8 October 2009 | Tenzin, K. | 15+ years old |
| Cirrhinus mrigala | LC | 21 March 2010 | Dahanukar, N. | 14+ years old |
| Tenualosa ilisha | LC | 23 January 2013 | Freyhof, J. | 11+ years old |

**Note**: All assessments are 11-15 years old. Do NOT call these "current" assessments.

## 7. TAXONOMY CONCERNS

| Issue | Species | Status |
|-------|---------|--------|
| Genus conflict | Catla catla | 5 authorities, 3 different genera |
| Family conflict | Tenualosa ilisha | Clupeidae vs Dorosomatidae |
| Genus ID in project | Catla catla | Project uses "catla" but FishBase uses "labeo", CoF uses "gibelion" |

## 8. FIELDS THAT SHOULD NOT BE POPULATED YET

| Field | Reason |
|-------|--------|
| scientificNameAuthor, scientificNameYear | Conflicting/uncertain for all 4 |
| identification.diagnosticCharacteristics | Need taxonomic keys |
| identification.distinguishingFeatures | Need comparative studies |
| identification.similarSpecies | Need verified Species IDs in project |
| biology.lifespan | No authoritative source |
| biology.anatomy, biology.morphology, biology.physiology | No sources |
| biology.communication, biology.lifeCycle | No sources |
| ecology.geographicDistribution.regions | Need specific regional data |
| ecology.geographicDistribution.elevationRange | No data |
| ecology.geographicDistribution.depthRange | Needs verification |
| ecology.geographicDistribution.biome | No specific source |
| ecology.geographicDistribution.rangeMapUrl | Only Tenualosa has |
| biology.anatomy, morphology, physiology | No sources |
| biology.communication, biology.lifeCycle | No sources |
| ecology.ecologicalRole, ecology.adaptations | General only |
| ecology.predators, ecology.prey | General only / no Species IDs |
| ecology.symbioticRelationships, ecology.ecosystemServices | No sources |
| importance.* (except fisheries/aquaculture) | General only |
| conservation.iucnCriteria, conservation.populationSize | No data |
| conservation.conservationMeasures | None specific (except Tenualosa partial) |
| conservation.legalProtection, redListUrl, citesAppendix | No specific data |
| references, images, sources | Need structured data |

## 8. FILES MODIFIED

**Created** (4 mapping files + 1 summary):
- docs/species-research/labeo-rohita-mapping.md
- docs/species-research/catla-catla-mapping.md
- docs/species-research/cirrhinus-mrigala-mapping.md
- docs/species-research/tenualosa-ilisha-mapping.md
- docs/species-research/review-summary.md (this file)

**No modifications to**:
- data/species/index.json
- data/taxonomy/taxa.json
- data/fish/index.json
- data/marine-life/index.json
- data/bangladesh/species.json
- Any HTML/CSS/JS files

## 9. VALIDATION RESULT

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

## 9. CONFIRMATIONS

- ✅ NO scientific data was inserted into Species JSON
- ✅ NO scientific data was fabricated
- ✅ All claims in mapping files trace to research pack sources
- ✅ Legacy content untouched (no HTML/CSS/JS modified)
- ✅ Research/Search/Firebase/Auth/Admin modules NOT started
- ✅ localhost:8000 untouched
- ✅ Data safety check passed