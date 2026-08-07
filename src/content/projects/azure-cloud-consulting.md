---
title: 'Azure data platforms for small and mid-sized business'
summary: 'Three years of independent consulting — cloud adoption, Azure data platforms, and analytics for organizations without a data team to inherit them.'
context: 'Freelance · 2019 — 2022'
order: 4
tags: ['Azure', 'ADF', 'SQL Server', 'Power BI', 'Power Platform', 'Consulting']
---

Consulting for small and mid-sized organizations is a different engineering problem than
enterprise work, and it made me better at the enterprise work. When the client has no data team,
every decision you make is a decision they'll live with unsupported.

## What the engagements looked like

Cloud adoption and platform builds, typically end to end:

- **Azure data platforms** — landing, transformation, and serving layers on Azure SQL, Data
  Factory, and Blob/Data Lake storage. Sized for the business, not for a reference architecture
  diagram.
- **Analytics models** — dimensional models in SQL Server, surfaced through Power BI, built so a
  non-specialist could extend them.
- **Business applications** — Power Platform apps replacing spreadsheet workflows, wired into the
  same data estate rather than becoming another silo.
- **Digital strategy** — the part before the code: what's actually worth automating, what should
  stay manual, and what sequence gets value out fastest.

## The constraint that shaped everything

There is no platform team after you leave.

That single fact rules out a lot of otherwise-good architecture. A pipeline that requires someone
to understand Spark is a pipeline that breaks permanently the first time it fails. So:

- **Boring, managed services over clever ones.** Azure SQL and ADF over anything requiring
  cluster tuning. The best tool is the one that still works in eighteen months without you.
- **Fewer moving parts, even at some cost in elegance.** Every additional service is another
  thing that can break and another thing nobody on site understands.
- **Documentation as a deliverable, not an afterthought.** Runbooks for the three things most
  likely to go wrong, written for the office manager who'll be the one reading them at 7am.
- **Cost visibility from day one.** SMB budgets don't absorb a surprise cloud bill. Alerts and
  right-sizing were part of the build, not a follow-up engagement.

## What it taught me

Working without a safety net makes you honest about complexity. In a large organization it's easy
to add a tool because the team can absorb it. When the client absorbs it alone, you find out
quickly which complexity was actually earning its keep.

I still apply the test: *if the person who built this left tomorrow, does it survive?* Most of
the standards I set later at enterprise scale trace back to that question.
