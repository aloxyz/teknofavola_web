# TeknoFavola — sito

SvelteKit + TypeScript, contenuti letti da Directus (vedi `../directus`). Nessun testo
editoriale è scritto in questo codice: eventi, artisti, DJ set, release, servizi, social e i
testi del sito arrivano tutti dal CMS — vedi la root README del repository per la panoramica
completa e il resto della doc di progetto.

## Sviluppo

```bash
cp .env.example .env.local
npm install
npm run dev
```

Il sito funziona anche senza Directus raggiungibile: ogni sezione mostra lo stato di errore
previsto invece di rompersi (utile per lavorare sul frontend senza il CMS acceso).

```bash
npm run check   # type-check (svelte-check)
npm run build   # build di produzione (adapter-node) in ./build
npm run preview # serve la build di produzione in locale
```

## Struttura

```
src/
  lib/
    components/
      layout/     Sidebar, logo, lingua, footer — usati dal layout radice
      ui/         Componenti riusabili (card evento, form, drawer, ecc.)
      views/      Composizione di più componenti ui/ per una pagina intera
    server/
      directus.ts     Client Directus lato server (token statico)
      api/            Una funzione per collection, sempre try/catch → null in caso di errore
      rateLimit.ts    Rate limiter in-memory per /api/submit
    i18n/         Dizionario UI IT/EN
    utils/        Helper puri (date, asset URL, video embed, localizzazione campi CMS)
    config/       Costanti UI (nav, format social, tipi profilo) — non contenuto editoriale
    types/        Tipi TypeScript delle collection Directus
  routes/         Una cartella per rotta, +page.server.ts fa il fetch, +page.svelte compone la view
```

## Variabili d'ambiente

Vedi `.env.example`. In breve: `DIRECTUS_URL`/`DIRECTUS_TOKEN` sono lato server (mai esposte al
browser); `PUBLIC_DIRECTUS_URL` è quella che il browser usa per caricare le immagini;
`PUBLIC_SITE_ORIGIN` serve solo per generare URL assoluti in `sitemap.xml`/`robots.txt`.

## Docker

```bash
docker build -t teknofavola-web .
docker run -p 3000:3000 --env-file .env teknofavola-web
```
