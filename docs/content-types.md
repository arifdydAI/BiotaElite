# BiotaElite 2.0 Content Types

## Scope and Shared Rules

This document defines the practical content-type foundation for BiotaElite 2.0. It is documentation only: it does not create records, migrate data, build an Admin UI, or implement Firebase, authentication, or Firestore.

All major records use the common metadata convention from `docs/admin-data-architecture.md`: stable `id`, timestamps, creator/updater identifiers, editorial `status`, `needsReview`, and `version`, with `slug`, `publishedAt`, and `lastVerifiedAt` where applicable. Editorial status and scientific verification status are independent.

Translatable user-facing values should use the established bilingual object shape:

```json
{
  "en": "English text",
  "bn": "বাংলা text"
}
```

Existing data also uses legacy fields such as `bengaliTitle`, `bengaliName`, and some plain English strings. A future migration may normalize these fields, but this document does not alter them. When a requested language is unavailable, use the available language as the defined fallback, preferably English, and preserve the original value. Do not fabricate a translation. Scientific names, taxon names used as scientific identifiers, IDs, slugs, URLs, and codes must remain unchanged and must never be translated.

Unless a type is explicitly archival or reference-only, normal public visibility requires an editorially `PUBLISHED` record. Draft, in-review, and needs-review records are not publicly discoverable. Published records must disclose unverified or disputed scientific content.

## Content-Type Summary

| Content type | Authority | Current data |
|---|---|---|
| Species | Authoritative biological record | Populated: 3 |
| Taxon | Authoritative hierarchy record | Populated: 15 |
| Fish Extension | Species extension | Populated: 5 |
| Marine Life Extension | Species extension | Populated: 2 |
| Bangladesh Species Record | Regional Species extension | Populated: 3 |
| Identification Guide / Key | First-class editorial/scientific content | Planned; no dedicated collection |
| Research Project | Research content record | Populated: 7 |
| Thesis | Research/publication record | Populated: 6 |
| Publication | Bibliographic content record | Empty: 0 |
| News | Editorial content record | Populated: 8 |
| Blog / Educational Article | Editorial/educational content record | Populated: 8 |
| Author / Contributor | Person authority record | Populated: 13 |
| Institution | Organization authority record | Planned; no dedicated collection |
| Category | Controlled classification record | Populated: 24 |
| Image / Media | Central media record | Empty: 0 |
| Reference / Source | Provenance authority record | Planned; no dedicated collection |

The existing HTML pages (`assets.html`, `fish.html`, `names.html`, `projects.html`, `news.html`, `blog.html`, and `thesis.html`) are presentation surfaces. This step does not redesign or modify them.

## 1. Species

- **Purpose:** Store the complete authoritative biological record for one organism, including identity, taxonomy links, biology, ecology, conservation, identification content, provenance, and media relationships.
- **Authority:** Authoritative; the single source of truth for biological identity and shared scientific facts.
- **Primary ID:** `id`; public `slug` is required where the record has a public route.
- **Major fields:** `commonName`, Bengali/local names, unchanged `scientificName`, author/year, `taxonomy`, identification, biology/morphology/behaviour, ecology, importance, conservation, `references`, `images`, verification, and common metadata.
- **Relationships:** Many-to-one links to Taxon ranks; one-to-one or one-to-many extension links by `speciesId`; many-to-many links to projects, theses, publications, news, blog articles, images, and references.
- **Bilingual requirements:** Common names, descriptions, identification text, and captions may be bilingual. Scientific names and IDs remain unchanged.
- **Verification:** Taxonomy, identification, conservation, and claims require traceable sources and a scientific verification status (`verified`, `needs-review`, `unverified`, or `disputed`).
- **Editorial status:** `DRAFT`, `IN_REVIEW`, `NEEDS_REVIEW`, `PUBLISHED`, or `ARCHIVED` in the future workflow; current JSON uses lower-case `draft`, `published`, and `archived`.
- **Public visibility:** Only published records; unverified or disputed claims must be labeled. Draft/review records are private; archived records are excluded from normal discovery.
- **Future Admin module:** Species.

Do not create duplicate Species records for Fish, Marine Life, Bangladesh Biodiversity, or Scientific Names. Scientific Names are a generated view from Species plus Taxonomy.

## 2. Taxon

- **Purpose:** Represent one reusable node in the flexible taxonomic hierarchy.
- **Authority:** Authoritative taxonomy record, but not a duplicate Species record.
- **Primary ID:** `id`; a slug-like taxon ID is currently used. A public slug is optional if `id` is the route key.
- **Major fields:** `rank`, `name`, bilingual name where available, `parentId`, descriptions, diagnostic features, representative Species IDs, synonyms, type Species ID, references, review metadata, and common metadata.
- **Relationships:** Parent-child hierarchy; many-to-many links to Species through taxonomy paths and representative IDs; links to projects, theses, publications, and references.
- **Bilingual requirements:** Descriptions and display names may be bilingual. Scientific taxon names and identifiers remain unchanged.
- **Verification:** Parent-child integrity, rank, synonyms, and scientific naming require taxonomic sources and review.
- **Editorial status:** Uses the common editorial lifecycle; current taxonomy data carries review metadata but no separate status field.
- **Public visibility:** Valid published hierarchy nodes may support public classification views; unresolved or review-needed nodes must be labeled or withheld from normal discovery.
- **Future Admin module:** Taxonomy.

## 3. Fish Extension

- **Purpose:** Store fish-specific characteristics for an existing Species record.
- **Authority:** Extension only; `Species` remains authoritative for shared biology, taxonomy, conservation, and identity.
- **Primary ID:** `speciesId`; one Fish extension per Species unless a future version explicitly supports scoped variants.
- **Relationship safety:** `relationshipStatus` must be `verified` before public use; unresolved or `needs-review` relationships use `publicVisibility: "withheld"`.
- **Slug:** Not applicable; inherit Species routing.
- **Major fields:** Environment, aquatic habitat, depth range, body shape, fin characteristics, scales, lateral line, swim bladder, feeding, reproduction, spawning, migration, fisheries, aquaculture, stock status, and review metadata.
- **Relationships:** Required valid link to `speciesId`; may link indirectly to projects, images, and references through Species or extension provenance.
- **Bilingual requirements:** Explanatory descriptions and notes may be bilingual; scientific names come from Species unchanged.
- **Verification:** Diagnostic and fisheries fields require relevant scientific or data sources; `needsReview` must be honored.
- **Editorial status:** Inherits or is governed by the linked Species editorial workflow; extension changes require review before public use.
- **Public visibility:** Public only when the linked Species and extension are eligible for publication; orphan extensions are never public.
- **Future Admin module:** Fish.

## 4. Marine Life Extension

- **Purpose:** Store marine-specific data for an existing Species, including non-fish marine organisms and applicable marine data for fish.
- **Authority:** Extension only; it must not duplicate authoritative Species identity or replace global conservation status.
- **Primary ID:** `speciesId`; one extension per Species unless future scoped variants are defined.
- **Relationship safety:** `relationshipStatus` must be `verified` before public use; unresolved or `needs-review` relationships use `publicVisibility: "withheld"`.
- **Slug:** Not applicable; inherit Species routing.
- **Major fields:** Marine category, depth, zone, substrate, salinity, marine-specific data, trade regulations, marine conservation fields, threats, actions, and review metadata.
- **Relationships:** Required valid `speciesId`; links to images, projects, references, and regional records by IDs.
- **Bilingual requirements:** Marine descriptions and notes may be bilingual; scientific names remain unchanged.
- **Verification:** Marine ecology, status, threats, and trade data require dated, traceable sources.
- **Editorial status:** Governed by the linked Species workflow and extension review state.
- **Public visibility:** Only with a valid linked Species and publishable extension; disputed or unverified data must be labeled.
- **Future Admin module:** Marine Life.

## 5. Bangladesh Species Record

- **Purpose:** Record Bangladesh-specific presence, habitat, names, threats, population context, and regional conservation status for an existing Species.
- **Authority:** Regional extension; it never replaces global Species data.
- **Primary ID:** `speciesId`; one regional record per Species and region policy.
- **Slug:** Not applicable; inherit Species routing.
- **Major fields:** Presence status, regions, habitats, local names, `regionalConservationStatus`, regional threats/population, notes, references, review metadata, and version.
- **Relationships:** Required valid `speciesId`; links to Bangladesh references, images, projects, and habitats.
- **Bilingual requirements:** Local names and regional descriptions may be bilingual. Scientific names remain unchanged.
- **Verification:** Regional occurrence and status require Bangladesh-specific evidence and source dates.
- **Editorial status:** Uses regional record review plus the linked Species publication state.
- **Public visibility:** Only when both regional content and linked Species are publishable; global and regional statuses must remain distinct.
- **Future Admin module:** Bangladesh Biodiversity.

## 6. Identification Guide / Identification Key

- **Purpose:** Provide structured identification guidance as a first-class content type, separate from a Species record while linking back to authoritative Species.
- **Authority:** Editorial/scientific guide; it does not redefine Species identity or taxonomy.
- **Primary ID:** Stable `id`; `slug` for public guides and keys.
- **Major fields:** Title, bilingual summary, guide type (`guide`, `key`, or step-by-step), taxonomic scope, ordered steps/choices, diagnostic characteristics, distinguishing features, similar Species references, Species IDs, image IDs, references, audience, and common metadata.
- **Relationships:** Many-to-many links to Taxa and Species; one-to-many steps; many-to-many images and references; optional category links.
- **Bilingual requirements:** Instructions, labels, explanations, and captions may use bilingual objects. Scientific names in choices and references remain unchanged.
- **Verification:** Every diagnostic claim and Species choice requires scientific review and traceable references; ambiguous steps must be flagged.
- **Editorial status:** `DRAFT`, `IN_REVIEW`, `NEEDS_REVIEW`, `PUBLISHED`, or `ARCHIVED`.
- **Public visibility:** Published guides only; review-needed guides and unresolved decision paths are withheld from normal public use.
- **Future Admin module:** Identification.

No dedicated Identification records currently exist. Existing Species records contain embedded identification fields, which are compatible inputs but are not a first-class collection yet.

## 7. Research Project

- **Purpose:** Describe a field, conservation, laboratory, genomics, or other research project.
- **Authority:** Authoritative project record for project facts; it does not own Species identity.
- **Primary ID:** `id`; `slug` for public project routes.
- **Major fields:** Bilingual title, category, description, objectives, methodology, location, dates, status, findings, Species/Taxon IDs, researcher/Institution IDs, publication IDs, references, images, permits, funding, tags, and common metadata.
- **Relationships:** Many-to-many Species, Taxa, Authors, Institutions, Publications, References, and Images.
- **Bilingual requirements:** Title, description, objectives, methodology, findings, and captions may be bilingual; scientific names remain unchanged.
- **Verification:** Project status, findings, permits, and relationships require source or contributor review.
- **Editorial status:** Common editorial status is separate from project execution status (`planned`, `ongoing`, `completed`, `paused`, `cancelled`).
- **Public visibility:** Published project records only; unpublished findings and unresolved relationships remain private or labeled.
- **Future Admin module:** Projects.

## 8. Thesis

- **Purpose:** Catalog a thesis and its academic, subject, and provenance metadata.
- **Authority:** Authoritative catalog record; the thesis remains the source for its own document claims.
- **Primary ID:** `id`; `slug` for public routes.
- **Major fields:** Bilingual title, author, degree, department, Institution, year, supervisors, research area, keywords, abstract, pages, document URL, DOI, citation, references, subject Species/Taxa, language, status, tags, and common metadata.
- **Relationships:** Authors, Institutions, Species, Taxa, References, and optionally Projects/Publications.
- **Bilingual requirements:** Title and abstract may be bilingual; scientific names in subject links and text remain unchanged.
- **Verification:** Bibliographic metadata, authorship, Institution, DOI/document URL, and subject links require provenance review.
- **Editorial status:** Common editorial status is distinct from thesis availability (`published`, `unpublished`, `embargoed`).
- **Public visibility:** Published and permitted thesis metadata may be public; embargoed documents must not expose restricted files.
- **Future Admin module:** Thesis.

## 9. Publication

- **Purpose:** Catalog a journal article, book, report, thesis, proceeding, or preprint.
- **Authority:** Authoritative bibliographic record for publication metadata; it does not become the authority for Species identity.
- **Primary ID:** `id`; `slug` where a public publication route exists.
- **Major fields:** Type, bilingual title, ordered Authors, year, journal/book details, pages, DOI, URL, abstract, keywords, subject Species/Taxa, language, access status, tags, and common metadata.
- **Relationships:** Many-to-many Authors, Institutions where known, Species, Taxa, Projects, Thesis, and References.
- **Bilingual requirements:** Title, abstract, and editorial summary may be bilingual. Scientific names remain unchanged.
- **Verification:** DOI, citation, authorship, publication venue, date, and subject links require bibliographic verification.
- **Editorial status:** Common editorial lifecycle; publication state and open-access state are separate fields.
- **Public visibility:** Verified metadata may be public; links must respect access rights and unknown provenance.
- **Future Admin module:** Publications.

`data/publications.json` currently exists but is empty. No publication records are invented in this step.

## 10. News

- **Purpose:** Publish dated announcements, discoveries, conservation updates, events, policy, or funding news.
- **Authority:** Editorial record for the article; scientific claims remain supported by Species and References.
- **Primary ID:** `id`; `slug` for public routes.
- **Major fields:** Bilingual title, excerpt, Markdown content, cover media ID, Authors, category, tags, publish date, related Species/Projects, references, featured flag, and common metadata.
- **Relationships:** Authors, Categories, Species, Projects, Images, and References.
- **Bilingual requirements:** Title, excerpt, content, labels, and captions may be bilingual; scientific names remain unchanged.
- **Verification:** Factual claims, dates, media provenance, and related-record IDs require editorial review.
- **Editorial status:** Common editorial lifecycle; `publishDate` is not a substitute for `publishedAt`.
- **Public visibility:** Published news only; drafts and review records are private; unverified claims must be labeled.
- **Future Admin module:** News.

## 11. Blog / Educational Article

- **Purpose:** Publish accessible educational, behavioural, field-note, culture, identification, or conservation writing.
- **Authority:** Editorial/educational record; it references rather than redefines scientific authorities.
- **Primary ID:** `id`; `slug` for public routes.
- **Major fields:** Bilingual title, excerpt, Markdown content, cover media ID, Authors, Category, tags, publish date, related Species/Projects, references, featured flag, and common metadata.
- **Relationships:** Authors, Categories, Species, Projects, Images, and References.
- **Bilingual requirements:** Title, excerpt, article text, and captions may be bilingual; scientific names must remain unchanged.
- **Verification:** Educational scientific claims require source review; anecdotes and opinions must be clearly distinguished.
- **Editorial status:** Common editorial lifecycle; `publishDate` is separate from editorial approval.
- **Public visibility:** Published articles only; disputed or unverified claims need clear disclosure.
- **Future Admin module:** Blog.

## 12. Author / Contributor

- **Purpose:** Identify people who create, review, research, author, or contribute to content.
- **Authority:** Authoritative person profile for attribution; not an authentication account.
- **Primary ID:** `id`; slug optional and only needed for public profile routes.
- **Major fields:** Name, ORCID where known, affiliation, role, email when policy permits, biography, avatar media ID, review metadata, and common metadata.
- **Relationships:** Many-to-many Projects, Thesis, Publications, News, Blog, and review history; Institutions through affiliation IDs.
- **Bilingual requirements:** Names are preserved; biography and role descriptions may be bilingual. Scientific names in biographies remain unchanged.
- **Verification:** Identity, ORCID, affiliation, authorship, and attribution require provenance; unknown fields stay unknown.
- **Editorial status:** Profile publication/review status is separate from any user role.
- **Public visibility:** Only approved public profile fields are visible; private contact data is never assumed public.
- **Future Admin module:** Authors.

## 13. Institution

- **Purpose:** Represent a university, museum, research center, agency, NGO, or other organization.
- **Authority:** Authoritative organization record for affiliation and attribution.
- **Primary ID:** Stable `id`; slug optional for public profiles.
- **Major fields:** Name, bilingual display name where appropriate, country/region, website, ROR or other authoritative identifier, description, and common metadata.
- **Relationships:** Many-to-many Authors, Projects, Thesis, Publications, and References.
- **Bilingual requirements:** Display names/descriptions may be bilingual; identifiers, URLs, and official names are preserved.
- **Verification:** Institutional identity and identifiers require authoritative institutional sources.
- **Editorial status:** Common editorial lifecycle for public profile data.
- **Public visibility:** Only verified and approved institution records are public.
- **Future Admin module:** Institutions.

No dedicated Institution collection exists. Existing project and thesis data contains institution references that the validator reports as unresolved; no institution records are created here.

## 14. Category

- **Purpose:** Provide controlled classification for projects, news, blog articles, and other content.
- **Authority:** Authoritative controlled-vocabulary record, not scientific taxonomy.
- **Primary ID:** `id`; slug optional, but stable category keys are recommended.
- **Major fields:** Type, bilingual name, description, color/icon presentation metadata, ordering, and creation metadata.
- **Relationships:** One category to many content records; content may have multiple categories only when the type policy allows it.
- **Bilingual requirements:** Names and descriptions may be bilingual; category IDs remain unchanged.
- **Verification:** Controlled values require editorial governance and duplicate-label prevention.
- **Editorial status:** Category availability is governed by administrative status; current data has creation metadata but no explicit status.
- **Public visibility:** Only active categories referenced by published content should be publicly exposed.
- **Future Admin module:** Categories.

## 15. Image / Media

- **Purpose:** Register and govern images and other media in the centralized Media Library.
- **Authority:** Authoritative media metadata and provenance record; the asset itself remains at its licensed source/delivery location.
- **Primary ID:** `id`; slug generally not required.
- **Major fields:** `url`, `sourceUrl`, credit, license, bilingual alt/caption, related content IDs, `main`/`gallery` role, width, height, version, and common metadata.
- **Relationships:** Many-to-many Species, extensions, Projects, Thesis, Publications, News, Blog, and Identification content.
- **Bilingual requirements:** Alt text and captions may be bilingual; scientific names in captions remain unchanged.
- **Verification:** Rights, source, credit, dimensions, accessibility text, and content relationship require review. Unknown licensing is not permission to publish.
- **Editorial status:** Common editorial lifecycle; licensing status is independent and must be publishable before public use.
- **Public visibility:** Only media with known provenance/licensing and an approved related record may be public.
- **Future Admin module:** Media Library.

`data/images.json` exists but is empty. No images are added by this step.

## 16. Reference / Source

- **Purpose:** Provide reusable provenance for bibliographic citations, scientific/data sources, image sources, and verification evidence.
- **Authority:** Authoritative provenance record for the citation/source metadata, not necessarily the scientific claim itself.
- **Primary ID:** Stable `id`; slug generally not required.
- **Major fields:** Source type, title/name, creators or organization, year, publication details, DOI or URL, access date, license/provenance details, supported claim or asset, and common metadata.
- **Relationships:** Many-to-many Species, Taxa, extensions, Identification content, Projects, Thesis, Publications, News, Blog, and Images.
- **Bilingual requirements:** Titles may be preserved in their original language with optional translations; identifiers, DOI, URLs, and scientific names remain unchanged.
- **Verification:** Provenance must be traceable and source type explicit. Never invent citations, URLs, authors, credits, or evidence.
- **Editorial status:** Common review lifecycle for source metadata; verification status is independent.
- **Public visibility:** Sources may be public when provenance is valid; unresolved or restricted sources must be labeled and not presented as confirmed evidence.
- **Future Admin module:** References / Sources.

There is no dedicated `data/references.json` collection. Existing records contain embedded reference objects; unresolved references remain unresolved and are not replaced with fake records.

## Species and Extension Safety

Species remains the authoritative biological record. Fish, Marine Life, and Bangladesh Biodiversity records must reference Species through `speciesId` and contain extension or regional fields only. They must not duplicate Species identity, taxonomy, scientific names, conservation facts, or shared biology. Scientific Names are generated views from Species plus Taxonomy, never separate records.

No new Species, Taxon, extension, researcher, Institution, Publication, Reference, or Image records are created by this step. Unknown or missing data remains missing and is documented for later authoritative resolution.

## Existing Data Compatibility and Gaps

### Populated content types

Current JSON data contains records for Species (3), Taxon (15), Fish Extension (5), Marine Life Extension (2), Bangladesh Species Record (3), Research Project (7), Thesis (6), News (8), Blog (8), Author/Contributor (13), and Category (24).

### Empty or planned content types

- **Publication:** `data/publications.json` exists but contains 0 records.
- **Image / Media:** `data/images.json` exists but contains 0 records.
- **Identification Guide / Key:** no dedicated collection; only embedded Species identification fields exist.
- **Institution:** no dedicated collection; current institution references are unresolved.
- **Reference / Source:** no dedicated collection; existing records use embedded reference objects.
- **Future Admin and Firestore structures:** planned only; no implementation is added.

### Existing unresolved references

The current validator reports expected unresolved references that must remain documented and unresolved:

- Species similar-species, prey, and predator references, including references to Species records not present in the current collection.
- Fish and Marine Life extension records that reference missing Species IDs.
- Project references to missing Taxa, Authors, and Institutions.
- Thesis references to missing Taxa, Authors, and Institutions.
- Blog/News relationship references to missing Projects or other related records where reported by validation.

These references are not repaired by inventing records. The exact current validation output remains the authority for the live list, and records flagged with review notes must remain subject to review.

## Validation and Scope

Run `node validate-data.js` after content-structure changes. This Step 5 document does not modify HTML, CSS, JavaScript, JSON data, `validate-data.js`, or existing records. It does not install packages, implement Firebase or authentication, build an Admin UI, add images, or begin Step 6.
