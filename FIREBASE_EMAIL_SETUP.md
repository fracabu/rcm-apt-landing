# 📧 Setup Firebase Cloud Functions per Email

## 🚀 Configurazione Gmail

### 1. Genera Password App Gmail

1. **Vai a Google Account**: [https://myaccount.google.com](https://myaccount.google.com)
2. **Sicurezza** → **Verifica in due passaggi** (deve essere attiva)
3. **Password per le app** → **Genera nuova password**
4. **Nome app**: "Roma Caput Mundi Firebase"
5. **Copia la password** (16 caratteri)

### 2. Configura Firebase Functions

```bash
# Imposta email Gmail
npx firebase-tools functions:config:set gmail.email="romacaputmundiguesthouse@gmail.com"

# Imposta password app Gmail (sostituisci con la tua password)
npx firebase-tools functions:config:set gmail.password="your-16-char-app-password"

# Verifica configurazione
npx firebase-tools functions:config:get
```

### 3. Deploya la Cloud Function

```bash
# Dalla cartella principale del progetto
cd functions
npm run build
cd ..
npx firebase-tools deploy --only functions
```

### 4. Test della Funzione

1. **Compila il form** sul sito
2. **Controlla console browser** per log di successo
3. **Verifica email** su `info@romacaputmundiapt.it`
4. **Controlla Firebase Console** per log delle funzioni

## 🔧 Troubleshooting

### Password App Gmail non funziona
- Verifica che la **Verifica in due passaggi** sia attiva
- Genera una **nuova password app**
- Rimuovi spazi dalla password: `npx firebase-tools functions:config:unset gmail.password`

### Function deploy fallisce
```bash
# Controlla errori di build
cd functions && npm run build

# Controlla permessi Firebase
npx firebase-tools login --reauth

# Deploy forzato
npx firebase-tools deploy --only functions --force
```

### Email non arrivano
1. **Controlla log Firebase**: [Firebase Console](https://console.firebase.google.com/) → Functions → Logs
2. **Verifica configurazione**: `npx firebase-tools functions:config:get`
3. **Controlla spam** nella casella destinazione
4. **Test con email personale** temporaneamente

## 📊 Monitoraggio

- **Firebase Console**: Metriche e log delle funzioni
- **Gmail Sent**: Verifica email inviate dall'account
- **Database**: Tutte le richieste salvate anche se email fallisce

## 🔒 Sicurezza

- ✅ **Password app** invece di password principale
- ✅ **Server-side** (più sicuro di EmailJS)
- ✅ **Logs Firebase** per debugging
- ✅ **Fallback**: salvataggio database sempre garantito

## 💰 Costi

- **125.000 invocazioni/mese** gratuite Firebase Functions
- **Gmail SMTP**: gratuito per volumi normali
- **Stima**: ~50-100 email/mese = **completamente gratuito**

## 🆘 Supporto

Se hai problemi:
1. Controlla i log in Firebase Console
2. Verifica le configurazioni con `functions:config:get`  
3. Testa con una email temporanea per debug