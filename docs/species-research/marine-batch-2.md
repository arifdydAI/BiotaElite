# Marine Batch 2 — Representative Species Expansion (Research Log)

Date: 2026-09-12. All 23 new species: WoRMS Aphia verified (accepted names) + IUCN status verified via Red List sources. All records created `verification.status=unverified`, `needsReview=true`, `confidenceLevel=low`.

## Taxonomy source (WoRMS REST, AphiaRecordsByName, exact match, status=accepted)

| Species | AphiaID | Family | Authority |
|---|---|---|---|
| Megaptera novaeangliae | 137092 | Balaenopteridae | (Borowski, 1781) |
| Physeter macrocephalus | 137119 | Physeteridae | Linnaeus, 1758 |
| Orcinus orca | 137102 | Delphinidae | (Linnaeus, 1758) |
| Tursiops truncatus | 137111 | Delphinidae | (Montagu, 1821) |
| Dugong dugon | 220227 | Dugongidae | (Müller, 1776) Palmer, 1895 |
| Phoca vitulina | 137084 | Phocidae | Linnaeus, 1758 |
| Eretmochelys imbricata | 137207 | Cheloniidae | (Linnaeus, 1766) |
| Caretta caretta | 137205 | Cheloniidae | (Linnaeus, 1758) |
| Dermochelys coriacea | 137209 | Dermochelyidae | (Vandelli, 1761) |
| Crocodylus porosus | 344030 | Crocodylidae | Schneider, 1801 |
| Hydrophis platurus | 1476906 | Elapidae | (Linnaeus, 1766) |
| Aptenodytes forsteri | 225773 | Spheniscidae | Gray, 1844 |
| Diomedea exulans | 212583 | Diomedeidae | Linnaeus, 1758 |
| Morus bassanus | 148776 | Sulidae | (Linnaeus, 1758) |
| Fregata minor | 212654 | Fregatidae | (Gmelin, 1789) |
| Sepia officinalis | 141444 | Sepiidae | Linnaeus, 1758 |
| Mytilus edulis | 140480 | Mytilidae | Linnaeus, 1758 |
| Magallana gigas | 836033 | Ostreidae | (Thunberg, 1793) |
| Asterias rubens | 123776 | Asteriidae | Linnaeus, 1758 |
| Aurelia aurita | 135306 | Ulmaridae | (Linnaeus, 1758) |
| Homarus gammarus | 107253 | Nephropidae | (Linnaeus, 1758) |
| Actinia equina | 100803 | Actiniidae | (Linnaeus, 1758) |
| Euphausia superba | 236217 | Euphausiidae | Dana, 1850 |

## IUCN statuses (global assessments; primary-source snippets verified 2026-09-12)

- LC: humpback (2018), bottlenose (2018), harbour seal (2016), saltwater crocodile (2019), yellow-bellied sea snake (2017), northern gannet (2018), great frigatebird (2019), common cuttlefish, European lobster (2011), Antarctic krill
- VU: sperm whale (2025, A1d), dugong (2015, A2bcd+4bcd), loggerhead (A2b), leatherback (2013, A2bd), wandering albatross (2018)
- CR: hawksbill (2008, A2bd)
- NT: emperor penguin (2019 assessment, 2020 pub, A3c) — NOTE: 2026 IUCN press release reports uplist to EN; NOT yet verified against a published assessment, recorded as conflict note only
- DD: killer whale (global 2007; Europe LC 2023 — regional only, global DD retained)
- No IUCN assessment found (field left empty): blue mussel, Pacific oyster, beadlet anemone. IUCN NE confirmed: common starfish, moon jellyfish.

## Taxonomy conflicts documented (not silently resolved)

1. Whales: WoRMS/IUCN use Cetartiodactyla (or Artiodactyla); project retains Cetacea per legacy usage (blue-whale precedent). Noted in each cetacean reviewNotes.
2. Sulidae/Fregatidae: WoRMS places in Pelecaniformes; IUCN/BirdLife 2018–2020 assessments and Birds of the World use Suliformes (matches project hierarchy). Suliformes retained; conflict noted.
3. Crocodylus: Reptile Database/WoRMS treats Crocodylia at class level; project uses Reptilia class + Crocodylia order. Retained; noted. IUCN assessment itself uses Reptilia/Crocodylia/Crocodylidae — matches project.
4. Actinia: WoRMS shows Hexacorallia as class under Anthozoa subphylum; project uses Anthozoa class. Retained; noted.
5. Pacific oyster: accepted name Magallana gigas (WoRMS/CoL/NCBI); Crassostrea gigas recorded as synonym only.
6. Yellow-bellied sea snake: accepted Hydrophis platurus (WoRMS/Reptile DB); Pelamis platura synonym only.
7. CMS species pages show STALE IUCN categories (sperm "Endangered", humpback "Endangered", bottlenose "Vulnerable") — CMS NOT used for status; primary Red List assessments used.

## Fish exclusion

Zero fish in this batch. Whale shark / manta ray (legacy fish placeholders in marine index) untouched and NOT linked as marine species. Sea snakes are reptiles (Elapidae); all 23 verified non-fish classes only.
