# shared-schema

Demo repository in the **MergeFox sandbox**. It owns the `Invoice` contract
(`schema/invoice.schema.json`, `src/invoice.js`) that `api`, `web` and `worker` follow.

In a Pack it is usually **Tier 1**: change it first, then the services that use it.

Test: `node --test` (Node 22, no dependencies).

See [SCENARIOS.md](SCENARIOS.md) for the MergeFox test scenarios that use these repositories.
