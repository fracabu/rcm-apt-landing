<template>
  <section id="gallery" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-roma-800 mb-4">
          Scopri il Bilocale
        </h2>
        <p class="text-neutral-600 max-w-2xl mx-auto">
          50m² di comfort nella tranquilla Balduina - Camera matrimoniale, soggiorno e balcone vista giardino
        </p>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="relative group cursor-pointer overflow-hidden rounded-2xl"
          :class="index === 0 ? 'md:col-span-2 md:row-span-2' : ''"
          @click="openLightbox(index)"
        >
          <img 
            :src="image.src" 
            :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            :class="index === 0 ? 'h-96 md:h-full' : 'h-64'"
          >
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div class="w-12 h-12 bg-roma-600 rounded-full flex items-center justify-center">
              <ZoomInIcon class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-12">
        <a href="#contatti" class="btn-3d btn-3d-md">
          Prenota il Tuo Soggiorno
        </a>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxOpen" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" @click="closeLightbox">
      <div class="relative max-w-4xl max-h-full">
        <img 
          :src="images[currentImageIndex].src" 
          :alt="images[currentImageIndex].alt"
          class="max-w-full max-h-full object-contain"
        >
        
        <!-- Close Button -->
        <button 
          @click="closeLightbox"
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <XIcon class="w-8 h-8" />
        </button>

        <!-- Navigation -->
        <button 
          @click.stop="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronLeftIcon class="w-8 h-8" />
        </button>
        
        <button 
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronRightIcon class="w-8 h-8" />
        </button>

        <!-- Image Counter -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ZoomInIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

const lightboxOpen = ref(false)
const currentImageIndex = ref(0)

// ISTRUZIONI PER SOSTITUIRE LE FOTO:
// 1. Carica le tue foto nella cartella /public/images/
// 2. Sostituisci gli URL qui sotto con i percorsi delle tue foto
// Esempio: src: '/images/soggiorno.jpg' invece di URL Pexels
const images = [
  {
    src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Soggiorno con divano letto e TV con Netflix e Sky'
    // Per usare le tue foto: src: '/images/soggiorno.jpg'
  },
  {
    src: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Camera da letto matrimoniale large'
    // Per usare le tue foto: src: '/images/camera.jpg'
  },
  {
    src: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Cucina attrezzata con frigorifero e macchina da caffè'
    // Per usare le tue foto: src: '/images/cucina.jpg'
  },
  {
    src: 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Bagno con doccia e bidet'
    // Per usare le tue foto: src: '/images/bagno.jpg'
  },
  {
    src: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Balcone con vista giardino'
    // Per usare le tue foto: src: '/images/balcone.jpg'
  },
  {
    src: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Zona pranzo e relax'
    // Per usare le tue foto: src: '/images/pranzo.jpg'
  }
]

const openLightbox = (index: number) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 ? images.length - 1 : currentImageIndex.value - 1
}
</script>