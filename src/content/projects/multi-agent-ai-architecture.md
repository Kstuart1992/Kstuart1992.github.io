---
title: 'Multi-agent AI architecture on governed data'
summary: 'Designed and implemented multi-agent systems on Microsoft AI Foundry, Copilot Studio, and Databricks — grounded in the warehouse, scoped by real permissions, and evaluated rather than demoed.'
context: 'Holman Enterprises · 2023 — present'
order: 3
tags: ['AI Foundry', 'Copilot Studio', 'Databricks', 'Multi-agent', 'RAG', 'Evaluation']
---

The AI Engineering team exists for a specific reason: the analytics platform made governed data
available, and the obvious next question was whether people could just *ask* it things. The
answer is yes — but almost none of the difficulty is in the model.

<!-- TODO Kyle: add one concrete agent use case with a real outcome if you're able to
     share it — adoption, deflection rate, time saved. Specifics beat architecture here. -->

## The premise

An agent is only as trustworthy as the data underneath it and the boundaries around it. We had
spent two years making the warehouse trustworthy. That's what made agents viable — not the
arrival of better models.

So the architecture starts from the data layer, not the chat interface.

## Design

**Specialist agents over one generalist.** A single agent with fifteen tools and a 4,000-word
system prompt degrades in ways that are hard to debug. Instead: narrow agents with a small tool
surface and a clear domain, plus an orchestrator that routes. Each agent is independently
testable, and a bad answer traces to one component.

**Grounding in the semantic layer, not raw tables.** Pointing an agent at raw warehouse tables
means it has to rediscover business logic that already exists — and it will get it subtly wrong.
Grounding against the governed marts and semantic models means the agent inherits the same metric
definitions the dashboards use. Consistency comes free.

**Permissions are not a prompt instruction.** Access control is enforced at the data layer,
through the same RBAC that governs the warehouse. An agent asked for data the user can't see
returns nothing because the query returns nothing — not because the model was politely asked to
decline.

**Retrieval tuned to the corpus.** Different content needs different retrieval. Structured
metrics go through the semantic layer. Policy and procedure documents go through chunked vector
search with metadata filters. Treating those the same produces an agent that's mediocre at both.

## Platform choices

| Layer | Tooling | Why |
| --- | --- | --- |
| Orchestration & custom agents | Microsoft AI Foundry | Model flexibility, evaluation tooling, and it sits inside the Azure governance we already had |
| Business-facing conversational surface | Copilot Studio | Meets users in Teams, where they already work — adoption is a distribution problem before it's a capability problem |
| Data-grounded agents & retrieval | Databricks | The data is already there; keeping retrieval next to it avoids a second copy of the truth |

The unglamorous point: we chose tools that fit the governance and identity model already in
place. An AI stack that requires its own parallel security review is an AI stack that ships a
year late.

## Evaluation

This is where most agent projects are thin, so it's where we invested.

- **A golden question set per agent** — real questions from real users, with reviewed correct
  answers. Regression runs against it before anything ships.
- **Grounding checks, not just answer quality.** The failure mode that erodes trust isn't a wrong
  answer, it's a confident wrong answer with a citation that doesn't support it. We check whether
  retrieved context actually contains the claim.
- **Refusal calibration.** An agent that answers everything is worse than one that says "I don't
  have that." Measuring appropriate refusal is as important as measuring accuracy.
- **Human review in the loop early.** Domain experts reviewed outputs during rollout, and their
  corrections fed back into the question set.

## Honest limitations

- Natural-language-to-SQL over a genuinely complex schema is still the hardest unsolved piece.
  Constraining it to the semantic layer helps enormously; it doesn't eliminate the problem.
- Agents inherit every data quality issue underneath them, and make those issues far more visible
  than a dashboard does. That's ultimately healthy, but it means agent projects surface data
  problems you have to fix before you can ship.
- Adoption is a change management problem. The engineering is the smaller half.
