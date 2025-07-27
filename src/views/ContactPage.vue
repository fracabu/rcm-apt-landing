<template>
  <div class="bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/balcone.jpg" 
          alt="Contatti Prenotazione Appartamento Roma" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div class="container mx-auto px-4 py-8 relative mt-24 md:mt-28">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            {{ $t('contact.hero.title') }}
            <span class="block text-2xl md:text-4xl lg:text-5xl text-amber-200 mt-4 font-light">
              {{ $t('contact.hero.subtitle') }}
            </span>
          </h1>

          <p class="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {{ $t('contact.hero.description') }}
          </p>

          <!-- Benefits -->
          <div class="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <span class="bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-green-400/30 flex items-center gap-2">
              <PhoneIcon class="w-4 h-4" />
              <span>{{ $t('contact.hero.benefits.response') }}</span>
            </span>
            <span class="bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-green-400/30 flex items-center gap-2">
              <MailIcon class="w-4 h-4" />
              <span>{{ $t('contact.hero.benefits.direct') }}</span>
            </span>
            <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
              <MapPinIcon class="w-4 h-4" />
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