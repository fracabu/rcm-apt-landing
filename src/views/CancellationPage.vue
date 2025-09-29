<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <main class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold text-roma-800 mb-4">Politica di Cancellazione</h1>
        <p class="text-gray-600 mb-8"><strong>Ultima modifica:</strong> 29 Settembre 2025</p>

        <div class="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
          <h2 class="text-2xl font-semibold text-green-800 mb-3 flex items-center">
            <CheckCircleIcon class="mr-2 h-6 w-6" />
            Rimborso Completo (100%)
          </h2>
          <p class="text-green-700 text-lg">
            In caso di disdetta dopo il pagamento con bonifico, l'importo versato verrà <strong>interamente rimborsato fino a 7 giorni prima dell'arrivo</strong>.
          </p>
        </div>

        <div class="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
          <h2 class="text-2xl font-semibold text-amber-800 mb-3 flex items-center">
            <AlertTriangleIcon class="mr-2 h-6 w-6" />
            Penale di Cancellazione
          </h2>
          <p class="text-amber-700 text-lg">
            Per cancellazioni effettuate <strong>meno di 7 giorni prima</strong> dell'arrivo, sarà trattenuta <strong>la prima notte a titolo di penale</strong>.
          </p>
        </div>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4 flex items-center">
            <MessageCircleIcon class="mr-2 h-6 w-6" />
            Come Richiedere un Rimborso
          </h2>
          <p class="mb-4">Per richiedere la cancellazione e il rimborso, contattaci tramite:</p>

          <div class="space-y-4">
            <div class="flex items-center p-4 bg-green-50 rounded-lg">
              <PhoneIcon class="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p class="font-semibold text-gray-900">WhatsApp:</p>
                <a href="https://wa.me/393204933807" class="text-green-600 hover:text-green-800 font-medium">
                  +39 320 49 33 807
                </a>
              </div>
            </div>

            <div class="flex items-center p-4 bg-blue-50 rounded-lg">
              <MailIcon class="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p class="font-semibold text-gray-900">Email:</p>
                <a href="mailto:info@romacaputmundiapt.it" class="text-blue-600 hover:text-blue-800 font-medium">
                  info@romacaputmundiapt.it
                </a>
              </div>
            </div>
          </div>

          <p class="mt-4 text-sm text-gray-600">
            <strong>Nota:</strong> Se hai pagato con PayPal, il rimborso avverrà automaticamente sul tuo account PayPal entro 3-5 giorni lavorativi.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">Protezione Legale</h2>
          <p>
            Questa politica è conforme al <strong>Codice del Consumo italiano</strong> e alle normative UE sulla protezione dei consumatori.
            In caso di controversie, puoi rivolgerti alla piattaforma europea ODR.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-roma-700 mb-4">Processo di Prenotazione</h2>
          <ol class="list-decimal pl-6 space-y-2">
            <li>Verifica disponibilità tramite form contatti</li>
            <li>Conferma preliminare via email/WhatsApp</li>
            <li>Pagamento acconto (30%) via bonifico/PayPal</li>
            <li>Conferma finale e invio dettagli check-in</li>
            <li>Saldo alla check-in (contanti/carta)</li>
          </ol>
        </section>

        <div class="bg-roma-50 p-6 rounded-lg text-center mb-8">
          <p class="text-roma-800 font-semibold mb-2">Hai domande sulla cancellazione?</p>
          <router-link to="/contatti" class="inline-block bg-roma-600 text-white px-6 py-3 rounded-lg hover:bg-roma-700 transition">
            Contattaci Ora
          </router-link>
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
import { CheckCircleIcon, AlertTriangleIcon, MessageCircleIcon, PhoneIcon, MailIcon } from 'lucide-vue-next'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
</script>