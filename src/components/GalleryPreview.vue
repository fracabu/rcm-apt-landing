<template>
  <section id="galleria" class="py-16" style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <div class="container mx-auto px-4">
      <!-- Two Column Layout - Images Left (Large), Text Right (Small) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto items-center">
        
        <!-- Left Column - Single Image Display (2 columns) -->
        <div class="order-2 lg:order-1 lg:col-span-2 flex flex-col items-center space-y-6">
          <!-- Current Image Card -->
          <div class="w-full max-w-lg mx-auto">
            <div class="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg" @click="openLightbox(currentImageIndex)">
              <img 
                :src="featuredImages[currentImageIndex].src" 
                :alt="featuredImages[currentImageIndex].alt" 
                class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 class="font-semibold">{{ featuredImages[currentImageIndex].title }}</h4>
              </div>
            </div>
          </div>

          <!-- Navigation Controls -->
          <div class="flex items-center justify-center space-x-4">
            <!-- Previous Button -->
            <button 
              @click="previousImage"
              class="rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2" 
              style="background-color: #FFB600; color: #98142B; hover:background-color: #E6A300; focus:ring-color: #FFB600;"
              :disabled="currentImageIndex === 0"
              :class="currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''"
            >
              <ChevronLeftIcon class="w-5 h-5" />
            </button>

            <!-- Dots Indicator -->
            <div class="flex space-x-2">
              <button
                v-for="(_, index) in featuredImages"
                :key="index"
                @click="setCurrentImage(index)"
                class="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none"
                :class="index === currentImageIndex ? 'w-6' : 'hover:bg-opacity-75'" 
                :style="index === currentImageIndex ? 'background-color: #FFB600;' : 'background-color: #FFD966; hover:background-color: #FFB600;'"
              ></button>
            </div>
            
            <!-- Next Button -->
            <button 
              @click="nextImage"
              class="rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2" 
              style="background-color: #FFB600; color: #98142B; hover:background-color: #E6A300; focus:ring-color: #FFB600;"
            >
              <ChevronRightIcon class="w-5 h-5" />
            </button>
          </div>

        </div>

        <!-- Right Column - Text Content (1 column) -->
        <div class="order-1 lg:order-2 lg:col-span-1 space-y-6">
          <!-- Section Header -->
          <div>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {{ $t('gallery.title') }}
            </h2>
            <p class="text-lg" style="color: #FFE5B3;">
              {{ $t('gallery.subtitle') }}
            </p>
          </div>

          <!-- Features List -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #FFB600;">
                <HomeIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ $t('gallery.preview.rooms.bedroom') }}</h3>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #FFB600;">
                <TvIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ $t('gallery.preview.rooms.living') }}</h3>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #FFB600;">
                <ChefHatIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ $t('gallery.preview.rooms.kitchen') }}</h3>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #FFB600;">
                <TreePineIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ $t('gallery.preview.rooms.balcony') }}</h3>
              </div>
            </div>
          </div>


          <!-- CTA -->
          <div>
            <router-link to="/galleria" class="btn-3d btn-3d-md">
              <span class="shadow"></span>
              <span class="edge"></span>
              <span class="front">
                {{ $t('gallery.cta.view_all') }}
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
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  // PlayIcon, 
  HomeIcon, 
  TvIcon,
  TreePineIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'
import { ChefHat as ChefHatIcon } from 'lucide-vue-next'

const currentImageIndex = ref(0)
// const totalPhotos = ref(12)

const featuredImages = [
  {
    src: '/images/camera.jpg',
    alt: 'Camera matrimoniale appartamento Roma',
    title: 'Camera Matrimoniale'
  },
  {
    src: '/images/soggiorno.jpg', 
    alt: 'Soggiorno con Netflix e Sky',
    title: 'Soggiorno Smart TV'
  },
  {
    src: '/images/cucina.jpg',
    alt: 'Cucina attrezzata appartamento Roma',
    title: 'Cucina Completa'
  },
  {
    src: '/images/balcone.jpg',
    alt: 'Balcone privato vista giardino',
    title: 'Balcone Vista Giardino'
  },
  {
    src: '/images/bagno.jpg',
    alt: 'Bagno moderno con doccia',
    title: 'Bagno Principale'
  },
  {
    src: '/images/bagno1.jpg',
    alt: 'Bagno appartamento Roma',
    title: 'Bagno - Vista 2'
  },
  {
    src: '/images/pranzo.jpg',
    alt: 'Zona pranzo appartamento Roma',
    title: 'Zona Pranzo'
  },
  {
    src: '/images/soggiorno1.jpg',
    alt: 'Soggiorno appartamento Roma - vista 2',
    title: 'Soggiorno - Vista 2'
  }
]

// Auto-advance images every 5 seconds
let autoAdvanceTimer: NodeJS.Timeout | null = null

const startAutoAdvance = () => {
  if (autoAdvanceTimer) {
    clearInterval(autoAdvanceTimer)
  }
  
  autoAdvanceTimer = setInterval(() => {
    if (currentImageIndex.value < featuredImages.length - 1) {
      currentImageIndex.value++
    } else {
      currentImageIndex.value = 0 // Loop back to first
    }
  }, 5000) // 5 seconds
}

const stopAutoAdvance = () => {
  if (autoAdvanceTimer) {
    clearInterval(autoAdvanceTimer)
    autoAdvanceTimer = null
  }
}

// Start auto-advance when component mounts
onMounted(() => {
  startAutoAdvance()
})

onUnmounted(() => {
  stopAutoAdvance()
})

const setCurrentImage = (index: number) => {
  stopAutoAdvance() // Stop auto when user interacts
  currentImageIndex.value = index
  setTimeout(startAutoAdvance, 8000) // Restart auto after 8s
}

const nextImage = () => {
  stopAutoAdvance() // Stop auto when user interacts
  if (currentImageIndex.value < featuredImages.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0 // Loop back
  }
  setTimeout(startAutoAdvance, 8000) // Restart auto after 8s
}

const previousImage = () => {
  stopAutoAdvance() // Stop auto when user interacts
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = featuredImages.length - 1 // Loop to last
  }
  setTimeout(startAutoAdvance, 8000) // Restart auto after 8s
}

const openLightbox = (index: number) => {
  // Future: implement lightbox functionality
  console.log('Open lightbox for image', index)
}
</script>