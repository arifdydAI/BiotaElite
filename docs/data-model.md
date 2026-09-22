# BiotaElite 2.0 — Data Model Documentation

## Core Principle

**Species is the single source of truth.**

All biological, taxonomic, and scientific information about an organism lives in one authoritative Species record. Other sections reference this record rather than duplicating data.

- **Fish** records reference `speciesId` + add fish-specific fields only
- **Marine Life** records reference `speciesId` + add marine-specific fields only
- **Bangladesh Biodiversity** records reference `speciesId` + add regional fields only
- **Scientific Names** are a generated view from Species + Taxonomy — NOT a duplicate database

---

## 1. Species (Authoritative Record)

```json
{
  "id": "uuid-v4",
  "slug": "url-safe-string",
  "commonName": "string",
  "bengaliName": "string (optional)",
  "scientificName": "string",
  "scientificNameAuthor": "string (optional)",
  "scientificNameYear": "number (optional)",
  "description": "string (markdown, optional)",
  "taxonomy": {
    "kingdomId": "taxon-id",
    "phylumId": "taxon-id",
    "classId": "taxon-id",
    "orderId": "taxon-id",
    "familyId": "taxon-id",
    "genusId": "taxon-id",
    "speciesId": "taxon-id",
    "subspeciesId": "taxon-id or null"
  },
  "identification": {
    "keyFeatures": ["string"],
    "diagnosticCharacteristics": "string",
    "distinguishingFeatures": "string",
    "similarSpecies": [
      { "speciesId": "uuid", "name": "string", "note": "string" }
    ],
    "notes": "string"
  },
  "morphology": {
    "physicalDescription": "string",
    "size": { "min": "number", "max": "number", "unit": "cm|m|kg" },
    "weight": { "min": "number", "max": "number", "unit": "g|kg" },
    "lifespan": { "min": "number", "max": "number", "unit": "years" },
    "anatomy": "string",
    "externalMorphology": "string",
    "internalAnatomy": "string",
    "physiologicalAdaptations": "string"
  },
  "behaviour": {
    "generalBehaviour": "string",
    "communication": "string",
    "reproduction": "string",
    "lifeCycle": "string",
    "socialStructure": "string",
    "dailyActivityPattern": "diurnal|nocturnal|crepuscular|cathemeral",
    "seasonalBehaviour": "string",
    "migrationPattern": "string"
  },
  "ecology": {
    "habitat": ["string"],
    "geographicDistribution": {
      "countries": ["ISO-3166-1"],
      "regions": ["string"],
      "rangeMapUrl": "string",
      "elevationRange": { "min": "number", "max": "number", "unit": "m" },
      "depthRange": { "min": "number", "max": "number", "unit": "m" },
      "biome": ["string"]
    },
    "diet": "string",
    "feedingBehaviour": "string",
    "ecologicalRole": "string",
    "adaptations": ["string"],
    "predators": ["speciesId or name"],
    "prey": ["speciesId or name"],
    "symbioticRelationships": ["string"],
    "ecosystemServices": ["string"]
  },
  "importance": {
    "ecologicalImportance": "string",
    "economicImportance": "string",
    "agriculturalImportance": "string",
    "fisheriesImportance": "string",
    "medicalImportance": "string",
    "scientificImportance": "string",
    "culturalImportance": "string",
    "educationalImportance": "string"
  },
  "conservation": {
    "conservationStatus": "EX|EW|CR|EN|VU|NT|LC|DD|NE",
    "majorThreats": ["string"],
    "populationTrend": "increasing|decreasing|stable|unknown",
    "populationSize": "string (optional)",
    "conservationMeasures": ["string"],
    "legalProtection": ["string"],
    "iucnCriteria": "string (optional)",
    "redListUrl": "string (optional)",
    "citesAppendix": "I|II|III|null"
  },
  "references": [
    {
      "title": "string",
      "authors": ["string"],
      "year": "number",
      "journal": "string",
      "volume": "string",
      "issue": "string",
      "pages": "string",
      "url": "string",
      "doi": "string",
      "type": "paper|book|report|website|database|thesis|conference"
    }
  ],
  "images": [
    {
      "id": "uuid",
      "url": "string",
      "alt": "string",
      "caption": "string",
      "credit": "string",
      "license": "CC0|CC-BY|CC-BY-SA|CC-BY-NC|CC-BY-NC-SA|Proprietary|Unknown",
      "sourceUrl": "string",
      "isMain": "boolean",
      "width": "number",
      "height": "number",
      "tags": ["string"]
    }
  ],
  "sources": [
    {
      "type": "field-observation|museum-specimen|literature|database|expert-opinion|genbank|gbif|iucn|fishbase|obis",
      "sourceId": "string",
      "url": "string",
      "accessedAt": "ISO-8601",
      "verifiedBy": "string",
      "verifiedAt": "ISO-8601"
    }
  ],
  "verification": {
    "status": "verified|needs-review|unverified|disputed",
    "verifiedBy": "string",
    "verifiedAt": "ISO-8601 or null",
    "reviewNotes": "string",
    "confidenceLevel": "high|medium|low"
  },
  "status": "draft|published|archived",
  "needsReview": "boolean",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "publishedAt": "ISO-8601 or null",
  "lastVerifiedAt": "ISO-8601 or null",
  "version": "integer"
}
```

### Required Fields
- `id`, `slug`, `commonName`, `scientificName`
- `taxonomy` (all ranks down to species)
- `status`, `needsReview`, `createdAt`, `updatedAt`, `version`

### Optional Fields
All other fields are optional. Use empty objects/arrays rather than inventing content.

---

## 2. Taxonomy (Reusable Hierarchical Records)

```json
{
  "id": "taxon-slug",
  "rank": "kingdom|phylum|class|order|family|genus|species|subspecies|subfamily|tribe|superfamily|infraclass|superclass|subphylum|subkingdom|variety|form|other",
  "name": "string",
  "bengaliName": "string (optional)",
  "parentId": "taxon-id (null for kingdom)",
  "description": "string (markdown, optional)",
  "keyCharacteristics": ["string"],
  "diagnosticFeatures": ["string"],
  "representativeSpeciesIds": ["species-uuid"],
  "synonyms": ["string"],
  "typeSpeciesId": "species-uuid (for genus rank only, optional)",
  "fossilRange": "string (optional)",
  "distribution": "string (optional)",
  "references": ["reference-object"],
  "needsReview": "boolean",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "version": "integer"
}
```

### Flexible Rank Support
The `rank` field accepts standard Linnaean ranks plus any intermediate ranks (subphylum, superclass, infraclass, tribe, subtribe, variety, form, etc.). The hierarchy is defined by `parentId` references, not by a fixed rank list.

### Usage
- Species records reference taxon IDs via `taxonomy` object
- Taxonomy tree built at runtime by traversing `parentId` links
- `representativeSpeciesIds` enables "example species" display per taxon
- `typeSpeciesId` for genus-level type species designation

---

## 3. Fish Extension (References Species)

```json
{
  "speciesId": "species-uuid",
  "environment": ["freshwater", "marine", "brackish", "anadromous", "catadromous"],
  "aquaticHabitat": "pelagic|demersal|reef|deep-sea|estuary|river|lake|wetland",
  "depthRange": { "min": "number", "max": "number", "unit": "m" },
  "bodyShape": "fusiform|elongated|compressed|depressed|anguilliform|globiform|other",
  "finCharacteristics": {
    "dorsalFins": "number",
    "analFin": "boolean",
    "pectoralFins": "present|absent|modified",
    "pelvicFins": "present|absent|thoracic|abdominal",
    "caudalFin": "rounded|truncate|emarginate|forked|lunate|heterocercal|other",
    "adiposeFin": "boolean",
    "finFormula": "string (optional, e.g., D XI-XII, A III, P 14-15)"
  },
  "scaleType": "placoid|ganoid|cycloid|ctenoid|cosmoid|absent|other",
  "lateralLine": "boolean",
  "swimBladder": "present|absent|reduced|physostomous|physoclistous",
  "feedingType": "herbivore|carnivore|omnivore|detritivore|planktivore|parasitic",
  "reproduction": "oviparous|viviparous|ovoviviparous",
  "spawning": {
    "season": "string",
    "temperatureRange": { "min": "number", "max": "number", "unit": "C" },
    "substrate": "string",
    "fecundity": "string",
    "parentalCare": "none|male|female|both|nest-guarding|mouthbrooding",
    "spawningType": "broadcast|nest|bubble-nest|mouth|pouch|other"
  },
  "migration": {
    "type": "anadromous|catadromous|amphidromous|potamodromous|oceanodromous|non-migratory",
    "pattern": "string",
    "distance": "string",
    "timing": "string"
  },
  "fisheriesImportance": "high|medium|low|none",
  "commercialImportance": "string",
  "aquacultureImportance": "string",
  "aquacultureMethods": ["string"],
  "stockStatus": "overexploited|fully-exploited|underexploited|recovering|unknown",
  "catchTrend": "increasing|decreasing|stable|fluctuating",
  "fishingMethods": ["string"],
  "bycatchRisk": "high|medium|low|unknown",
  "needsReview": "boolean",
  "relationshipStatus": "verified|needs-review|unresolved",
  "publicVisibility": "public|withheld",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "version": "integer"
}
```

### Critical: Separation of Concerns
- **Species record**: All shared biology, taxonomy, ecology, conservation, identification
- **Fish extension**: ONLY ichthyology-specific data (fin formula, spawning, swim bladder, scale type, fisheries metrics)
- **NO duplication** of taxonomy, distribution, conservation status, morphology

---

## 4. Marine Life Extension (References Species)

```json
{
  "speciesId": "species-uuid",
  "marineCategory": "marine-mammal|marine-reptile|marine-bird|cnidarian|mollusc|echinoderm|crustacean|marine-invertebrate-other|deep-sea-organism",
  "depthRange": { "min": "number", "max": "number", "unit": "m" },
  "zone": "intertidal|neritic|oceanic|abyssal|hadal",
  "substrate": "rocky|sandy|muddy|coral|seagrass|pelagic|other",
  "salinityTolerance": "stenohaline|euryhaline",
  "marineSpecificData": {
    "divingDepth": { "min": "number", "max": "number", "unit": "m" },
    "divingDuration": { "min": "number", "max": "number", "unit": "min" },
    "socialStructure": "string",
    "nestingBehavior": "string",
    "temperatureDependentSex": "boolean",
    "colonyForm": "solitary|colonial",
    "polypMedusaCycle": "boolean",
    "symbiosis": "zooxanthellate|azooxanthellate",
    "shellType": "bivalve|gastropod|cephalopod|polyplacophoran|scaphopod|absent",
    "shellComposition": "string",
    "waterVascularSystem": "string",
    "regenerationAbility": "string",
    "carapaceType": "string",
    "larvalStages": ["string"],
    "bioluminescence": "boolean",
    "venomous": "boolean"
  },
  "commercialImportance": "string",
  "aquaculturePotential": "string",
  "tradeRegulations": ["CITES-appendix"],
  "iucnStatus": "EX|EW|CR|EN|VU|NT|LC|DD|NE",
  "regionalStatus": { "BD": "EN", "IN": "VU" },
  "majorThreats": ["string"],
  "conservationActions": ["string"],
  "needsReview": "boolean",
  "relationshipStatus": "verified|needs-review|unresolved",
  "publicVisibility": "public|withheld",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "version": "integer"
}
```

### Critical: Independence from Fish Extension
- A species can have **both** Fish extension AND Marine Life extension (e.g., Whale Shark)
- They are **independent** extension layers referencing the same Species
- Marine Life extension is for **non-fish marine organisms** primarily, but can apply to fish for marine-specific data
- NO shared fields with Fish extension except `speciesId`

---

## 5. Bangladesh Regional Record (References Species)

```json
{
  "speciesId": "species-uuid",
  "presenceStatus": "native|introduced|vagrant|extirpated|uncertain",
  "regions": ["sundarbans", "coastal", "freshwater", "hill-forests", "haor-wetlands", "barind", "chittagong-hill-tracts", "urban"],
  "habitats": ["mangrove", "river", "wetland", "forest", "grassland", "agricultural", "marine", "estuary"],
  "localNames": [
    { "language": "bn", "name": "রয়েল বেঙ্গল টাইগার" },
    { "language": "bn", "name": "বাঘ" }
  ],
  "regionalConservationStatus": "EX|EW|CR|EN|VU|NT|LC|DD|NE|Not Assessed",
  "regionalThreats": ["string"],
  "regionalPopulation": "string",
  "notes": "string",
  "references": ["reference-object"],
  "needsReview": "boolean",
  "lastUpdated": "ISO-8601",
  "version": "integer"
}
```

### Critical: Conservation Status Separation
- **Global**: `Species.conservation.conservationStatus` (IUCN global)
- **Regional**: `Bangladesh.regionalConservationStatus` (IUCN Bangladesh regional assessment)
- **Never overwrite** global with regional or vice versa
- They can differ (e.g., global EN, regional CR due to smaller population)

---

## 6. Research Project

```json
{
  "id": "uuid",
  "slug": "string",
  "title": "string",
  "bengaliTitle": "string (optional)",
  "category": "conservation|field-study|lab-research|genomics|ecology|taxonomy|behaviour|other",
  "description": "string (markdown)",
  "objectives": ["string"],
  "methodology": "string",
  "location": {
    "country": "ISO-3166-1",
    "region": "string",
    "coordinates": { "lat": "number", "lng": "number" },
    "protectedArea": "string"
  },
  "speciesIds": ["species-uuid"],
  "taxonIds": ["taxon-id"],
  "researcherIds": ["author-uuid"],
  "institutionIds": ["institution-uuid"],
  "startDate": "ISO-8601",
  "endDate": "ISO-8601 (optional)",
  "status": "planned|ongoing|completed|paused|cancelled",
  "findings": "string (markdown)",
  "publicationIds": ["publication-uuid"],
  "references": ["reference-object"],
  "images": ["image-object"],
  "fundingSources": ["string"],
  "permits": ["string"],
  "tags": ["string"],
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "version": "integer"
}
```

---

## 7. Thesis

```json
{
  "id": "uuid",
  "slug": "string",
  "title": "string",
  "bengaliTitle": "string (optional)",
  "author": {
    "id": "author-uuid",
    "name": "string",
    "orcid": "string",
    "affiliation": "string"
  },
  "degree": "BSc|MSc|MPhil|PhD|DSc|Other",
  "department": "string",
  "institution": {
    "id": "institution-uuid",
    "name": "string",
    "country": "ISO-3166-1",
    "rorId": "string"
  },
  "year": "number",
  "supervisorIds": ["author-uuid"],
  "coSupervisorIds": ["author-uuid"],
  "researchArea": "string",
  "keywords": ["string"],
  "abstract": "string (markdown)",
  "pages": "number",
  "documentUrl": "string",
  "doi": "string",
  "citation": "string",
  "references": ["reference-object"],
  "subjectSpeciesIds": ["species-uuid"],
  "subjectTaxonIds": ["taxon-id"],
  "status": "published|unpublished|embargoed",
  "language": "en|bn|en+bn",
  "tags": ["string"],
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "version": "integer"
}
```

---

## 8. Publication

```json
{
  "id": "uuid",
  "slug": "string",
  "type": "journal-article|book|report|thesis|conference-proceeding|preprint",
  "title": "string",
  "bengaliTitle": "string (optional)",
  "authors": [
    {
      "id": "author-uuid",
      "name": "string",
      "orcid": "string",
      "affiliation": "string",
      "order": "number"
    }
  ],
  "year": "number",
  "journal": "string",
  "volume": "string",
  "issue": "string",
  "pages": "string",
  "doi": "string",
  "url": "string",
  "abstract": "string",
  "keywords": ["string"],
  "subjectSpeciesIds": ["species-uuid"],
  "subjectTaxonIds": ["taxon-id"],
  "language": "en|bn|en+bn",
  "openAccess": "boolean",
  "tags": ["string"],
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "version": "integer"
}
```

---

## 9. News

```json
{
  "id": "uuid",
  "slug": "string",
  "title": "string",
  "bengaliTitle": "string (optional)",
  "excerpt": "string (max 300 chars)",
  "content": "string (markdown)",
  "coverImage": "image-object",
  "authorIds": ["author-uuid"],
  "category": "discovery|conservation|event|announcement|policy|funding",
  "tags": ["string"],
  "publishDate": "ISO-8601",
  "updatedAt": "ISO-8601",
  "status": "draft|published|archived",
  "featured": "boolean",
  "references": ["reference-object"],
  "relatedSpeciesIds": ["species-uuid"],
  "relatedProjectIds": ["project-uuid"],
  "version": "integer"
}
```

---

## 10. Blog / Educational Article

```json
{
  "id": "uuid",
  "slug": "string",
  "title": "string",
  "bengaliTitle": "string (optional)",
  "excerpt": "string (max 300 chars)",
  "content": "string (markdown)",
  "coverImage": "image-object",
  "authorIds": ["author-uuid"],
  "category": "behaviour|field-notes|education|culture-folklore|identification-guide|conservation-story",
  "tags": ["string"],
  "publishDate": "ISO-8601",
  "updatedAt": "ISO-8601",
  "status": "draft|published|archived",
  "featured": "boolean",
  "references": ["reference-object"],
  "relatedSpeciesIds": ["species-uuid"],
  "relatedProjectIds": ["project-uuid"],
  "version": "integer"
}
```

---

## 11. Image

```json
{
  "id": "uuid",
  "speciesId": "species-uuid (optional)",
  "contentId": "string (optional, for news/blog/project/thesis)",
  "url": "string",
  "alt": "string",
  "caption": "string",
  "credit": "string",
  "license": "CC0|CC-BY|CC-BY-SA|CC-BY-NC|CC-BY-NC-SA|Proprietary|Unknown",
  "sourceUrl": "string",
  "isMain": "boolean",
  "width": "number",
  "height": "number",
  "tags": ["string"],
  "uploadedAt": "ISO-8601",
  "version": "integer"
}
```

---

## 12. Author / Contributor

```json
{
  "id": "uuid",
  "name": "string",
  "orcid": "string",
  "affiliation": "string",
  "email": "string",
  "bio": "string",
  "avatarUrl": "string",
  "role": "super-admin|editor|contributor|reviewer|researcher",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

---

## 13. Category

```json
{
  "id": "slug",
  "type": "news|blog|project|thesis|species|fish|marine-life",
  "name": "string",
  "bengaliName": "string (optional)",
  "description": "string",
  "color": "hex-color",
  "icon": "emoji-or-icon-class",
  "order": "number",
  "createdAt": "ISO-8601"
}
```

---

## 14. Institution

```json
{
  "id": "uuid",
  "name": "string",
  "bengaliName": "string (optional)",
  "country": "ISO-3166-1",
  "rorId": "string",
  "gridId": "string",
  "type": "university|research-institute|ngo|government|museum|zoo|aquarium|other",
  "website": "string",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

---

## Reference Integrity Rules

| From | References | Validation |
|------|------------|------------|
| Species.taxonomy.* | Taxonomy.id | All taxon IDs must exist |
| Species.identification.similarSpecies[].speciesId | Species.id | Must exist |
| Species.ecology.predators/prey | Species.id or name | Should resolve to Species |
| Fish.speciesId | Species.id | Must exist, Species.class must be fish class |
| MarineLife.speciesId | Species.id | Must exist, Species.class must NOT be fish class (if marine-only) |
| Bangladesh.speciesId | Species.id | Must exist |
| Project.speciesIds | Species.id | Must exist |
| Project.taxonIds | Taxonomy.id | Must exist |
| Project.researcherIds | Author.id | Must exist |
| Project.institutionIds | Institution.id | Must exist |
| Thesis.subjectSpeciesIds | Species.id | Must exist |
| Thesis.subjectTaxonIds | Taxonomy.id | Must exist |
| Thesis.author.id | Author.id | Must exist |
| Thesis.supervisorIds | Author.id | Must exist |
| Thesis.institution.id | Institution.id | Must exist |
| Publication.authors[].id | Author.id | Must exist |
| Publication.subjectSpeciesIds | Species.id | Must exist |
| Publication.subjectTaxonIds | Taxonomy.id | Must exist |
| News/Blog.relatedSpeciesIds | Species.id | Must exist |
| News/Blog.relatedProjectIds | Project.id | Must exist |
| News/Blog.authorIds | Author.id | Must exist |
| Image.speciesId | Species.id | Must exist (optional) |
| Image.contentId | News/Blog/Project/Thesis.id | Must exist (optional) |

---

## Migration Status Flags

Every record includes:
- `status`: `draft` | `published` | `archived`
- `needsReview`: `true` if data needs scientific verification
- `lastVerifiedAt`: `ISO-8601` or `null` — when last verified by expert
- `version`: integer for optimistic locking
- `verification` (Species only): object with status, verifiedBy, verifiedAt, confidenceLevel

**Never invent data.** If unknown, leave empty and set `needsReview: true`.

---

## Implementation Status (Step 3 Complete)

### COMPLETE ✓

| Collection | File | Records | Notes |
|------------|------|---------|-------|
| Species | `data/species/index.json` | 3 | Bengal Tiger, Asian Elephant, Red Fox — full authoritative records with taxonomy, biology, ecology, conservation, references |
| Taxonomy | `data/taxonomy/taxa.json` | 14 | Complete hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species → Subspecies (added `elephas` genus) |
| Fish Extensions | `data/fish/index.json` | 5 | Rohu, Hilsa, Catla, Mrigel, Whale Shark — ichthyology-specific data only, all reference speciesId (authoritative Species records not yet created, documented in notes) |
| Marine Life Extensions | `data/marine-life/index.json` | 2 | Whale Shark, Giant Manta Ray — marine-specific data only, reference speciesId (same species as fish extensions, documented as placeholder) |
| Bangladesh Regional | `data/bangladesh/species.json` | 3 | Regional records for all 3 existing species with presence status, regional threats, local names, separate regional conservation status |
| Research Projects | `data/projects.json` | 6 | Migrated from projects.html — all 6 projects with categories, leads, dates, species/taxon refs |
| Theses | `data/thesis.json` | 6 | Migrated from thesis.html — all 6 theses with authors, degrees, years, pages, subject taxa |
| Publications | `data/publications.json` | 0 | Empty array — no publications page in existing project |
| News | `data/news.json` | 8 | Migrated from news.html — all 8 news items with categories, dates, tags |
| Blog | `data/blog.json` | 8 | Migrated from blog.html — all 8 articles with authors, categories, dates, tags |
| Authors | `data/authors.json` | 14 | All researchers/students from projects, theses, news, blog — marked needsReview |
| Categories | `data/categories.json` | 24 | All filter chip categories from existing pages with Bengali names, colors, icons |
| Images | `data/images.json` | 0 | Empty array — no real images in existing project (emoji sprites only) |

### INCOMPLETE / EMPTY (No Source Data) ⊘

| Collection | Reason |
|------------|--------|
| Publications | No publications page in existing project |
| Images | No real image files or metadata in existing project (uses emoji sprites) |
| Institutions | Not yet created — referenced by projects/theses as placeholders |

### MIGRATED CONTENT SOURCES

| Source Page | Content Migrated |
|-------------|------------------|
| `index.html` | Featured species (3) — used as basis for Species records |
| `assets.html` | Species cards (3) — matched to Species records |
| `phyla.html` | Full taxonomy hierarchy + phylum characteristics — used for Taxonomy records |
| `fish.html` | Fish classification + species tables (5 sample fish) — used for Fish Extensions |
| `names.html` | Scientific names tables — used for Species common/Bengali names and taxonomy |
| `projects.html` | 6 project cards — migrated to Projects |
| `thesis.html` | 6 thesis cards — migrated to Theses |
| `news.html` | 8 news cards — migrated to News |
| `blog.html` | 8 blog cards — migrated to Blog |

### UNRESOLVED REFERENCES (Documented, Not Fabricated)

All unresolved cross-references are explicitly documented with `needsReview: true` and `notes` fields:

1. **Species similarSpecies/prey/predator** (13 refs): Siberian Tiger, Leopard, Chital, Sambar, Gaur, Wild Boar, African Elephants, Bengal Fox, Tibetan Fox, Wolf, Eagle Owl, Mouse, Rabbit — authoritative Species records not yet created
2. **Fish Extensions** (5 refs): All 5 fish extension records reference speciesId that don't exist in Species collection yet — documented in notes
3. **Marine Life Extensions** (2 refs): Both reference fish species that also have Fish Extensions — documented as placeholders
4. **Project/Thesis taxon refs** (33 refs): Taxon IDs like `anura`, `aves`, `insecta`, `coleoptera`, `perciformes` etc. not in Taxonomy collection — documented in notes
5. **Project/Thesis institution refs** (6 refs): `inst-wii`, `inst-unknown` not in Authors/Institution collection — documented in notes
6. **Blog project ref** (1 ref): `proj-coral-reef-fish` not in Projects collection — documented in notes

### TAXONOMY/SUBSPECIES CONSISTENCY

Fixed inconsistency between Species and Taxonomy:
- **Before**: Bengal Tiger `taxonomy.subspeciesId = "tigris"` but Taxon ID = `"tigris-tigris"`
- **After**: Bengal Tiger `taxonomy.subspeciesId = "tigris-tigris"` matching Taxon ID
- **Taxon added**: `elephas` genus (parent: `elephantidae`) for Asian Elephant Species record

### VALIDATION APPROACH

Created `validate-data.js` — standalone Node.js script (no dependencies, not a runtime dependency):
- Validates JSON parsing for all 13 data files
- Checks unique IDs within each collection
- Verifies required structural fields per schema
- Validates cross-references (speciesId, taxonomy IDs, author IDs, project IDs)
- Reports unresolved references as documented warnings (not hard errors)
- Handles kingdom-rank null parentId correctly
- Run with: `node validate-data.js`

### LIMITATIONS FROM MISSING SOURCE DATA

1. **No Publications data** — existing project has no publications page
2. **No real Images** — existing project uses emoji sprites in CSS; no image files or metadata exist
3. **Limited Species** — only 3 authoritative Species records created (from index.html/assets.html)
4. **Incomplete Taxonomy** — only taxa needed for 3 species + fish extensions; many taxon IDs referenced in projects/theses not created
5. **Placeholder Institutions** — `inst-wii`, `inst-unknown` used as stand-ins; real institutional data not in source
6. **Demo Content** — news.html, blog.html, projects.html, thesis.html contain placeholder/demo content (future dates, generic descriptions); all marked `needsReview: true`

### DATA QUALITY COMMITMENT

- **No invented zoological facts** — all content sourced from existing project HTML
- **No fabricated scientific names, taxonomy, conservation status** — only what existed in source
- **No fabricated statistics, researchers, institutions** — placeholders documented as such
- **No invented image licenses/credits** — images.json left empty
- **Unverified content flagged** — all migrated records have `needsReview: true`