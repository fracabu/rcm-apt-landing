<template>
  <div style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 50%, rgba(152, 20, 43, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/concerto.jpg" 
          alt="Persone in concerto a Roma - Foto di Sebastian Ervi" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>
      <div class="container mx-auto px-4 py-12 relative mt-16 md:mt-20 lg:mt-24">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 lg:mb-8 animate-fade-in drop-shadow-2xl">
            {{ $t('concerts.title') }}
            <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-200 mt-2 lg:mt-4 font-light">
              {{ $t('concerts.subtitle') }}
            </span>
          </h1>
          <!-- Key Benefits - Simple Text -->
          <div class="mb-8 lg:mb-12">
            <p class="text-lg sm:text-xl md:text-2xl text-amber-200 font-light max-w-2xl mx-auto">
              {{ $t('concerts.benefits.transport_info') }}
            </p>
          </div>
          <a href="#filters-section" class="btn-3d btn-3d-md">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
              {{ $t('concerts.cta.discover') }}
            </span>
          </a>
        </div>
      </div>
    </section>
    <!-- Filters Section -->
    <section id="filters-section" class="py-8 bg-white shadow-sm">
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
    <main id="concerti-section" class="py-16">
      <div class="container mx-auto px-4">
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
                      'bg-orange-500': concert.status === 'few-tickets'
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
                    <p class="text-xs text-white/90">{{ $t('concerts.card.check_official') }}</p>
                  </div>
                </div>
              </div>
              <div class="bg-white p-6 rounded-b-2xl border-t-0">
                <p class="text-gray-600 mb-6 leading-relaxed">{{ $t(`concerts.descriptions.${concert.id}`) }}</p>
                
                <div class="flex justify-between items-center">
                  <div class="text-sm text-gray-500">
                    <MapPinIcon class="w-3 h-3 inline mr-1" />
                    {{ concert.location }}
                  </div>
                  <button 
                    class="btn-3d btn-3d-sm"
                    @click="openBooking(concert)"
                  >
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front">
                      {{ $t('concerts.card.see_tickets') }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
import { useI18n } from 'vue-i18n'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
// import { getAllConcerts, refreshConcerts, type Concert } from '../services/concerts'
import {
  MusicIcon,
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
const { locale } = useI18n()
const selectedVenue = ref('all')

const venues: Venue[] = [
  { id: 'all', name: 'All Concerts', icon: MusicIcon },
  { id: 'auditorium', name: 'Auditorium', icon: StarIcon },
  { id: 'santa-cecilia', name: 'Santa Cecilia', icon: MusicIcon },
  { id: 'circo-massimo', name: 'Circo Massimo', icon: HomeIcon },
  { id: 'olimpico', name: 'Olympic Stadium', icon: UsersIcon }
]

// Concerti aggiornabili manualmente
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
  const currentLocale = locale.value === 'en' ? 'en-US' : 'it-IT'
  return date.toLocaleDateString(currentLocale, { 
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
  @apply px-3 py-1 rounded-full text-white text-xs font-bold shadow-md;
}

.concert-card:hover {
  @apply shadow-2xl;
}

.concert-card:hover .status-badge {
  @apply scale-105;
}
</style>