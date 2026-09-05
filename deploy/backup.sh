#!/usr/bin/env bash
# Nightly local backup: Postgres dump + Directus uploads, both compressed,
# kept for RETENTION_DAYS then pruned. Lives on the same disk as the server
# — protects against "I broke the CMS", not against "the server died". For
# real disaster recovery, copy BACKUP_DIR offsite too (see deploy/README.md).
#
# Usage: run manually, or via cron (see deploy/README.md for the crontab line).

set -euo pipefail
cd "$(dirname "$0")"

set -a
source .env
set +a

BACKUP_DIR="${BACKUP_DIR:-$HOME/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

echo "[$TIMESTAMP] Dumping database..."
docker compose exec -T postgres pg_dump -U "${POSTGRES_USER:-directus}" "${POSTGRES_DB:-teknofavola}" \
  | gzip > "$BACKUP_DIR/db-$TIMESTAMP.sql.gz"

echo "[$TIMESTAMP] Archiving uploads..."
docker run --rm \
  -v teknofavola_directus-uploads:/data:ro \
  -v "$BACKUP_DIR":/backup \
  alpine:latest \
  tar czf "/backup/uploads-$TIMESTAMP.tar.gz" -C /data .

echo "[$TIMESTAMP] Pruning backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -maxdepth 1 -name "db-*.sql.gz" -mtime +"$RETENTION_DAYS" -delete
find "$BACKUP_DIR" -maxdepth 1 -name "uploads-*.tar.gz" -mtime +"$RETENTION_DAYS" -delete

echo "[$TIMESTAMP] Done. Current backups:"
ls -lh "$BACKUP_DIR"
