# Phase 04 performance summary

Measured: 2026-08-24

Target: homepage mobile performance and accessibility at least 90; CLS recorded for both profiles

Environment: Node.js 24.7.0, Next.js 14.2.35, Lighthouse 13.4.1, Headless Chrome 151 on macOS

## Commands

```bash
npx lighthouse http://127.0.0.1:3000/ --only-categories=performance,accessibility --preset=desktop --output=json --output-path=/tmp/skinetics-home-desktop-final.json --chrome-flags="--headless --no-sandbox"
npx lighthouse http://127.0.0.1:3000/ --only-categories=performance,accessibility --form-factor=mobile --screenEmulation.mobile=true --screenEmulation.width=390 --screenEmulation.height=844 --screenEmulation.deviceScaleFactor=1 --output=json --output-path=/tmp/skinetics-home-mobile-final.json --chrome-flags="--headless --no-sandbox"
```

Raw Lighthouse profiles remain temporary and are not committed.

## Final measurements

| Profile | Performance | Accessibility | LCP | CLS | TBT | Resource-summary transfer | Requests |
|---|---:|---:|---:|---:|---:|---:|---:|
| Mobile, 390×844 | 92 | 100 | 3.33 s | 0 | 12 ms | 384,518 B | 29 |
| Desktop preset | 100 | 100 | 0.74 s | 0 | 0 ms | 429,301 B | 39 |

Mobile transfer by resource type: scripts 215,908 B; fonts 100,688 B; images 42,757 B; document 17,166 B; other 6,376 B; stylesheet 1,623 B; media 0 B; third-party 0 B during the measured initial window.

Desktop transfer by resource type: scripts 223,461 B; fonts 100,688 B; images 59,562 B; other 26,801 B; document 17,166 B; stylesheet 1,623 B; media 0 B; third-party 0 B during the measured initial window.

## Tuning record

The first mobile measurement scored 85 performance / 100 accessibility with LCP 3.40 s, CLS 0, and TBT 305 ms. The trace attributed about 335 KB and 18 requests to analytics scripts during the initial render.

The final implementation creates GA, Yandex Metrica, and Mail.ru queues before interaction, so product/form/navigation events retain their client contract, and loads the external libraries after the initial rendering window. Focused analytics tests still prove the exact marketplace payload and safe navigation when adapters throw. The final mobile measurement improved to 92 performance and reduced TBT to 12 ms.

## Interpretation

Both accepted budgets pass. CLS is zero on both profiles. Mobile LCP is still the main local performance constraint; the hero image is prioritized and the optimized standalone image path is functional. Re-measure after production deployment because server distance, caching, and real analytics delivery will differ from localhost.
