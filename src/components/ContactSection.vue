<template>
  <section id="contatti" class="py-16 bg-gradient-to-br from-neutral-50 via-white to-roma-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-roma-800 mb-4">
          Richiedi Disponibilità
        </h2>
        <p class="text-neutral-700 max-w-3xl mx-auto text-lg">
          Contattaci direttamente per ricevere la <strong>miglior tariffa</strong> e pagare con bonifico bancario. 
          <br class="hidden md:block">
          <span class="text-roma-600 font-semibold">Check-in 15:00-22:00, Check-out 08:00-11:00.</span>
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white p-8 rounded-2xl shadow-lg">
            <h3 class="text-2xl font-semibold text-roma-800 mb-6">Richiedi Disponibilità</h3>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Personal Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-neutral-700 mb-2">Nome Completo *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                    placeholder="Il tuo nome"
                  >
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-neutral-700 mb-2">Telefono *</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                    placeholder="+39 123 456 7890"
                  >
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  placeholder="tua@email.com"
                >
              </div>

              <!-- Stay Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="checkin" class="block text-sm font-medium text-neutral-700 mb-2">Check-in *</label>
                  <input
                    id="checkin"
                    v-model="form.checkIn"
                    type="date"
                    required
                    :min="minDate"
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  >
                </div>
                <div>
                  <label for="checkout" class="block text-sm font-medium text-neutral-700 mb-2">Check-out *</label>
                  <input
                    id="checkout"
                    v-model="form.checkOut"
                    type="date"
                    required
                    :min="form.checkIn || minDate"
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  >
                </div>
              </div>

              <div>
                <label for="guests" class="block text-sm font-medium text-neutral-700 mb-2">Numero Ospiti *</label>
                <select
                  id="guests"
                  v-model="form.guests"
                  required
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                >
                  <option value="1">1 Ospite</option>
                  <option value="2">2 Ospiti</option>
                  <option value="3">3 Ospiti</option>
                  <option value="4">4 Ospiti</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-neutral-700 mb-2">Messaggio</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-roma-500 focus:border-roma-500 transition-colors"
                  placeholder="Raccontaci qualcosa in più sul tuo soggiorno..."
                ></textarea>
              </div>

              <!-- Cancellation Policy Checkbox -->
              <div class="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div class="flex items-start space-x-3">
                  <input
                    id="acceptPolicy"
                    v-model="form.acceptPolicy"
                    type="checkbox"
                    required
                    class="mt-1 h-4 w-4 text-roma-600 focus:ring-roma-500 border-neutral-300 rounded"
                  >
                  <label for="acceptPolicy" class="text-sm text-neutral-700">
                    <span class="font-medium">Ho letto e accetto la</span>
                    <button 
                      type="button"
                      @click="showCancellationPolicy = true"
                      class="text-roma-600 hover:text-roma-700 underline mx-1"
                    >
                      politica di cancellazione
                    </button>
                    <span>riportata sul sito. *</span>
                    <ShieldCheckIcon class="inline h-4 w-4 text-green-600 ml-1" />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                :disabled="isSubmitting || !form.acceptPolicy"
                class="w-full btn-3d btn-3d-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span v-if="isSubmitting" class="flex items-center">
                  <LoaderIcon class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Invio in corso...
                </span>
                <span v-else class="flex items-center">
                  <RocketIcon class="mr-2 h-5 w-5" />
                  {{ $t('contact.form.submit') }}
                </span>
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center">
                <CheckCircleIcon class="text-green-500 h-6 w-6 mr-2" />
                <div>
                  <h4 class="text-green-800 font-semibold">Richiesta Inviata!</h4>
                  <p class="text-green-700 text-sm">Ti contatteremo entro 2 ore con la miglior offerta.</p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="showError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div class="flex items-center">
                <XCircleIcon class="text-red-500 h-6 w-6 mr-2" />
                <div>
                  <h4 class="text-red-800 font-semibold">Errore</h4>
                  <p class="text-red-700 text-sm">{{ errorMessage }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <!-- Benefits -->
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <h3 class="text-xl font-semibold text-roma-800 mb-4">Vantaggi Prenotazione Diretta</h3>
              <ul class="space-y-3 text-neutral-700">
                <li class="flex items-start">
                  <DollarSignIcon class="text-roma-gold-400 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span><strong>Miglior prezzo garantito</strong> - nessuna commissione di intermediazione</span>
                </li>
                <li class="flex items-start">
                  <HandshakeIcon class="text-roma-red-600 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span><strong>Pagamento sicuro</strong> - bonifico bancario prima dell'arrivo</span>
                </li>
                <li class="flex items-start">
                  <ZapIcon class="text-roma-gold-400 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span><strong>Host multilingue</strong> - Italiano, Inglese, Spagnolo, Francese</span>
                </li>
                <li class="flex items-start">
                  <HomeIcon class="text-roma-red-600 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span><strong>Gestione familiare</strong> - Famiglia romana di fiducia</span>
                </li>
              </ul>
            </div>

            <!-- Direct Contact -->
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <h3 class="text-xl font-semibold text-roma-800 mb-4">Contatti Diretti</h3>
              <div class="space-y-3">
                <div class="flex items-center">
                  <MailIcon class="text-roma-600 mr-3 h-5 w-5" />
                  <a href="mailto:romacaputmundiguesthouse@gmail.com" class="text-roma-600 hover:underline">
                    romacaputmundiguesthouse@gmail.com
                  </a>
                </div>
                <div class="flex items-center">
                  <MessageCircleIcon class="text-roma-600 mr-3 h-5 w-5" />
                  <a href="https://wa.me/393123456789" class="text-roma-600 hover:underline">
                    WhatsApp: +39 312 345 6789
                  </a>
                </div>
                <div class="flex items-center">
                  <ClockIcon class="text-roma-600 mr-3 h-5 w-5" />
                  <span class="text-neutral-700">Assistenza 24/7</span>
                </div>
              </div>
            </div>

            <!-- Alternative Platforms -->
            <div class="bg-neutral-100 p-6 rounded-2xl">
              <h3 class="text-lg font-semibold text-neutral-800 mb-4">Ci trovi anche su:</h3>
              <div class="flex space-x-4">
                <a href="https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html" target="_blank" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors">
                  <BookOpenIcon class="mr-2 h-4 w-4" />
                  Booking.com
                </a>
                <a href="https://www.airbnb.it/rooms/1381673546089400028?adults=1&check_in=2025-07-10&check_out=2025-07-11&search_mode=regular_search&source_impression_id=p3_1751989207_P3AW2U_DV5emX10w&previous_page_section_name=1000&federated_search_id=164d258f-4391-4237-b3f6-5baf625aa734" target="_blank" class="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-center hover:bg-red-600 transition-colors">
                  <HomeIcon class="mr-2 h-4 w-4" />
                  Airbnb
                </a>
              </div>
              <p class="text-xs text-neutral-600 mt-2 text-center">
                (Licenza: 058091-CAV-12914, IT058091B4DGY9ABNC)
              </p>
            </div>

            <!-- Cancellation Policy -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-roma-100">
              <h3 class="text-xl font-semibold text-roma-800 mb-4 flex items-center">
                <ShieldIcon class="mr-2 h-5 w-5 text-roma-600" />
                Politica di Cancellazione
              </h3>
              <div class="space-y-3 text-sm text-neutral-700">
                <div class="flex items-start">
                  <CheckIcon class="mr-2 h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Rimborso completo</strong> per cancellazioni fino a <strong>7 giorni prima</strong> dell'arrivo
                  </span>
                </div>
                <div class="flex items-start">
                  <AlertTriangleIcon class="mr-2 h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Penale di 1 notte</strong> per cancellazioni oltre questo termine
                  </span>
                </div>
                <div class="flex items-start">
                  <MessageCircleIcon class="mr-2 h-4 w-4 text-roma-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Per rimborsi: <strong>WhatsApp</strong> o <strong>info@romacaputmundiapt.it</strong>
                  </span>
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
                <strong>WhatsApp:</strong> +39 312 345 6789
              </li>
              <li class="flex items-center">
                <MailIcon class="mr-2 h-4 w-4" />
                <strong>Email:</strong> info@romacaputmundiapt.it
              </li>
            </ul>
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
  LoaderIcon, 
  RocketIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  DollarSignIcon, 
  HandshakeIcon, 
  ZapIcon, 
  HomeIcon, 
  MailIcon, 
  MessageCircleIcon, 
  ClockIcon, 
  BookOpenIcon,
  ShieldCheckIcon,
  ShieldIcon,
  CheckIcon,
  AlertTriangleIcon,
  XIcon
} from 'lucide-vue-next'
import { addBooking } from '../stores/bookings'

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

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const showCancellationPolicy = ref(false)

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const submitForm = async () => {
  isSubmitting.value = true
  showError.value = false
  showSuccess.value = false

  try {
    // Save to Firestore
    await addBooking({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      message: form.value.message,
      checkIn: form.value.checkIn,
      checkOut: form.value.checkOut,
      guests: Number(form.value.guests)
    })

    // TODO: Implementare invio email tramite Cloud Function
    // await sendEmail(form.value)

    showSuccess.value = true
    
    // Reset form
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

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Errore nell\'invio della richiesta:', error)
    showError.value = true
    errorMessage.value = 'Si è verificato un errore. Riprova o contattaci direttamente.'
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>