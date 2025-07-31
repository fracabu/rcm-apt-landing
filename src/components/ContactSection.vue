<template>
  <section id="contatti" class="min-h-screen py-16 flex items-center" style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 50%, rgba(152, 20, 43, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <div class="container mx-auto px-4">
      
      <!-- Centered Single Column Layout -->
      <div class="max-w-4xl mx-auto">
        
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            {{ $t('contact.title') }}
          </h2>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Contact Info -->
          <div class="space-y-4">
            <a href="https://wa.me/393204933807" class="flex items-center p-4 rounded-xl transition-colors shadow-lg" style="color: #FFB600; background-color: #7A1024; border: 1px solid #FFB600; hover:color: #FFD966;">
              <MessageCircleIcon class="mr-3 h-6 w-6" />
              <div>
                <div class="font-semibold">WhatsApp</div>
                <div class="text-sm" style="color: #FFE5B3;">+39 320 49 33 807</div>
              </div>
            </a>
            <a href="mailto:info@romacaputmundiapt.it" class="flex items-center p-4 rounded-xl transition-colors shadow-lg" style="color: #FFB600; background-color: #7A1024; border: 1px solid #FFB600; hover:color: #FFD966;">
              <MailIcon class="mr-3 h-6 w-6" />
              <div>
                <div class="font-semibold">Email</div>
                <div class="text-sm" style="color: #FFE5B3;">info@romacaputmundiapt.it</div>
              </div>
            </a>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2 bg-red-800 p-6 rounded-2xl shadow-lg border border-orange-400">
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-white mb-2">{{ $t('contact.preview.title') }}</h3>
              <p class="text-sm" style="color: #FFE5B3;">{{ $t('contact.preview.subtitle') }}</p>
            </div>
            
            <form @submit.prevent="submitForm" class="space-y-4">
              <!-- Personal Info -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 text-sm bg-red-700 border border-orange-400 rounded-lg text-white placeholder-orange-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition-colors"
                    :placeholder="$t('contact.form.name') + ' *'"
                  >
                </div>
                <div>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-3 py-2 text-sm bg-red-700 border border-orange-400 rounded-lg text-white placeholder-orange-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition-colors"
                    :placeholder="$t('contact.form.phone') + ' *'"
                  >
                </div>
              </div>

              <div>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 text-sm bg-red-700 border border-orange-400 rounded-lg text-white placeholder-orange-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition-colors"
                  :placeholder="$t('contact.form.email') + ' *'"
                >
              </div>

              <!-- Stay Details -->
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <input
                    v-model="form.checkIn"
                    type="date"
                    required
                    :min="minDate"
                    class="w-full px-3 py-2 text-sm bg-red-700 border border-orange-400 rounded-lg text-white placeholder-orange-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition-colors"
                  >
                </div>
                <div>
                  <input
                    v-model="form.checkOut"
                    type="date"
                    required
                    :min="form.checkIn || minDate"
                    class="w-full px-3 py-2 text-sm bg-red-700 border border-orange-400 rounded-lg text-white placeholder-orange-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition-colors"
                  >
                </div>
                <div>
                  <select
                    v-model="form.guests"
                    required
                    class="w-full px-3 py-2 text-sm bg-red-700 border border-orange-400 rounded-lg text-white focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition-colors"
                  >
                    <option value="1">{{ $t('contact.form.guests_options.1') }}</option>
                    <option value="2">{{ $t('contact.form.guests_options.2') }}</option>
                    <option value="3">{{ $t('contact.form.guests_options.3') }}</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn-3d btn-3d-md"
                :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
              >
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front text-center">
                  <span v-if="isSubmitting" class="flex items-center justify-center">
                    <LoaderIcon class="mr-2 h-4 w-4 animate-spin" />
                    {{ $t('contact.form.submitting') }}
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <MessageCircleIcon class="mr-2 h-4 w-4" />
                    {{ $t('contact.form.submit') }}
                  </span>
                </span>
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center text-sm">
                <CheckCircleIcon class="text-green-500 h-5 w-5 mr-2" />
                <div>
                  <p class="text-green-800 font-semibold">{{ $t('contact.success.title') }}</p>
                  <p class="text-green-700 text-sm">{{ $t('contact.success.message') }}</p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="showError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div class="flex items-center text-sm">
                <AlertTriangleIcon class="text-red-500 h-5 w-5 mr-2" />
                <div>
                  <p class="text-red-800 font-semibold">{{ $t('contact.error.title') }}</p>
                  <p class="text-red-700 text-sm">{{ $t('contact.error.message') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
  <!-- Separator border -->
  <div class="h-1" style="background-color: #FFB600;"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { 
  RocketIcon, 
  CheckCircleIcon, 
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
  XIcon,
  LoaderIcon,
  MapPinIcon,
  TrainIcon,
  ChurchIcon,
  NavigationIcon
} from 'lucide-vue-next'
import { submitBooking, sendBookingEmail } from '../services/bookings'

const form = ref({
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: 2
})

const showSuccess = ref(false)
const showError = ref(false)
const isSubmitting = ref(false)
const showCancellationPolicy = ref(false)

// Map variables
const mapContainer = ref<HTMLDivElement>()
const mapLoaded = ref(false)
let map: any = null

// Apartment coordinates (Via Romeo Rodriguez Pereira 33, 00136 Roma - Balduina)
const apartmentCoords = [41.9142171, 12.4392226] as [number, number]

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Map functions
const initMap = async () => {
  try {
    // Dynamic import of Leaflet
    const L = await import('leaflet')
    
    // Import Leaflet CSS
    const leafletCSS = document.createElement('link')
    leafletCSS.rel = 'stylesheet'
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(leafletCSS)

    await nextTick()

    if (!mapContainer.value) return

    // Initialize map
    map = L.map(mapContainer.value, {
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      tap: true,
      touchZoom: true
    }).setView(apartmentCoords, 15)

    // Add tile layer with nice styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map)

    // Custom icon for the apartment
    const apartmentIcon = L.divIcon({
      html: `
        <div style="
          background: linear-gradient(135deg, #FFB600 0%, #d97706 100%);
          border: 3px solid #98142B;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          animation: bounce 2s infinite;
        ">
          <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <style>
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        </style>
      `,
      className: 'custom-apartment-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    })

    // Add apartment marker
    const marker = L.marker(apartmentCoords, { icon: apartmentIcon }).addTo(map)
    
    // Add popup with apartment info
    marker.bindPopup(`
      <div style="text-align: center; padding: 8px; min-width: 200px;">
        <div style="font-weight: bold; color: #98142B; font-size: 16px; margin-bottom: 8px;">
          🏠 Rome Apartment Appiano FS
        </div>
        <div style="color: #666; font-size: 14px; margin-bottom: 8px;">
          Via Romeo Rodriguez Pereira n.33<br>
          00136 Roma, Italia
        </div>
        <div style="background: linear-gradient(135deg, #FFB600, #d97706); color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; display: inline-block;">
          ⭐ Appartamento Premium
        </div>
      </div>
    `, {
      closeButton: true,
      autoClose: false,
      closeOnClick: false
    })

    // Show popup on load
    marker.openPopup()

    mapLoaded.value = true
    console.log('✅ Mappa inizializzata con successo')

  } catch (error) {
    console.error('❌ Errore inizializzazione mappa:', error)
    mapLoaded.value = true // Show error state
  }
}

const centerMap = () => {
  if (map) {
    map.setView(apartmentCoords, 15, { animate: true })
  }
}

// Initialize map on component mount
onMounted(() => {
  setTimeout(initMap, 100) // Small delay to ensure DOM is ready
})

const submitForm = async () => {
  if (isSubmitting.value) return
  
  try {
    isSubmitting.value = true
    showError.value = false
    showSuccess.value = false

    // Valida i dati del form
    if (!form.value.name || !form.value.email || !form.value.phone || 
        !form.value.checkIn || !form.value.checkOut) {
      throw new Error('Compila tutti i campi obbligatori')
    }

    // Salva la prenotazione nel database
    const bookingId = await submitBooking({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      checkIn: form.value.checkIn,
      checkOut: form.value.checkOut,
      guests: form.value.guests,
      message: ''
    })
    
    console.log('✅ Prenotazione salvata con ID:', bookingId)

    // Prova a inviare email (non blocca se fallisce)
    try {
      await sendBookingEmail({
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        checkIn: form.value.checkIn,
        checkOut: form.value.checkOut,
        guests: form.value.guests,
        message: '',
        createdAt: new Date(),
        status: 'pending'
      })
      console.log('✅ Email inviata con successo')
    } catch (emailError) {
      console.warn('⚠️ Email fallita ma prenotazione salvata:', emailError)
    }

    // Mostra messaggio di successo
    showSuccess.value = true
    
    // Reset form dopo 3 secondi
    setTimeout(() => {
      form.value = {
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: 2
      }
      showSuccess.value = false
    }, 3000)

  } catch (error) {
    console.error('Errore invio richiesta:', error)
    showError.value = true
    
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>