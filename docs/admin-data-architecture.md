# Admin Data Architecture

## Admin Roles

- **SUPER_ADMIN**: Full administrative control, including users, taxonomy, media, references, editorial actions, and publishing.
- **EDITOR**: Manages editorial content and workflow, performs reviews and approvals, and can publish or archive records. Does not manage users.
- **CONTRIBUTOR**: Creates and edits records and supporting material within assigned scope. Cannot approve, publish, archive, or manage users.
- **REVIEWER**: Reviews records for editorial and scientific completeness and can request changes. Cannot create, edit, approve, publish, archive, or manage users.

## Permission Matrix

| Permission | SUPER_ADMIN | EDITOR | CONTRIBUTOR | REVIEWER |
|---|---:|---:|---:|---:|
| Create | Yes | Yes | Yes | No |
| Edit | Yes | Yes | Yes | No |
| Review | Yes | Yes | No | Yes |
| Approve | Yes | Yes | No | No |
| Publish | Yes | Yes | No | No |
| Archive | Yes | Yes | No | No |
| User management | Yes | No | No | No |
| Taxonomy management | Yes | Yes | No | No |
| Media management | Yes | Yes | Yes | No |
| Reference/source management | Yes | Yes | Yes | No |

Permissions may be limited further by assigned scope, ownership, or collection policy.

## Editorial Lifecycle

- **DRAFT**: Work in progress and not eligible for public display.
- **IN_REVIEW**: Submitted for editorial or scientific review; changes may be requested.
- **PUBLISHED**: Approved for public display under the visibility rules below.
- **ARCHIVED**: Retained for historical or audit purposes and removed from normal public discovery.
- **NEEDS_REVIEW**: Returned for correction, clarification, or renewed verification before approval.

## Editorial Status vs. Scientific Verification Status

**Editorial status** describes where a record is in the content workflow: whether it is being prepared, reviewed, approved, published, or archived.

**Scientific verification status** describes the confidence and review state of the record's scientific claims, identification, taxonomy, and sources. It is an independent property and must not be inferred from editorial status. A record can be editorially published while marked unverified or disputed, or remain a draft after its scientific claims have been verified.

## Public Visibility Rules

- **Unverified**: May be publicly visible only when editorially `PUBLISHED` and clearly labeled as unverified; it must not be presented as confirmed fact.
- **Disputed**: May be publicly visible only when editorially `PUBLISHED` and clearly labeled as disputed, with the dispute and relevant sources retained.
- **Draft**: Never publicly visible.
- **In review**: Never publicly visible through normal public discovery.
- **Published**: Publicly visible if it meets its scientific verification disclosure requirements; verification labels must remain visible where applicable.
- **Archived**: Not publicly visible through normal discovery, but may be exposed through a dedicated archive or historical view when policy permits.

Public visibility is controlled by editorial status first, with scientific verification status determining required disclosures and any additional restrictions.

## Common Metadata

Major content records should use the following reusable metadata convention:

| Field | Requirement | Definition |
|---|---|---|
| `id` | Required | Stable unique identifier for the record. |
| `slug` | Required where publicly addressed | Stable human-readable identifier, unique within its record type. |
| `createdAt` | Required | Creation timestamp in a consistent machine-readable format. |
| `updatedAt` | Required | Timestamp of the latest persisted change. |
| `createdBy` | Required | Identifier of the user or process that created the record. |
| `updatedBy` | Required | Identifier of the user or process that last changed the record. |
| `status` | Required | Editorial lifecycle status defined in this document. |
| `needsReview` | Required | Boolean workflow flag indicating that review is required. |
| `version` | Required | Monotonically increasing record version. |
| `publishedAt` | Optional | Timestamp of first or latest publication, as defined by the publishing policy; absent until published. |
| `lastVerifiedAt` | Optional, where applicable | Timestamp of the latest scientific verification. |

Required metadata must be present on every persisted major content record. Optional metadata must be omitted or null until it has a meaningful value; it must not be filled with placeholders.

## Bilingual Content Architecture

User-facing translatable text should use a language object with stable language keys:

```json
{
	"en": "English text",
	"bn": "বাংলা text"
}
```

Bilingual objects should be used for titles, summaries, descriptions, captions, labels, and other content intended for translation. Structured values, identifiers, slugs, URLs, and scientific names are not translated. Scientific names must remain unchanged in every language view.

When the requested language is unavailable, display the available language as a clearly defined fallback, preferably English, while preserving the original language value. Do not silently translate or fabricate missing content. A missing translation should remain distinguishable from an empty intentional value.

## References and Sources

References and sources are reusable records linked by identifier and retained with provenance:

- **Bibliographic references**: Published books, papers, reports, theses, or other citable works.
- **Scientific/data sources**: Databases, surveys, datasets, institutions, or authorities that provide scientific observations or structured data.
- **Image sources**: The origin of a photograph, illustration, map, or other media asset.
- **Verification sources**: Evidence used to confirm identification, taxonomy, distribution, or another scientific claim.

Each source link should identify the source type, title or name, creator or organization where known, stable locator such as DOI or URL where available, access date where relevant, and the claim or asset it supports. Preserve original attribution and the relationship between a record and its sources. Never invent references, citations, URLs, credits, or source details; unknown provenance must remain explicitly unknown.

## Media Architecture

The Media Library is the centralized registry for media assets. Content records should reference media by ID rather than duplicating media metadata. A published scientific image should support:

| Field | Definition |
|---|---|
| `id` | Stable unique media identifier. |
| `url` | Delivery location for the asset. |
| `sourceUrl` | Original or authoritative source location, when available. |
| `credit` | Required attribution information when known. |
| `license` | License or usage terms, including an explicit unknown state. |
| `alt` | Accessible alternative text. |
| `caption` | Display caption, preferably bilingual where applicable. |
| `relatedContent` | IDs of related records. |
| `role` | `main` or `gallery`, according to the content relationship. |
| `width` | Pixel width. |
| `height` | Pixel height. |
| `version` | Media metadata or asset version. |

Unknown licensing does not mean permission to publish. An asset without confirmed rights or an applicable license must remain unpublished until its usage rights are established. No actual images are created by this architecture.

## Relationship Architecture

Relationships should be explicit, identifier-based, and validated according to cardinality:

- **ONE-TO-ONE**: One record has at most one corresponding record, such as a publication's primary thesis link where the domain permits only one.
- **ONE-TO-MANY**: One parent record owns or relates to multiple child records, such as an institution and its authors or a project and its publications.
- **MANY-TO-MANY**: Records on both sides may relate to multiple records, such as authors and publications, species and references, or content and images.

The relationship model covers these entities: **Species**, **Taxonomy**, **Fish**, **Marine Life**, **Bangladesh Biodiversity**, **Projects**, **Thesis**, **Publications**, **News**, **Blog**, **Authors**, **Institutions**, **Images**, and **References**.

**Species** is the authoritative biological record. Fish, Marine Life, and Bangladesh Biodiversity records must reference Species by ID and must not duplicate Species identity, taxonomy, or scientific attributes. Projects, Thesis, Publications, News, and Blog records may relate to species, authors, institutions, images, and references through validated IDs. Images and References are shared resources and may be related to many content records.

## Data Integrity Rules

- IDs must be unique, stable, and immutable after creation within the system.
- Slugs must be unique within the record type and must not be silently reused for a different record.
- Every foreign reference must resolve to an existing record of the expected type.
- Taxonomy parent-child links must form a valid hierarchy with no cycles and with each child assigned only to an appropriate parent.
- Extension records must reference an existing authoritative parent; orphan Fish, Marine Life, or Bangladesh Biodiversity records are invalid.
- A biological entity must have one authoritative Species record; duplicate Species records must be merged or rejected through an explicit editorial process, not created as a workaround.
- Status combinations must be valid: only `PUBLISHED` records may have `publishedAt`; `DRAFT`, `IN_REVIEW`, and `NEEDS_REVIEW` records are not publicly visible; archived records cannot be newly published without an explicit restore workflow.
- During the current static-data phase, existing lower-case editorial values such as `published` are preserved. New code must not mass-convert them blindly; a future migration should map them explicitly to the canonical workflow values (`PUBLISHED`, `DRAFT`, `IN_REVIEW`, `ARCHIVED`, `NEEDS_REVIEW`) at a controlled boundary.
- A record version must increase for each persisted revision, and related versioned references must not point to an unavailable or incompatible version.
- Archive preserves the record and its provenance while removing it from normal discovery. Deletion should be restricted to policy-approved, non-authoritative records; references required for audit or scientific provenance should be retained or tombstoned.
- Unresolved references must be flagged for review and must not be replaced with guessed IDs or fabricated records. Existing unresolved references identified in Step 3 must remain explicitly documented until resolved by authoritative evidence.
- Missing data must remain missing or clearly marked as unresolved; never create fake records simply to make validation pass.
- Extension records should use `relationshipStatus` (`verified`, `needs-review`, or `unresolved`) and `publicVisibility` (`public` or `withheld`) to distinguish a usable relationship from a relationship awaiting authoritative evidence. A record with a missing Species target must remain `withheld`.

## Versioning and Audit Trail

Versioning and audit history are future architecture only. No audit logging or version-history functionality is implemented by this document.

Each major record should carry an integer `version` that increases for every persisted revision. A future change-history entry should capture:

- `recordId` and record type
- the new record version and its `previousVersion`
- `changedBy` and `changedAt`
- `fieldsChanged`, listing changed field paths and, where policy permits, before/after values
- the change reason and resulting editorial status

The previous version must remain addressable as an immutable snapshot. Rollback should create a new version based on a selected prior snapshot rather than deleting intervening history. A rollback must itself be recorded and reviewed before publication.

Publish history should record each publish, unpublish, restore, and archive transition with the acting user, timestamp, version, and resulting status. Review history should record submission, assignment, decision, requested changes, reviewer, timestamp, and review notes. History is append-only and must remain available for provenance and accountability.

## Firestore Readiness

The current record-oriented architecture can map to Firestore later by using logical collection boundaries. The following names are future collection boundaries, not a request to initialize Firestore:

| Logical collection | Primary responsibility |
|---|---|
| `species` | Authoritative biological records. |
| `taxonomy` | Hierarchical taxon records. |
| `fish` | Fish-specific extensions keyed by `speciesId`. |
| `marineLife` | Marine-life extensions keyed by `speciesId`. |
| `bangladeshSpecies` | Bangladesh-specific extensions keyed by `speciesId`. |
| `projects` | Project records and relationships. |
| `thesis` | Thesis records and relationships. |
| `publications` | Publication records and relationships. |
| `news` | News records. |
| `blog` | Blog records. |
| `authors` | Author profiles and author relationships. |
| `institutions` | Institution records. |
| `categories` | Reusable classification records. |
| `images` | Centralized media records. |
| `references` | Reusable bibliographic, scientific, image, and verification sources. |
| `auditLogs` | Future append-only change and workflow history. |

References between collections should use stable IDs such as `speciesId`, `authorIds`, `institutionId`, `imageIds`, and `referenceIds`. Read models may denormalize display fields for performance, but the referenced collection remains authoritative and the source ID must be retained. Every ID reference must be validated, and missing references must remain flagged rather than replaced with generated records.

This section does not install Firebase, create configuration, initialize Firestore, add authentication, add backend code, or modify frontend code.

## Future Admin Panel Modules

The following modules describe a planned administrative interface only. No Admin UI is implemented here.

- **Dashboard**: Summarizes workflow queues, validation issues, recent changes, and publishing activity.
- **Species**: Creates and maintains authoritative biological records.
- **Taxonomy**: Maintains taxon hierarchy, parent-child links, ranks, and scientific naming relationships.
- **Fish**: Manages fish-specific extensions linked to Species.
- **Marine Life**: Manages marine-life extensions linked to Species.
- **Bangladesh Biodiversity**: Manages regional extensions and Bangladesh-specific context linked to Species.
- **Identification**: Manages identification features, comparisons, and review of species recognition content.
- **Projects**: Manages projects and their species, author, institution, publication, and source relationships.
- **Thesis**: Manages thesis records, contributors, institutions, taxonomy, and sources.
- **Publications**: Manages publication metadata, authors, institutions, species, and references.
- **News**: Manages news content, publication workflow, categories, media, and sources.
- **Blog**: Manages blog content, authors, categories, media, and editorial workflow.
- **Authors**: Maintains author profiles and links to their work.
- **Institutions**: Maintains institution identities and relationships to people and content.
- **Categories**: Maintains controlled categories used for navigation and content classification.
- **Media Library**: Registers media provenance, licensing, accessibility metadata, versions, and content relationships.
- **References / Sources**: Registers reusable citations, scientific sources, image sources, and verification evidence.
- **Review Queue**: Presents records needing editorial or scientific review and records decisions.
- **Version History**: Presents immutable revisions, publish history, review history, and approved rollback actions.
- **Settings**: Holds administrative policies, workflow configuration, and system-level preferences.
- **User / Role Management**: Manages users, role assignments, scopes, and access controls.

## Admin Safety Principles

- Never publish unverified scientific claims as verified facts.
- Never overwrite global conservation status with regional status; store regional conservation context separately.
- Never duplicate authoritative Species information inside extension records.
- Never silently repair unresolved references with invented records.
- Never publish media without known provenance and licensing.
- Never delete authoritative records without an appropriate archive and history mechanism.
- Scientific names must remain unchanged across languages.

## Final Consistency Check

The architecture was cross-checked against `docs/data-model.md` and the existing `data/` directory. The following are current-state migration notes, not changes to the completed architecture:

- `docs/data-model.md` currently illustrates `draft`, `published`, and `archived` status values, while this admin architecture also defines `IN_REVIEW` and `NEEDS_REVIEW` for the future editorial workflow. Any future implementation must align these status values before enforcing them.
- The current Species model illustrates embedded `references` and `images`; the future architecture defines centralized `references` and `images` collections linked by IDs. A future migration must preserve provenance and relationships rather than discard or invent data.
- The current data directory uses file-oriented names such as `fish/`, `marine-life/`, and `bangladesh/`. Firestore collection names such as `fish`, `marineLife`, and `bangladeshSpecies` are logical future boundaries. `institutions`, `references`, and `auditLogs` do not currently have data collections and must not be populated with fabricated records.

These differences are documented for future alignment. No current JSON data, missing scientific record, institution, publication, image, or source was created or altered.
