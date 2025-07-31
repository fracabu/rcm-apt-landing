<template>
  <section id="musei" class="min-h-screen py-16 flex items-center" style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <div class="container mx-auto px-4">
      <!-- Two Column Layout - Text Left, Images Right -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
        
        <!-- Left Column - Text Content -->
        <div class="space-y-8">
          <!-- Section Header -->
          <div>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {{ $t('museums.title') }}
            </h2>
            <p class="text-lg" style="color: #FFE5B3;">
              {{ $t('museums.subtitle') }}
            </p>
          </div>

          <!-- Top 3 Museums -->
          <div class="rounded-2xl p-6 border" style="background: linear-gradient(to right, #7A1024, #6B0E1F, #7A1024); border-color: #FFB600;">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <ChurchIcon class="w-10 h-10 mx-auto mb-3" style="color: #FFB600;" />
                <h3 class="font-semibold text-white mb-1">{{ $t('museums.preview.top.vatican.name') }}</h3>
                <p class="text-xs" style="color: #FFE5B3;">{{ $t('museums.preview.top.vatican.highlight') }}</p>
              </div>
              <div>
                <LandmarkIcon class="w-10 h-10 mx-auto mb-3" style="color: #FFB600;" />
                <h3 class="font-semibold text-white mb-1">{{ $t('museums.preview.top.colosseum.name') }}</h3>
                <p class="text-xs" style="color: #FFE5B3;">{{ $t('museums.preview.top.colosseum.highlight') }}</p>
              </div>
              <div>
                <PaletteIcon class="w-10 h-10 mx-auto mb-3" style="color: #FFB600;" />
                <h3 class="font-semibold text-white mb-1">{{ $t('museums.preview.top.borghese.name') }}</h3>
                <p class="text-xs" style="color: #FFE5B3;">{{ $t('museums.preview.top.borghese.highlight') }}</p>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div>
            <router-link to="/musei" class="btn-3d btn-3d-md">
              <span class="shadow"></span>
              <span class="edge"></span>
              <span class="front">
                {{ $t('museums.cta.discover') }}
              </span>
            </router-link>
          </div>
        </div>

        <!-- Right Column - Single Featured Image -->
        <div class="text-center">
          <div class="relative">
            <img 
              src="/images/colosseo.jpg" 
              alt="Colosseo Roma - Musei e siti archeologici" 
              class="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
            <div class="absolute bottom-4 left-4 text-white">
              <h4 class="font-bold text-xl">{{ $t('museums.preview.featured.title') }}</h4>
              <p class="text-sm opacity-90">{{ $t('museums.preview.featured.description') }}</p>
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
import { 
  ChurchIcon,
  LandmarkIcon, 
  PaletteIcon,
  ColumnsIcon,
  TicketIcon,
  MapPinIcon,
  ClockIcon
} from 'lucide-vue-next'
</script>