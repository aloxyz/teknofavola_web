# Deploy — un unico server

Sito (SvelteKit) + CMS (Directus/Postgres) + reverse proxy con HTTPS automatico (Caddy), tutto su
un solo VPS con Docker Compose. Pensato per un server piccolo (2 vCPU / 4GB RAM, es. Hetzner CX23).

## 1. Crea il server

Su [Hetzner Cloud Console](https://console.hetzner.cloud):

- Immagine: **Ubuntu 24.04**
- Tipo: **CX23** (o CAX11 se preferisci ARM, stesso prezzo circa)
- Location: **Falkenstein** o **Nuremberg** (bassa latenza per l'Italia)
- SSH key: aggiungi la tua chiave pubblica (`~/.ssh/id_ed25519.pub`) in fase di creazione — niente
  password da gestire dopo
- Firewall: apri **22 (SSH)**, **80** e **443** (HTTP/HTTPS) — nient'altro va esposto pubblicamente

A creazione avvenuta avrai un IP pubblico. Serve per il passo 2 e per collegarti via
`ssh root@<ip>`.

## 2. Punta il dominio

Dal pannello DNS di `teknofavola.it` (dove l'hai registrato), aggiungi:

| Tipo | Nome | Valore |
| --- | --- | --- |
| A | `@` | `<ip del server>` |
| A | `www` | `<ip del server>` |
| A | `admin` | `<ip del server>` |

La propagazione può richiedere da pochi minuti a qualche ora. Caddy (passo 4) richiede che il DNS
sia già propagato per poter emettere i certificati HTTPS al primo avvio.

## 3. Prepara il server

```bash
ssh root@<ip>
apt update && apt install -y docker.io docker-compose-plugin git
```

## 4. Clona il repo e configura

```bash
git clone git@github.com:aloxyz/teknofavola_web.git
cd teknofavola_web/deploy
cp .env.example .env
```

Genera i segreti richiesti dal file e incollali in `.env`:

```bash
openssl rand -hex 24   # -> POSTGRES_PASSWORD
openssl rand -hex 32   # -> DIRECTUS_KEY
openssl rand -hex 32   # -> DIRECTUS_SECRET
openssl rand -hex 32   # -> FORM_IP_SALT
```

Imposta anche `DOMAIN=teknofavola.it` e una password vera per `DIRECTUS_ADMIN_PASSWORD` (usata
solo al primo avvio per creare l'account admin — cambiala dal pannello subito dopo).

## 5. Avvia

```bash
docker compose up -d --build
```

Al primo avvio Caddy richiede i certificati TLS a Let's Encrypt (serve il DNS già puntato, vedi
passo 2) — segui i log con `docker compose logs -f caddy` se qualcosa non va online subito.

## 6. Schema, contenuti e permessi

Stessi tre script usati in locale (vedi `directus/README.md`), ma puntati al dominio pubblico:

```bash
cd ../directus
DIRECTUS_URL=https://admin.teknofavola.it \
DIRECTUS_ADMIN_EMAIL=admin@teknofavola.it \
DIRECTUS_ADMIN_PASSWORD=<quella scelta nel passo 4> \
node bootstrap/bootstrap.mjs

# stesso comando con seed/seed.mjs, poi con bootstrap/permissions.mjs
```

## Verifica

- `https://teknofavola.it` → sito
- `https://admin.teknofavola.it` → pannello Directus

## Aggiornare dopo un nuovo push

```bash
cd teknofavola_web
git pull
cd deploy
docker compose up -d --build
```

Se lo schema è cambiato, rilancia anche `bootstrap.mjs` / `permissions.mjs` (passo 6) — sono
idempotenti, non toccano nulla che esiste già.

## Backup

Due cose contengono dati reali e vanno backuppate periodicamente:

- Il volume `db-data` (Postgres — schema e contenuti): `docker compose exec postgres pg_dump -U directus teknofavola > backup.sql`
- Il volume `directus-uploads` (media caricati: logo, flyer, foto, video…)

## Cosa NON è incluso

- **Repliche multiple**: il rate limiter dei form è in-memory, va bene per una singola istanza
- **Notifiche email** sulle richieste dei form: vedi nota nel README principale (SMTP/Resend/Postmark)
