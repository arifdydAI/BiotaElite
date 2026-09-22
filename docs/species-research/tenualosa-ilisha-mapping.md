# Tenualosa ilisha — Structured Data Mapping

## 1. IDENTITY MAPPING

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| commonName | Supported | Hilsa shad | FishBase, FAO, IUCN |
| bengaliName | Supported | ইলিশ | FishBase, FAO, names.html |
| scientificName | Supported | Tenualosa ilisha | FishBase, NCBI, ITIS, GBIF, IUCN |
| author/year | Conflicting | Hamilton, 1822 (basionym Clupanodon ilisha) | FishBase, ITIS, NCBI agree on Hamilton 1822; original as Clupanodon ilisha |
| synonyms | Supported | Clupanodon ilisha Hamilton, 1822; Clupea palasah Cuvier, 1829; Clupea ilisha (Hamilton, 1822); Hilsa ilisha (Hamilton, 1822); Tenualosa illisha (Hamilton, 1822) [misspelling] | IUCN, GBIF, ITIS |

## 2. TAXONOMY MAPPING

| Rank | Project Taxonomy ID | Accepted Name | Source | Conflict Status |
|------|---------------------|---------------|--------|-----------------|
| Kingdom | animalia | Animalia | NCBI, ITIS, FishBase, GBIF | Agreed |
| Phylum | chordata | Chordata | NCBI, ITIS, FishBase | Agreed |
| Class | actinopterygii | Actinopterygii | FishBase, NCBI, ITIS, GBIF | Agreed |
| Order | clupeiformes | Clupeiformes | FishBase, NCBI, ITIS, GBIF | Agreed |
| Family | clupeidae | Clupeidae / Dorosomatidae | CONFLICT | CONFLICT |
| Genus | tenualosa | Tenualosa | FishBase, NCBI, ITIS, GBIF | Agreed |
| Species | ilisha | ilisha | FishBase, NCBI, ITIS, GBIF, IUCN | Agreed |

**Project Taxonomy Path**: animalia → chordata → actinopterygii → clupeiformes → clupeidae → tenualosa → ilisha
**Subspecies**: None (null)

**FAMILY CONFLICT — EXPLICITLY DOCUMENTED**:
| Authority | Family Placement | Notes |
|-----------|------------------|-------|
| FishBase | Clupeidae | More widely accepted |
| GBIF | Clupeidae | Based on Catalog of Life |
| ITIS | Clupeidae | Uses Clupeidae |
| Marine Biodiversity BD | Dorosomatidae | Bangladesh-specific portal |
| GBIF (Catalog of Life) | Clupeidae | Based on CoL |

**DO NOT choose a final family. All conflicting authoritative placements documented above.**

## 3. IDENTIFICATION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| keyFeatures | Supported | [compressed body, keel of scutes, numerous gill rakers (100-250), long anal fin, silvery flanks with black blotches] | FishBase, IUCN, Marine Biodiversity BD |
| diagnosticCharacteristics | Not established | — | Need taxonomic key |
| distinguishingFeatures | Not established | — | Need comparative study |
| similarSpecies | Not established | — | Need verified Species IDs |
| notes | Supported | Verbatim from research pack | Research pack |

## 4. BIOLOGY

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| physicalDescription | Supported | Body compressed, fusiform; dorsal fin 18-21 rays (D1 3+15); anal fin 20-22 rays; pectoral 15 rays; pelvic 8 rays; back blue-green, flanks silvery; black blotches along flanks; belly keel with 30-35 scutes; gill rakers 100-250 | FishBase, IUCN, Marine Biodiversity BD, FAO |
| size | Supported | {min: 20, max: 60, unit: "cm"} | IUCN, FishBase |
| weight | Supported | {min: 0.5, max: 3, unit: "kg"} | FishBase |
| lifespan | Not established | — | No authoritative source |
| anatomy | Not established | — | No sources |
| morphology | Not established | — | No sources |
| physiology | Not established | — | No sources |
| behaviour | Partially supported | Anadromous migration; forms schools; pelagic; adults migrate from sea up river to spawn; juveniles descend to estuary/sea; solitary or loose aggregations at feeding sites | IUCN, FishBase |
| communication | Not established | — | No sources |
| reproduction | Supported | Sexual maturity 1-2 years; spawns year-round peaks monsoon; 1.5-2.5 million eggs/female; anadromous migration up to 1200 km | IUCN, FishBase, FAO |
| lifeCycle | Not established | — | No sources |

## 5. HABITAT & DISTRIBUTION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| habitat | Supported | ["marine coastal", "estuaries", "rivers", "pelagic"] | IUCN, FishBase, FAO, Marine Biodiversity BD |
| environment | Supported | Marine, freshwater, brackish (anadromous); euryhaline; temperature 23-29°C; depth 0-50 m; zone oceanic; substrate pelagic | IUCN, FishBase, Marine Biodiversity BD |
| geographicDistribution.countries | Supported | ["BD", "IN", "IR", "IQ", "KW", "MY", "MM", "OM", "PK", "QA", "SA", "LK", "TH", "AE", "VN"] | IUCN |
| geographicDistribution.regions | Not established | — | Need specific regions |
| geographicDistribution.elevationRange | Not established | Not applicable | — |
| geographicDistribution.depthRange | Not established | FishBase 0-50m, IUCN 0-50m but needs verification | FishBase, IUCN |
| geographicDistribution.biome | Not established | — | No specific source |
| geographicDistribution.rangeMapUrl | Supported | "https://www.iucnredlist.org/species/166442/1132697" | IUCN |

## 6. DIET & FEEDING

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| diet | Supported | Planktivore - phytoplankton, zooplankton, small crustaceans | FishBase, FAO, IUCN |
| feedingType | Supported | Planktivore | FishBase, FAO, IUCN |
| feedingBehaviour | Supported | Pelagic filter feeder using gill rakers | FishBase, FAO |

## 6. ECOLOGY

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| ecologicalRole | Partially supported | Important planktivore in coastal/riverine ecosystems; nutrient cycling between marine/freshwater; prey for larger piscivores, dolphins, birds | IUCN, FishBase, FAO |
| adaptations | Partially supported | Euryhaline; anadromous life cycle; long-distance migration; high fecundity | IUCN, FishBase |
| predators | Partially supported | Larger piscivorous fish, dolphins, birds | IUCN, FishBase |
| prey | Not established | General only | FishBase, FAO |
| adaptations | Partially supported | Euryhaline; anadromous life cycle; long-distance migration; high fecundity | IUCN, FishBase |
| symbioticRelationships | Not established | — | No sources |
| ecosystemServices | Not established | — | No sources |

## 8. IMPORTANCE

| Category | Status | Value | Source |
|----------|--------|-------|--------|
| ecologicalImportance | Not established | General only | IUCN, FishBase |
| economicImportance | Not established | General only | FishBase, FAO |
| agriculturalImportance | Not established | — | — |
| fisheriesImportance | Supported | "high" | FishBase, FAO, IUCN |
| medicalImportance | Not established | — | — |
| scientificImportance | Not established | — | — |
| culturalImportance | Not established | — | — |
| educationalImportance | Not established | — | — |
| aquacultureImportance | Supported | "Experimental culture only; complex life cycle prevents full-cycle aquaculture" | FishBase, IUCN |
| fisheriesImportance | Supported | "high" | FishBase, FAO, IUCN |
| commercialImportance | Supported | "National fish of Bangladesh; most valuable single-species fishery in Bay of Bengal" | FishBase, IUCN, FAO |
| aquacultureImportance | Supported | "Experimental culture only; complex life cycle prevents full-cycle aquaculture" | FishBase, IUCN |

## 9. CONSERVATION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| conservationStatus | Supported | "LC" | IUCN Red List (2014) |
| assessmentDate | Supported | 23 January 2013 | IUCN Red List |
| assessor | Supported | Freyhof, J. | IUCN Red List |
| iucnCriteria | Not established | Not in research pack | Not in research pack |
| populationTrend | CONFLICT | IUCN field: "Unknown"; but documents declines in India, Iraq, Bangladesh | IUCN |
| populationSize | Not established | — | No source |
| majorThreats | Supported | ["Overfishing", "Dams/barrages blocking migration", "Industrial pollution", "Habitat degradation"] | IUCN |
| conservationMeasures | Partially supported | ["No species-specific measures; some marine protected areas"] | IUCN |
| legalProtection | Not established | — | No specific data |
| iucnCriteria | Not established | Not in research pack | Not in research pack |
| redListUrl | Not established | — | No specific data |
| citesAppendix | Not established | "Not Evaluated" per FishBase/IUCN | FishBase, IUCN |

## 10. REFERENCES

1. **IUCN Red List**: Freyhof, J. (2014). *Tenualosa ilisha*. The IUCN Red List of Threatened Species 2014: e.T166442A1132697. https://dx.doi.org/10.2305/IUCN.UK.2014-1.RLTS.T166442A1132697.en

2. **FishBase**: Froese, R. and Pauly, D. (eds.) (2025). *Tenualosa ilisha* (Hamilton, 1822). FishBase. https://www.fishbase.se/summary/Tenualosa-ilisha.html

3. **FAO**: Whitehead, P.J.P., 1985. FAO Species Catalogue Vol. 7: Clupeoid fishes of the world. FAO Fish. Synop. 125(7/1):1-303.

4. **ITIS**: ITIS Report for TSN 551297 - *Tenualosa ilisha* (Hamilton, 1822). https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=551297

5. **NCBI Taxonomy**: Taxonomy ID 373995 - *Tenualosa ilisha* (Hamilton, 1822). https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=373995

6. **GBIF**: *Tenualosa ilisha* (Hamilton, 1822). https://www.gbif.org/species/2413382

7. **WoRMS**: *Tenualosa ilisha* (Hamilton, 1822). https://www.marinespecies.org/aphia.php?p=taxdetails&id=278568

8. **Marine Biodiversity Portal of Bangladesh**: *Tenualosa ilisha*. https://marinebiodiversity.org.bd/species/tenualosa-ilisha/

9. **IUCN PDF**: Freyhof, J. 2014. *Tenualosa ilisha*. The IUCN Red List of Threatened Species 2014: e.T166442A1132697. http://dx.doi.org/10.2305/IUCN.UK.2014-1.RLTS.T166442A1132697.en

10. **Whitehead (1985)**: FAO Species Catalogue Vol. 7: Clupeoid fishes of the world. FAO Fish. Synop. 125(7/1):1-303.

## 11. IMAGE DATA

**No verified image record prepared in this task.**

## 12. FINAL FIELD DECISION

| Species JSON Field | Evidence | Decision | Reason |
|-------------------|----------|----------|--------|
| id | Species record exists | SAFE_CANDIDATE | Already in index.json |
| slug | hilsa-shad | SAFE_CANDIDATE | High confidence |
| commonName | Hilsa shad | SAFE_CANDIDATE | High confidence |
| bengaliName | ইলিশ | SAFE_CANDIDATE | High confidence (names.html) |
| scientificName | Tenualosa ilisha | SAFE_CANDIDATE | High confidence |
| scientificNameAuthor | Not established | NOT_ESTABLISHED | Conflicting sources |
| scientificNameYear | Not established | NOT_ESTABLISHED | Conflicting sources |
| taxonomy.kingdomId | animalia | SAFE_CANDIDATE | All sources agree |
| taxonomy.phylumId | chordata | SAFE_CANDIDATE | All sources agree |
| taxonomy.classId | actinopterygii | SAFE_CANDIDATE | All sources agree |
| taxonomy.orderId | clupeiformes | SAFE_CANDIDATE | All sources agree |
| taxonomy.familyId | clupeidae | CONFLICT | Family conflict: FishBase/GBIF/ITIS=Clupeidae; Marine Biodiversity BD=Dorosomatidae |
| taxonomy.genusId | tenualosa | SAFE_CANDIDATE | All sources agree |
| taxonomy.speciesId | ilisha | SAFE_CANDIDATE | All sources agree |
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
| ecology.geographicDistribution.elevationRange | Not established | NOT_ESTABLISHED | Not applicable |
| ecology.geographicDistribution.depthRange | Not established | NOT_ESTABLISHED | FishBase 0-50m, IUCN 0-50m but needs verification |
| ecology.geographicDistribution.biome | Not established | NOT_ESTABLISHED | No specific source |
| ecology.geographicDistribution.rangeMapUrl | Supported | SAFE_CANDIDATE | IUCN URL |
| ecology.diet | Supported | SAFE_CANDIDATE | High confidence |
| ecology.feedingBehaviour | Supported | SAFE_CANDIDATE | High confidence |
| ecology.ecologicalRole | Partially supported | REVIEW_REQUIRED | General descriptions only |
| ecology.adaptations | Partially supported | REVIEW_REQUIRED | General descriptions only |
| ecology.predators | Partially supported | REVIEW_REQUIRED | General only |
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
| importance.commercialImportance | Supported | SAFE_CANDIDATE | High confidence |
| importance.aquacultureImportance | Supported | SAFE_CANDIDATE | High confidence |
| conservation.conservationStatus | Supported | SAFE_CANDIDATE | High confidence (IUCN 2014) |
| conservation.assessmentDate | Supported | SAFE_CANDIDATE | 23 January 2013 |
| conservation.assessor | Supported | SAFE_CANDIDATE | Freyhof, J. |
| conservation.iucnCriteria | Not established | NOT_ESTABLISHED | Not in research pack |
| conservation.populationTrend | CONFLICT | CONFLICT | IUCN field: "Unknown"; but documents declines in India, Iraq, Bangladesh |
| conservation.populationSize | Not established | NOT_ESTABLISHED | No source |
| conservation.majorThreats | Supported | SAFE_CANDIDATE | From IUCN |
| conservation.conservationMeasures | Partially supported | REVIEW_REQUIRED | "No species-specific measures; some marine protected areas" |
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

## 13. CROSS-SPECIES SUMMARY

See `review-summary.md` for cross-species analysis.