import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateInvoice } from '../src/invoice.js';

const valid = { id: 'inv_1', customerId: 'cus_1', amountCents: 1200, currency: 'USD', status: 'draft' };

test('a valid invoice has no errors', () => {
  assert.deepEqual(validateInvoice(valid), []);
});

test('missing and unknown fields are reported', () => {
  const { status, ...rest } = valid;
  assert.deepEqual(validateInvoice({ ...rest, colour: 'red' }), ['missing status', 'unknown field colour']);
});

test('negative amounts are rejected', () => {
  assert.deepEqual(validateInvoice({ ...valid, amountCents: -1 }), ['amountCents must be a non-negative integer']);
});

test('dueDate is optional and must be YYYY-MM-DD', () => {
  assert.deepEqual(validateInvoice({ ...valid, dueDate: '2026-12-31' }), []);
  assert.deepEqual(validateInvoice({ ...valid, dueDate: '31/12/2026' }), ['dueDate must be YYYY-MM-DD']);
});
