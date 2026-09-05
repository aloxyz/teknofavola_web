# TeknoFavola — sito + CMS

Sito web per il collettivo tekno/techno/elettronica **TeknoFavola**: SvelteKit + TypeScript in
lettura, contenuti gestiti interamente da **Directus** (CMS headless) su **PostgreSQL**. Nessun
contenuto editoriale è scritto nel codice — eventi, artisti, DJ set, release, servizi, social e
testi del sito arrivano tutti dal CMS.

Il design di riferimento (mockup Claude Design, bilingue IT/EN, dark/underground, tipografia
Archivo, un solo accento) è stato implementato pixel-per-pixel in `app/`. Il bundle originale del
design resta in `project/` e `chats/` come riferimento storico.

## Struttura del repository

```
app/                    Sito pubblico — SvelteKit + TypeScript (adapter-node)
directus/               Infrastruttura CMS — docker-compose, schema, seed
project/                Bundle di design originale (Claude Design) — riferimento
chats/                  Trascrizione della conversazione di design — riferimento
HANDOFF.md (in project/)  Note di handoff scritte durante la fase di design
```

## Avvio in locale

### 1. CMS (Directus + PostgreSQL)

```bash
cd directus
cp .env.example .env      # personalizza password/chiavi prima di andare oltre il tuo laptop
docker compose up -d
```

Al primo avvio Directus crea l'account admin con `DIRECTUS_ADMIN_EMAIL` /
`DIRECTUS_ADMIN_PASSWORD` (default nel `.env.example`). Poi popola lo schema e i contenuti
iniziali (idempotente, si può rilanciare):

```bash
cd directus
DIRECTUS_URL=http://localhost:8055 \
DIRECTUS_ADMIN_EMAIL=admin@teknofavola.it \
DIRECTUS_ADMIN_PASSWORD=change-me-now \
node bootstrap/bootstrap.mjs

DIRECTUS_URL=http://localhost:8055 \
DIRECTUS_ADMIN_EMAIL=admin@teknofavola.it \
DIRECTUS_ADMIN_PASSWORD=change-me-now \
node seed/seed.mjs

DIRECTUS_URL=http://localhost:8055 \
DIRECTUS_ADMIN_EMAIL=admin@teknofavola.it \
DIRECTUS_ADMIN_PASSWORD=change-me-now \
node bootstrap/permissions.mjs
```

Il pannello è su `http://localhost:8055`. Vedi `directus/README.md` per la struttura completa
delle collection e per cosa fa ciascuno dei tre script.

### 2. Sito (SvelteKit)

Non serve Directus per vedere il sito: senza backend raggiungibile, ogni sezione mostra lo stato
di errore già previsto invece di rompersi (verificato in questa sessione).

```bash
cd app
cp .env.example .env.local   # punta DIRECTUS_URL/PUBLIC_DIRECTUS_URL a Directus quando è su
npm install
npm run dev
```

Sito su `http://localhost:5173`.

## Cosa implementa

- **Home**: logo (asset CMS, con fallback locale se non impostato), parallasse al mouse, tagline,
  bio, email, social raggruppati per format (TeknoFavola / Once Upon a Time / The Fable Label /
  The Fable Studio) — link vuoti mostrati come non disponibili, mai come link rotti.
- **Le nostre favole** (`/favole`, `/favole/[slug]`): eventi divisi automaticamente in prossimi
  (data futura) e passati (data passata o assente), pannello di dettaglio con focus trap, Escape,
  gallery, meta.
- **Booking artist** (`/booking`, `/booking/[slug]`): indice alfabetico, scheda artista che si
  adatta al `profile_type` (DJ → foto + video + DJ set; altri profili → 3 lavori), form di
  booking pre-compilato con l'artista selezionato.
- **Once Upon A Time** (`/once-upon-a-time`, `/once-upon-a-time/[slug]`): COMING SOON finché non
  esiste un episodio pubblicato (`dj_sets.is_once_upon_a_time_episode`), poi lista episodi e
  pagina di dettaglio con video ed embed solo per URL YouTube/Vimeo riconosciuti.
- **The Fable Label** (`/label`): COMING SOON finché `releases` è vuota, poi griglia release.
- **The Fable Studio** (`/studio`): banner COMING SOON permanente (studio non ancora prenotabile
  online) ma con contenuti reali dal CMS — servizi, attrezzatura sala prove, servizi opzionali,
  nota prezzi.
- **Form**: componente riutilizzabile con honeypot, validazione, endpoint `/api/submit` con rate
  limit in-memory, scrittura in `form_submissions` (Directus).
- **i18n**: IT/EN, cookie di preferenza + negoziazione da `Accept-Language`, `<html lang>`
  aggiornato, dizionario UI in `app/src/lib/i18n/dictionary.ts`, contenuti CMS bilingue via coppie
  di campi `_it` / `_en` (scelta più semplice delle traduzioni o2m di Directus, adeguata al volume
  di testo del progetto — vedi nota in `directus/bootstrap/schema.mjs`).
- **SEO**: title/description/OG/Twitter da `site_settings`, `sitemap.xml` e `robots.txt`
  generati dinamicamente dai contenuti pubblicati.
- **Stati**: ogni sezione dati (eventi, artisti, DJ set, release, servizi, social) gestisce
  singolarmente errore (Directus irraggiungibile), vuoto (nessun record pubblicato) e presente —
  verificato con un mock del CMS durante questa sessione.

## Decisioni prese senza chiedere (e perché)

1. **Traduzioni per colonna, non o2m**: campi `_it`/`_en` affiancati invece del pattern
   traduzioni-a-collection di Directus. Meno collection, form ammnistrativo più semplice, stesso
   risultato per un sito bilingue con poche decine di campi testuali.
2. **Media come libreria nativa Directus**, non una collection `media` duplicata: cartelle
   (Logo, Flyer, Artist Photos, …) create dal bootstrap, si usa `directus_files` così com'è.
3. **Gallery e lavori artista come repeater JSON** (`{file: uuid}[]`) invece di una vera relazione
   M2M-to-files: molto più semplice da creare via API di bootstrap, stessa esperienza in
   Directus (interfaccia "list" con selezione file), facilmente sostituibile in futuro se serve.
4. **Toggle "DJ / CREATIVO" del mockup rimosso**: nel design serviva a confrontare due varianti di
   layout sullo stesso artista finto; in produzione il layout segue semplicemente il
   `profile_type` reale di ciascun artista.
5. **Video mai auto-embeddati se non riconosciuti**: solo URL YouTube/Vimeo validi diventano un
   player; qualunque altro link resta un collegamento "guarda ↗", come richiesto nel brief.

## Cosa manca prima di andare online

Vedi anche `project/HANDOFF.md` per il contesto originale.

1. **Verificare `docker compose up` e i due script** su una macchina con accesso a Docker Hub —
   non eseguibile in questa sandbox (vedi nota sopra).
2. **Contenuti reali da richiedere al cliente**: bio TeknoFavola, date/flyer/descrizioni degli
   eventi, foto e bio degli artisti, tipo di profilo per Fabiana Miroddi e Kevin Mazzarello, link
   social dei tre format (Once Upon A Time, The Fable Label, The Fable Studio), P.IVA per il
   footer.
3. **Ruolo Directus "content editor"** limitato ai contenuti (nessun accesso a schema/utenti) —
   lo schema è pronto, il ruolo va creato nel pannello.
4. **Email transazionali**: l'endpoint form salva già ogni richiesta in `form_submissions`; se si
   vuole anche una notifica via email va aggiunto un provider SMTP (es. tramite un flow Directus o
   un servizio come Resend/Postmark).
5. **Rate limiter distribuito**: quello incluso è in-memory, va bene per una singola istanza; con
   più repliche serve uno store condiviso (Redis o la stessa Directus).
6. ~~**Hosting**~~ — vedi `deploy/README.md`: un unico VPS con Docker Compose (sito + Directus +
   Postgres + Caddy per HTTPS automatico su `teknofavola.it` / `admin.teknofavola.it`).

## Caricare su una tua repo GitHub

Questa cartella non è ancora collegata a nessun remote. Per pubblicarla su una tua repo:

```bash
# dalla root del progetto
git remote add origin https://github.com/<tuo-utente>/<tuo-repo>.git
git branch -M main
git push -u origin main
```

Se la repo su GitHub esiste già con dei file (es. un README creato dall'interfaccia), crea prima
la repo vuota (senza README/licenza) oppure usa `git push -u origin main --force` solo se sei
sicuro di voler sovrascrivere il suo contenuto.
