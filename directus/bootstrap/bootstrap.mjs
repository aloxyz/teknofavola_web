#!/usr/bin/env node
// Idempotent Directus schema bootstrap for TeknoFavola.
//
// Usage:
//   DIRECTUS_URL=http://localhost:8055 \
//   DIRECTUS_ADMIN_EMAIL=admin@teknofavola.it \
//   DIRECTUS_ADMIN_PASSWORD=change-me-now \
//   node bootstrap/bootstrap.mjs
//
// Safe to re-run: every step checks whether the collection/field/relation/
// folder already exists before creating it, so applying it twice is a no-op
// the second time.

import { collections, folders } from './schema.mjs';

const BASE = (process.env.DIRECTUS_URL || 'http://localhost:8055').replace(/\/$/, '');

async function getToken() {
  if (process.env.DIRECTUS_ADMIN_TOKEN) return process.env.DIRECTUS_ADMIN_TOKEN;
  const email = process.env.DIRECTUS_ADMIN_EMAIL;
  const password = process.env.DIRECTUS_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error('Set DIRECTUS_ADMIN_TOKEN, or DIRECTUS_ADMIN_EMAIL + DIRECTUS_ADMIN_PASSWORD.');
  }
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.data.access_token;
}

let TOKEN;

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${TOKEN}`
    },
    body: body ? JSON.stringify(body) : undefined
  });
  // This Directus version returns 403 (not 404) for GET on a collection/item
  // that doesn't exist, to avoid leaking existence to unauthorized callers.
  // Since this script always authenticates as an admin, a 403 on a GET can
  // only mean "not found" here, so treat it the same as a real 404.
  if (res.status === 404 || (method === 'GET' && res.status === 403)) return null;
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(`${method} ${path} -> ${res.status}: ${text}`);
  }
  return json?.data ?? null;
}

async function ensureCollection(def) {
  const existing = await api('GET', `/collections/${def.collection}`);
  if (existing) {
    console.log(`= collection ${def.collection} already exists`);
    return;
  }
  console.log(`+ creating collection ${def.collection}`);
  await api('POST', '/collections', {
    collection: def.collection,
    meta: {
      icon: def.icon,
      note: def.note,
      singleton: !!def.singleton,
      sort_field: def.sortField || null,
      archive_field: def.statusField ? 'status' : null,
      archive_value: def.statusField ? 'archived' : null,
      unarchive_value: def.statusField ? 'draft' : null,
      archive_app_filter: !!def.statusField
    },
    schema: { name: def.collection },
    fields: [
      {
        field: 'id',
        type: 'uuid',
        meta: { hidden: true, interface: 'input', readonly: true, special: ['uuid'] },
        schema: { is_primary_key: true, length: 36, has_auto_increment: false }
      },
      ...(def.singleton
        ? []
        : [
            {
              field: 'date_created',
              type: 'timestamp',
              meta: { special: ['date-created'], interface: 'datetime', readonly: true, hidden: true, width: 'half' },
              schema: {}
            },
            {
              field: 'date_updated',
              type: 'timestamp',
              meta: { special: ['date-updated'], interface: 'datetime', readonly: true, hidden: true, width: 'half' },
              schema: {}
            }
          ])
    ]
  });
}

async function ensureFields(def) {
  const existingFields = (await api('GET', `/fields/${def.collection}`)) || [];
  const existingNames = new Set(existingFields.map((f) => f.field));

  for (const field of def.fields) {
    if (existingNames.has(field.field)) {
      console.log(`  = field ${def.collection}.${field.field} already exists`);
      continue;
    }
    console.log(`  + creating field ${def.collection}.${field.field}`);
    await api('POST', `/fields/${def.collection}`, {
      field: field.field,
      type: field.type,
      meta: field.meta,
      schema: field.schema
    });

    if (field.relation) {
      console.log(`    + relation ${def.collection}.${field.field} -> ${field.relation.related_collection}`);
      await api('POST', '/relations', {
        collection: def.collection,
        field: field.field,
        related_collection: field.relation.related_collection,
        meta: field.relation.one_field ? { one_field: field.relation.one_field } : undefined
      });
    }
  }
}

async function ensureFolders() {
  const existing = (await api('GET', '/folders')) || [];
  const existingNames = new Set(existing.map((f) => f.name));
  for (const name of folders) {
    if (existingNames.has(name)) {
      console.log(`= folder "${name}" already exists`);
      continue;
    }
    console.log(`+ creating folder "${name}"`);
    await api('POST', '/folders', { name });
  }
}

async function main() {
  TOKEN = await getToken();
  console.log(`Bootstrapping schema against ${BASE}\n`);

  for (const def of collections) {
    await ensureCollection(def);
    await ensureFields(def);
  }

  await ensureFolders();

  console.log('\nDone. Schema is up to date.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
