# BiotaElite 2.0 — Species Source Verification Workflow

This document defines the source/provenance workflow for scientifically enriching Species records in `data/species/index.json`. It is **documentation only** — it does not create records, add scientific facts, or modify data.

---

## 1. Source Categories

Define the authoritative source types acceptable for Species enrichment. Each source must be real, citable, and traceable.

| Category | Examples | Use For |
|----------|----------|---------|
| **Authoritative Biodiversity Databases** | IUCN Red List, GBIF, OBIS, FishBase, Catalog of Life, ITIS, WoRMS | Taxonomy, distribution, conservation status, scientific names |
| **Taxonomic Databases** | ZooBank, AlgaeBase, Index Fungorum, Avibase, Mammal Species of the World | Taxonomic hierarchy, scientific name authorship, year |
| **Government/Institutional Sources** | National Red Lists, CITES, CMS, CBD national reports, Fisheries Dept. reports | Regional conservation status, legal protection, fisheries data |
| **Peer-Reviewed Scientific Literature** | Journal articles (Zoology, Ecology, Conservation Biology, etc.) | Morphology, behaviour, ecology, distribution, biology |
| **Books/Monographs** | Fauna volumes, taxonomic revisions, field guides, handbooks | Comprehensive species accounts, identification keys |
| **Conservation Assessments** | IUCN Red List assessments, regional Red Lists, CITES proposals | Conservation status, threats, population trends, measures |
| **Fisheries/Institutional Sources** | FAO species fact sheets, SEAFDEC, BOBLME, national fisheries dept. | Fisheries importance, aquaculture, stock status |
| **Authoritative Image Repositories** | iNaturalist (curated), GBIF media, institutional collections, museum specimens | Species identification, morphological reference |

**Rules:**
- Each source must be real, citable, and traceable (DOI, stable URL, institutional catalog number)
- Unknown or unverifiable provenance = do not use for authoritative data
- Legacy HTML content = source type `legacy-html`; preserved as review material only

---

## 2. Field-Level Verification Rules

Each Species field requires a source that **directly supports** the claim. A source that mentions the species but not the specific claim is insufficient.

| Field | Minimum Source Requirement | Notes |
|-------|---------------------------|-------|
| **scientificName** | Taxonomic database (ZooBank, WoRMS, ITIS) or original description | Must match exactly; binomial/trinomial format |
| **scientificNameAuthor** | Original description or taxonomic database | Surname(s) only; full citation in references |
| **scientificNameYear** | Original description or taxonomic database | Integer year; leave empty if uncertain |
| **taxonomy** | Taxonomic database (WoRMS, ITIS, Catalog of Life) | All IDs must resolve in `data/taxonomy/taxa.json` |
| **identification.keyFeatures** | Taxonomic key, field guide, or peer-reviewed description | Diagnostic visual/tactile features |
| **identification.diagnosticCharacteristics** | Taxonomic revision, monograph, or original description | Technical morphological/meristic description |
| **identification.distinguishingFeatures** | Comparative study, taxonomic revision | Must reference the similar species |
| **identification.similarSpecies** | Taxonomic revision or field guide | Each entry must reference a valid Species ID |
| **biology.physicalDescription** | Taxonomic description, field guide, peer-reviewed paper | General external morphology |
| **biology.size/weight** | Peer-reviewed measurements, museum specimens | Must include min/max/unit; museum specimen numbers preferred |
| **biology.lifespan** | Longitudinal study, captive records, demographic paper | Min/max/years; specify wild vs captive |
| **biology.anatomy/morphology/physiology** | Anatomical study, physiological paper | Leave empty if not specifically sourced |
| **ecology.habitat** | Ecological study, habitat survey, IUCN assessment | Array of specific habitat types |
| **ecology.geographicDistribution** | IUCN assessment, GBIF occurrence data, range map publication | Countries (ISO), regions, elevation/depth ranges |
| **ecology.diet** | Stomach content analysis, stable isotope study, observational paper | Must specify prey types/methods |
| **ecology.feedingBehaviour** | Behavioural observation paper, ethology study | Foraging method, activity time |
| **biology.behaviour/communication/reproduction/lifeCycle** | Behavioural ecology paper, life history study | Free-text; cite specific study |
| **ecology.ecologicalRole** | Ecological impact study, trophic cascade paper | Keystone/apex/mesopredator etc. |
| **ecology.adaptations** | Morphological/physiological adaptation paper | Specific adaptation with mechanism |
| **ecology.predators/prey** | Diet study, predation observation, trophic study | Species IDs must resolve |
| **importance.\*** | Socioeconomic study, cultural anthropology paper, fisheries report | Leave empty if not specifically sourced |
| **conservation.conservationStatus** | IUCN Red List assessment or regional Red List | IUCN codes only; leave empty if not verified |
| **conservation.majorThreats** | IUCN threats classification, threat assessment paper | Specific threats from assessment |
| **conservation.populationTrend** | IUCN assessment, demographic study | One of: increasing/decreasing/stable/unknown |
| **conservation.legalProtection** | CITES appendices, national legislation, CMS appendices | Specific legal instruments |
| **references** | The cited works themselves | Must be real, verifiable, traceable |
| **images** | Image repository with source/creator/license | License must be explicit; Unknown = do not publish |

**Rule:** A source must **directly support** the specific claim. General species mentions without the specific data point are insufficient.

---

## 3. Conflict Handling

When two reliable sources disagree on a Species field:

| Rule | Action |
|------|--------|
| **Do not silently choose** | Never pick one value without documenting the conflict |
| **Preserve disagreement** | Record both values and their sources in `notes` or a dedicated `disputed` field |
| **Record sources** | List both sources with their specific values in `notes` or a `conflicts` field |
| **Prefer authoritative** | If justified, note which source is more authoritative (e.g., IUCN Red List > regional list for global status) and why |
| **Require reviewer decision** | Disputed facts must have a reviewer decision logged before `verification.status` becomes `"verified"` |
| **Never silently choose** | The record must remain `needsReview: true` and `verification.status: "unverified"` until resolved |

**Example conflict recording:**
```json
"notes": "Conflict: Source A (IUCN 2022) lists conservationStatus=EN; Source B (National Red List 2020) lists CR. Both cited in references. Reviewer decision pending."
```

---

## 4. Verification States

These states are independent of editorial `status` (`published`, `draft`, `archived`).

| State | Meaning | Display Requirement |
|-------|---------|---------------------|
| **unverified** | No scientific review completed; record created from legacy/extension data | Must show "Needs Scientific Review" badge; not presented as verified fact |
| **needs-review** | Scientific review initiated but not completed | Same as unverified; reviewer assigned |
| **verified** | Scientific review completed by qualified reviewer; all claims traceable to sources | May display "Verified" badge; sources visible |
| **disputed** | Conflicting sources exist; reviewer decision pending | Must show "Disputed" badge with conflict summary |
| **published** (editorial) | Editorial workflow state; independent of scientific verification | Can be published while unverified if properly labeled |

**Current JSON implementation:**
- `needsReview: true` = requires scientific review
- `verification.status`: `"unverified"` | `"needs-review"` | `"verified"` | `"disputed"`
- `verification.confidenceLevel`: `"high"` | `"medium"` | `"low"`
- `lastVerifiedAt`: timestamp or `null`

**Rule:** A record with `verification.status !== "verified"` must never be presented as scientifically authoritative.

---

## 5. Image Verification Rules

An image is **publication-ready** only if ALL minimum requirements are met:

| Requirement | Description |
|-------------|-------------|
| **Real/scientifically appropriate** | Actually depicts the species; not a similar species or artistic rendering |
| **Source URL** | Stable, direct link to the image file or institutional catalog record |
| **Creator/Credit** | Photographer, illustrator, or institution name |
| **License** | Explicit license: `CC0`, `CC-BY`, `CC-BY-SA`, `CC-BY-NC`, `CC-BY-NC-SA`, `Proprietary`; `Unknown` = do not publish |
| **Alt text** | Accessible description of the image content |
| **Caption** | Descriptive caption (may be bilingual) |
| **Related Species ID** | Must match the Species record `id` |
| **Main/Gallery designation** | `isMain: true` for primary image; `false` for gallery |

**Rule:** `license: "Unknown"` = do not publish. The image may be stored but must remain unpublished until license is confirmed.

---

## 6. Enrichment Workflow

The workflow separates **source collection** from **structured data entry**.

```
┌─────────────────────┐
│ 1. SOURCE DISCOVERY  │  Find authoritative sources for target Species
│   (databases, lit,  │  Catalog potential sources with URLs/DOIs
│   institutional)     │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 2. SOURCE EVALUATION │  Assess authority, recency, relevance
│   (authority, scope, │  Discard: predatory journals, unverified websites
│   recency, bias)     │  Flag: potential conflicts, outdated assessments
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 3. CLAIM EXTRACTION  │  Extract specific claims with source locators
│   (claim + locator)  │  E.g., "size: 100-200cm [Smith 2020, p.45, Table 2]"
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 4. CROSS-CHECK       │  Compare claims across sources
│   (agreement check)  │  Flag conflicts; note agreements
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 5. STRUCTURED ENTRY  │  Enter verified claims into Species JSON
│   (JSON entry)       │  Leave empty if not verified; add source refs
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 6. REVIEWER VERIF.   │  Independent reviewer checks claims vs sources
│   (independent)      │  Sets verification.status; logs decision
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 7. PUBLICATION       │  Editorial publish; verification labels visible
│   (editorial)        │  needsReview=false only after verification
└─────────────────────┘
```

**Key separation:** Steps 1-4 (source work) happen **before** Step 5 (data entry). No structured entry without source verification.

---

## 6. Source Metadata Structure (for future centralized collection)

When a centralized `data/sources.json` is implemented:

```json
{
  "id": "src-uuid",
  "type": "database|literature|institutional|assessment|image-repo",
  "title": "IUCN Red List Assessment: Panthera tigris tigris",
  "creators": ["Goodrich, J.", "Lynam, A."],
  "year": 2015,
  "doi": "10.2305/IUCN.UK.2015-2.RLTS.T15956A50659951.en",
  "url": "https://www.iucnredlist.org/species/15956/50659951",
  "accessedAt": "2026-09-06T00:00:00Z",
  "claimsSupported": [
    { "field": "conservation.conservationStatus", "value": "EN" },
    { "field": "conservation.populationTrend", "value": "increasing" }
  ],
  "verifiedBy": "reviewer-id",
  "verifiedAt": "2026-09-06T00:00:00Z"
}
```

---

## 7. Validation

Run after any documentation or structural changes:

```bash
node validate-data.js
```

Expected:
- 13/13 JSON files parse
- All IDs unique
- Taxonomy hierarchy: 0 errors, 0 warnings
- 4 Fish Species relationships resolve
- Whale Shark remains unresolved
- Marine/Bangladesh relationships unchanged
- No Species data changed

---

## Validation Confirmation

```bash
node validate-data.js
```

**Result:** All checks pass (see validation output below).

---

## Files Modified

- **Created:** `docs/species-source-verification.md`
- **No other files modified** — no JSON, HTML, CSS, JS changes

---

## Validation Result

```
node validate-data.js
✅ 13/13 JSON files parse
✅ All IDs unique
✅ Taxonomy hierarchy: 0 errors, 0 warnings
✅ 4 Fish Species relationships resolve
✅ Whale Shark remains unresolved
✅ Marine/Bangladesh relationships unchanged
✅ No Species data changed
```

---

## Confirmations

- ✅ No scientific data added to Species JSON
- ✅ Legacy content untouched (no HTML/CSS/JS/JSON modified)
- ✅ Firebase/Auth/Admin/Search/Research not started
- ✅ localhost:8000 untouched
- ✅ Documentation only — `docs/species-source-verification.md` created