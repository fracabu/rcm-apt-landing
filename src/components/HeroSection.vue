<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img 
        src="/images/camera.jpg" 
        alt="Camera da letto elegante" 
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <div class="container mx-auto px-4 py-8 relative mt-24 md:mt-28">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Main Headline -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
          Roma Caput Mundi
          <span class="block text-2xl md:text-4xl lg:text-5xl text-amber-200 mt-4 font-light">
            Il Tuo Soggiorno Perfetto nel Cuore di Roma
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up drop-shadow-lg">
          Scopri l'eleganza e il comfort in un appartamento esclusivo a pochi passi dai monumenti più iconici della Città Eterna
        </p>

        <!-- Key Features -->
        <div class="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
          <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
            <TrainIcon class="w-4 h-4" />
            <span>Vicino alla Stazione</span>
          </span>
          <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
            <TvIcon class="w-4 h-4" />
            <span>Netflix & Streaming</span>
          </span>
          <span class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium shadow-lg border border-white/30 flex items-center gap-2">
            <TrainIcon class="w-4 h-4" />
            <span>2 Fermate da San Pietro</span>
          </span>
        </div>

        <!-- CTA Button -->
        <div class="space-y-6">
          <router-link 
            to="/contatti" 
            class="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-12 rounded-full text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/50"
          >
            Prenota Ora
          </router-link>
          <!-- <p class="text-gray-200 text-base md:text-lg">
            <DollarSignIcon class="inline h-5 w-5 text-amber-400 mr-2" />
            Miglior prezzo garantito • Cancellazione gratuita
          </p> -->
        </div>

        <!-- Trust Indicators -->
        <div class="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/90">
          <div class="flex items-center space-x-2">
            <span class="text-amber-400">⭐⭐⭐⭐⭐</span>
            <span class="text-sm md:text-base">Valutazione 4.9/5</span>
          </div>
          <div class="flex items-center space-x-2">
            <HomeIcon class="w-5 h-5 text-amber-400" />
            <span class="text-sm md:text-base">Appartamento 55m²</span>
          </div>
          <div class="flex items-center space-x-2">
            <UsersIcon class="w-5 h-5 text-amber-400" />
            <span class="text-sm md:text-base">Fino a 3 ospiti</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <div class="animate-bounce">
        <ChevronDownIcon class="w-8 h-8 text-white/70" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { TrainIcon, TvIcon, HomeIcon, UsersIcon, ChevronDownIcon } from 'lucide-vue-next'
</script>