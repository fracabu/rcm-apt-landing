<template>
  <div class="bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/pasta.jpg" 
          alt="Piatti tipici romani - Carbonara e Amatriciana" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div class="container mx-auto px-4 py-12 relative mt-16 md:mt-20 lg:mt-24">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 lg:mb-8 animate-fade-in drop-shadow-2xl">
            {{ $t('restaurants.hero.title') }}
            <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-200 mt-2 lg:mt-4 font-light">
              {{ $t('restaurants.hero.subtitle') }}
            </span>
          </h1>

          <!-- Key Features - Simple Text -->
          <div class="mb-8 lg:mb-12">
            <p class="text-lg sm:text-xl md:text-2xl text-amber-200 font-light max-w-2xl mx-auto">
              {{ $t('restaurants.hero.features') }}
            </p>
          </div>

          <button onclick="document.querySelector('main').scrollIntoView({behavior: 'smooth'})" class="btn-3d btn-3d-md">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
              {{ $t('restaurants.hero.cta') }}
            </span>
          </button>
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
            <!-- Restaurant Info -->
            <div class="p-6">
              <!-- Category and Distance Badges -->
              <div class="flex justify-between items-start mb-3">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getCategoryColor(restaurant.category)
                ]">
                  {{ $t(`restaurants.categories.${restaurant.category}`) }}
                </span>
                <span class="bg-roma-100 text-roma-700 px-2 py-1 rounded-full text-xs">
                  📍 {{ restaurant.distance }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-roma-800 mb-2">{{ restaurant.name }}</h3>
              <p class="text-neutral-700 text-sm mb-4 line-clamp-3">{{ restaurant.description }}</p>
              
              <!-- Specialties -->
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-roma-700 mb-2">🍝 {{ $t('restaurants.card.specialties') }}:</h4>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="specialty in restaurant.specialties.slice(0, 3)"
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
                  class="flex-1 btn-3d btn-3d-sm"
                >
                  <span class="shadow"></span>
                  <span class="edge"></span>
                  <span class="front">
                    {{ $t('restaurants.card.view_map') }}
                  </span>
                </button>
                <button
                  v-if="restaurant.website"
                  @click="openWebsite(restaurant)"
                  class="flex-1 btn-3d btn-3d-sm"
                >
                  <span class="shadow"></span>
                  <span class="edge"></span>
                  <span class="front">
                    {{ $t('restaurants.card.website') }}
                  </span>
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
import { useI18n } from 'vue-i18n'
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

const { t, tm } = useI18n()

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

const restaurants = computed(() => {
  const restaurantItems = tm('restaurants.items')
  if (!restaurantItems || typeof restaurantItems !== 'object') return []
  
  return Object.entries(restaurantItems).map(([key, restaurant]: [string, any], index) => ({
    id: key,
    name: restaurant.name,
    category: restaurant.category,
    area: restaurant.area,
    address: restaurant.address,
    phone: restaurant.phone,
    description: restaurant.description,
    specialties: restaurant.specialties,
    distance: restaurant.distance,
    image: `/images/restaurants/${key}.jpg`,
    website: restaurant.website,
    mapUrl: restaurant.mapUrl
  }))
})

const filteredRestaurants = computed(() => {
  if (selectedCategory.value === 'all') {
    return restaurants.value
  }
  return restaurants.value.filter(restaurant => restaurant.category === selectedCategory.value)
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


.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>