# Phase 01 inputs

Status: Accepted

- accepted Phase 00 product source of truth;
- accepted canonical brand identifiers and display names;
- accepted category vocabulary;
- accepted marketplace list and display priority;
- approved analytics event contract;
- existing route and URL preservation decisions;
- current product data and long-form descriptions;
- current analytics goal compatibility requirements.

Accepted Phase 00 inputs:

- brands: Dr. Health, SkineticsLab, and Neon Beard under the Skinetics umbrella;
- one brand per product;
- initial catalog: five products, but Phase 01 migrates only the three existing serums;
- current serum URLs must remain unchanged;
- marketplace links are optional; existing serums currently have Wildberries only;
- canonical event: `marketplace_click` with the dimensions in the shared measurement plan;
- preserve historical `go_wb` goal delivery.

## Questions to resolve before implementation

1. Can products belong to more than one category?
2. Should a missing marketplace link hide the button or show an availability message?
3. Should marketplace order be fixed globally or configurable per product?
4. Which fields are required for a product to be publishable?
