<template>
  <section id="concerti" class="min-h-screen py-16 flex items-center" style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <div class="container mx-auto px-4">
      <!-- Two Column Layout - Images Left, Text Right -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
        
        <!-- Left Column - Featured Concert Images -->
        <div class="order-2 lg:order-1 space-y-4">
          <!-- Main concert image -->
          <div class="relative group cursor-pointer">
            <img 
              src="/images/concerto.jpg" 
              alt="Concerti Roma 2025-2026" 
              class="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <h4 class="font-bold text-xl mb-2">{{ $t('concerts.preview.featured.title') }}</h4>
              <p class="text-sm opacity-90">{{ $t('concerts.preview.featured.venues') }}</p>
            </div>
            <!-- Music icon overlay -->
            <div class="absolute top-4 right-4">
              <div class="bg-white/90 rounded-full p-3">
                <MusicIcon class="w-6 h-6" style="color: #FFB600;" />
              </div>
            </div>
          </div>
          
          <!-- Venue highlights grid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-roma-600 to-roma-800 p-4 rounded-xl text-white text-center">
              <TicketIcon class="w-8 h-8 mx-auto mb-2" />
              <div class="font-bold text-lg">20%</div>
              <div class="text-xs opacity-90">{{ $t('concerts.preview.discount.label') }}</div>
            </div>
            <div class="bg-gradient-to-br from-roma-gold-500 to-roma-gold-600 p-4 rounded-xl text-white text-center">
              <CalendarIcon class="w-8 h-8 mx-auto mb-2" />
              <div class="font-bold text-lg">2025-26</div>
              <div class="text-xs opacity-90">{{ $t('concerts.preview.season.label') }}</div>
            </div>
          </div>
        </div>

        <!-- Right Column - Text Content -->
        <div class="order-1 lg:order-2 space-y-8">
          <!-- Section Header -->
          <div>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {{ $t('concerts.title') }}
            </h2>
            <p class="text-lg" style="color: #FFE5B3;">
              {{ $t('concerts.subtitle') }}
            </p>
          </div>

          <!-- Featured Venues -->
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style="background-color: #FFB600;">
                <MusicIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-1">{{ $t('concerts.preview.venues.auditorium.name') }}</h3>
                <p class="text-sm" style="color: #FFE5B3;">{{ $t('concerts.preview.venues.auditorium.description') }}</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style="background-color: #FFB600;">
                <TicketIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-1">{{ $t('concerts.preview.venues.santa_cecilia.name') }}</h3>
                <p class="text-sm" style="color: #FFE5B3;">{{ $t('concerts.preview.venues.santa_cecilia.description') }}</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style="background-color: #FFB600;">
                <CalendarIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-1">{{ $t('concerts.preview.venues.stadiums.name') }}</h3>
                <p class="text-sm" style="color: #FFE5B3;">{{ $t('concerts.preview.venues.stadiums.description') }}</p>
              </div>
            </div>
          </div>


          <!-- CTA -->
          <div>
            <router-link to="/concerti" class="btn-3d btn-3d-md">
              <span class="shadow"></span>
              <span class="edge"></span>
              <span class="front">
                {{ $t('concerts.cta.discover') }}
              </span>
            </router-link>
          </div>
        </div>
        
      </div>
    </div>
  </section>
  <!-- Separator border -->
  <div class="h-1" style="background-color: #FFB600;"></div>
</template>

<script setup lang="ts">
import { 
  MusicIcon, 
  TicketIcon, 
  CalendarIcon,
  MapPinIcon
} from 'lucide-vue-next'
</script>