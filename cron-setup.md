# Setup Auto-aggiornamento Concerti

## Configurazione cron gratuita

La collezione Firestore dei concerti può essere aggiornata automaticamente utilizzando servizi di cron gratuiti che chiamano la Firebase Function HTTP.

### Opzione 1: Cron-job.org (Raccomandato)
1. Vai su https://cron-job.org/
2. Registra un account gratuito
3. Crea un nuovo cron job con:
   - **URL**: `https://us-central1-romacaputmundiapt.cloudfunctions.net/scrapeConcerts`
   - **Frequenza**: `0 6 * * *` (ogni giorno alle 6:00 UTC / 8:00 CET)
   - **Method**: GET
   - **Timeout**: 300 secondi

### Opzione 2: UptimeRobot
1. Vai su https://uptimerobot.com/
2. Crea un monitor HTTP(s)
3. Configura:
   - **URL**: `https://us-central1-romacaputmundiapt.cloudfunctions.net/scrapeConcerts`
   - **Monitoring Interval**: 1440 minuti (24 ore)

### Opzione 3: GitHub Actions (per sviluppatori)
Crea `.github/workflows/scrape-concerts.yml`:

```yaml
name: Scrape Concerts Daily
on:
  schedule:
    - cron: '0 6 * * *'  # 6:00 UTC ogni giorno
  workflow_dispatch:  # Permette esecuzione manuale

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger scraping
        run: |
          curl -X GET "https://us-central1-romacaputmundiapt.cloudfunctions.net/scrapeConcerts"
```

## Test manuale
Puoi testare lo scraping chiamando direttamente:
```bash
curl "https://us-central1-romacaputmundiapt.cloudfunctions.net/scrapeConcerts"
```

## Stato attuale
- ✅ Firebase Function HTTP `scrapeConcerts` deployata
- ✅ Frontend legge da Firestore
- ⏳ Configurazione cron esterno necessaria per auto-aggiornamento

## Benefici
- Nessun costo aggiuntivo per Firebase
- Backup in caso il servizio cron fallisca
- Flessibilità nel cambiare servizio di cron
- Possibilità di esecuzione manuale