<template>
  <section id="contatti" class="py-16 bg-gradient-to-br from-neutral-50 via-white to-roma-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-roma-800 mb-4">
          Richiedi Disponibilità
        </h2>
        <p class="text-neutral-700 max-w-4xl mx-auto text-lg">
          Contattaci direttamente per ricevere la <strong>miglior tariffa</strong> e pagare con bonifico bancario. 
          <span class="text-roma-600 font-semibold block mt-2">Check-in 15:00-22:00, Check-out 08:00-11:00.</span>
        </p>
      </div>

      <!-- Benefits Bar -->
      <div class="max-w-7xl mx-auto mb-8">
        <div class="bg-white p-4 rounded-2xl shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div class="flex items-center">
              <DollarSignIcon class="text-roma-gold-400 mr-2 h-5 w-5 flex-shrink-0" />
              <span><strong>Miglior prezzo</strong> garantito</span>
            </div>
            <div class="flex items-center">
              <CreditCardIcon class="text-roma-red-600 mr-2 h-5 w-5 flex-shrink-0" />
              <span><strong>Pagamenti</strong> flessibili</span>
            </div>
            <div class="flex items-center">
              <ZapIcon class="text-roma-gold-400 mr-2 h-5 w-5 flex-shrink-0" />
              <span><strong>Host</strong> multilingue</span>
            </div>
            <div class="flex items-center">
              <HomeIcon class="text-roma-red-600 mr-2 h-5 w-5 flex-shrink-0" />
              <span><strong>Gestione</strong> familiare</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content - 3 Columns -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Left Column - Payment & Contact -->
          <div class="space-y-6">
            <!-- Payment Methods -->
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <h3 class="text-lg font-semibold text-roma-800 mb-4 flex items-center">
                <CreditCardIcon class="mr-2 h-5 w-5 text-roma-600" />
                Metodi di Pagamento
              </h3>
              
              <!-- Bank Transfer -->
              <div class="mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div class="flex items-start">
                  <BuildingIcon class="mr-2 h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 class="font-semibold text-green-800 text-sm">Bonifico - Sconto 3%</h4>
                    <p class="text-xs text-green-700">Nessuna commissione</p>
                  </div>
                </div>
              </div>
              
              <!-- PayPal -->
              <div class="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div class="flex items-start">
                  <div class="mr-2 mt-0.5 flex-shrink-0">
                    <svg class="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.9.9 0 0 0-.895.765l-1.274 8.067a.641.641 0 0 0 .633.74h4.606a.9.9 0 0 0 .895-.765l.792-5.019h2.19c4.292 0 7.658-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.137-1.012-4.287a5.81 5.81 0 0 0-1.683-1.187z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-blue-800 text-sm">PayPal</h4>
                    <p class="text-xs text-blue-700">Protezione acquirente</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-3 p-2 bg-neutral-50 rounded-lg">
                <p class="text-xs text-neutral-600 flex items-center">
                  <ShieldCheckIcon class="mr-1 h-3 w-3 text-green-600" />
                  <strong>100% Sicuro</strong>
                </p>
              </div>
            </div>

            <!-- Direct Contact -->
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <h3 class="text-lg font-semibold text-roma-800 mb-4">Contatti Diretti</h3>
              <div class="space-y-3 text-sm">
                <a href="mailto:info@romacaputmundiapt.it" class="flex items-center text-roma-600 hover:underline">
                  <MailIcon class="mr-2 h-4 w-4" />
                  info@romacaputmundiapt.it
                </a>
                <a href="https://wa.me/393204933807" class="flex items-center text-roma-600 hover:underline">
                  <MessageCircleIcon class="mr-2 h-4 w-4" />
                  +39 320 49 33 807
                </a>
                <div class="flex items-center text-neutral-700">
                  <ClockIcon class="mr-2 h-4 w-4 text-roma-600" />
                  Assistenza 24/7
                </div>
              </div>
            </div>

            <!-- Alternative Platforms -->
            <div class="bg-neutral-100 p-4 rounded-2xl">
              <h4 class="text-sm font-semibold text-neutral-800 mb-3">Ci trovi anche su:</h4>
              <div class="space-y-2">
                <a href="https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html" target="_blank" 
                   class="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Booking.com
                </a>
                <a href="https://www.airbnb.it/rooms/1381673546089400028" target="_blank" 
                   class="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors">
                  Airbnb
                </a>
              </div>
              <p class="text-xs text-neutral-600 mt-2 text-center">
                Licenza: 058091-CAV-12914
              </p>
            </div>
          </div>

          <!-- Center Column - Contact Form -->
          <div class="bg-white p-6 lg:p-8 rounded-2xl shadow-lg">
            <h3 class="text-2xl font-semibold text-roma-800 mb-6">Richiedi Disponibilità</h3>
            
            <form @submit.prevent="submitForm" class="space-y-4">
              <!-- Personal Info - Side by side -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="name" class="block text-xs font-medium text-neutral-700 mb-1">Nome *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                    placeholder="Il tuo nome"
                  >
                </div>
                <div>
                  <label for="phone" class="block text-xs font-medium text-neutral-700 mb-1">Telefono *</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                    placeholder="+39 123456789"
                  >
                </div>
              </div>

              <div>
                <label for="email" class="block text-xs font-medium text-neutral-700 mb-1">Email *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  placeholder="tua@email.com"
                >
              </div>

              <!-- Stay Details - 3 columns -->
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label for="checkin" class="block text-xs font-medium text-neutral-700 mb-1">Check-in *</label>
                  <input
                    id="checkin"
                    v-model="form.checkIn"
                    type="date"
                    required
                    :min="minDate"
                    class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  >
                </div>
                <div>
                  <label for="checkout" class="block text-xs font-medium text-neutral-700 mb-1">Check-out *</label>
                  <input
                    id="checkout"
                    v-model="form.checkOut"
                    type="date"
                    required
                    :min="form.checkIn || minDate"
                    class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  >
                </div>
                <div>
                  <label for="guests" class="block text-xs font-medium text-neutral-700 mb-1">Ospiti *</label>
                  <select
                    id="guests"
                    v-model="form.guests"
                    required
                    class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="message" class="block text-xs font-medium text-neutral-700 mb-1">Messaggio</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="3"
                  class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  placeholder="Richieste speciali..."
                ></textarea>
              </div>

              <!-- Cancellation Policy Checkbox -->
              <div class="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                <div class="flex items-start">
                  <input
                    id="acceptPolicy"
                    v-model="form.acceptPolicy"
                    type="checkbox"
                    required
                    class="mt-0.5 h-4 w-4 text-roma-600 focus:ring-roma-500 border-neutral-300 rounded"
                  >
                  <label for="acceptPolicy" class="ml-2 text-xs text-neutral-700">
                    Ho letto e accetto la
                    <button 
                      type="button"
                      @click="showCancellationPolicy = true"
                      class="text-roma-600 hover:text-roma-700 underline"
                    >
                      politica di cancellazione
                    </button>
                    *
                  </label>
                </div>
              </div>

              <button
                type="submit"
                :disabled="!form.acceptPolicy"
                class="w-full btn-3d btn-3d-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span class="flex items-center">
                  <RocketIcon class="mr-2 h-4 w-4" />
                  Invia Richiesta
                </span>
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center text-sm">
                <CheckCircleIcon class="text-green-500 h-5 w-5 mr-2" />
                <div>
                  <p class="text-green-800 font-semibold">Email aperta!</p>
                  <p class="text-green-700 text-xs">Completa l'invio dal tuo client email.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Cancellation Policy -->
          <div class="space-y-6">
            <!-- Cancellation Policy -->
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <h3 class="text-lg font-semibold text-roma-800 mb-4 flex items-center">
                <ShieldIcon class="mr-2 h-5 w-5 text-roma-600" />
                Politica di Cancellazione
              </h3>
              
              <div class="space-y-3">
                <div class="p-3 bg-green-50 rounded-lg border border-green-100">
                  <div class="flex items-start">
                    <CheckIcon class="mr-2 h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p class="text-sm font-semibold text-green-800">Rimborso 100%</p>
                      <p class="text-xs text-green-700">Fino a 7 giorni prima</p>
                    </div>
                  </div>
                </div>
                
                <div class="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div class="flex items-start">
                    <AlertTriangleIcon class="mr-2 h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p class="text-sm font-semibold text-amber-800">Penale 1 notte</p>
                      <p class="text-xs text-amber-700">Oltre questo termine</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button"
                  @click="showCancellationPolicy = true"
                  class="w-full text-roma-600 hover:text-roma-700 text-sm underline"
                >
                  Leggi politica completa →
                </button>
              </div>
            </div>

            <!-- Security Badge -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
              <div class="text-center">
                <ShieldCheckIcon class="mx-auto h-12 w-12 text-green-600 mb-3" />
                <h4 class="font-semibold text-green-800 mb-1">Prenotazione Sicura</h4>
                <p class="text-xs text-green-700">
                  Pagamento protetto al 100%<br>
                  Licenza ufficiale verificata
                </p>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <h4 class="text-lg font-semibold text-roma-800 mb-4">Perché Sceglierci</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-roma-50 rounded-lg">
                  <span class="text-sm font-medium text-roma-800">Valutazione Media</span>
                  <span class="text-2xl font-bold text-roma-600">4.8★</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-roma-50 rounded-lg">
                  <span class="text-sm font-medium text-roma-800">Risposta Veloce</span>
                  <span class="text-2xl font-bold text-roma-600">&lt;2h</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-roma-50 rounded-lg">
                  <span class="text-sm font-medium text-roma-800">Lingue Parlate</span>
                  <span class="text-2xl font-bold text-roma-600">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cancellation Policy Modal -->
      <div v-if="showCancellationPolicy" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click="showCancellationPolicy = false">
        <div class="bg-white rounded-2xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto" @click.stop>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-roma-800 flex items-center">
              <ShieldIcon class="mr-2 h-6 w-6 text-roma-600" />
              Politica di Cancellazione
            </h3>
            <button @click="showCancellationPolicy = false" class="text-neutral-500 hover:text-neutral-700">
              <XIcon class="h-6 w-6" />
            </button>
          </div>
          
          <div class="space-y-4 text-neutral-700">
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 class="font-semibold text-green-800 mb-2 flex items-center">
                <CheckCircleIcon class="mr-2 h-5 w-5" />
                Rimborso Completo (100%)
              </h4>
              <p class="text-green-700">
                In caso di disdetta dopo il pagamento con bonifico, l'importo versato verrà 
                <strong>interamente rimborsato</strong> fino a <strong>7 giorni prima</strong> dell'arrivo.
              </p>
            </div>
            
            <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 class="font-semibold text-amber-800 mb-2 flex items-center">
                <AlertTriangleIcon class="mr-2 h-5 w-5" />
                Penale di Cancellazione
              </h4>
              <p class="text-amber-700">
                Per cancellazioni effettuate <strong>oltre questo termine</strong>, sarà trattenuta 
                <strong>la prima notte a titolo di penale</strong>.
              </p>
            </div>
            
            <div class="bg-roma-50 p-4 rounded-lg border border-roma-200">
              <h4 class="font-semibold text-roma-800 mb-2 flex items-center">
                <MessageCircleIcon class="mr-2 h-5 w-5" />
                Come Richiedere un Rimborso
              </h4>
              <p class="text-roma-700 mb-2">
                Per richiedere un rimborso, contattaci tramite:
              </p>
              <ul class="space-y-1 text-roma-700">
                <li class="flex items-center">
                  <MessageCircleIcon class="mr-2 h-4 w-4" />
                  <strong>WhatsApp:</strong> +39 320 49 33 807
                </li>
                <li class="flex items-center">
                  <MailIcon class="mr-2 h-4 w-4" />
                  <strong>Email:</strong> info@romacaputmundiapt.it
                </li>
              </ul>
              <div class="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                <p class="text-xs text-blue-700">
                  <strong>PayPal:</strong> I rimborsi PayPal vengono processati entro 24-48 ore
                </p>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 class="font-semibold text-blue-800 mb-2 flex items-center">
                <ShieldCheckIcon class="mr-2 h-5 w-5" />
                Tutela Legale
              </h4>
              <p class="text-blue-700 text-sm">
                Questa politica ti tutela in caso di contestazioni e garantisce trasparenza 
                nel processo di prenotazione e cancellazione.
              </p>
            </div>
          </div>
          
          <div class="mt-6 flex justify-end">
            <button 
              @click="showCancellationPolicy = false"
              class="btn-3d btn-3d-md"
            >
              Ho Capito
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  RocketIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  DollarSignIcon, 
  CreditCardIcon,
  BuildingIcon,
  ZapIcon, 
  HomeIcon, 
  MailIcon, 
  MessageCircleIcon, 
  ClockIcon,
  ShieldCheckIcon,
  ShieldIcon,
  CheckIcon,
  AlertTriangleIcon,
  XIcon
} from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  acceptPolicy: false
})

const showSuccess = ref(false)
const showCancellationPolicy = ref(false)

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const submitForm = () => {
  // Crea oggetto e corpo email
  const subject = `Richiesta disponibilità - ${form.value.name}`
  const body = `
RICHIESTA DISPONIBILITÀ

Nome: ${form.value.name}
Email: ${form.value.email}
Telefono: ${form.value.phone}

Check-in: ${form.value.checkIn}
Check-out: ${form.value.checkOut}
Ospiti: ${form.value.guests}

Messaggio:
${form.value.message}

---
Inviato da romacaputmundiapt.it
  `.trim()

  // Crea link mailto
  const mailtoLink = `mailto:info@romacaputmundiapt.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  
  // Apri client email
  window.location.href = mailtoLink
  
  // Mostra messaggio di successo
  showSuccess.value = true
  
  // Reset form dopo 3 secondi
  setTimeout(() => {
    form.value = {
      name: '',
      email: '',
      phone: '',
      message: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
      acceptPolicy: false
    }
    showSuccess.value = false
  }, 3000)
}
</script>