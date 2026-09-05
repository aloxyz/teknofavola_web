#!/usr/bin/env node
// Grants the anonymous Public policy exactly the access the site's frontend
// needs: read on published/active content, plus create on form_submissions
// so the contact forms can write (nobody gets read on that collection, so
// visitors can't browse each other's submissions).
//
// This is what `app/`'s DIRECTUS_TOKEN would otherwise require a hand-made
// role for — using the built-in Public policy, scoped per collection, is the
// standard Directus pattern for a public content site and needs no secret
// to manage. Safe to re-run: every grant is skipped if it already exists.
//
// Usage: same env vars as bootstrap.mjs, run after bootstrap.mjs (and before
// or after seed.mjs — order with seed doesn't matter).

import { collections } from './schema.mjs';

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
  return (await res.json()).data.access_token;
}

let TOKEN;

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${TOKEN}` },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text}`);
  return json?.data ?? null;
}

async function getPublicPolicy() {
  const policies = await api('GET', '/policies?filter[name][_eq]=$t:public_label');
  const policy = policies && policies[0];
  if (!policy) throw new Error('Public policy not found — is this a fresh Directus instance?');
  return policy;
}

async function ensurePermission(policyId, collection, action, filter, fields = ['*']) {
  const existing = await api(
    'GET',
    `/permissions?filter[policy][_eq]=${policyId}&filter[action][_eq]=${action}&filter[collection][_eq]=${collection}&limit=-1`
  );
  if (existing.length) {
    console.log(`= ${action} on ${collection} already granted`);
    return;
  }
  console.log(`+ granting ${action} on ${collection}`);
  await api('POST', '/permissions', { policy: policyId, collection, action, permissions: filter, fields });
}

// Collections with no status field are either singletons (whole-site
// content, safe to read unfiltered) or form_submissions (never publicly
// readable — see SKIP_PUBLIC_READ below).
const PUBLISHED_FILTER = { status: { _eq: 'published' } };
const CUSTOM_FILTERS = {
  social_links: { active: { _eq: true } }
};
const SKIP_PUBLIC_READ = new Set(['form_submissions']);

async function main() {
  TOKEN = await getToken();
  const policy = await getPublicPolicy();
  console.log(`Public policy: ${policy.id}\n`);

  for (const def of collections) {
    if (SKIP_PUBLIC_READ.has(def.collection)) continue;
    const filter = CUSTOM_FILTERS[def.collection] ?? (def.statusField ? PUBLISHED_FILTER : {});
    await ensurePermission(policy.id, def.collection, 'read', filter);
  }

  // Needed to serve uploaded media (logo, flyers, artist photos…) via /assets/:id.
  await ensurePermission(policy.id, 'directus_files', 'read', {});

  // Contact/booking/demo/request forms write here; read stays admin-only.
  await ensurePermission(policy.id, 'form_submissions', 'create', {}, ['type', 'name', 'email', 'payload', 'ip_hash']);

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
