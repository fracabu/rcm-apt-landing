<template>
  <div class="bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/concerto.jpg" 
          alt="Persone in concerto a Roma - Foto di Sebastian Ervi" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>
      <div class="container mx-auto px-4 py-8 relative mt-24 md:mt-28">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            {{ $t('concerts.title') }}
            <span class="block text-2xl md:text-4xl lg:text-5xl text-amber-200 mt-4 font-light">
              {{ $t('concerts.subtitle') }}
            </span>
          </h1>
          <p class="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {{ $t('concerts.description') }}
          </p>
          <!-- Benefits -->
          <div class="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <span class="bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-green-400/30 flex items-center gap-2">
              <TicketIcon class="w-4 h-4" />
              <span>{{ $t('concerts.benefits.auditorium_discount') }}</span>
            </span>
            <span class="bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-green-400/30 flex items-center gap-2">
              <MusicIcon class="w-4 h-4" />
              <span>{{ $t('concerts.benefits.santa_cecilia_discount') }}</span>
            </span>
            <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
              <MapPinIcon class="w-4 h-4" />
              <span>{{ $t('concerts.benefits.transport_info') }}</span>
            </span>
          </div>
          <router-link 
            to="/contatti" 
            class="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-12 rounded-full text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            {{ $t('concerts.cta') }}
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
            {{ $t(`concerts.filters.${venue.id}`) }}
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
            <h2 class="text-2xl font-bold">{{ $t('concerts.discount_banner.title') }}</h2>
          </div>
          <p class="text-lg mb-4">{{ $t('concerts.discount_banner.description') }}</p>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="bg-white/20 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">🎼 Auditorium Parco della Musica</h3>
              <p>{{ $t('concerts.discount_banner.auditorium_text') }}</p>
            </div>
            <div class="bg-white/20 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">🎻 Accademia Santa Cecilia</h3>
              <p>{{ $t('concerts.discount_banner.santa_cecilia_text') }}</p>
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
                    {{ $t(`concerts.status.${concert.status}`) }}
                  </span>
                </div>
                
                <div class="flex items-center mb-4">
                  <CalendarIcon class="w-4 h-4 mr-2" />
                  <span>{{ formatDate(concert.date) }}</span>
                </div>
                <div class="mb-4">
                  <div class="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <p class="text-xs text-white/90 mb-1">{{ $t('concerts.card.check_official') }}</p>
                    <p class="text-xs text-green-300">{{ $t('concerts.card.contact_for_discount') }}</p>
                  </div>
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
                    {{ $t('concerts.card.see_tickets') }}
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
            {{ $t('concerts.how_to_get_discount.title') }}
          </h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-roma-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">1</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ $t('concerts.how_to_get_discount.step1.title') }}</h3>
              <p class="text-gray-600">{{ $t('concerts.how_to_get_discount.step1.description') }}</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-roma-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">2</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ $t('concerts.how_to_get_discount.step2.title') }}</h3>
              <p class="text-gray-600">{{ $t('concerts.how_to_get_discount.step2.description') }}</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-roma-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">3</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ $t('concerts.how_to_get_discount.step3.title') }}</h3>
              <p class="text-gray-600">{{ $t('concerts.how_to_get_discount.step3.description') }}</p>
            </div>
          </div>
          <div class="bg-red-50 p-6 rounded-lg mt-8 border-2 border-red-200">
            <h4 class="text-lg font-semibold text-red-800 mb-2">{{ $t('concerts.how_to_get_discount.how_it_works.title') }}</h4>
            <ul class="text-sm text-red-700 space-y-2">
              <li>• {{ $t('concerts.how_to_get_discount.how_it_works.contact_first') }}</li>
              <li>• {{ $t('concerts.how_to_get_discount.how_it_works.specify_event') }}</li>
              <li>• {{ $t('concerts.how_to_get_discount.how_it_works.verify_availability') }}</li>
              <li>• {{ $t('concerts.how_to_get_discount.how_it_works.confirm_booking') }}</li>
              <li class="font-bold">⚠️ {{ $t('concerts.how_to_get_discount.how_it_works.no_guarantee') }}</li>
            </ul>
          </div>
          <div class="text-center mt-8">
            <router-link to="/contatti" class="btn-3d btn-3d-lg bg-red-600 hover:bg-red-700">
              {{ $t('concerts.how_to_get_discount.cta') }}
            </router-link>
          </div>
        </section>
        <!-- Transport Info -->
        <section class="mt-16 bg-roma-50 p-8 rounded-2xl">
          <h2 class="text-2xl font-serif font-bold text-roma-800 text-center mb-6">
            {{ $t('concerts.transport.title') }}
          </h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-3 flex items-center">
                <TrainIcon class="w-5 h-5 mr-2 text-roma-600" />
                {{ $t('concerts.transport.auditorium.title') }}
              </h3>
              <p class="text-gray-600 mb-2">{{ $t('concerts.transport.auditorium.metro') }}</p>
              <p class="text-gray-600 mb-2">{{ $t('concerts.transport.auditorium.bus') }}</p>
              <p class="text-gray-600">{{ $t('concerts.transport.auditorium.time') }}</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-3 flex items-center">
                <MapPinIcon class="w-5 h-5 mr-2 text-roma-600" />
                {{ $t('concerts.transport.stadiums.title') }}
              </h3>
              <p class="text-gray-600 mb-2">{{ $t('concerts.transport.stadiums.metro1') }}</p>
              <p class="text-gray-600 mb-2">{{ $t('concerts.transport.stadiums.metro2') }}</p>
              <p class="text-gray-600">{{ $t('concerts.transport.stadiums.time') }}</p>
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
// getStatusText removed - now using i18n directly in template
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