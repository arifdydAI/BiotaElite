# Marine Batch-3 — Coverage Expansion (Research Log)

Date: 2026-09-12. 24 new species, all WoRMS-accepted names, IUCN statuses verified where published.
All records `verification.status=unverified`, `needsReview=true`, `confidenceLevel=low`.

## Phase-1 audit findings (script ml3-audit.js, baseline 81 nodes / 29 linked species)

- Zero-species families: rhopilematidae, margaritiferidae, arcidae, loliginidae, dentaliidae, palinuridae, stichopodidae, parechinidae
- Zero-species phyla: porifera, ctenophora, platyhelminthes, annelida, hemichordata
- Birds weakest group (4); 21 families singletons
- Batch-3 fills: loliginidae, palinuridae, stichopodidae + all 5 empty phyla except platyhelminthes (no reliable species-level data found — gap reported, not fabricated)
- Remaining for future: rhopilematidae, margaritiferidae, arcidae, dentaliidae, parechinidae, crinoids, flatworms, pinniped sea lions (walrus covers odobenids this batch)

## WoRMS verification (all status=accepted unless noted)

| Species | AphiaID | Placement |
|---|---|---|
| Balaenoptera acutorostrata (Lacépède, 1804) | 137087 | Balaenopteridae |
| Delphinus delphis (Linnaeus, 1758) | 137094 | Delphinidae (D. capensis merged 2016) |
| Phocoena phocoena (Linnaeus, 1758) | 137117 | Phocoenidae |
| Trichechus manatus (Linnaeus, 1758) | 159509 | Trichechidae |
| Odobenus rosmarus (Linnaeus, 1758) | 137077 | Odobenidae |
| Laticauda colubrina (Schneider, 1799) | 344083 | Elapidae |
| Lepidochelys kempii (Garman, 1880) | 137208 | Cheloniidae |
| Aptenodytes patagonicus (Miller, 1778) | 212656 | Spheniscidae |
| Macronectes giganteus (Gmelin, 1789) | 212636 | Procellariidae |
| Sula leucogaster (Boddaert, 1783) | 212597 | Sulidae (WoRMS order Pelecaniformes) |
| Phalacrocorax carbo (Linnaeus, 1758) | 137179 | Phalacrocoracidae (WoRMS order Pelecaniformes) |
| Nautilus pompilius (Linnaeus, 1758) | 216384 | Nautilidae / Nautilida |
| Loligo vulgaris (Lamarck, 1798) | 140271 | Loliginidae / Myopsida |
| Patella vulgata (Linnaeus, 1758) | 140685 | Patellidae / Patellida / Gastropoda |
| Pecten maximus (Linnaeus, 1758) | 140712 | Pectinidae / Pectinida |
| Echinus esculentus (Linnaeus, 1758) | 124287 | Echinidae / Camarodonta |
| Holothuria scabra (Jaeger, 1833) | 1672770 | Holothuriidae / Holothuriida |
| Ophiothrix fragilis (Abildgaard in O.F. Müller, 1789) | 125131 | Ophiotrichidae / Amphilepidida |
| Halichondria panicea (Pallas, 1766) | 132627 | Halichondriidae / Suberitida (valid: H. (Halichondria) panicea) |
| Pleurobrachia pileus (O. F. Müller, 1776) | 106386 | Cydippidae / Cydippida / Tentaculata |
| Arenicola marina (Linnaeus, 1758) | 129868 | Arenicolidae (WoRMS order unassigned; some place in Capitellida) |
| Saccoglossus kowalevskii (Agassiz, 1873) | 137600 | Harrimaniidae (order incertae sedis) |
| Panulirus argus (Latreille, 1804) | 382891 | Palinuridae |
| Apostichopus japonicus (Selenka, 1867) | 241776 | Stichopodidae / Synallactida |

## IUCN statuses (primary sources)

- LC: minke (2018), common dolphin (2020 global), harbour porpoise (2020 global; Baltic subpop CR), sea krait (2010), king penguin (2020), giant petrel (2018), brown booby (year unverified), great cormorant (2018)
- VU: manatee (2023, C1), walrus (2024, A3c)
- CR: Kemp's ridley (2019)
- EN: sandfish (2010, A2bd; older VU listings superseded), Japanese cucumber (2013)
- NT: edible urchin
- DD: European squid, Caribbean spiny lobster (2009)
- Empty (no IUCN assessment found): nautilus (US ESA Threatened 2018 + CITES II noted), limpet, scallop (MarLIN "-"), brittle star (NE), sponge, comb jelly, lugworm, acorn worm

## Conflicts documented

1. Sula/Phalacrocorax: WoRMS order Pelecaniformes vs IUCN/BirdLife Suliformes (project retains Suliformes; same as batch-2).
2. Halichondria: valid name carries subgenus H. (Halichondria) panicea; recorded as H. panicea standard usage. EPPO order Halichondrida vs WoRMS Suberitida — WoRMS retained.
3. Pleurobrachia family: WoRMS Cydippidae vs EPPO Pleurobrachiidae — WoRMS retained.
4. Arenicola order unassigned in WoRMS — family attached directly under Polychaeta, noted.
5. Saccoglossus order incertae sedis — family attached directly under Enteropneusta, noted.
6. Sandfish older VU vs current EN — EN retained per 2025-2 sources.
7. CMS pages again show stale categories — never used for status.
8. D. capensis merged into D. delphis (2016) — recorded.
