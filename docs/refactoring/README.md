# Skinetics refactoring workspace

This directory is the operational record for the Skinetics site upgrade. It keeps the roadmap, current status, decisions, research, implementation evidence, and validation results together without mixing planning material into application code.

## Start here

1. Read [ROADMAP.md](./ROADMAP.md) for phase order and dependencies.
2. Read [STATUS.md](./STATUS.md) for the active phase, blockers, and next action.
3. Open the active phase directory and work through its `CHECKLIST.md`.
4. Record meaningful work sessions in [LOG.md](./LOG.md).
5. Add a decision record when a choice affects more than one phase or is costly to reverse.

## Directory roles

- `shared/` contains facts and policies reused across phases.
- `decisions/` contains durable architectural, product, content, and measurement decisions.
- `templates/` contains the formats used to keep new records consistent.
- `phase-XX-*` contains the inputs, work, findings, and validation for one roadmap phase.

## Phase lifecycle

Every phase moves through these states:

1. `Not started` — prerequisites have not been accepted.
2. `Ready` — required inputs exist and work can begin.
3. `In progress` — the phase checklist is actively being executed.
4. `Blocked` — a named decision, permission, or external input prevents progress.
5. `In validation` — implementation is complete and exit criteria are being checked.
6. `Complete` — validation evidence is recorded and all exit criteria pass.

The overall status belongs in `STATUS.md`. Detailed task status belongs in the phase `CHECKLIST.md`.

## Information rules

- Product names, claims, compositions, volumes, images, and labeling must be verified against manufacturer documents, packaging, and current marketplace cards.
- Preserve existing public URLs until search data and a redirect plan justify a change.
- Do not commit credentials, customer data, raw private analytics exports, or confidential marketplace reports.
- Store sanitized summaries in the relevant phase `artifacts/` directory. In `INPUTS.md`, record where private source material is held and who can access it.
- Use ISO dates (`YYYY-MM-DD`) throughout.
- Use repository-relative links so the documentation remains portable.

## Logging rules

Add a `LOG.md` entry after a meaningful work session, not after every small edit. Each entry should state:

- phase;
- work completed;
- evidence or files changed;
- decisions or blockers discovered;
- next action.

Decision records use zero-padded identifiers such as `0001-product-brand-source.md`. Their status is `Proposed`, `Accepted`, `Superseded`, or `Rejected`.

## Commit convention

When practical, prefix refactoring commits with the phase identifier:

```text
P00: document baseline metrics
P01: add multi-marketplace product model
P02: publish cream product pages
```

Documentation-only changes may use `DOCS:` when they affect the whole refactoring workspace.
