# Phase 04 browser captures

Captured: 2026-08-24

## Before

The production site still exposes the pre-redesign homepage, so the baseline was captured directly from `https://skinetics.ru/`. DOM inspection at capture time found the old four-video carousel.

- [Homepage at 390×844](./before-home-390.png)
- [Homepage at 1440×900](./before-home-1440.png)

These are evidence of the starting interface only. No production change was made.

## Validated local release candidate

The following viewport screenshots were captured from the final local production build at `http://127.0.0.1:3000`. The doctor form appears in every route footer; the Contacts captures also contain the feedback section below the first viewport. Bounding-box and full-document measurements for the same cases are recorded in [responsive-matrix.md](../responsive-matrix.md).

| Route/template | 390×844 | 768×1024 | 1280×900 | 1440×900 |
|---|---|---|---|---|
| Homepage | [390](./after-home-390.png) | [768](./after-home-768.png) | [1280](./after-home-1280.png) | [1440](./after-home-1440.png) |
| Catalog listing | [390](./after-catalog-390.png) | [768](./after-catalog-768.png) | [1280](./after-catalog-1280.png) | [1440](./after-catalog-1440.png) |
| Serum product | [390](./after-serum-390.png) | [768](./after-serum-768.png) | [1280](./after-serum-1280.png) | [1440](./after-serum-1440.png) |
| Cream product | [390](./after-cream-390.png) | [768](./after-cream-768.png) | [1280](./after-cream-1280.png) | [1440](./after-cream-1440.png) |
| About | [390](./after-about-390.png) | [768](./after-about-768.png) | [1280](./after-about-1280.png) | [1440](./after-about-1440.png) |
| Contacts and feedback | [390](./after-contacts-390.png) | [768](./after-contacts-768.png) | [1280](./after-contacts-1280.png) | [1440](./after-contacts-1440.png) |

Captures are viewport evidence, not full-page composites. The responsive matrix records full-document overflow, landmarks, and target-size results.
