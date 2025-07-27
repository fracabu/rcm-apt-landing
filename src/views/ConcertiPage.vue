<template>
  <div class="bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/soggiorno.jpg" 
          alt="Concerti Roma" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div class="container mx-auto px-4 py-8 relative mt-24 md:mt-28">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            Concerti Roma 2025-2026
            <span class="block text-2xl md:text-4xl lg:text-5xl text-amber-200 mt-4 font-light">
              Sconto Esclusivo 20% per i Nostri Ospiti
            </span>
          </h1>

          <p class="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Scopri tutti i concerti a Roma con vantaggi esclusivi: sconto 20% per Auditorium e Santa Cecilia
          </p>

          <!-- Benefits -->
          <div class="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <span class="bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-green-400/30 flex items-center gap-2">
              <TicketIcon class="w-4 h-4" />
              <span>Sconto 20% Auditorium</span>
            </span>
            <span class="bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-green-400/30 flex items-center gap-2">
              <MusicIcon class="w-4 h-4" />
              <span>Sconto 20% Santa Cecilia</span>
            </span>
            <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
              <MapPinIcon class="w-4 h-4" />
              <span>Info Trasporti Incluse</span>
            </span>
          </div>

          <router-link 
            to="/contatti" 
            class="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-12 rounded-full text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Prenota & Ottieni Sconto
          </router-link>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-8 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="venue in venues"
            :key="venue.id"
            @click="selectedVenue = venue.id"
            class="filter-btn"
            :class="{ 'active': selectedVenue === venue.id }"
          >
            <component :is="venue.icon" class="w-4 h-4 mr-2" />
            {{ venue.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Concerts Section -->
    <main class="py-16">
      <div class="container mx-auto px-4">
        
        <!-- Discount Info Banner -->
        <div v-if="selectedVenue === 'all' || selectedVenue === 'auditorium' || selectedVenue === 'santa-cecilia'" 
             class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl mb-12 text-center">
          <div class="flex items-center justify-center mb-4">
            <TicketIcon class="w-8 h-8 mr-3" />
            <h2 class="text-2xl font-bold">Sconto Esclusivo 20%</h2>
          </div>
          <p class="text-lg mb-4">Riservato esclusivamente agli ospiti del nostro appartamento</p>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="bg-white/20 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">🎼 Auditorium Parco della Musica</h3>
              <p>Sconto 20% su tutti i concerti della stagione 2025</p>
            </div>
            <div class="bg-white/20 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">🎻 Accademia Santa Cecilia</h3>
              <p>Sconto 20% su concerti e spettacoli selezionati</p>
            </div>
          </div>
        </div>

        <!-- Concert Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="concert in filteredConcerts" 
            :key="concert.id"
            class="concert-card"
          >
            <div class="relative">
              <div class="bg-gradient-to-br from-roma-600 to-roma-800 p-6 rounded-t-2xl text-white">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-xl font-bold">{{ concert.artist }}</h3>
                    <p class="text-roma-200">{{ concert.venue }}</p>
                  </div>
                  <span 
                    class="status-badge"
                    :class="{
                      'bg-green-500': concert.status === 'available',
                      'bg-red-500': concert.status === 'sold-out',
                      'bg-yellow-500': concert.status === 'few-tickets'
                    }"
                  >
                    {{ getStatusText(concert.status) }}
                  </span>
                </div>
                
                <div class="flex items-center mb-4">
                  <CalendarIcon class="w-4 h-4 mr-2" />
                  <span>{{ formatDate(concert.date) }}</span>
                </div>

                <div v-if="concert.hasDiscount" class="mb-4">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-300 line-through text-sm">€{{ concert.originalPrice }}</span>
                    <span class="text-green-400 font-bold text-lg">€{{ concert.discountedPrice }}</span>
                    <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">-20%</span>
                  </div>
                  <p class="text-xs text-green-300 mt-1">Prezzo esclusivo per nostri ospiti</p>
                </div>
                <div v-else class="mb-4">
                  <span class="text-white font-bold text-lg">Da €{{ concert.originalPrice }}</span>
                </div>
              </div>

              <div class="bg-white p-6 rounded-b-2xl border-t-0">
                <p class="text-gray-600 mb-4">{{ concert.description }}</p>
                
                <div class="flex justify-between items-center">
                  <div class="text-sm text-gray-500">
                    <MapPinIcon class="w-3 h-3 inline mr-1" />
                    {{ concert.location }}
                  </div>
                  <button 
                    class="btn-3d btn-3d-sm bg-roma-600 hover:bg-roma-700"
                    @click="openBooking(concert)"
                  >
                    {{ concert.hasDiscount ? 'Vedi Biglietti + Sconto' : 'Vedi Biglietti' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- How to Get Discount Section -->
        <section v-if="selectedVenue === 'all' || selectedVenue === 'auditorium' || selectedVenue === 'santa-cecilia'" 
                 class="mt-16 bg-white p-8 rounded-2xl shadow-lg">
          <h2 class="text-3xl font-serif font-bold text-roma-800 text-center mb-8">
            Come Ottenere lo Sconto del 20%
          </h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-roma-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">1</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">Prenota l'Appartamento</h3>
              <p class="text-gray-600">Effettua la prenotazione del nostro appartamento per le date del concerto</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-roma-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">2</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">Scegli i Tuoi Posti</h3>
              <p class="text-gray-600">Vai sul sito ufficiale, scegli i posti che preferisci e comunicaceli</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-roma-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">3</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">Ricevi lo Sconto</h3>
              <p class="text-gray-600">Procediamo noi all'acquisto applicando il 20% di sconto sui tuoi biglietti</p>
            </div>
          </div>

          <div class="bg-green-50 p-6 rounded-lg mt-8">
            <h4 class="text-lg font-semibold text-green-800 mb-2">📋 Come Funziona:</h4>
            <ul class="text-sm text-green-700 space-y-2">
              <li>• <strong>Prenota il soggiorno</strong> nell'appartamento "Roma Caput Mundi" nelle date del concerto</li>
              <li>• <strong>Seleziona i posti</strong> sul sito ufficiale (TicketOne, Ticketmaster, Vivaticket o Auditorium/Santa Cecilia)</li>
              <li>• <strong>Invia i dettagli</strong> (settore, fila, numero posti) tramite WhatsApp (+39 320 49 33 807) o email</li>
              <li>• <strong>Ricevi i biglietti</strong> con lo sconto del 20% applicato direttamente da noi</li>
            </ul>
          </div>

          <div class="text-center mt-8">
            <router-link to="/contatti" class="btn-3d btn-3d-lg bg-green-600 hover:bg-green-700">
              Prenota Appartamento e Ottieni Sconto
            </router-link>
          </div>
        </section>

        <!-- Transport Info -->
        <section class="mt-16 bg-roma-50 p-8 rounded-2xl">
          <h2 class="text-2xl font-serif font-bold text-roma-800 text-center mb-6">
            Come Arrivare dall'Appartamento
          </h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-3 flex items-center">
                <TrainIcon class="w-5 h-5 mr-2 text-roma-600" />
                Auditorium & Santa Cecilia
              </h3>
              <p class="text-gray-600 mb-2">🚇 Metro A: Flaminio (15 min) + Tram 2</p>
              <p class="text-gray-600 mb-2">🚌 Bus 53 diretto dall'appartamento</p>
              <p class="text-gray-600">⏱️ Tempo totale: 25-30 minuti</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-3 flex items-center">
                <MapPinIcon class="w-5 h-5 mr-2 text-roma-600" />
                Circo Massimo & Olimpico
              </h3>
              <p class="text-gray-600 mb-2">🚇 Metro A: Termini → Circo Massimo</p>
              <p class="text-gray-600 mb-2">🚇 Metro A: Flaminio → Olimpico</p>
              <p class="text-gray-600">⏱️ Tempo totale: 30-40 minuti</p>
            </div>
          </div>
        </section>

      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import { 
  MusicIcon, 
  TicketIcon, 
  MapPinIcon, 
  CalendarIcon, 
  TrainIcon,
  HomeIcon,
  StarIcon,
  UsersIcon
} from 'lucide-vue-next'

interface Concert {
  id: string
  artist: string
  venue: string
  venueId: string
  date: string
  location: string
  description: string
  originalPrice: number
  discountedPrice?: number
  hasDiscount: boolean
  status: 'available' | 'sold-out' | 'few-tickets'
  ticketUrl: string
}

interface Venue {
  id: string
  name: string
  icon: any
}

const selectedVenue = ref('all')

const venues: Venue[] = [
  { id: 'all', name: 'Tutti i Concerti', icon: MusicIcon },
  { id: 'auditorium', name: 'Auditorium', icon: StarIcon },
  { id: 'santa-cecilia', name: 'Santa Cecilia', icon: MusicIcon },
  { id: 'circo-massimo', name: 'Circo Massimo', icon: HomeIcon },
  { id: 'olimpico', name: 'Stadio Olimpico', icon: UsersIcon },
  { id: 'altri', name: 'Altri Venue', icon: MapPinIcon }
]

const concerts: Concert[] = [
  // Roma Summer Fest 2025 (Auditorium)
  {
    id: '1',
    artist: 'Patti Smith',
    venue: 'Auditorium Parco della Musica',
    venueId: 'auditorium',
    date: '2025-09-15',
    location: 'Cavea',
    description: 'La leggendaria poetessa del rock in concerto nella suggestiva cornice dell\'Auditorium.',
    originalPrice: 85,
    discountedPrice: 68,
    hasDiscount: true,
    status: 'available',
    ticketUrl: 'https://www.auditorium.com/it/eventi/patti-smith-quartet/'
  },
  {
    id: '2',
    artist: 'Stereophonics',
    venue: 'Auditorium Parco della Musica',
    venueId: 'auditorium',
    date: '2025-08-29',
    location: 'Cavea',
    description: 'I giganti del rock gallese tornano a Roma con il loro sound inconfondibile.',
    originalPrice: 75,
    discountedPrice: 60,
    hasDiscount: true,
    status: 'few-tickets',
    ticketUrl: 'https://www.auditorium.com/it/eventi/stereophonics/'
  },
  {
    id: '3',
    artist: 'Morrissey',
    venue: 'Auditorium Parco della Musica',
    venueId: 'auditorium',
    date: '2025-07-28',
    location: 'Sala Santa Cecilia',
    description: 'L\'ex frontman degli Smiths in un concerto esclusivo e imperdibile.',
    originalPrice: 95,
    discountedPrice: 76,
    hasDiscount: true,
    status: 'available',
    ticketUrl: 'https://www.auditorium.com/it/eventi/morrissey/'
  },
  {
    id: '4',
    artist: 'Jimmy Sax',
    venue: 'Auditorium Parco della Musica',
    venueId: 'auditorium',
    date: '2025-07-25',
    location: 'Cavea',
    description: 'Il sassofonista più famoso del momento in una serata magica sotto le stelle.',
    originalPrice: 55,
    discountedPrice: 44,
    hasDiscount: true,
    status: 'available',
    ticketUrl: 'https://www.auditorium.com/it/eventi/jimmy-sax/'
  },

  // Santa Cecilia 2025/26
  {
    id: '5',
    artist: 'Wagner - La Valchiria',
    venue: 'Accademia Santa Cecilia',
    venueId: 'santa-cecilia',
    date: '2025-10-23',
    location: 'Sala Santa Cecilia',
    description: 'L\'Opera immortale di Wagner diretta da Antonio Pappano con cast internazionale.',
    originalPrice: 120,
    discountedPrice: 96,
    hasDiscount: true,
    status: 'available',
    ticketUrl: 'https://www.santacecilia.it/it/concerti/wagner-la-valchiria/'
  },
  {
    id: '6',
    artist: 'Mahler - Sinfonia n.3',
    venue: 'Accademia Santa Cecilia',
    venueId: 'santa-cecilia',
    date: '2025-12-18',
    location: 'Sala Santa Cecilia',
    description: 'La monumentale Terza Sinfonia di Mahler con l\'Orchestra di Santa Cecilia.',
    originalPrice: 80,
    discountedPrice: 64,
    hasDiscount: true,
    status: 'few-tickets',
    ticketUrl: 'https://www.santacecilia.it/it/concerti/mahler-sinfonia-3/'
  },
  {
    id: '7',
    artist: 'Händel - Messiah',
    venue: 'Accademia Santa Cecilia',
    venueId: 'santa-cecilia',
    date: '2025-12-14',
    location: 'Sala Sinopoli',
    description: 'Il capolavoro di Händel nella tradizionale esecuzione natalizia.',
    originalPrice: 65,
    discountedPrice: 52,
    hasDiscount: true,
    status: 'available',
    ticketUrl: 'https://www.santacecilia.it/it/concerti/handel-messiah/'
  },
  {
    id: '8',
    artist: 'Lang Lang',
    venue: 'Accademia Santa Cecilia',
    venueId: 'santa-cecilia',
    date: '2026-05-25',
    location: 'Sala Santa Cecilia',
    description: 'Il pianista cinese più famoso al mondo in recital solistico.',
    originalPrice: 90,
    discountedPrice: 72,
    hasDiscount: true,
    status: 'available',
    ticketUrl: 'https://www.santacecilia.it/biglietteria'
  },

  // Circo Massimo
  {
    id: '9',
    artist: 'Cesare Cremonini',
    venue: 'Circo Massimo',
    venueId: 'circo-massimo',
    date: '2026-06-06',
    location: 'Circo Massimo',
    description: 'Il cantautore bolognese torna live con il suo nuovo "Live 26" tour.',
    originalPrice: 65,
    hasDiscount: false,
    status: 'available',
    ticketUrl: 'https://www.ticketmaster.it/event/cesare-cremonini-circo-massimo/'
  },
  {
    id: '10',
    artist: 'Gazzelle',
    venue: 'Circo Massimo',
    venueId: 'circo-massimo',
    date: '2025-06-07',
    location: 'Circo Massimo',
    description: 'Il fenomeno del nuovo cantautorato italiano nel suo "Tour Stadi 2025".',
    originalPrice: 45,
    hasDiscount: false,
    status: 'sold-out',
    ticketUrl: 'https://www.ticketone.it/event/gazzelle-circo-massimo-2025/'
  },
  {
    id: '11',
    artist: 'Duran Duran',
    venue: 'Circo Massimo',
    venueId: 'circo-massimo',
    date: '2025-06-15',
    location: 'Circo Massimo',
    description: 'Le leggende del new wave inglese in doppia data romana (15-16 giugno).',
    originalPrice: 85,
    hasDiscount: false,
    status: 'few-tickets',
    ticketUrl: 'https://www.vivoconcerti.com/duran-duran-circo-massimo/'
  },
  {
    id: '12',
    artist: 'Zucchero',
    venue: 'Circo Massimo',
    venueId: 'circo-massimo',
    date: '2025-06-23',
    location: 'Circo Massimo',
    description: 'Sugar Fornaciari nel tour "Overdose d\'Amore" con doppia data (23-24 giugno).',
    originalPrice: 75,
    hasDiscount: false,
    status: 'available',
    ticketUrl: 'https://www.ticketone.it/event/zucchero-overdose-damore-circo-massimo/'
  },

  // Stadio Olimpico
  {
    id: '13',
    artist: 'Max Pezzali',
    venue: 'Stadio Olimpico',
    venueId: 'olimpico',
    date: '2026-06-23',
    location: 'Stadio Olimpico',
    description: 'L\'ex 883 nel tour "Max Forever - Gli Anni d\'Oro - Stadi 2026".',
    originalPrice: 55,
    hasDiscount: false,
    status: 'available',
    ticketUrl: 'https://www.ticketone.it/event/max-pezzali-stadio-olimpico-2026/'
  },
  {
    id: '14',
    artist: 'Kendrick Lamar & SZA',
    venue: 'Stadio Olimpico',
    venueId: 'olimpico',
    date: '2025-08-02',
    location: 'Stadio Olimpico',
    description: 'Il "Grand National Tour" con i due giganti dell\'hip-hop e R&B contemporaneo.',
    originalPrice: 95,
    hasDiscount: false,
    status: 'available',
    ticketUrl: 'https://www.ticketmaster.it/event/kendrick-lamar-sza-grand-national-tour/'
  },
  {
    id: '15',
    artist: 'Ed Sheeran',
    venue: 'Stadio Olimpico',
    venueId: 'olimpico',
    date: '2025-06-14',
    location: 'Stadio Olimpico',
    description: 'Il "Mathematics European Tour" del cantautore inglese più amato al mondo.',
    originalPrice: 89,
    hasDiscount: false,
    status: 'few-tickets',
    ticketUrl: 'https://www.ticketmaster.it/event/ed-sheeran-mathematics-tour-roma/'
  }
]

const filteredConcerts = computed(() => {
  if (selectedVenue.value === 'all') {
    return concerts
  }
  return concerts.filter(concert => concert.venueId === selectedVenue.value)
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('it-IT', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'available': return 'Disponibile'
    case 'sold-out': return 'Sold Out'
    case 'few-tickets': return 'Ultimi Posti'
    default: return 'Info'
  }
}

const openBooking = (concert: Concert) => {
  // Apri il sito ufficiale di vendita biglietti in una nuova tab
  window.open(concert.ticketUrl, '_blank')
}
</script>

<style scoped>
.filter-btn {
  @apply px-6 py-3 bg-white text-roma-700 font-medium rounded-full border border-roma-200 hover:bg-roma-50 transition-all duration-300 flex items-center;
}

.filter-btn.active {
  @apply bg-roma-600 text-white border-roma-600;
}

.concert-card {
  @apply bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden;
}

.status-badge {
  @apply px-3 py-1 rounded-full text-white text-xs font-bold;
}

.btn-3d {
  @apply px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg;
}

.btn-3d-sm {
  @apply text-sm px-3 py-2;
}

.btn-3d-lg {
  @apply text-lg px-8 py-4;
}
</style>