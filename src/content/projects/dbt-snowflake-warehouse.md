---
title: 'Snowflake + dbt reference warehouse'
summary: 'A runnable analytics warehouse built the way I think they should be built — layered models, enforced contracts, tested seams, and generated lineage docs you can click through.'
context: 'Open source · Reference implementation'
order: 1
tags: ['Snowflake', 'dbt', 'DuckDB', 'SQL', 'CI/CD', 'Data contracts']
repo: 'https://github.com/Kstuart1992/dbt-snowflake-demo'
demo: 'https://kstuart1992.github.io/dbt-snowflake-demo/'
demoLabel: 'Browse the lineage docs'
---

Most portfolio pieces list "dbt" as a skill. This one is the project itself: a working dbt
warehouse you can clone, run in under a minute, and inspect — including the full lineage DAG,
model documentation, and test results, published as a static site.

## Why it exists

I wanted a single artifact that answers three questions a hiring manager or client actually has:

1. Do you understand warehouse **layering** — or do you write one giant query?
2. Do you treat transformation as **software** — tests, contracts, CI, review?
3. Can you reason about **Snowflake specifically** — warehouses, RBAC, incremental strategy, cost?

Reading a résumé bullet answers none of those. Clicking through a DAG answers all three.

## Architecture

The project models a fleet-management domain — vehicles, drivers, maintenance events, and cost
allocation — because that's the shape of data I work with daily.

```
sources (raw)
   └── staging/        one model per source table; renames, casts, light cleaning
        └── intermediate/   the joins and business logic that shouldn't live in a mart
             └── marts/     dimensional models, contracted and documented
                  ├── core/       conformed dimensions + fact tables
                  └── finance/    departmental marts built on core
```

Rules the project actually enforces, not just describes:

- **Staging is 1:1 with sources.** No joins, no filtering business rows out. If a staging model
  needs a join, the logic belongs in `intermediate/`.
- **Marts are contracted.** `contract: {enforced: true}` on every mart model, so a type change in
  an upstream source fails the build rather than silently corrupting a dashboard.
- **Nothing downstream references a source directly.** Enforced in CI, not by convention.
- **Every mart column has a description.** The generated docs are the data dictionary — there
  isn't a second one to fall out of date.

## Runs on DuckDB, targets Snowflake

A Snowflake trial expires in 30 days. A portfolio project that goes dark after a month is worse
than no project, so the default target is **DuckDB** — `dbt build` works on a clean clone with no
credentials and no cloud account.

The Snowflake target is a first-class profile, not an afterthought. The Snowflake-specific work
lives in the repo and is visible whether or not you have an account to run it against:

| Concern | How it's handled |
| --- | --- |
| Incremental loads | `merge` strategy with explicit `unique_key` and `merge_exclude_columns` for audit fields |
| Warehouse sizing | Model-level `snowflake_warehouse` config — heavy marts run on a larger warehouse, staging doesn't |
| Clustering | `cluster_by` on the large fact tables, with a note on when clustering is *not* worth the credits |
| RBAC | `grants` config per layer — analysts reach marts, not staging |
| Cost | A `query_history` model that attributes credit spend back to dbt models via query tags |

That last one matters more than it sounds. Tagging dbt runs so warehouse spend can be attributed
per model is the difference between "our Snowflake bill went up" and "this one incremental model
is doing a full refresh every night."

## Testing and CI

Tests are split by intent rather than piled into one bucket:

- **Schema tests** — uniqueness, not-null, referential integrity, accepted values. Cheap, run
  everywhere.
- **Singular tests** — the business assertions that catch real corruption: no maintenance event
  dated before its vehicle's acquisition, no cost allocation that doesn't sum to its parent.
- **Unit tests** — dbt unit tests on the gnarliest transformation logic, so edge cases are pinned
  with fixtures instead of discovered in production.

CI on every pull request runs `dbt build` against DuckDB, then `dbt docs generate`. Merging to
`main` publishes the refreshed documentation to GitHub Pages. The docs on this site are never
stale, because nothing regenerates them by hand.

## What I'd do differently at enterprise scale

Worth saying plainly, because the honest version is more useful than the polished one:

- This project uses seeds for source data. In production that's an ingestion tool — Fivetran,
  ADF, or Snowpipe — and the staging layer would sit on external tables or a landing schema.
- Slowly-changing dimensions here are Type 2 via dbt snapshots. Above a certain volume I'd move
  that to Snowflake **streams and tasks** and let dbt read the result.
- One warehouse, one environment. Real deployments get dev/stage/prod separation with distinct
  RBAC and separate compute, driven by target-aware macros.

## Running it

```bash
git clone https://github.com/Kstuart1992/dbt-snowflake-demo
cd dbt-snowflake-demo
pip install -r requirements.txt
dbt deps && dbt seed && dbt build     # DuckDB, no credentials needed
dbt docs generate && dbt docs serve
```

To point it at Snowflake, fill in the `snowflake` output in `profiles.yml` and run with
`--target snowflake`. The models are written to compile against both.
