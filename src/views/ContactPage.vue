<template>
  <div class="bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/balcone.jpg" 
          alt="Contatti Prenotazione Appartamento Roma" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div class="container mx-auto px-4 py-12 relative mt-16 md:mt-20 lg:mt-24">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-4 lg:mb-6 animate-fade-in drop-shadow-2xl">
            {{ $t('contact.hero.title') }}
            <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-200 mt-2 lg:mt-4 font-light">
              {{ $t('contact.hero.subtitle') }}
            </span>
          </h1>

          <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 lg:mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {{ $t('contact.hero.description') }}
          </p>

          <!-- Benefits -->
          <div class="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 lg:mb-12 text-xs sm:text-sm md:text-base">
            <span class="bg-green-500/20 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full text-white font-medium shadow-lg border border-green-400/30 flex items-center gap-2">
              <PhoneIcon class="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{{ $t('contact.hero.benefits.response') }}</span>
            </span>
            <span class="bg-green-500/20 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full text-white font-medium shadow-lg border border-green-400/30 flex items-center gap-2">
              <MailIcon class="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{{ $t('contact.hero.benefits.direct') }}</span>
            </span>
            <span class="bg-white/20 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
              <MapPinIcon class="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{{ $t('contact.hero.benefits.location') }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <main class="py-16">
      <ContactSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-vue-next'
import TheHeader from '../components/TheHeader.vue'
import ContactSection from '../components/ContactSection.vue'
import TheFooter from '../components/TheFooter.vue'
</script>