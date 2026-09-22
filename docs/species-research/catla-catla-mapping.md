# Catla catla — Structured Data Mapping

## 1. IDENTITY MAPPING

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| commonName | Supported | Catla | FishBase, FAO, IUCN |
| bengaliName | Supported | কাতলা | FishBase, FAO, names.html |
| scientificName | Supported | Catla catla | FishBase, NCBI, ITIS, IUCN |
| author/year | Conflicting | Hamilton, 1822 (basionym Cyprinus catla) | FishBase, ITIS, NCBI agree on Hamilton 1822; original as Cyprinus catla |
| synonyms | Supported | Cyprinus catla Hamilton, 1822; Catla catla (Hamilton, 1822); Leuciscus catla (Hamilton, 1822); Cyprinus abramioides Sykes, 1839; Catla buchanani Valenciennes, 1844; Gibelion catla (Hamilton 1822) | Wikipedia (with IUCN/FishBase sources) |

## 2. TAXONOMY MAPPING

| Rank | Project Taxonomy ID | Accepted Name | Source | Conflict Status |
|------|---------------------|---------------|--------|-----------------|
| Kingdom | animalia | Animalia | NCBI, ITIS, FishBase | Agreed |
| Phylum | chordata | Chordata | NCBI, ITIS, FishBase | Agreed |
| Class | actinopterygii | Actinopterygii | FishBase, NCBI | Agreed |
| Order | cypriniformes | Cypriniformes | FishBase, NCBI, ITIS | Agreed |
| Family | cyprinidae | Cyprinidae | FishBase, NCBI, ITIS | Agreed |
| Genus | catla | Catla / Labeo / Gibelion | CONFLICT | CONFLICT |
| Species | catla | catla | FishBase, NCBI, ITIS, IUCN | Agreed |

**Project Taxonomy Path**: animalia → chordata → actinopterygii → cypriniformes → cyprinidae → catla → catla
**Subspecies**: None (null)

**GENUS CONFLICT — EXPLICITLY DOCUMENTED**:
| Authority | Genus Placement | Notes |
|-----------|----------------|-------|
| FishBase | Labeo | Moved to Labeo |
| Catalog of Fishes | Gibelion | Senior synonym |
| ITIS | Catla | Retains Catla as valid |
| NCBI | Catla | Catla catla |
| IUCN | Gibelion | Uses Gibelion catla (Tenzin, 2010) |

**DO NOT choose a final genus. All conflicting authoritative placements documented above.**

## 3. IDENTIFICATION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| keyFeatures | Supported | [very large head, upturned mouth, protruding lower jaw, no barbels, large cycloid scales] | FishBase, FAO |
| diagnosticCharacteristics | Not established | — | Need taxonomic key |
| distinguishingFeatures | Not established | — | Need comparative study |
| similarSpecies | Not established | — | Need verified Species IDs |
| notes | Supported | Verbatim from research pack | Research pack |

## 4. BIOLOGY

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| physicalDescription | Supported | Body deep, laterally compressed; very large head; upturned mouth with protruding lower jaw; upper lip absent, lower lip very thick; no barbels; eyes large, visible from underside of head | FishBase, FAO, Wikipedia |
| size | Supported | {min: 50, max: 182, unit: "cm"} | FishBase, Wikipedia |
| weight | Supported | {min: 1, max: 38.6, unit: "kg"} | FishBase, Wikipedia |
| lifespan | Not established | — | No authoritative source |
| anatomy | Not established | — | No sources |
| morphology | Not established | — | No sources |
| physiology | Not established | — | No sources |
| behaviour | Partially supported | Active during day; forms schools; surface and midwater feeder; migrates upstream for spawning | FishBase, FAO, Wikipedia |
| communication | Not established | — | No sources |
| reproduction | Supported | Sexual maturity 2 years; spawns monsoon (Jun-Aug); 150,000-1,000,000 eggs/kg; no parental care; potamodromous lateral migration to floodplains | FishBase, FAO, IUCN, Wikipedia |
| lifeCycle | Not established | — | No sources |

## 5. HABITAT & DISTRIBUTION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| habitat | Supported | ["rivers", "lakes", "reservoirs", "floodplains"] | FishBase, IUCN, FAO |
| environment | Supported | Freshwater; temperature 18-38°C (optimal 25-32°C); pH 6.5-8.5; DO >4 mg/L | FishBase |
| geographicDistribution.countries | Supported | ["PK", "IN", "BD", "NP", "MM"] | FishBase, IUCN, FAO |
| geographicDistribution.regions | Not established | — | Need specific regions |
| geographicDistribution.elevationRange | Not established | — | No data |
| geographicDistribution.depthRange | Not established | FishBase says 0-10m but needs verification | FishBase |
| geographicDistribution.biome | Not established | — | No specific source |
| geographicDistribution.rangeMapUrl | Not established | — | No source |

## 6. DIET & FEEDING

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| diet | Supported | Planktivore - zooplankton (adults), zooplankton + phytoplankton (juveniles) | FishBase, FAO, Wikipedia |
| feedingType | Supported | Planktivore | FishBase, FAO |
| feedingBehaviour | Supported | Surface and midwater filter feeding using large gill rakers | FishBase, FAO |

## 6. ECOLOGY

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| ecologicalRole | Partially supported | Surface plankton feeder; nutrient cycling; prey for larger piscivorous fish | FishBase, FAO |
| adaptations | Partially supported | Large gill rakers for filter feeding; surface feeding adaptation; tolerates wide temperature range | FishBase, Wikipedia |
| predators | Not established | General only | FishBase |
| prey | Not established | General only | FishBase |
| adaptations | Partially supported | Large gill rakers for filter feeding; surface feeding adaptation; tolerates wide temperature range | FishBase, Wikipedia |
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
| aquacultureImportance | Supported | "Second most important carp in South Asia; high market value for large specimens" | FishBase, FAO |
| fisheriesImportance | Supported | "high" | FishBase, FAO |
| aquacultureImportance | Supported | "Second most important carp in South Asia; high market value for large specimens" | FishBase, FAO |

## 9. CONSERVATION

| Field | Status | Value | Source |
|-------|--------|-------|--------|
| conservationStatus | Supported | "LC" | IUCN Red List (2010) |
| assessmentDate | Supported | 8 October 2009 | FishBase / IUCN |
| assessor | Supported | Tenzin, K. | IUCN Red List |
| iucnCriteria | Not established | Not in research pack | Not in research pack |
| populationTrend | Supported | "stable" | IUCN |
| populationSize | Not established | — | No source |
| majorThreats | Supported | ["Overfishing", "habitat degradation", "pollution", "river damming"] | IUCN, FishBase |
| conservationMeasures | Not established | None specific | — |
| legalProtection | Not established | — | No specific data |
| iucnCriteria | Not established | Not in research pack | Not in research pack |
| redListUrl | Not established | — | No specific data |
| citesAppendix | Not established | "Not Evaluated" per FishBase/IUCN | FishBase, IUCN |

## 10. REFERENCES

1. **IUCN Red List**: Tenzin, K. (2010). *Gibelion catla*. The IUCN Red List of Threatened Species 2010: e.T166425A6206451. https://dx.doi.org/10.2305/IUCN.UK.2010-4.RLTS.T166425A6206451.en

2. **FishBase**: Froese, R. and Pauly, D. (eds.) (2025). *Labeo catla* (Hamilton, 1822). FishBase. https://www.fishbase.se/summary/Labeo-catla.html

3. **FAO**: Menon, A.G.K., 1999. Check list - fresh water fishes of India. Rec. Zool. Surv. India, Misc. Publ., Occas. Pap. No. 175, 366 p.

4. **ITIS**: ITIS Report for TSN 163679 - *Labeo catla* (Hamilton, 1822). https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=163679

5. **NCBI Taxonomy**: Taxonomy ID 72446 - *Catla catla* (Hamilton, 1822). https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=72446

6. **Catalog of Fishes**: Eschmeyer, W.N. (ed.). Catalog of Fishes. California Academy of Sciences.

7. **GBIF**: *Catla catla* (Hamilton, 1822). https://www.gbif.org/species/2334126

8. **WoRMS**: *Catla catla* (Hamilton, 1822). World Register of Marine Species.

9. **FAO Cultured Aquatic Species**: *Catla catla* fact sheet.

10. **Menon (1999)**: Check list - fresh water fishes of India. Rec. Zool. Surv. India, Occas. Pap. No. 175, 366 p.

## 11. IMAGE DATA

**No verified image record prepared in this task.**

## 12. FINAL FIELD DECISION

| Species JSON Field | Evidence | Decision | Reason |
|-------------------|----------|----------|--------|
| id | Species record exists | SAFE_CANDIDATE | Already in index.json |
| slug | catla | SAFE_CANDIDATE | High confidence |
| commonName | Catla | SAFE_CANDIDATE | High confidence |
| bengaliName | কাতলা | SAFE_CANDIDATE | High confidence (names.html) |
| scientificName | Catla catla | SAFE_CANDIDATE | High confidence |
| scientificNameAuthor | Not established | NOT_ESTABLISHED | Conflicting sources |
| scientificNameYear | Not established | NOT_ESTABLISHED | Conflicting sources |
| taxonomy.kingdomId | animalia | SAFE_CANDIDATE | All sources agree |
| taxonomy.phylumId | chordata | SAFE_CANDIDATE | All sources agree |
| taxonomy.classId | actinopterygii | SAFE_CANDIDATE | All sources agree |
| taxonomy.orderId | cypriniformes | SAFE_CANDIDATE | All sources agree |
| taxonomy.familyId | cyprinidae | SAFE_CANDIDATE | All sources agree |
| taxonomy.genusId | catla | CONFLICT | Genus conflict: FishBase=Labeo, CoF=Gibelion, ITIS=Catla, IUCN=Gibelion |
| taxonomy.speciesId | catla | SAFE_CANDIDATE | All sources agree |
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
| conservation.assessmentDate | Supported | SAFE_CANDIDATE | 8 October 2009 |
| conservation.assessor | Supported | SAFE_CANDIDATE | Tenzin, K. |
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

## 13. CROSS-SPECIES SUMMARY

See `review-summary.md` for cross-species analysis.