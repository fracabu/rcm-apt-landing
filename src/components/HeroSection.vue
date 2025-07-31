<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
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

    <div class="container mx-auto px-4 py-12 relative mt-16 md:mt-20 lg:mt-24">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Main Headline -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 lg:mb-8 animate-fade-in drop-shadow-2xl">
          {{ $t('hero.title') }}
          <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-200 mt-2 lg:mt-4 font-light">
            {{ $t('hero.subtitle') }}
          </span>
        </h1>

        <!-- Key Location - Simple Text -->
        <div class="mb-8 lg:mb-12">
          <p class="text-lg sm:text-xl md:text-2xl text-amber-200 font-light max-w-2xl mx-auto">
            {{ $t('hero.features.station') }} • {{ $t('hero.features.location') }}
          </p>
        </div>

        <!-- CTA Button -->
        <div class="space-y-4 lg:space-y-6">
          <router-link 
            to="/contatti" 
            class="btn-3d btn-3d-secondary btn-3d-md"
          >
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
              {{ $t('hero.cta') }}
            </span>
          </router-link>
          <!-- <p class="text-gray-200 text-base md:text-lg">
            <DollarSignIcon class="inline h-5 w-5 text-amber-400 mr-2" />
            Miglior prezzo garantito • Cancellazione gratuita
          </p> -->
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
// No imports needed for simplified hero
</script>