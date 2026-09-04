# TeknoFavola — handoff a Claude Code

## Cosa c'è in questo progetto
- `TeknoFavola Site.dc.html` — design di riferimento del sito pubblico (home, Le nostre favole, Booking artist, 3 pagine coming soon, footer, pannello evento). Bilingue IT/EN.
- `TeknoFavola CMS.dc.html` — design del pannello Directus, con la sezione GUIDA AL SISTEMA (8 capitoli: architettura, flusso di pubblicazione, collection, relazioni, pagine, media, sicurezza, crescita futura).
- `checkpoint/` — stato congelato del 04-09 prima della revisione.
- `_ds/modernist-…/` — design system vincolante (Archivo, raggio 0, righe 2px, allineamento a sinistra, accento singolo).
- `assets/logo-tf-*.png` — logo fornito dal cliente.

## Stack target
SvelteKit + TypeScript · Directus · PostgreSQL · storage media collegato a Directus.
Nessun contenuto editoriale nel codice: tutto da API.

## Token visivi (già usati come CSS custom properties nel design)
```
--tf-bg #0b0b0b   --tf-bg-2 #111010   --tf-bg-3 #151414
--tf-ink #f3f2f2  --tf-ink-2 rgba(243,242,242,.78)  --tf-ink-3 rgba(243,242,242,.64)
--tf-line rgba(243,242,242,.32)  --tf-line-2 rgba(243,242,242,.2)  --tf-field rgba(243,242,242,.5)
--tf-accent #ff563c  --tf-accent-hi #ff9783
```
Tipografia: Archivo 400/500/700/800/900. Nessun raggio, nessuna ombra, righe 2px.

## Collection Directus
`site_settings` (singleton), `events`, `artists`, `dj_sets`, `releases`, `services`, `studio_info`, `social_links`, `form_submissions`, `media`.

Relazioni: `dj_sets.artist → artists`, `releases.artist → artists`, `events.flyer/gallery → media`, `social_links.format` (enum: teknofavola / once_upon_a_time / fable_label / fable_studio).

## Route
`/` · `/favole` · `/favole/[slug]` · `/booking` · `/booking/[slug]` · `/once-upon-a-time` · `/once-upon-a-time/[slug]` · `/label` · `/studio`

## Stati da implementare lato SvelteKit
Il design li copre tutti (prop `dataState` nel pannello Tweaks: ready / loading / error / empty / stress):
- **loading** — skeleton, `role="status"`, no layout shift.
- **error** — `+error.svelte` con titolo, spiegazione, RIPROVA, mailto.
- **empty** — nessun record pubblicato: messaggio dedicato per prossimi eventi, eventi passati, indice artisti, social, dj set.
- **stress** — titoli e bio lunghi, 24 eventi, 36 artisti: griglie e colonne restano integre (`overflow-wrap:anywhere` sui titoli).

## Da rifinire in Claude Code
1. Form: validazione server, honeypot + rate limit, scrittura in `form_submissions`, invio email. Il design ha già `type`, `name`, `autocomplete`, `required` e messaggio di conferma con `aria-live`.
2. Focus trap completo nel pannello evento (ora: Escape + focus iniziale sul pulsante di chiusura).
3. Immagini responsive: `srcset`/`sizes` dai preset Directus, `loading="lazy"`, `width`/`height` per evitare CLS.
4. i18n: il design usa un dizionario in memoria; in produzione va su `site_settings` + campi tradotti Directus e su `<html lang>` / rotte localizzate.
5. SEO: meta, Open Graph, card X, canonical, sitemap, favicon da `site_settings`.
6. Seed iniziale: 7 eventi, 12 artisti, 8 social (7 con URL vuoto), 5 servizi, attrezzatura sala prove.
7. Dati mancanti da chiedere al cliente: bio TeknoFavola, date e flyer degli eventi, foto e bio artisti, tipo di profilo dei non-DJ, link social dei tre format, P.IVA per il footer.
