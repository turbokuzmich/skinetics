# Phase 04 browser captures

Captured: 2026-08-24

## Before

The production site still exposes the pre-redesign homepage, so the baseline was captured directly from `https://skinetics.ru/`. DOM inspection at capture time found the old four-video carousel.

- [Homepage at 390×844](./before-home-390.jpg)
- [Homepage at 1440×900](./before-home-1440.jpg)

These are evidence of the starting interface only. No production change was made.

## Validated local release candidate

The following viewport screenshots were captured from the final local production build at `http://127.0.0.1:3000`. Bounding-box and full-document measurements for the same cases are recorded in [responsive-matrix.md](../responsive-matrix.md).

| Route/template | 390×844 | 768×1024 | 1280×900 | 1440×900 |
|---|---|---|---|---|
| Homepage | [390](./after-home-390.jpg) | [768](./after-home-768.jpg) | [1280](./after-home-1280.jpg) | [1440](./after-home-1440.jpg) |
| Catalog listing | [390](./after-catalog-390.jpg) | [768](./after-catalog-768.jpg) | [1280](./after-catalog-1280.jpg) | [1440](./after-catalog-1440.jpg) |
| Serum product | [390](./after-serum-390.jpg) | [768](./after-serum-768.jpg) | [1280](./after-serum-1280.jpg) | [1440](./after-serum-1440.jpg) |
| Cream product | [390](./after-cream-390.jpg) | [768](./after-cream-768.jpg) | [1280](./after-cream-1280.jpg) | [1440](./after-cream-1440.jpg) |
| About | [390](./after-about-390.jpg) | [768](./after-about-768.jpg) | [1280](./after-about-1280.jpg) | [1440](./after-about-1440.jpg) |
| Contacts | [390](./after-contacts-390.jpg) | [768](./after-contacts-768.jpg) | [1280](./after-contacts-1280.jpg) | [1440](./after-contacts-1440.jpg) |

## Dedicated form views

The route-top captures do not show footer or below-fold form content, so the two forms were also scrolled into view and captured separately at every accepted width.

| Form | 390×844 | 768×1024 | 1280×900 | 1440×900 |
|---|---|---|---|---|
| Doctor appointment | [390](./after-doctor-390.jpg) | [768](./after-doctor-768.jpg) | [1280](./after-doctor-1280.jpg) | [1440](./after-doctor-1440.jpg) |
| Feedback | [390](./after-feedback-390.jpg) | [768](./after-feedback-768.jpg) | [1280](./after-feedback-1280.jpg) | [1440](./after-feedback-1440.jpg) |

All files use JPEG encoding and the `.jpg` extension. Captures are viewport evidence, not full-page composites; the responsive matrix records full-document overflow, landmarks, form presence, and target-size results.
