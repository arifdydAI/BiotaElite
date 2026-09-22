# BiotaElite 2.0 — Species Enrichment Guide

This document defines a standard structure for systematic scientific enrichment of Species records in `data/species/index.json`. It is **documentation only** — it does not create records, migrate data, or add scientific facts.

---

## 1. Identity

```json
{
  "id": "sp-genus-species",
  "slug": "common-name-lowercase",
  "commonName": "Common Name",
  "bengaliName": "বাংলা নাম",
  "scientificName": "Genus species"
}
```

- **id**: Stable unique identifier, prefixed `sp-`, lowercase, kebab-case (e.g., `sp-panthera-tigris-tigris`)
- **slug**: Human-readable, URL-safe, unique per record
- **commonName**: Primary English common name
- **bengaliName**: Bengali common name (if available in project sources)
- **scientificName**: Binomial or trinomial scientific name (unchanged, never translated)

---

## 2. Scientific Name

```json
{
  "scientificNameAuthor": "Author surname(s)",
  "scientificNameYear": 1758
}
```

- Author/year only if **verifiably sourced** from project references
- Leave empty (`""` / `null`) rather than guessing
- Never infer from Fish/Marine extension data

---

## 3. Taxonomy

```json
{
  "taxonomy": {
    "kingdomId": "animalia",
    "phylumId": "chordata",
    "classId": "mammalia",
    "orderId": "carnivora",
    "familyId": "felidae",
    "genusId": "panthera",
    "speciesId": "tigris",
    "subspeciesId": "tigris-tigris"
  }
}
```

- **Must reference existing taxonomy IDs** in `data/taxonomy/taxa.json`
- Use existing taxonomy hierarchy (Animalia → 11 phyla → classes → orders → families → genera)
- Do not create new taxonomy nodes during enrichment; flag missing taxa for separate taxonomy work
- `subspeciesId` optional (`null` if not applicable)

---

## 4. Identification

```json
{
  "identification": {
    "keyFeatures": ["feature 1", "feature 2"],
    "diagnosticCharacteristics": "Technical description for identification",
    "distinguishingFeatures": "How this species differs from similar ones",
    "similarSpecies": [
      { "speciesId": "sp-xxx", "name": "Common Name", "note": "Distinguishing note" }
    ],
    "notes": ""
  }
}
```

- **keyFeatures**: Bullet-point visual/tactile features
- **diagnosticCharacteristics**: Technical morphological/meristic description
- **distinguishingFeatures**: Comparison with confusable species
- **similarSpecies**: Array of objects with `speciesId` (must resolve), `name`, `note`
- Leave empty arrays/strings if not yet verified

---

## 5. Physical Description

```json
{
  "biology": {
    "physicalDescription": "General external morphology description",
    "size": { "min": 100, "max": 200, "unit": "cm" },
    "weight": { "min": 10, "max": 50, "unit": "kg" },
    "lifespan": { "min": 10, "max": 20, "unit": "years" },
    "anatomy": "",
    "morphology": "",
    "physiology": ""
  }
}
```

- All measurements as `{ "min": n, "max": n, "unit": "cm|m|kg|g|years" }`
- Leave empty objects `{}` if not verified
- `anatomy`, `morphology`, `physiology` optional free-text sections

---

## 6. Biology

```json
{
  "biology": {
    "behaviour": "General activity patterns, sociality, habitat use",
    "communication": "Vocal, chemical, visual signals",
    "reproduction": "Mating system, gestation, litter/clutch size",
    "lifeCycle": "Development stages, maturation, dispersal"
  }
}
```

- Free-text fields; leave empty `""` if not verified
- Use authoritative sources; do not infer from Fish/Marine extensions

---

## 7. Habitat

```json
{
  "ecology": {
    "habitat": ["habitat type 1", "habitat type 2"]
  }
}
```

- Array of habitat type strings from project vocabulary
- Leave empty `[]` if not verified

---

## 8. Geographic Distribution

```json
{
  "ecology": {
    "geographicDistribution": {
      "countries": ["BD", "IN", "NP"],
      "regions": ["Region name"],
      "rangeMapUrl": "",
      "elevationRange": { "min": 0, "max": 2000, "unit": "m" },
      "depthRange": null,
      "biome": ["biome name"]
    }
  }
}
```

- **countries**: ISO 3166-1 alpha-2 codes
- **regions**: Free-text region names
- **elevationRange**: `{ "min": n, "max": n, "unit": "m" }` or `null`
- **depthRange**: For aquatic species; `null` for terrestrial
- **biome**: Array of biome names

---

## 9. Diet & Feeding

```json
{
  "ecology": {
    "diet": "Diet description (carnivore/herbivore/omnivore, prey types)",
    "feedingBehaviour": "Foraging method, activity time, techniques"
  }
}
```

- Leave empty `""` if not verified
- Do not copy from Fish extension `feedingType` without verification

---

## 10. Reproduction & Life Cycle

```json
{
  "biology": {
    "reproduction": "Mating system, gestation, litter size, parental care",
    "lifeCycle": "Developmental stages, age at maturity, longevity"
  }
}
```

- Leave empty `""` if not verified
- Do not infer from Fish extension `reproduction`/`spawning`

---

## 10. Ecology

```json
{
  "ecology": {
    "ecologicalRole": "Keystone/apex/mesopredator/prey/seed disperser etc.",
    "adaptations": ["adaptation 1", "adaptation 2"],
    "predators": ["sp-xxx"],
    "prey": ["sp-xxx"],
    "symbioticRelationships": [],
    "ecosystemServices": []
  }
}
```

- `predators`/`prey`: Arrays of Species IDs that must resolve
- Leave empty arrays `[]` if not verified
- Do not fabricate ecological relationships

---

## 11. Adaptations

```json
{
  "ecology": {
    "adaptations": ["adaptation description 1", "adaptation description 2"]
  }
}
```

- Morphological, physiological, or behavioural adaptations
- Leave empty `[]` if not verified

---

## 12. Importance

```json
{
  "importance": {
    "ecologicalImportance": "",
    "economicImportance": "",
    "agriculturalImportance": "",
    "fisheriesImportance": "",
    "medicalImportance": "",
    "scientificImportance": "",
    "culturalImportance": "",
    "educationalImportance": ""
  }
}
```

- All fields optional; leave empty `""` if not verified
- Do not copy from Fish extension `fisheriesImportance` without verification

---

## 12. Conservation

```json
{
  "conservation": {
    "conservationStatus": "EX|EW|CR|EN|VU|NT|LC|DD|NE",
    "majorThreats": ["threat 1", "threat 2"],
    "populationTrend": "increasing|decreasing|stable|unknown",
    "populationSize": "",
    "conservationMeasures": ["measure 1", "measure 2"],
    "legalProtection": [],
    "iucnCriteria": "",
    "redListUrl": "",
    "citesAppendix": "I|II|III|null"
  }
}
```

- **conservationStatus**: IUCN codes only; leave `""` if not verified — **never guess**
- **populationTrend**: One of the four enumerated values or `""`
- **citesAppendix**: `I`, `II`, `III`, or `null`
- Leave empty if not verifiably sourced

---

## 13. References

```json
{
  "references": [
    {
      "title": "Title of work",
      "authors": ["Author A", "Author B"],
      "year": 2020,
      "journal": "Journal name",
      "volume": "",
      "issue": "",
      "pages": "",
      "url": "https://doi.org/...",
      "doi": "10.1234/...",
      "type": "paper|book|report|website|database|thesis|conference"
    }
  ]
}
```

- **Must be real, verifiable sources** from project references or authoritative databases
- `doi` preferred; `url` acceptable if stable
- `type`: enumerated value
- Empty array `[]` if no verifiable references yet

---

## 14. Images / Media

```json
{
  "images": [
    {
      "id": "img-uuid",
      "url": "https://...",
      "alt": "Description",
      "caption": "Caption",
      "credit": "Photographer / Source",
      "license": "CC-BY|CC-BY-SA|CC-BY-NC|CC0|Proprietary|Unknown",
      "sourceUrl": "https://...",
      "isMain": true,
      "width": 1920,
      "height": 1080,
      "tags": ["tag1"]
    }
  ]
}
```

- **license**: Must be explicit; `Unknown` means do not publish
- Empty array `[]` if no approved images

---

## 14. Sources / Provenance

```json
{
  "sources": [
    {
      "type": "field-observation|museum-specimen|literature|database|expert-opinion|genbank|gbif|iucn|fishbase|obis",
      "sourceId": "source identifier",
      "url": "https://...",
      "accessedAt": "2026-09-06T00:00:00Z",
      "verifiedBy": "contributor-id",
      "verifiedAt": "2026-09-06T00:00:00Z"
    }
  ]
}
```

- Provenance for scientific claims
- Empty array `[]` if not tracked

---

## 15. Verification & Review Metadata

```json
{
  "verification": {
    "status": "verified|needs-review|unverified|disputed",
    "verifiedBy": "contributor-id",
    "verifiedAt": "2026-09-06T00:00:00Z",
    "reviewNotes": "Notes on verification status",
    "confidenceLevel": "high|medium|low"
  },
  "status": "published",
  "needsReview": true,
  "createdAt": "2026-09-06T00:00:00Z",
  "updatedAt": "2026-09-06T00:00:00Z",
  "lastVerifiedAt": null,
  "version": 1
}
```

- **verification.status**: Independent of editorial `status`
- **needsReview**: `true` = requires scientific review before authoritative use
- **verification.status**: `"unverified"` = not scientifically verified; must display warning
- **confidenceLevel**: `high`/`medium`/`low`
- `lastVerifiedAt`: `null` until formally verified
- `version`: Increment on each edit

---

## 16. Legacy Card Fields (for migrated records)

```json
{
  "legacyCard": {
    "source": "6148ef2:assets.html",
    "dataCategory": "mammalia",
    "tag": "Mammalia",
    "statusLabel": "Endangered",
    "statusLabelWarning": "Legacy display label only. NOT a verified IUCN assessment.",
    "cardText": "Verbatim card text from legacy HTML",
    "nameWarning": "Legacy card provided order/family only; no species epithet given."
  }
}
```

- Preserves original legacy presentation card data
- `statusLabelWarning` makes clear legacy conservation labels are **not** verified
- Do not promote legacy fields to authoritative data

---

## 17. Notes Field (all sections)

```json
"notes": "Record created to resolve Fish extension relationship. No biology, ecology, conservation, or references were fabricated. Full scientific review required."
```

- Required on all records
- Documents provenance and review status
- Must not contain fabricated scientific claims

---

## Verification Rules (Summary)

| Rule | Requirement |
|------|-------------|
| **needsReview=true** | Record requires scientific review before authoritative use |
| **verification.status="unverified"** | Must display warning; never present as verified fact |
| **IUCN status** | Must not be inferred/guessed; leave `""` if unverified |
| **Scientific author/year** | Must not be guessed; leave empty if unknown |
| **Taxonomy IDs** | Must reference existing `data/taxonomy/taxa.json` IDs |
| **References** | Must be real, verifiable sources; no invented citations |
| **Images** | Must have source/creator/license before publication |
| **Legacy content** | Preserved as review material; not auto-verified |
| **Missing data** | Leave empty (`""`, `[]`, `{}`) rather than inventing |

---

## Legacy Migration Principle

```
Legacy Content
    ↓
Extract (preserve verbatim source text)
    ↓
Review (flag for scientific verification)
    ↓
Verify (against authoritative sources)
    ↓
Structure (map to Species schema fields)
    ↓
Publish (with needsReview=true until verified)
```

**Never**: blindly delete, blindly convert to authoritative data, silently treat as verified

---

## Single Source of Truth

| Data | Source |
|------|--------|
| Species identity & scientific info | `data/species/index.json` |
| Scientific Names | Derived view from Species + Taxonomy |
| Fish data | `data/fish/index.json` (extension via `speciesId`) |
| Marine Life data | `data/marine-life/index.json` (extension via `speciesId`) |
| Bangladesh data | `data/bangladesh/species.json` (extension via `speciesId`) |
| Taxonomy | `data/taxonomy/taxa.json` |

**No duplicate scientific-name databases. No duplicate Species records for extensions.**

---

## Current Implementation Status (Audit)

| Section | Implemented in JSON | Notes |
|---------|---------------------|-------|
| Identity | ✅ | `id`, `slug`, `commonName`, `bengaliName`, `scientificName` |
| Scientific Name (author/year) | ✅ | Fields exist, mostly empty |
| Taxonomy | ✅ | 7-level hierarchy used |
| Identification | ✅ | `keyFeatures`, `diagnosticCharacteristics`, `distinguishingFeatures`, `similarSpecies` |
| Physical Description | ✅ | `physicalDescription`, `size`, `weight`, `lifespan` |
| Biology | ✅ | `behaviour`, `communication`, `reproduction`, `lifeCycle` |
| Habitat | ✅ | Array of strings |
| Geographic Distribution | ✅ | Countries, regions, elevation, biome |
| Diet & Feeding | ✅ | `diet`, `feedingBehaviour` |
| Reproduction & Life Cycle | ✅ | In `biology` |
| Ecology | ✅ | `ecologicalRole`, `adaptations`, `predators`, `prey` |
| Adaptations | ✅ | Array |
| Importance | ✅ | 8 sub-fields |
| Conservation | ✅ | Status, threats, trend, measures |
| References | ✅ | Embedded objects with DOI/URL |
| Images | ✅ | Array (empty in current data) |
| Sources | ✅ | Array (empty in current data) |
| Verification | ✅ | `verification` object + `needsReview` + `version` |
| Legacy | ✅ | `legacyCard` for migrated records |

---

## Validation

Run after any structural changes:

```bash
node validate-data.js
```

Expected: 13/13 parse, IDs unique, required fields present, taxonomy 0 errors/0 warnings.

---

*This guide is a living document. Update as the Species schema evolves.*