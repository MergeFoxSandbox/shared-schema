// Invoice contract shared by api, web and worker (they copy these fields by hand, as polyrepos do).
export const CURRENCIES = ['USD', 'EUR', 'INR'];
export const STATUSES = ['draft', 'sent', 'paid'];
export const INVOICE_FIELDS = ['id', 'customerId', 'amountCents', 'currency', 'status', 'dueDate'];

export function validateInvoice(invoice) {
  const errors = [];
  if (typeof invoice !== 'object' || invoice === null) return ['invoice must be an object'];
  for (const field of INVOICE_FIELDS.filter((f) => f !== 'dueDate')) {
    if (!(field in invoice)) errors.push(`missing ${field}`);
  }
  for (const field of Object.keys(invoice)) {
    if (!INVOICE_FIELDS.includes(field)) errors.push(`unknown field ${field}`);
  }
  if ('amountCents' in invoice && (!Number.isInteger(invoice.amountCents) || invoice.amountCents < 0)) {
    errors.push('amountCents must be a non-negative integer');
  }
  if ('currency' in invoice && !CURRENCIES.includes(invoice.currency)) errors.push('unknown currency');
  if ('dueDate' in invoice && !/^\d{4}-\d{2}-\d{2}$/.test(invoice.dueDate)) errors.push('dueDate must be YYYY-MM-DD');
  if ('status' in invoice && !STATUSES.includes(invoice.status)) errors.push('unknown status');
  return errors;
}
