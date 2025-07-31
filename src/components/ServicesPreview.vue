<template>
  <section id="servizi" class="py-16" style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <div class="container mx-auto px-4">
      <!-- Centered Single Column Layout -->
      <div class="max-w-4xl mx-auto text-center">
        
        <!-- Section Header -->
        <div class="mb-12">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            {{ $t('services.title') }}
          </h2>
          <p class="text-lg" style="color: #FFE5B3;">
            {{ $t('services.subtitle') }}
          </p>
        </div>

        <!-- Premium Services -->
        <div class="rounded-2xl p-8 border mb-8" style="background: linear-gradient(to right, #7A1024, #6B0E1F, #7A1024); border-color: #FFB600;">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <ShieldCheckIcon class="w-12 h-12 mx-auto mb-4" style="color: #FFB600;" />
              <h3 class="text-xl font-semibold text-white mb-2">{{ $t('services.preview.checkin.title') }}</h3>
              <p class="text-sm" style="color: #FFE5B3;">{{ $t('services.preview.checkin.description') }}</p>
            </div>
            <div>
              <MapPinIcon class="w-12 h-12 mx-auto mb-4" style="color: #FFB600;" />
              <h3 class="text-xl font-semibold text-white mb-2">{{ $t('services.preview.guide.title') }}</h3>
              <p class="text-sm" style="color: #FFE5B3;">{{ $t('services.preview.guide.description') }}</p>
            </div>
            <div>
              <TicketIcon class="w-12 h-12 mx-auto mb-4" style="color: #FFB600;" />
              <h3 class="text-xl font-semibold text-white mb-2">{{ $t('services.preview.discounts.title') }}</h3>
              <p class="text-sm" style="color: #FFE5B3;">{{ $t('services.preview.discounts.description') }}</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <router-link to="/servizi" class="btn-3d btn-3d-md">
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front">
            {{ $t('services.cta.discover') }}
          </span>
        </router-link>
        
      </div>
    </div>
  </section>
  <!-- Separator border -->
  <div class="h-1" style="background-color: #FFB600;"></div>
</template>

<script setup lang="ts">
import { 
  ShieldCheckIcon, 
  MapPinIcon, 
  TicketIcon
} from 'lucide-vue-next'
</script>