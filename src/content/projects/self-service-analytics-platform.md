---
title: 'Building a self-service analytics platform — and the team behind it'
summary: 'Stood up an Analytics Engineering practice from zero to 13 engineers at Holman, and the dbt + Databricks + Power BI platform that let business teams answer their own questions.'
context: 'Holman Enterprises · 2022 — present'
order: 2
tags: ['dbt', 'Databricks', 'Power BI', 'Data strategy', 'Team building', 'Delta Lake']
---

I joined Holman to lead analytics engineering. There was no analytics engineering team. Building
the platform and building the team turned out to be the same problem — the standards you set in
month two determine what thirteen people can ship in year two.

<!-- TODO Kyle: this section is the strongest place to add a concrete number.
     e.g. report request backlog before/after, time-to-first-dashboard, model count,
     or % of questions answered without a ticket. -->

## The starting condition

The pattern will be familiar to anyone who has walked into a mature company's data estate:

- Reporting logic lived inside individual Power BI files. The same metric was defined four ways
  in four reports, and all four were defensible.
- Every new question became a ticket. The analytics team was a bottleneck by design, not because
  anyone wanted it that way.
- Nobody could answer "where did this number come from" without opening a `.pbix` and reading DAX.

The instinct in that situation is to build better reports faster. That's the trap — it scales the
bottleneck instead of removing it.

## The strategy

Move the definition of business logic *out* of the reporting layer and *into* a tested,
version-controlled transformation layer, then let the reporting layer be thin.

**Lakehouse foundation on Databricks.** Delta tables as the storage substrate, with medallion
layering — raw landing, cleaned and conformed, then business-ready marts. Databricks gave us the
compute flexibility to handle both the batch ETL and the heavier PySpark work in one platform.

**dbt as the transformation contract.** This was the cultural change more than the technical one.
Every metric gets defined once, in SQL, in a repository, with tests attached and a pull request
in front of it. When finance and operations disagree about a number, the conversation happens on
a diff instead of in a meeting.

**Power BI as a thin semantic layer.** Shared, certified semantic models on top of the marts —
not one model per report. Report authors compose from governed measures rather than reinventing
them. This is where self-service becomes real: the business builds its own visuals, but it cannot
accidentally invent its own definition of gross margin.

## Building the team

Thirteen direct reports is past the point where you can review everything yourself. What scales
instead is the framework:

- **Standards before headcount.** Naming conventions, layer rules, testing minimums, and a PR
  template existed before most of the team did. Onboarding became "read this and follow it"
  rather than "shadow someone for a month."
- **Review as the teaching mechanism.** Code review is where standards actually transfer. I'd
  rather spend an hour on a thorough review than two hours writing documentation nobody reads.
- **Ownership by domain, not by ticket.** Engineers own a business domain end to end — they know
  the stakeholders, the source systems, and the quirks. Ticket-shuffling produces engineers who
  know the tooling and nothing about the business.

## What was hard

**Getting people to stop building reports.** The fastest path to a happy stakeholder is always to
just build the thing they asked for. Insisting the logic go into a model first — with tests, with
review — feels slower every single time, and is faster by about the fourth request. Holding that
line under pressure was the hardest part of the job.

**Deciding what not to model.** Not every dataset earns a dimensional model. Some things are
genuinely one-off, and forcing them through the full pipeline is ceremony, not engineering.

**Executive translation.** Leadership doesn't fund "a transformation layer." They fund faster
decisions and fewer arguments about numbers. Framing platform work in those terms — and being
honest that the payoff is quarters, not weeks — is most of what a lead actually does.

## Where it stands

The platform now supports multiple business domains across fleet, supply chain, finance, and
operations, with the analytics engineering team owning the transformation layer and business
teams building their own reporting on top of governed models.
