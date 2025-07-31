<template>
  <section id="servizi" class="py-16 bg-neutral-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-roma-800 mb-4">
          {{ $t('services.title') }}
        </h2>
        <p class="text-neutral-600 max-w-2xl mx-auto">
          {{ $t('services.subtitle') }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-roma-100/30"
        >
          <div class="w-12 h-12 bg-roma-50 rounded-full flex items-center justify-center mb-4">
            <component :is="service.icon" class="w-6 h-6 text-roma-red-600" />
          </div>
          <h3 class="text-xl font-semibold text-roma-800 mb-2">{{ $t(service.titleKey) }}</h3>
          <p class="text-neutral-600 text-sm">{{ $t(service.descriptionKey) }}</p>
        </div>
      </div>

      <!-- Location Highlight -->
      <div class="mt-16 bg-gradient-to-r from-white via-roma-50 to-neutral-100 rounded-2xl p-8 max-w-4xl mx-auto border border-roma-100">
        <div class="text-center">
          <h3 class="text-3xl md:text-4xl font-serif font-bold text-roma-800 mb-4">
            {{ $t('services.location.title') }}
          </h3>
          <p class="text-neutral-700 mb-6">
            {{ $t('services.location.subtitle') }}
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div class="text-roma-red-600 font-bold text-lg">100m</div>
              <div class="text-neutral-600">{{ $t('services.location.distances.station') }}</div>
            </div>
            <div>
              <div class="text-roma-gold-600 font-bold text-lg">2 fermate</div>
              <div class="text-neutral-600">{{ $t('services.location.distances.vatican') }}</div>
            </div>
            <div>
              <div class="text-roma-red-600 font-bold text-lg">1.7 km</div>
              <div class="text-neutral-600">{{ $t('services.location.distances.museums') }}</div>
            </div>
            <div>
              <div class="text-roma-gold-600 font-bold text-lg">24 km</div>
              <div class="text-neutral-600">{{ $t('services.location.distances.airport') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { 
  WifiIcon, 
  TvIcon, 
  HomeIcon, 
  SnowflakeIcon, 
  TreePineIcon, 
  TrainIcon, 
  SparklesIcon, 
  HeartIcon 
} from 'lucide-vue-next'
import type { Service } from '../types'

const services: Service[] = [
  {
    id: '1',
    titleKey: 'services.items.station.title',
    descriptionKey: 'services.items.station.description',
    icon: TrainIcon
  },
  {
    id: '2',
    titleKey: 'services.items.location.title',
    descriptionKey: 'services.items.location.description',
    icon: TrainIcon
  },
  {
    id: '3',
    titleKey: 'services.items.balcony.title',
    descriptionKey: 'services.items.balcony.description',
    icon: TreePineIcon
  },
  {
    id: '4',
    titleKey: 'services.items.wifi.title',
    descriptionKey: 'services.items.wifi.description',
    icon: WifiIcon
  },
  {
    id: '5',
    titleKey: 'services.items.streaming.title',
    descriptionKey: 'services.items.streaming.description',
    icon: TvIcon
  },
  {
    id: '6',
    titleKey: 'services.items.kitchen.title',
    descriptionKey: 'services.items.kitchen.description',
    icon: HomeIcon
  },
  {
    id: '7',
    titleKey: 'services.items.climate.title',
    descriptionKey: 'services.items.climate.description',
    icon: SnowflakeIcon
  },
  {
    id: '8',
    titleKey: 'services.items.cleaning.title',
    descriptionKey: 'services.items.cleaning.description',
    icon: SparklesIcon
  },
  {
    id: '9',
    titleKey: 'services.items.pets.title',
    descriptionKey: 'services.items.pets.description',
    icon: HeartIcon
  }
]
</script>