# Labeo rohita — Structured Data Mapping

## 1. IDENTITY MAPPING

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| commonName | Supported | Rohu | FishBase, FAO, IUCN |
| bengaliName | Supported | রুই | FishBase, FAO, names.html |
| scientificName | Supported | Labeo rohita | FishBase, NCBI, ITIS, IUCN |
| author/year | Conflicting | Hamilton, 1822 (basionym Cyprinus rohita) | FishBase, ITIS, NCBI agree on Hamilton 1822; original as Cyprinus rohita |
| synonyms | Not established | None in research pack | No synonyms listed in research pack |

## 2. TAXONOMY MAPPING

| Rank | Project Taxonomy ID | Accepted Name | Source | Conflict Status |
|------|---------------------|---------------|--------|-----------------|
| Kingdom | animalia | Animalia | NCBI, ITIS, FishBase | Agreed |
| Phylum | chordata | Chordata | NCBI, ITIS, FishBase | Agreed |
| Class | actinopterygii | Actinopterygii | FishBase, NCBI | Agreed |
| Order | cypriniformes | Cypriniformes | FishBase, NCBI, ITIS | Agreed |
| Family | cyprinidae | Cyprinidae | FishBase, NCBI, ITIS | Agreed |
| Genus | labeo | Labeo | FishBase, NCBI, ITIS | Agreed |
| Species | rohita | rohita | FishBase, NCBI, ITIS, IUCN | Agreed |

**Project Taxonomy Path**: animalia → chordata → actinopterygii → cypriniformes → cyprinidae → labeo → rohita
**Subspecies**: None (null)

## 3. IDENTIFICATION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| keyFeatures | Supported | [inferior mouth, fringed lips, no barbels, cycloid scales, 40-44 lateral line scales] | FishBase, FAO |
| diagnosticCharacteristics | Not established | — | Need taxonomic key |
| distinguishingFeatures | Not established | — | Need comparative study |
| similarSpecies | Not established | — | Need verified Species IDs |
| notes | Supported | Verbatim from research pack | Research pack |

## 4. BIOLOGY

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| physicalDescription | Supported | Large felid with muscular body, round head, powerful jaws. Coat orange with black stripes; white on belly, chest, inner limbs. Tail long with black rings and black tip. | FishBase, FAO |
| size | Supported | {min: 50, max: 200, unit: "cm"} | FishBase, FAO |
| weight | Supported | {min: 1, max: 45, unit: "kg"} | FishBase |
| lifespan | Not established | — | No authoritative source |
| anatomy | Not established | — | No sources |
| morphology | Not established | — | No sources |
| physiology | Not established | — | No sources |
| behaviour | Partially supported | Active during day; forms schools; bottom and column feeder; migrates upstream for spawning | FishBase, FAO |
| communication | Not established | — | No sources |
| reproduction | Supported | Sexual maturity 1-2 years; spawns monsoon (Jun-Aug); 200,000-2,000,000 eggs/kg; no parental care; potamodromous migration up to 100 km | FishBase, FAO, IUCN |
| lifeCycle | Not established | — | No sources |

## 5. HABITAT & DISTRIBUTION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| habitat | Supported | ["rivers", "lakes", "ponds", "reservoirs", "floodplains"] | FishBase, IUCN, FAO |
| environment | Supported | Freshwater (can tolerate slightly brackish); temperature 14-38°C (optimal 25-30°C); pH 6.5-8.5; DO >4 mg/L | FishBase |
| geographicDistribution.countries | Supported | ["PK", "IN", "BD", "NP", "MM"] | FishBase, IUCN, FAO |
| geographicDistribution.regions | Not established | — | Need specific regions |
| geographicDistribution.elevationRange | Not established | — | No data |
| geographicDistribution.depthRange | Not established | FishBase says 0-10m but needs verification | FishBase |
| geographicDistribution.biome | Not established | — | No specific source |
| rangeMapUrl | Not established | — | No source |

## 6. DIET & FEEDING

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| diet | Supported | Herbivore - phytoplankton, algae, aquatic plants, detritus | FishBase, FAO |
| feedingType | Supported | Herbivore | FishBase |
| feedingBehaviour | Supported | Grazes on periphyton and algae, filter feeds on plankton, bottom feeds on detritus | FishBase, FAO |

## 7. ECOLOGY

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| ecologicalRole | Partially supported | Important grazer of phytoplankton and periphyton; nutrient cycling; prey for larger piscivorous fish | FishBase, FAO |
| adaptations | Partially supported | Tolerates wide temperature range; tolerates low oxygen; air breathing not present | FishBase |
| predators | Partially supported | Larger piscivorous fish, birds, crocodiles | FishBase |
| prey | Not established | — | General only |
| adaptations | Partially supported | Tolerates wide temperature range; tolerates low oxygen; air breathing not present | FishBase |
| symbioticRelationships | Not established | — | No sources |
| ecosystemServices | Not established | — | No sources |

## 8. IMPORTANCE

| Category | Status | Value | Source |
|----------|--------|-------|--------|
| ecologicalImportance | Not established | General only | FishBase, FAO |
| economicImportance | Not established | General only | FishBase, FAO |
| agriculturalImportance | Not established | — | — |
| fisheriesImportance | Supported | "high" | FishBase, FAO |
| medicalImportance | Not established | — | — |
| scientificImportance | Not established | — | — |
| culturalImportance | Not established | — | — |
| educationalImportance | Not established | — | — |
| aquacultureImportance | Supported | "Primary species in polyculture; high market demand" | FishBase, FAO |

## 9. CONSERVATION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| conservationStatus | Supported | "LC" | IUCN Red List (2010) |
| assessmentDate | Supported | 20 March 2010 | IUCN Red List |
| assessor | Supported | Dahanukar, N. | IUCN Red List |
| iucnCriteria | Not established | — | Not in research pack |
| populationTrend | Supported | "stable" | IUCN |
| populationSize | Not established | — | No source |
| majorThreats | Supported | ["Overfishing in natural habitats", "habitat degradation", "pollution", "river damming", "invasive species competition"] | IUCN, FishBase |
| conservationMeasures | Not established | None specific | — |
| legalProtection | Not established | — | No specific data |
| iucnCriteria | Not established | — | Not in research pack |
| redListUrl | Not established | — | No specific data |
| citesAppendix | Not established | "Not Evaluated" per FishBase/IUCN | FishBase, IUCN |

## 10. REFERENCES

Only traceable references from research pack:

1. **IUCN Red List**: Dahanukar, N. (2010). *Labeo rohita*. The IUCN Red List of Threatened Species 2010: e.T166619A6248771. https://dx.doi.org/10.2305/IUCN.UK.2010-4.RLTS.T166619A6248771.en

2. **FishBase**: Froese, R. and Pauly, D. (eds.) (2025). *Labeo rohita* (Hamilton, 1822). FishBase. https://www.fishbase.se/summary/Labeo-rohita.html

3. **FAO**: Khan, H.A. and V.G. Jhingran, 1975. Synopsis of biological data on rohu *Labeo rohita* (Hamilton, 1822). FAO Fish. Synop. (111):100 p.

4. **ITIS**: ITIS Report for TSN 163681 - *Labeo rohita* (Hamilton, 1822). https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=163681

5. **NCBI Taxonomy**: Taxonomy ID 84645 - *Labeo rohita* (Hamilton, 1822). https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=84645

6. **Catalog of Fishes**: Eschmeyer, W.N. (ed.). Catalog of Fishes. California Academy of Sciences.

7. **GBIF**: *Labeo rohita* (Hamilton, 1822). https://www.gbif.org/species/2334125

8. **WoRMS**: *Labeo rohita* (Hamilton, 1822). World Register of Marine Species.

9. **FAO Cultured Aquatic Species**: *Labeo rohita* fact sheet. http://www.fao.org/fishery/culturedspecies/Labeo_rohita/en

10. **Khan & Jhingran (1975)**: Synopsis of biological data on rohu *Labeo rohita* (Hamilton, 1822). FAO Fish. Synop. (111):100 p.

## 11. IMAGE DATA

**No verified image record prepared in this task.**

## 12. FINAL FIELD DECISION

| Species JSON Field | Evidence | Decision | Reason |
|-------------------|----------|----------|--------|
| id | Species record exists | SAFE_CANDIDATE | Already in index.json |
| slug | rohu | SAFE_CANDIDATE | High confidence |
| commonName | Rohu | SAFE_CANDIDATE | High confidence |
| bengaliName | রুই | SAFE_CANDIDATE | High confidence (names.html) |
| scientificName | Labeo rohita | SAFE_CANDIDATE | High confidence |
| scientificNameAuthor | Not established | NOT_ESTABLISHED | Conflicting sources |
| scientificNameYear | Not established | NOT_ESTABLISHED | Conflicting sources |
| taxonomy.kingdomId | animalia | SAFE_CANDIDATE | All sources agree |
| taxonomy.phylumId | chordata | SAFE_CANDIDATE | All sources agree |
| taxonomy.classId | actinopterygii | SAFE_CANDIDATE | All sources agree |
| taxonomy.orderId | cypriniformes | SAFE_CANDIDATE | All sources agree |
| taxonomy.familyId | cyprinidae | SAFE_CANDIDATE | All sources agree |
| taxonomy.genusId | labeo | SAFE_CANDIDATE | All sources agree |
| taxonomy.speciesId | rohita | SAFE_CANDIDATE | All sources agree |
| taxonomy.subspeciesId | null | SAFE_CANDIDATE | All sources agree |
| identification.keyFeatures | Supported | SAFE_CANDIDATE | High confidence |
| identification.diagnosticCharacteristics | Not established | NOT_ESTABLISHED | Need taxonomic key |
| identification.distinguishingFeatures | Not established | NOT_ESTABLISHED | Need comparative study |
| identification.similarSpecies | Not established | NOT_ESTABLISHED | Need verified Species IDs |
| identification.notes | Supported | SAFE_CANDIDATE | From research pack |
| biology.physicalDescription | Supported | SAFE_CANDIDATE | High confidence |
| biology.size | Supported | SAFE_CANDIDATE | High confidence |
| biology.weight | Supported | SAFE_CANDIDATE | High confidence |
| biology.lifespan | Not established | NOT_ESTABLISHED | No authoritative source |
| biology.anatomy | Not established | NOT_ESTABLISHED | No sources |
| biology.morphology | Not established | NOT_ESTABLISHED | No sources |
| biology.physiology | Not established | NOT_ESTABLISHED | No sources |
| biology.behaviour | Partially supported | REVIEW_REQUIRED | General descriptions only |
| biology.communication | Not established | NOT_ESTABLISHED | No sources |
| biology.reproduction | Supported | SAFE_CANDIDATE | High confidence |
| biology.lifeCycle | Not established | NOT_ESTABLISHED | No sources |
| ecology.habitat | Supported | SAFE_CANDIDATE | High confidence |
| ecology.environment | Supported | SAFE_CANDIDATE | High confidence |
| ecology.geographicDistribution.countries | Supported | SAFE_CANDIDATE | High confidence |
| ecology.geographicDistribution.regions | Not established | NOT_ESTABLISHED | Need specific regions |
| ecology.geographicDistribution.elevationRange | Not established | NOT_ESTABLISHED | No data |
| ecology.geographicDistribution.depthRange | Not established | NOT_ESTABLISHED | FishBase says 0-10m but needs verification |
| ecology.geographicDistribution.biome | Not established | NOT_ESTABLISHED | No specific source |
| ecology.geographicDistribution.rangeMapUrl | Not established | NOT_ESTABLISHED | No source |
| ecology.diet | Supported | SAFE_CANDIDATE | High confidence |
| ecology.feedingBehaviour | Supported | SAFE_CANDIDATE | High confidence |
| ecology.ecologicalRole | Partially supported | REVIEW_REQUIRED | General descriptions only |
| ecology.adaptations | Partially supported | REVIEW_REQUIRED | General descriptions only |
| ecology.predators | Not established | NOT_ESTABLISHED | General only |
| ecology.prey | Not established | NOT_ESTABLISHED | General only |
| ecology.symbioticRelationships | Not established | NOT_ESTABLISHED | No sources |
| ecology.ecosystemServices | Not established | NOT_ESTABLISHED | No sources |
| importance.ecologicalImportance | Not established | NOT_ESTABLISHED | General only |
| importance.economicImportance | Not established | NOT_ESTABLISHED | General only |
| importance.agriculturalImportance | Not established | NOT_ESTABLISHED | — |
| importance.fisheriesImportance | Supported | SAFE_CANDIDATE | High confidence |
| importance.medicalImportance | Not established | NOT_ESTABLISHED | — |
| importance.scientificImportance | Not established | NOT_ESTABLISHED | — |
| importance.culturalImportance | Not established | NOT_ESTABLISHED | — |
| importance.educationalImportance | Not established | NOT_ESTABLISHED | — |
| importance.fisheriesImportance | Supported | SAFE_CANDIDATE | High confidence |
| importance.aquacultureImportance | Supported | SAFE_CANDIDATE | High confidence |
| importance.commercialImportance | Not established | NOT_ESTABLISHED | General only |
| conservation.conservationStatus | Supported | SAFE_CANDIDATE | High confidence (IUCN 2010) |
| conservation.assessmentDate | Supported | SAFE_CANDIDATE | 20 March 2010 |
| conservation.assessor | Supported | SAFE_CANDIDATE | Dahanukar, N. |
| conservation.iucnCriteria | Not established | NOT_ESTABLISHED | Not in research pack |
| conservation.populationTrend | Supported | SAFE_CANDIDATE | "stable" from IUCN |
| conservation.populationSize | Not established | NOT_ESTABLISHED | No source |
| conservation.majorThreats | Supported | SAFE_CANDIDATE | From IUCN |
| conservation.conservationMeasures | Not established | NOT_ESTABLISHED | None specific |
| conservation.legalProtection | Not established | NOT_ESTABLISHED | No specific data |
| conservation.iucnCriteria | Not established | NOT_ESTABLISHED | Not in research pack |
| conservation.redListUrl | Not established | NOT_ESTABLISHED | No specific data |
| conservation.citesAppendix | Not established | NOT_ESTABLISHED | "Not Evaluated" per FishBase/IUCN |
| references | Not established | NOT_ESTABLISHED | Need structured reference objects |
| images | Not established | NOT_ESTABLISHED | No approved images |
| sources | Not established | NOT_ESTABLISHED | No source tracking |
| verification.status | Supported | SAFE_CANDIDATE | "unverified" |
| needsReview | Supported | SAFE_CANDIDATE | true |
| notes | Supported | SAFE_CANDIDATE | From research pack |
| legacyCard | Not applicable | NOT_ESTABLISHED | Not a legacy record |

## 13. CROSS-SPECIES SUMMARY

See `review-summary.md` for cross-species analysis.