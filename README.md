# Roma Caput Mundi Apartment
prova

Una single-page application moderna e responsive per un appartamento turistico di lusso a Roma, progettata per incentivare le prenotazioni dirette.

## 🚀 Funzionalità

### Landing Page
- **Hero Section** con call-to-action prominente
- **Sezione Servizi** con icone e descrizioni
- **Galleria Fotografica** interattiva con lightbox
- **Recensioni** dei clienti soddisfatti
- **Form di Contatto** per richieste di prenotazione
- **Design Responsive** ottimizzato per tutti i dispositivi

### Funzionalità Avanzate
- **Firebase Integration** per autenticazione e database
- **Admin Area** riservata per gestire le prenotazioni
- **Cookie Banner** conforme GDPR
- **Privacy Policy** completa
- **SEO Ottimizzato** con meta tags e structured data

### Tecnologie Utilizzate
- **Vue 3** con Composition API
- **TypeScript** per type safety
- **Tailwind CSS** per styling moderno
- **Firebase** (Auth, Firestore, Functions)
- **Vue Router** per navigazione
- **Vite** per build tool

## 🛠️ Setup e Installazione

### Prerequisiti
- Node.js 18+ 
- Account Firebase

### Configurazione

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd roma-apartment-app
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configurazione Firebase**
   - Crea un progetto Firebase su [console.firebase.google.com](https://console.firebase.google.com)
   - Abilita Authentication (Email/Password)
   - Abilita Firestore Database
   - Crea un file `.env` basato su `.env.example`
   - Inserisci le tue credenziali Firebase

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

### Configurazione Firebase

1. **Firestore Database**
   - Crea una collection `bookings` 
   - Configura le regole di sicurezza appropriate

2. **Authentication**
   - Abilita "Email/Password" provider
   - Crea un utente admin per accedere all'area riservata

3. **Cloud Functions** (Opzionale)
   - Implementa una function per l'invio email automatico
   - Configura SMTP per l'invio delle notifiche

## 📁 Struttura del Progetto

```
src/
├── components/           # Componenti Vue riutilizzabili
│   ├── TheHeader.vue
│   ├── HeroSection.vue
│   ├── ServicesSection.vue
│   ├── GallerySection.vue
│   ├── ReviewsSection.vue
│   ├── ContactSection.vue
│   ├── TheFooter.vue
│   └── CookieBanner.vue
├── views/               # Pagine principali
│   ├── HomePage.vue
│   ├── AdminPage.vue
│   └── PrivacyPage.vue
├── stores/              # Store per gestione stato
│   ├── auth.ts
│   └── bookings.ts
├── firebase/            # Configurazione Firebase
│   └── config.ts
├── router/              # Configurazione routing
│   └── index.ts
└── types/               # Definizioni TypeScript
    └── index.ts
```

## 🔧 Funzionalità Principali

### Form di Contatto
- **Validazione in tempo reale**
- **Salvataggio su Firestore**
- **Integrazione email** (tramite Cloud Functions)
- **Feedback utente** con messaggi di successo/errore

### Admin Area
- **Autenticazione sicura** con Firebase Auth
- **Dashboard** con statistiche prenotazioni
- **Tabella prenotazioni** ordinata per data
- **Logout sicuro**

### SEO e Performance
- **Meta tags** ottimizzati
- **Structured data** per Google
- **Immagini ottimizzate** da Pexels
- **Font preloading** per performance
- **Smooth scrolling** e animazioni

## 🔒 Privacy e GDPR

- **Cookie banner** conforme normative
- **Privacy Policy** completa in italiano
- **Gestione consensi** utente
- **Sicurezza dati** con Firebase

## 🚀 Deploy

### Build Production
```bash
npm run build
```

### Deploy su Netlify/Vercel
1. Collega il repository al tuo provider preferito
2. Configura le variabili d'ambiente
3. Deploy automatico ad ogni push

## 🤝 Contribuire

1. Fork del progetto
2. Crea un feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per dettagli.

## 📞 Supporto

Per supporto tecnico:
- Email: romacaputmundiguesthouse@gmail.com
- WhatsApp: +39 312 345 6789

---

**Roma Caput Mundi Apartment** - *Il tuo rifugio di lusso nel cuore di Roma* 🏛️
