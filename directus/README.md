# TeknoFavola — Directus

CMS headless per il sito TeknoFavola. PostgreSQL + Directus, schema e contenuti iniziali definiti
come codice (non uno snapshot binario) così restano leggibili e rieseguibili.

## Avvio

```bash
cp .env.example .env      # personalizza prima di usarlo oltre il tuo laptop
docker compose up -d
```

Poi applica lo schema e i contenuti iniziali (entrambi idempotenti):

```bash
DIRECTUS_URL=http://localhost:8055 \
DIRECTUS_ADMIN_EMAIL=admin@teknofavola.it \
DIRECTUS_ADMIN_PASSWORD=change-me-now \
node bootstrap/bootstrap.mjs

DIRECTUS_URL=http://localhost:8055 \
DIRECTUS_ADMIN_EMAIL=admin@teknofavola.it \
DIRECTUS_ADMIN_PASSWORD=change-me-now \
node seed/seed.mjs
```

`bootstrap/schema.mjs` è la fonte di verità delle collection: per aggiungere un campo, lo si
aggiunge lì e si rilancia `bootstrap.mjs` (salta tutto ciò che esiste già).

## Collection

| Collection | Tipo | Contenuto |
| --- | --- | --- |
| `site_settings` | singleton | logo, favicon, tagline, bio home, email, footer, SEO — IT/EN |
| `events` | collection | "Le nostre favole": titolo, slug, data, flyer, descrizione IT/EN, link, gallery, featured, stato |
| `artists` | collection | roster booking: nome, slug, tipo profilo, foto, bio IT/EN, 4 social + altro, video, lavori (non-DJ), ordine, stato |
| `dj_sets` | collection | set legati a un artista (M2O `artist`), titolo, numero episodio, genere, video, flag "episodio Once Upon A Time" |
| `releases` | collection | catalogo The Fable Label, legate a un artista (M2O `artist`) |
| `services` | collection | i 5 servizi studio (nome IT/EN, descrizione) |
| `studio_info` | singleton | attrezzatura sala prove, servizi opzionali IT/EN, nota prezzi |
| `social_links` | collection | un record per canale, raggruppato per `format` (teknofavola / once_upon_a_time / fable_label / fable_studio) |
| `form_submissions` | collection | tutte le richieste dai form del sito, con `payload` completo in JSON |

`media` non è una collection separata: si usano le cartelle native di Directus create dal
bootstrap (`Logo`, `Flyer`, `Artist Photos`, `Work Photos`, `Release Covers`, `Gallery`, `Other`).

## Decisioni di schema

- **Traduzioni per colonna** (`title_it` / `title_en` ecc.) invece del pattern o2m di Directus:
  meno collection, form più semplice per un admin non tecnico, comunque bilingue e senza nulla
  hardcoded nel frontend.
- **Gallery/lavori artista come repeater JSON** — un campo `list` con un sotto-campo file, non una
  vera relazione M2M-to-files. È una scelta pragmatica per poterla creare via API senza la
  configurazione più complessa delle relazioni M2M native; l'esperienza in Directus resta comunque
  un elenco di immagini ripetibile.
- **`dj_sets.is_once_upon_a_time_episode`**: un DJ set può esistere solo per il booking, oppure
  essere marcato per comparire anche come episodio numerato nel formato Once Upon A Time — evita
  di duplicare il contenuto in due collection.
- **Permessi**: il bootstrap crea solo lo schema. Il ruolo "content editor" (accesso limitato ai
  contenuti, niente schema/utenti/impostazioni) va creato a mano nel pannello — Directus non
  espone questa parte in modo altrettanto sicuro da automatizzare con un token statico ad ampio
  raggio.

## Token per il sito

Il sito (in `app/`) legge i contenuti con un token **statico**, di sola lettura, associato a un
ruolo pubblico che vede solo i record pubblicati. Non usare mai il token/le credenziali admin nel
frontend. Crea il ruolo e il token dal pannello Directus dopo il primo bootstrap, poi impostali
come `DIRECTUS_TOKEN` nell'app.
