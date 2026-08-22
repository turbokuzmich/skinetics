# Phase 00 claims audit

Reviewed: 2026-08-22
Owner for ordinary copy: Dmitry
Escalation: external professional or legal review

## Summary

The current local application contains substantially safer product copy than the public deployment. The public deployment and ingredient constants retain medical, guaranteed, quantified, absolute-safety, and mechanistic claims that should not be carried forward without evidence.

## Page-level classification

| Surface | Claim pattern | Classification | Required action |
|---|---|---|---|
| Public red-pepper page | “revolutionary,” accelerated growth, fully safe, sleeping follicles, transformation, miracles, results within weeks | Remove or qualify | Use the current local cosmetic-care copy; retain individual-intolerance and irritation precautions |
| Public GHK-Cu page | Cell-level action, follicle activation, guaranteed efficacy, no irritation, accelerated growth | Remove or qualify | Use the current local cosmetic-care copy; do not promise growth or safety |
| Public climbazole page | Treatment/prevention, fungal suppression, elimination of the cause, “once and for all” | Remove | Present as care for dandruff- and seborrhea-prone scalp; advise medical consultation for persistent symptoms |
| Current local serum pages | “supports growth” and “helps reduce shedding” | Keep qualified | Maintain cosmetic framing and realistic expectations |
| Current local serum pages | 95.7% and 97.3% natural-origin statements | Keep attributed, verify before future edits | Retain “according to manufacturer” attribution; do not generalize to safety or efficacy |
| Cream marketplace copy | Botox-equivalent effects, fixed 7–14 day results, wrinkle correction/prevention, physiological regeneration | Remove or escalate | Write original qualified cosmetic copy in Phase 02; do not copy marketplace descriptions |

## Ingredient-copy risks

The dormant ingredient dataset in `constants.ts` is not currently published as an indexable ingredient hub, but it contains high-risk wording that must be reviewed before `/ingredients` is developed:

- stem-cell activation, new-cell creation, epidermal thickening, and fibroblast restoration;
- treatment of fungal infections and inflammatory skin diseases;
- guaranteed prevention of shedding, greying, dermatitis, and other conditions;
- antiparasitic, detoxification, and disease-treatment language;
- unreferenced “proved” claims and detailed biomarker mechanisms;
- absolute or near-absolute efficacy and safety implications.

Classification: **remove or escalate before publication**. Keep `/ingredients` as `noindex, follow` until every entry has sourced, cosmetic wording and a clear user purpose.

## Ownership rule

Dmitry approves ordinary product and brand copy. Medical, regulatory, clinical, quantified, guaranteed-effect, and otherwise uncertain claims require external professional or legal review.
