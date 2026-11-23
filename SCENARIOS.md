# MergeFox sandbox scenarios

These scenarios exercise MergeFox S1 (advisory Pack tracker) with the **MergeFox Staging** App
installed on the `MergeFoxSandbox` org. Open the PRs only while MergeFox is running and the
App's webhook is active, so every event is seen from the start.

Repositories: `shared-schema` (public), `api` (private), `web` (public), `worker` (private).

Each scenario lists what to do and what MergeFox should show. Record the result (pass, fail,
notes, screenshots) in the MergeFox repository's `docs/TEST_PLAN.md` §3.4.

## 1. Ticket-key Pack across three repositories

1. Push branch `ENG-101-add-due-date` in `shared-schema`, `api` and `web` (a `dueDate` field).
2. Open one PR per branch.

Expected: one Pack with the 3 PRs; a status card on each PR listing them by tier; a `packgate`
check run on each, `neutral`, title starting with `Advisory:`.

## 2. Link by description

1. In `worker`, open a PR from `ENG-102-receipt-retry` whose description contains
   `Depends on MergeFoxSandbox/api#<n>` (the scenario-1 api PR).

Expected: the worker PR joins the scenario-1 Pack, downstream of `api`.

## 3. Commands

On any Pack member, comment:

- `/pack add MergeFoxSandbox/worker#<n>`: joins, "Last command" line updated, no reply.
- `/pack remove MergeFoxSandbox/web#<n>`: leaves; MergeFox does not add it back automatically.
- `/pack after MergeFoxSandbox/api#<n>`: this PR waits for api; tiers change.
- `/pack refresh`: card re-rendered.
- Errors, each with one reply: `/pack add web#1` (malformed, R-02b); a PR that does not exist
  (R-05); a command from an account without write access (R-01, needs a second account);
  `/pack after` naming the PR itself (R-12).

## 4. Same-repository candidate

1. Open two PRs in `api` only, the second with `/pack add MergeFoxSandbox/api#<first>`.

Expected: linked as a candidate, no card (a Pack needs PRs from at least 2 repositories).
Adding a PR from another repository turns it into a Pack.

## 5. Wrong-order merge

1. In a Pack, merge the `web` PR before the `api` PR.

Expected: the advisory card and check show the order was not followed; nothing is blocked (S1).

## 6. Escaping (L2-03)

1. Open a Pack member whose title contains `@MergeFoxSandbox/team` and `https://example.com`.

Expected: the card and the check summary show them as text, with no mention or autolink.

## 7. Required check (L2-09)

1. In `api`, add a ruleset or branch protection on `main` that requires the `packgate` check.
2. Open a Pack member PR in `api` and try to merge it.

Expected: the advisory `neutral` `packgate` lets the PR merge (S1 never holds a merge).
If it is blocked, that is an S1 release blocker.
