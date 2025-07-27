<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-xl font-serif font-bold text-roman-700">← Roma Caput Mundi</span>
          </router-link>
          <h1 class="text-2xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <div class="prose prose-lg max-w-none">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <p class="text-gray-600 mb-8">
            <strong>Data di entrata in vigore:</strong> {{ currentDate }}
          </p>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Informazioni che raccogliamo</h2>
            <p class="text-gray-700 mb-4">
              Raccogliamo le seguenti informazioni quando utilizzi il nostro sito web o richiedi una prenotazione:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Dati personali:</strong> nome, cognome, indirizzo email, numero di telefono</li>
              <li><strong>Dati del soggiorno:</strong> date di check-in e check-out, numero di ospiti</li>
              <li><strong>Comunicazioni:</strong> messaggi e richieste inviate tramite il modulo di contatto</li>
              <li><strong>Dati tecnici:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Come utilizziamo le tue informazioni</h2>
            <p class="text-gray-700 mb-4">
              Utilizziamo le informazioni raccolte per:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Processare e gestire le richieste di prenotazione</li>
              <li>Comunicare con te riguardo alla tua prenotazione</li>
              <li>Fornire assistenza clienti</li>
              <li>Migliorare i nostri servizi e il sito web</li>
              <li>Rispettare gli obblighi legali</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. Cookie e tecnologie simili</h2>
            <p class="text-gray-700 mb-4">
              Utilizziamo cookie e tecnologie simili per:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Cookie essenziali:</strong> necessari per il funzionamento del sito</li>
              <li><strong>Cookie di performance:</strong> per analizzare l'utilizzo del sito</li>
              <li><strong>Cookie di funzionalità:</strong> per ricordare le tue preferenze</li>
            </ul>
            <p class="text-gray-700 mt-4">
              Puoi gestire le tue preferenze sui cookie tramite il banner dei cookie presente sul sito.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. Condivisione delle informazioni</h2>
            <p class="text-gray-700 mb-4">
              Non vendiamo, affittiamo o condividiamo le tue informazioni personali con terze parti, 
              eccetto nei seguenti casi:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Quando richiesto dalla legge</li>
              <li>Per proteggere i nostri diritti legali</li>
              <li>Con fornitori di servizi fidati che ci assistono nelle operazioni del sito</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. I tuoi diritti (GDPR)</h2>
            <p class="text-gray-700 mb-4">
              In conformità al GDPR, hai i seguenti diritti:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Diritto di accesso:</strong> ottenere informazioni sui dati che trattiamo</li>
              <li><strong>Diritto di rettifica:</strong> correggere dati inesatti o incompleti</li>
              <li><strong>Diritto di cancellazione:</strong> richiedere la cancellazione dei tuoi dati</li>
              <li><strong>Diritto di limitazione:</strong> limitare il trattamento dei tuoi dati</li>
              <li><strong>Diritto di portabilità:</strong> ottenere i tuoi dati in formato strutturato</li>
              <li><strong>Diritto di opposizione:</strong> opporti al trattamento dei tuoi dati</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Sicurezza dei dati</h2>
            <p class="text-gray-700">
              Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali 
              da accesso non autorizzato, alterazione, divulgazione o distruzione. Utilizziamo crittografia 
              SSL e sistemi di sicurezza aggiornati.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Conservazione dei dati</h2>
            <p class="text-gray-700">
              Conserviamo le tue informazioni personali solo per il tempo necessario agli scopi per cui 
              sono state raccolte o come richiesto dalla legge. Le informazioni di prenotazione vengono 
              conservate per un massimo di 5 anni per finalità contabili e fiscali.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Minori</h2>
            <p class="text-gray-700">
              I nostri servizi non sono rivolti a minori di 18 anni. Non raccogliamo consapevolmente 
              informazioni personali da minori di 18 anni.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Modifiche alla Privacy Policy</h2>
            <p class="text-gray-700">
              Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. 
              Ti notificheremo eventuali modifiche significative pubblicando la nuova Privacy Policy 
              su questa pagina con una nuova data di entrata in vigore.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. Contatti</h2>
            <p class="text-gray-700 mb-4">
              Per qualsiasi domanda riguardo a questa Privacy Policy o per esercitare i tuoi diritti, 
              puoi contattarci:
            </p>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-700"><strong>Email:</strong> info@romacaputmundiapt.it</p>
              <p class="text-gray-700"><strong>Telefono:</strong> +39 320 49 33 807</p>
              <p class="text-gray-700"><strong>Indirizzo:</strong> Via R.R. Pereira n. 33</p>
            </div>
          </section>

          <div class="border-t pt-6 mt-8">
            <p class="text-sm text-gray-500">
              Questa Privacy Policy è conforme al Regolamento Generale sulla Protezione dei Dati (GDPR) 
              dell'Unione Europea e alla normativa italiana sulla privacy.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentDate = computed(() => {
  return new Date().toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})
</script>