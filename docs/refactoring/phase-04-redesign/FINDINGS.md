# Phase 04 findings

Status: Design approved; implementation not started

## Current interface audit

The current implementation uses Material UI but retains a broad landing-page theme, many route-local `sx` rules, a fixed translucent pill header, a flat footer, placeholder-only form identification, and no semantic `main` or `footer` landmark. The header uses the SkineticsLab wordmark for the Skinetics umbrella identity and its desktop link order differs from the accepted Phase 03 order.

The homepage is dominated by a four-video carousel backed by approximately 16 MB of local MP4 files. The redesign will stop requesting those videos on the homepage while retaining every file under `public/video/`. Current serum images are multi-megabyte transparent PNGs and visually lack the grounding shadow used by the cream imagery.

The initial browser audit covered the homepage at 1440 and 390 px. The current page avoids horizontal overflow at 390 px, but exposes only a `header` landmark, uses placeholder-only doctor-form fields, and gives the carousel more first-screen prominence than the catalog journey.

## Approved design direction

The owner selected `Навигационная редакционность`: a confident, well-guided, evidence-conscious system using warm neutral surfaces, editorial hierarchy, restrained geometry, and text-backed accents for Dr. Health, SkineticsLab, and Neon Beard.

Skinetics remains visually dominant. Brand accents remain provisional until official assets arrive. Currently verified public facts form the initial trust layer; future identity, documentary, photography, and specialist assets are tracked in the non-blocking asset backlog.

Implementation is incremental with one coordinated release. WCAG 2.2 AA is the target; responsive widths are 390, 768, 1280, and 1440 px; mobile Lighthouse performance and accessibility targets are at least 90.

The accepted design is recorded in [DESIGN.md](./DESIGN.md).

## Implementation findings

To be completed during development.

## Follow-up work for Phase 05

Record conversion hypotheses, content gaps, and reusable campaign landing-page needs discovered during redesign.
