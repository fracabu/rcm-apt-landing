<template>
  <div class="bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/camera.jpg" 
          alt="Galleria Fotografica Appartamento Roma" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div class="container mx-auto px-4 py-12 relative mt-16 md:mt-20 lg:mt-24">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 lg:mb-8 animate-fade-in drop-shadow-2xl">
            {{ $t('gallery.hero.title') }}
            <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-200 mt-2 lg:mt-4 font-light">
              {{ $t('gallery.hero.subtitle') }}
            </span>
          </h1>

          <!-- Key Features - Simple Text -->
          <div class="mb-8 lg:mb-12">
            <p class="text-lg sm:text-xl md:text-2xl text-amber-200 font-light max-w-2xl mx-auto">
              {{ $t('gallery.hero.features') }}
            </p>
          </div>

          <button onclick="document.querySelector('main').scrollIntoView({behavior: 'smooth'})" class="btn-3d btn-3d-md">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
              {{ $t('gallery.hero.cta') }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Content -->
    <main class="py-16">
      <div class="w-full">
        <GallerySection />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// import { CameraIcon, HomeIcon, SparklesIcon } from 'lucide-vue-next' // Unused in current implementation
import TheHeader from '../components/TheHeader.vue'
import GallerySection from '../components/GallerySection.vue'
import TheFooter from '../components/TheFooter.vue'
</script>