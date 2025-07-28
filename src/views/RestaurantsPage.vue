<template>
  <div class="bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/pasta.jpg" 
          alt="Piatti tipici romani - Carbonara e Amatriciana" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div class="container mx-auto px-4 py-8 relative mt-24 md:mt-28">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            {{ $t('restaurants.hero.title') }}
            <span class="block text-2xl md:text-4xl lg:text-5xl text-amber-200 mt-4 font-light">
              {{ $t('restaurants.hero.subtitle') }}
            </span>
          </h1>

          <p class="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {{ $t('restaurants.hero.description') }}
          </p>

          <!-- Benefits -->
          <div class="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
              <UtensilsIcon class="w-4 h-4" />
              <span>{{ $t('restaurants.hero.benefits.authentic') }}</span>
            </span>
            <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
              <MapPinIcon class="w-4 h-4" />
              <span>{{ $t('restaurants.hero.benefits.nearby') }}</span>
            </span>
            <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
              <HeartIcon class="w-4 h-4" />
              <span>{{ $t('restaurants.hero.benefits.local_tips') }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-8 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="filter-btn"
            :class="{ 'active': selectedCategory === category }"
          >
            <component :is="getCategoryIcon(category)" class="w-4 h-4 mr-2" />
            {{ $t(`restaurants.categories.${category}`) }}
          </button>
        </div>
      </div>
    </section>

    <!-- Restaurants Section -->
    <main class="py-16">
      <div class="container mx-auto px-4">
        
        <!-- Intro Text -->
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif font-bold text-roma-800 mb-4">
            {{ $t('restaurants.intro.title') }}
          </h2>
          <p class="text-neutral-700 max-w-3xl mx-auto text-lg">
            {{ $t('restaurants.intro.description') }}
          </p>
        </div>

        <!-- Restaurant Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.id"
            class="restaurant-card"
          >
            <!-- Restaurant Image -->
            <div class="relative h-48 md:h-56 overflow-hidden">
              <img
                :src="restaurant.image"
                :alt="restaurant.name"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              >
              <div class="absolute top-3 right-3">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getCategoryColor(restaurant.category)
                ]">
                  {{ $t(`restaurants.categories.${restaurant.category}`) }}
                </span>
              </div>
              <!-- Distance Badge -->
              <div class="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                📍 {{ restaurant.distance }}
              </div>
            </div>

            <!-- Restaurant Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-roma-800 mb-2">{{ restaurant.name }}</h3>
              <p class="text-neutral-700 text-sm mb-4 line-clamp-3">{{ restaurant.description }}</p>
              
              <!-- Specialties -->
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-roma-700 mb-2">🍝 {{ $t('restaurants.card.specialties') }}:</h4>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="specialty in restaurant.specialties"
                    :key="specialty"
                    class="bg-roma-50 text-roma-700 px-2 py-1 rounded-full text-xs"
                  >
                    {{ specialty }}
                  </span>
                </div>
              </div>

              <!-- Contact and Info -->
              <div class="flex items-center justify-between mb-4 text-sm text-neutral-700">
                <div>
                  <span class="font-semibold">📞 {{ restaurant.phone }}</span>
                </div>
                <div>
                  📍 {{ restaurant.area }}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  @click="openMap(restaurant)"
                  class="flex-1 btn-3d btn-3d-sm bg-roma-600 hover:bg-roma-700 text-white"
                >
                  {{ $t('restaurants.card.view_map') }}
                </button>
                <button
                  v-if="restaurant.website"
                  @click="openWebsite(restaurant)"
                  class="flex-1 btn-3d btn-3d-sm bg-neutral-600 hover:bg-neutral-700 text-white"
                >
                  {{ $t('restaurants.card.website') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tips Section -->
        <section class="mt-16 bg-roma-50 p-8 rounded-2xl">
          <h2 class="text-2xl font-serif font-bold text-roma-800 text-center mb-6">
            {{ $t('restaurants.tips.title') }}
          </h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-3 flex items-center">
                <ClockIcon class="w-5 h-5 mr-2 text-roma-600" />
                {{ $t('restaurants.tips.timing.title') }}
              </h3>
              <p class="text-gray-600 mb-2">{{ $t('restaurants.tips.timing.lunch') }}</p>
              <p class="text-gray-600 mb-2">{{ $t('restaurants.tips.timing.dinner') }}</p>
              <p class="text-gray-600">{{ $t('restaurants.tips.timing.booking') }}</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-3 flex items-center">
                <CreditCardIcon class="w-5 h-5 mr-2 text-roma-600" />
                {{ $t('restaurants.tips.payment.title') }}
              </h3>
              <p class="text-gray-600 mb-2">{{ $t('restaurants.tips.payment.cash') }}</p>
              <p class="text-gray-600 mb-2">{{ $t('restaurants.tips.payment.cards') }}</p>
              <p class="text-gray-600">{{ $t('restaurants.tips.payment.tip') }}</p>
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
  UtensilsIcon, 
  MapPinIcon, 
  HeartIcon,
  ClockIcon,
  CreditCardIcon,
  ChefHatIcon,
  BuildingIcon,
  HomeIcon
} from 'lucide-vue-next'

interface Restaurant {
  id: string
  name: string
  category: string
  area: string
  address: string
  phone: string
  description: string
  specialties: string[]
  distance: string
  image: string
  website?: string
  mapUrl: string
}

const selectedCategory = ref('all')

const categories = ['all', 'centro', 'trastevere', 'prati', 'tradizionale', 'moderna']

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    'all': UtensilsIcon,
    'centro': BuildingIcon,
    'trastevere': HomeIcon,
    'prati': ChefHatIcon,
    'tradizionale': HeartIcon,
    'moderna': UtensilsIcon
  }
  return icons[category] || UtensilsIcon
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'centro': 'bg-blue-100 text-blue-800',
    'trastevere': 'bg-green-100 text-green-800',
    'prati': 'bg-purple-100 text-purple-800',
    'tradizionale': 'bg-amber-100 text-amber-800',
    'moderna': 'bg-gray-100 text-gray-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Mastica',
    category: 'moderna',
    area: 'Prati/Vaticano',
    address: 'Largo Giorgio Maccagno 13',
    phone: '+39 06 3975 0433',
    description: 'Piccola trattoria moderna che propone cucina italiana e romana con influenza mediterranea. Adatta anche a vegetariani, atmosfera semplice e accogliente.',
    specialties: ['Pasta fresca', 'Piatti stagionali', 'Tiramisù'],
    distance: '50m dall\'appartamento',
    image: '/images/restaurants/mastica.jpg',
    mapUrl: 'https://www.google.it/maps/place/Mastica/@41.9160405,12.4361161,16z/data=!3m1!4b1!4m6!3m5!1s0x132f61aad363de81:0x133c091a2384a194!8m2!3d41.9160365!4d12.438691!16s%2Fg%2F11jmk2czfx?hl=it&entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '2',
    name: 'Da Tonino (Bassetti)',
    category: 'tradizionale',
    area: 'Centro Storico',
    address: 'Via del Governo Vecchio 18-19',
    phone: '+39 333 587 0779',
    description: 'Trattoria storica intima e spartana che propone cucina romana tradizionale. Non accetta prenotazioni, conviene presentarsi presto. Atmosfera familiare.',
    specialties: ['Carbonara', 'Amatriciana', 'Pasta alle melanzane', 'Coniglio alla cacciatora'],
    distance: '2.5km',
    image: '/images/restaurants/tonino.jpg',
    mapUrl: 'https://maps.google.com/maps?q=Via+del+Governo+Vecchio+18,+Roma'
  },
  {
    id: '3',
    name: 'Armando al Pantheon',
    category: 'tradizionale',
    area: 'Centro Storico',
    address: 'Salita dei Crescenzi 31',
    phone: '+39 06 6880 3034',
    description: 'Gestito dalla famiglia Gargioli dal 1961, questo locale con boiserie in legno è diventato un\'istituzione della cucina romana. Offre due menù.',
    specialties: ['Carbonara', 'Amatriciana', 'Cacio e pepe', 'Trippa', 'Saltimbocca', 'Abbacchio'],
    distance: '3km',
    image: '/images/restaurants/armando.jpg',
    website: 'https://www.armandoalpantheon.it/',
    mapUrl: 'https://www.google.com/maps/place/Armando+al+Pantheon/@41.8990931,12.4713773,17z/data=!3m1!4b1!4m6!3m5!1s0x132f6051d8fd0673:0x91fde7e0e4de70fe!8m2!3d41.8990932!4d12.4762429!16s%2Fg%2F11ckvg1dmb?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '4',
    name: 'Hosteria Grappolo d\'Oro',
    category: 'tradizionale',
    area: 'Centro Storico',
    address: 'Piazza della Cancelleria 80',
    phone: '+39 06 6897080',
    description: 'Riconosciuta dal Bib Gourmand Michelin, usa prodotti locali e stagionali. Offre un percorso degustazione "Percorso Romano".',
    specialties: ['Amatriciana', 'Carbonara', 'Cacio e pepe', 'Polpette di bollito', 'Maritozzo'],
    distance: '2.8km',
    image: '/images/restaurants/grappolo.jpg',
    website: 'https://www.hosteriagrappolodoro.it/',
    mapUrl: 'https://www.google.it/maps/place/Hosteria+Grappolo+D\'Oro/@41.8962859,12.4696943,17z/data=!3m2!4b1!5s0x132f604588c1978b:0xcc28a0f872583501!4m6!3m5!1s0x132f6045886be65f:0x265bb42dcf454112!8m2!3d41.8962819!4d12.4722692!16s%2Fg%2F1tj70vmw?hl=it&entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '5',
    name: 'Alfredo alla Scrofa',
    category: 'tradizionale',
    area: 'Centro Storico',
    address: 'Via della Scrofa 104/a',
    phone: '+39 06 68806163',
    description: 'Ristorante storico (oltre 110 anni) noto per aver inventato le Fettuccine Alfredo. Frequentato da celebrità.',
    specialties: ['Fettuccine Alfredo', 'Tiramisù', 'Carciofi fritti', 'Polpette', 'Saltimbocca'],
    distance: '2.2km',
    image: '/images/restaurants/alfredo.jpg',
    website: 'https://www.alfredoallascrofa.com/',
    mapUrl: 'https://www.google.com/maps/place/Ristorante+Alfredo+alla+Scrofa/@41.9022693,12.4699621,16z/data=!3m1!4b1!4m6!3m5!1s0x132f6050fbfdbdf9:0x8f8d9d9c566ad09c!8m2!3d41.9022694!4d12.4748277!16s%2Fg%2F1v6k2l24?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '6',
    name: 'Osteria La Quercia',
    category: 'tradizionale',
    area: 'Centro Storico',
    address: 'Piazza della Quercia 23',
    phone: '+39 06 6830 0932',
    description: 'Osteria segnalata da Slow Food in una piazza tranquilla. Offre piatti stagionali della tradizione con ingredienti locali.',
    specialties: ['Pasta alla genovese', 'Carbonara', 'Gnocchi con cime di rapa'],
    distance: '2.7km',
    image: '/images/restaurants/quercia.jpg',
    website: 'https://www.osterialaquercia.com/',
    mapUrl: 'https://www.google.com/maps/place/Osteria+La+Quercia/@41.8945896,12.4668264,17z/data=!3m1!4b1!4m6!3m5!1s0x132f604607994ac1:0x7889da825d2926e6!8m2!3d41.8945897!4d12.471692!16s%2Fg%2F1th547kx?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '7',
    name: 'La Pigna',
    category: 'tradizionale',
    area: 'Centro Storico',
    address: 'Piazza della Pigna 54',
    phone: '+39 06 678 5555',
    description: 'Ristorante con tavoli all\'aperto, cucina italiana e mediterranea. Vicino alla basilica di Santa Maria Sopra Minerva.',
    specialties: ['Carbonara', 'Amatriciana', 'Cacio e pepe', 'Arrosto Bubi\'s'],
    distance: '3.2km',
    image: '/images/restaurants/pigna.jpg',
    mapUrl: 'https://www.google.com/maps/place/La+Pigna+Roma+Cocktail+Bar+and+Restaurant/@41.8971662,12.4733661,17z/data=!3m1!4b1!4m6!3m5!1s0x132f604e76be4d73:0x438226f3b35fee46!8m2!3d41.8971663!4d12.4782317!16s%2Fg%2F1hc36rs_3?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '8',
    name: 'Enzo al 29',
    category: 'tradizionale',
    area: 'Trastevere',
    address: 'Via dei Vascellari 29',
    phone: '+39 06 5812260',
    description: 'Piccola trattoria a conduzione familiare gestita da tre fratelli. Fedele alle tradizioni, spesso c\'è la fila fuori.',
    specialties: ['Carciofi alla giudia', 'Abbacchio', 'Amatriciana', 'Coda alla vaccinara'],
    distance: '4km',
    image: '/images/restaurants/enzo.jpg',
    website: 'https://www.daenzoal29.com/',
    mapUrl: 'https://www.google.it/maps/place/Trattoria+Da+Enzo+al+29/@41.8880887,12.4752805,17z/data=!3m1!4b1!4m6!3m5!1s0x132f6038ddb52e7f:0xb5824e3488f5aaf8!8m2!3d41.8880847!4d12.4778554!16s%2Fg%2F1hg4xpgmj?hl=it&entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '9',
    name: 'Trattoria da Teo',
    category: 'trastevere',
    area: 'Trastevere',
    address: 'Piazza dei Ponziani 7A',
    phone: '+39 06 5818355',
    description: 'Trattoria di pesce dal clima informale, perfetta per famiglie. Offre tavoli all\'aperto e menu stagionale.',
    specialties: ['Cacio e pepe', 'Amatriciana', 'Frittura di calamari', 'Carciofi alla giudia'],
    distance: '4.2km',
    image: '/images/restaurants/teo.jpg',
    website: 'https://www.trattoriadateo.it/',
    mapUrl: 'https://maps.google.com/maps?q=Piazza+dei+Ponziani+7A,+Roma'
  }
]

const filteredRestaurants = computed(() => {
  if (selectedCategory.value === 'all') {
    return restaurants
  }
  return restaurants.filter(restaurant => restaurant.category === selectedCategory.value)
})

const openMap = (restaurant: Restaurant) => {
  window.open(restaurant.mapUrl, '_blank')
}

const openWebsite = (restaurant: Restaurant) => {
  if (restaurant.website) {
    window.open(restaurant.website, '_blank')
  }
}
</script>

<style scoped>
.filter-btn {
  @apply px-6 py-3 bg-white text-roma-700 font-medium rounded-full border border-roma-200 hover:bg-roma-50 transition-all duration-300 flex items-center;
}

.filter-btn.active {
  @apply bg-roma-600 text-white border-roma-600;
}

.restaurant-card {
  @apply bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden;
}

.btn-3d {
  @apply px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg;
}

.btn-3d-sm {
  @apply text-sm px-3 py-2;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>