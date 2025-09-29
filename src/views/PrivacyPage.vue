<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <main class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold text-roma-800 mb-4">Privacy Policy</h1>
        <p class="text-gray-600 mb-8"><strong>Ultima modifica:</strong> 29 Settembre 2025</p>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">1. Informazioni che raccogliamo</h2>
          <p class="mb-4">Raccogliamo le seguenti informazioni quando utilizzi il nostro sito web:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Dati personali:</strong> nome, email, telefono</li>
            <li><strong>Dati soggiorno:</strong> date check-in/out, numero ospiti</li>
            <li><strong>Comunicazioni:</strong> messaggi dal form contatti</li>
            <li><strong>Dati tecnici:</strong> IP, browser, pagine visitate</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">2. Come utilizziamo le informazioni</h2>
          <ul class="list-disc pl-6 space-y-2">
            <li>Processare e gestire le prenotazioni</li>
            <li>Comunicare riguardo al soggiorno</li>
            <li>Fornire assistenza clienti</li>
            <li>Migliorare i nostri servizi</li>
            <li>Rispettare obblighi legali</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">3. Cookie</h2>
          <p class="mb-4">Utilizziamo cookie per:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Cookie essenziali:</strong> funzionamento del sito</li>
            <li><strong>Cookie analytics:</strong> analisi traffico (Google Analytics)</li>
            <li><strong>Cookie preferenze:</strong> ricordare le tue scelte</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">4. Condivisione dati</h2>
          <p>Non vendiamo i tuoi dati. Condividiamo solo quando richiesto dalla legge o con fornitori fidati (Google Analytics, Firebase, EmailJS).</p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">5. I tuoi diritti (GDPR)</h2>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Accesso:</strong> ottenere copia dei tuoi dati</li>
            <li><strong>Rettifica:</strong> correggere dati inesatti</li>
            <li><strong>Cancellazione:</strong> richiedere eliminazione</li>
            <li><strong>Portabilità:</strong> ricevere dati in formato leggibile</li>
            <li><strong>Opposizione:</strong> opporti al trattamento</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">6. Sicurezza</h2>
          <p>Proteggiamo i tuoi dati con crittografia SSL e sistemi di sicurezza aggiornati.</p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">7. Conservazione</h2>
          <p>Conserviamo i dati per massimo 5 anni per finalità contabili e fiscali.</p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">8. Contatti</h2>
          <div class="bg-roma-50 p-4 rounded-lg">
            <p><strong>Email:</strong> info@romacaputmundiapt.it</p>
            <p><strong>Telefono:</strong> +39 320 49 33 807</p>
            <p><strong>Indirizzo:</strong> Via R.R. Pereira n. 33, Roma</p>
          </div>
        </section>

        <div class="border-t pt-6 mt-8 text-sm text-gray-500">
          <p>Questa Privacy Policy è conforme al GDPR (Regolamento UE 2016/679) e alla normativa italiana sulla privacy.</p>
        </div>

        <div class="mt-8 text-center">
          <router-link to="/" class="text-roma-600 hover:text-roma-800 font-semibold">
            ← Torna alla Home
          </router-link>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
</script>