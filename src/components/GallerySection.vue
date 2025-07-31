<template>
  <section id="gallery" class="py-8 md:py-12 bg-white/95 backdrop-blur-sm">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-6 md:mb-8">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-roma-800 mb-3">
          {{ $t('gallery.title') }}
        </h2>
        <p class="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
          {{ $t('gallery.subtitle') }}
        </p>
      </div>

      <!-- Carousel Container -->
      <div class="max-w-5xl mx-auto">
        
        <!-- Main Image Display -->
        <div class="relative mb-4 md:mb-6">
          <div class="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
               style="height: clamp(300px, 60vh, 500px); max-height: 500px;">
            
            <!-- Loading Skeleton -->
            <div v-if="isLoading" class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div class="w-16 h-16 border-4 border-roma-300 border-t-roma-600 rounded-full animate-spin"></div>
            </div>
            
            <!-- Image Container with Fade Transition -->
            <div class="relative w-full h-full flex items-center justify-center bg-gray-50">
              <img 
                v-for="(image, index) in images"
                :key="index"
                :src="image.src"
                :alt="image.alt"
                :class="[
                  'absolute transition-all duration-700 ease-in-out',
                  getImageClasses(image),
                  index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                ]"
                @load="onImageLoad"
                @error="onImageError"
                loading="lazy"
              >
            </div>
            
            <!-- Navigation Arrows -->
            <button 
              @click="previousImage"
              class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-roma-800 rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-roma-600"
              :disabled="isLoading"
            >
              <ChevronLeftIcon class="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <button 
              @click="nextImage"
              class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-roma-800 rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-roma-600"
              :disabled="isLoading"
            >
              <ChevronRightIcon class="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <!-- Image Counter -->
            <div class="absolute top-2 md:top-4 right-2 md:right-4 bg-black/70 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm">
              {{ currentIndex + 1 }} / {{ images.length }}
            </div>

            <!-- Progress Bar -->
            <div class="absolute bottom-0 left-0 w-full h-1 bg-black/20">
              <div 
                class="h-full bg-roma-600 transition-all duration-300 ease-out"
                :style="{ width: `${((currentIndex + 1) / images.length) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Image Description -->
          <div class="text-center mt-3 md:mt-4">
            <h3 class="text-lg md:text-xl font-semibold text-roma-800 mb-1 md:mb-2">
              {{ getCurrentImageTitle() }}
            </h3>
            <p class="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              {{ getCurrentImageDescription() }}
            </p>
          </div>
        </div>

        <!-- Thumbnail Navigation -->
        <div class="relative mb-4 md:mb-6">
          <!-- Thumbnail Container -->
          <div 
            ref="thumbnailContainer"
            class="flex space-x-2 md:space-x-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
            style="scroll-snap-type: x mandatory;"
          >
            <button
              v-for="(image, index) in images"
              :key="index"
              @click="goToImage(index)"
              class="flex-shrink-0 relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-roma-600 rounded-lg"
              :class="[
                'transform hover:scale-105',
                index === currentIndex ? 'ring-2 ring-roma-600 scale-105' : 'hover:ring-2 hover:ring-roma-300'
              ]"
              style="scroll-snap-align: center;"
            >
              <!-- Thumbnail Image -->
              <div class="relative w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg overflow-hidden bg-gray-200">
                <img 
                  :src="image.src"
                  :alt="image.alt"
                  :class="[
                    'w-full h-full object-cover transition-all duration-300',
                    index === currentIndex ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                  ]"
                  loading="lazy"
                >
                
                <!-- Active Indicator -->
                <div 
                  v-if="index === currentIndex"
                  class="absolute inset-0 bg-roma-600/20 border-2 border-roma-600 rounded-lg"
                ></div>
                
                <!-- Loading State for Thumbnail -->
                <div 
                  v-if="!imageLoaded[index]"
                  class="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"
                ></div>
              </div>
              
              <!-- Thumbnail Label (Optional) -->
              <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap hidden lg:block">
                {{ index + 1 }}
              </div>
            </button>
          </div>
          
          <!-- Thumbnail Navigation Arrows (for mobile) -->
          <button 
            v-if="images.length > 5"
            @click="scrollThumbnails('left')"
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-roma-800 rounded-full p-1 shadow-md transition-all duration-300 md:hidden"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </button>
          
          <button 
            v-if="images.length > 5"
            @click="scrollThumbnails('right')"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-roma-800 rounded-full p-1 shadow-md transition-all duration-300 md:hidden"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- Auto-play Controls -->
        <div class="flex justify-center items-center space-x-4 mb-4 md:mb-6">
          <button
            @click="toggleAutoplay"
            class="flex items-center space-x-2 bg-roma-600 hover:bg-roma-700 text-white px-4 py-2 rounded-full transition-colors duration-300"
          >
            <component :is="isPlaying ? PauseIcon : PlayIcon" class="w-4 h-4" />
            <span class="text-sm font-medium">{{ isPlaying ? $t('common.pause') : $t('common.play') }}</span>
          </button>
          
          <div class="flex space-x-1">
            <div
              v-for="(_, index) in images"
              :key="index"
              class="w-2 h-2 rounded-full transition-colors duration-300"
              :class="index === currentIndex ? 'bg-roma-600' : 'bg-gray-300'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <router-link to="/contatti" class="btn-3d btn-3d-lg">
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front">
            {{ $t('gallery.cta.book_stay') }}
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, reactive, computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const currentIndex = ref(0)
const isPlaying = ref(false)
const isLoading = ref(false)
const thumbnailContainer = ref<HTMLElement>()
const imageLoaded = reactive<Record<number, boolean>>({})
let autoplayInterval: NodeJS.Timeout | null = null

// Temporary hardcoded translations to test
const getCurrentImageTitle = () => {
  const titles = {
    it: [
      'Camera da Letto Matrimoniale',
      'Soggiorno Accogliente', 
      'Soggiorno - Vista Alternativa',
      'Cucina Completamente Attrezzata',
      'Bagno Moderno e Funzionale',
      'Bagno - Dettaglio Arredi',
      'Balcone Privato Vista Giardino',
      'Zona Pranzo e Relax'
    ],
    en: [
      'Master Bedroom',
      'Cozy Living Room',
      'Living Room - Alternative View', 
      'Fully Equipped Kitchen',
      'Modern and Functional Bathroom',
      'Bathroom - Furniture Detail',
      'Private Garden View Balcony',
      'Dining and Relaxation Area'
    ]
  }
  // Get current locale from useI18n
  const currentLocale = locale.value || 'it'
  return titles[currentLocale as keyof typeof titles]?.[currentIndex.value] || titles.it[currentIndex.value]
}

const getCurrentImageDescription = () => {
  const descriptions = {
    it: [
      'Spaziosa camera matrimoniale con letto comodo, armadio capiente e atmosfera rilassante per il vostro riposo dopo una giornata a Roma.',
      'Soggiorno luminoso con divano letto, Smart TV con Netflix e Sky, perfetto per rilassarsi e per ospitare fino a 4 persone.',
      "Un'altra prospettiva del soggiorno che mostra l'ampiezza dello spazio e la disposizione degli arredi per il massimo comfort.",
      'Cucina moderna con frigorifero, macchina del caffè italiana e tutti gli utensili necessari per preparare i vostri pasti.',
      'Bagno pulito e moderno con doccia spaziosa, bidet e tutti i comfort necessari per il vostro soggiorno.',
      "Vista dettagliata degli arredi del bagno che evidenzia la qualità dei sanitari e l'organizzazione degli spazi.",
      'Rilassatevi nel balcone privato con vista sul tranquillo giardino condominiale, perfetto per una pausa caffè mattutina.',
      'Area pranzo accogliente dove gustare i vostri pasti in compagnia, con vista sul soggiorno e atmosfera familiare.'
    ],
    en: [
      'Spacious master bedroom with comfortable bed, large wardrobe and relaxing atmosphere for your rest after a day in Rome.',
      'Bright living room with sofa bed, Smart TV with Netflix and Sky, perfect for relaxing and accommodating up to 4 people.',
      'Another perspective of the living room showing the spaciousness and furniture arrangement for maximum comfort.',
      'Modern kitchen with refrigerator, Italian coffee machine and all utensils needed to prepare your meals.',
      'Clean and modern bathroom with spacious shower, bidet and all amenities needed for your stay.',
      'Detailed view of bathroom furnishings highlighting the quality of fixtures and space organization.',
      'Relax on the private balcony overlooking the quiet condominium garden, perfect for a morning coffee break.',
      'Welcoming dining area where you can enjoy your meals together, with living room view and family atmosphere.'
    ]
  }
  // Get current locale from useI18n
  const currentLocale = locale.value || 'it'
  return descriptions[currentLocale as keyof typeof descriptions]?.[currentIndex.value] || descriptions.it[currentIndex.value]
}

// Image data with titles, descriptions, and orientation info
const images = [
  {
    src: '/images/camera.jpg',
    alt: 'Camera da letto matrimoniale',
    titleKey: 'gallery.images.bedroom.title',
    descriptionKey: 'gallery.images.bedroom.description',
    orientation: 'landscape'
  },
  {
    src: '/images/soggiorno.jpg',
    alt: 'Soggiorno con divano letto',
    titleKey: 'gallery.images.living.title',
    descriptionKey: 'gallery.images.living.description',
    orientation: 'landscape'
  },
  {
    src: '/images/soggiorno1.jpg',
    alt: 'Soggiorno vista alternativa',
    titleKey: 'gallery.images.living_alt.title',
    descriptionKey: 'gallery.images.living_alt.description',
    orientation: 'landscape'
  },
  {
    src: '/images/cucina.jpg',
    alt: 'Cucina completamente attrezzata',
    titleKey: 'gallery.images.kitchen.title',
    descriptionKey: 'gallery.images.kitchen.description',
    orientation: 'landscape'
  },
  {
    src: '/images/bagno.jpg',
    alt: 'Bagno moderno',
    titleKey: 'gallery.images.bathroom.title',
    descriptionKey: 'gallery.images.bathroom.description',
    orientation: 'portrait'
  },
  {
    src: '/images/bagno1.jpg',
    alt: 'Bagno vista alternativa',
    titleKey: 'gallery.images.bathroom_alt.title',
    descriptionKey: 'gallery.images.bathroom_alt.description',
    orientation: 'portrait'
  },
  {
    src: '/images/balcone.jpg',
    alt: 'Balcone vista giardino',
    titleKey: 'gallery.images.balcony.title',
    descriptionKey: 'gallery.images.balcony.description',
    orientation: 'portrait'
  },
  {
    src: '/images/pranzo.jpg',
    alt: 'Zona pranzo',
    titleKey: 'gallery.images.dining.title',
    descriptionKey: 'gallery.images.dining.description',
    orientation: 'landscape'
  }
]

const nextImage = () => {
  isLoading.value = true
  currentIndex.value = (currentIndex.value + 1) % images.length
  scrollToActiveThumbnail()
  
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

const previousImage = () => {
  isLoading.value = true
  currentIndex.value = currentIndex.value === 0 ? images.length - 1 : currentIndex.value - 1
  scrollToActiveThumbnail()
  
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

const goToImage = (index: number) => {
  if (index !== currentIndex.value) {
    isLoading.value = true
    currentIndex.value = index
    scrollToActiveThumbnail()
    
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
}

const scrollToActiveThumbnail = async () => {
  await nextTick()
  if (thumbnailContainer.value) {
    const activeButton = thumbnailContainer.value.children[currentIndex.value] as HTMLElement
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }
}

const scrollThumbnails = (direction: 'left' | 'right') => {
  if (thumbnailContainer.value) {
    const scrollAmount = 120 // Adjust based on thumbnail size
    const currentScroll = thumbnailContainer.value.scrollLeft
    const newScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount
    
    thumbnailContainer.value.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    })
  }
}

const onImageLoad = (event: Event) => {
  // Mark image as loaded
  const img = event.target as HTMLImageElement
  const index = images.findIndex(image => image.src === img.src)
  if (index !== -1) {
    imageLoaded[index] = true
  }
}

const onImageError = (event: Event) => {
  console.error('Failed to load image:', event)
}

const toggleAutoplay = () => {
  isPlaying.value = !isPlaying.value
  
  if (isPlaying.value) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
}

const startAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval)
  autoplayInterval = setInterval(() => {
    nextImage()
  }, 4000) // Change image every 4 seconds
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

// Handle keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    previousImage()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  } else if (event.key === ' ') {
    event.preventDefault()
    toggleAutoplay()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  // Preload first image
  if (images.length > 0) {
    imageLoaded[0] = true
  }
})

// Handle different image orientations
const getImageClasses = (image: any) => {
  if (image.orientation === 'portrait') {
    return 'h-full w-auto object-contain max-w-full'
  } else {
    return 'w-full h-auto object-cover max-h-full'
  }
}

onUnmounted(() => {
  stopAutoplay()
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

/* Smooth scroll behavior */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Custom focus styles */
button:focus {
  outline: none;
}

/* Loading animation */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
}

.fade-in {
  animation: fadeIn 0.7s ease-in-out;
}

/* Progress bar animation */
.progress-bar {
  transition: width 0.3s ease-out;
}

/* Thumbnail hover effects */
.thumbnail-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .carousel-container {
    touch-action: pan-x;
  }
}
</style>