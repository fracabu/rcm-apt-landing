<template>
  <section id="recensioni" class="py-16" style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <div class="container mx-auto px-4">
      <!-- Centered Single Column Layout -->
      <div class="max-w-4xl mx-auto text-center">
        
        <!-- Section Header -->
        <div class="mb-12">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            {{ $t('reviews.title') }}
          </h2>
        </div>

        <!-- Rating Card -->
        <div class="rounded-xl p-6 border text-center mb-12 max-w-md mx-auto" style="background: linear-gradient(to right, #7A1024, #6B0E1F, #7A1024); border-color: #FFB600;">
          <div class="flex justify-center mb-4">
            <StarIcon class="w-8 h-8 text-yellow-400" />
            <StarIcon class="w-8 h-8 text-yellow-400" />
            <StarIcon class="w-8 h-8 text-yellow-400" />
            <StarIcon class="w-8 h-8 text-yellow-400" />
            <StarIcon class="w-8 h-8 text-yellow-400" />
          </div>
          <div class="font-bold text-2xl text-white mb-2">9.4/10</div>
          <div class="text-sm" style="color: #FFE5B3;">{{ $t('reviews.preview.rating.description') }}</div>
        </div>


        <!-- Review Carousel -->
        <div class="flex flex-col items-center space-y-6" v-if="allReviews && allReviews.length > 0 && currentReviewIndex < allReviews.length && allReviews[currentReviewIndex]">
          <!-- Current Review Card -->
          <div class="p-8 shadow-lg border rounded-2xl w-full max-w-2xl mx-auto" style="background-color: #7A1024; border-color: #FFB600;">
            <!-- Header with name and rating -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: #FFB600;">
                  <UserIcon class="w-5 h-5" style="color: #98142B;" />
                </div>
                <div>
                  <div class="font-semibold text-white">{{ allReviews[currentReviewIndex]?.name || $t('reviews.preview.fallback.guest') }}</div>
                  <div class="text-xs" style="color: #FFE5B3;">{{ $t(`reviews.countries.${allReviews[currentReviewIndex]?.country}`) || $t('reviews.preview.fallback.country') }} • {{ allReviews[currentReviewIndex]?.date || '2025' }}</div>
                </div>
              </div>
              <div class="flex">
                <span v-for="star in Math.floor(allReviews[currentReviewIndex]?.rating || 5)" :key="star" class="text-roma-gold-400">⭐</span>
              </div>
            </div>

            <!-- Rating score -->
            <div class="text-sm font-bold mb-3" style="color: #FFB600;">
              {{ allReviews[currentReviewIndex]?.score || 10 }}/10 • {{ $t(`reviews.trip_types.${allReviews[currentReviewIndex]?.type}`) || $t('reviews.preview.fallback.guest') }}
            </div>
            
            <!-- Comment with proper line breaks -->
            <blockquote class="text-sm italic leading-relaxed" style="color: #FFE5B3;">
              "{{ allReviews[currentReviewIndex]?.comment || $t('reviews.preview.fallback.comment') }}"
            </blockquote>
          </div>

          <!-- Navigation Controls -->
          <div class="flex items-center justify-center space-x-4">
            <!-- Previous Button -->
            <button 
              @click="previousReview"
              class="rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2" style="background-color: #FFB600; color: #98142B; hover:background-color: #E6A300; focus:ring-color: #FFB600;"
              :disabled="currentReviewIndex === 0"
              :class="currentReviewIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''"
            >
              <ChevronLeftIcon class="w-5 h-5" />
            </button>

            <!-- Dots Indicator -->
            <div class="flex space-x-2">
              <button
                v-for="(_, index) in allReviews"
                :key="index"
                @click="goToReview(index)"
                class="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none"
                :class="index === currentReviewIndex ? 'w-6' : 'hover:bg-opacity-75'" :style="index === currentReviewIndex ? 'background-color: #FFB600;' : 'background-color: #FFD966; hover:background-color: #FFB600;'"
              ></button>
            </div>
            
            <!-- Next Button -->
            <button 
              @click="nextReview"
              class="rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2" style="background-color: #FFB600; color: #98142B; hover:background-color: #E6A300; focus:ring-color: #FFB600;"
            >
              <ChevronRightIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Fallback when no reviews -->
        <div v-else class="flex flex-col items-center space-y-6">
          <div class="p-6 shadow-lg border rounded-2xl w-full max-w-md mx-auto text-center" style="background-color: #7A1024; border-color: #FFB600;">
            <div class="text-white font-semibold mb-2">{{ $t('reviews.preview.loading.title') }}</div>
            <div class="text-sm" style="color: #FFE5B3;">{{ $t('reviews.preview.loading.description') }}</div>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-12">
          <router-link to="/recensioni" class="btn-3d btn-3d-md">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
              {{ $t('reviews.cta.read_all') }}
            </span>
          </router-link>
        </div>
        
      </div>
    </div>
  </section>
  <!-- Separator border -->
  <div class="h-1" style="background-color: #FFB600;"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { useI18n } from 'vue-i18n' // Unused in current implementation
import { 
  StarIcon, 
  // CheckCircleIcon, 
  // MapPinIcon, 
  // UsersIcon,
  // QuoteIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'

// const { tm } = useI18n()

// const totalReviews = 12
const currentReviewIndex = ref(0)

// Auto-advance reviews every 4 seconds
let autoAdvanceTimer: NodeJS.Timeout | null = null

const startAutoAdvance = () => {
  if (autoAdvanceTimer) {
    clearInterval(autoAdvanceTimer)
  }
  
  if (!allReviews || allReviews.length === 0) return
  
  autoAdvanceTimer = setInterval(() => {
    if (!allReviews || allReviews.length === 0) return
    
    if (currentReviewIndex.value < allReviews.length - 1) {
      currentReviewIndex.value++
    } else {
      currentReviewIndex.value = 0 // Loop back to first
    }
  }, 4000) // 4 seconds
}

const stopAutoAdvance = () => {
  if (autoAdvanceTimer) {
    clearInterval(autoAdvanceTimer)
    autoAdvanceTimer = null
  }
}

// Start auto-advance when component mounts
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  startAutoAdvance()
})

onUnmounted(() => {
  stopAutoAdvance()
})

// Dati recensioni per il preview (mantengo hardcoded per ora come nel codice originale)
const allReviews = [
  {
    id: 1,
    name: "Frigerio",
    country: "italia",
    rating: 10,
    score: 10,
    date: "Giugno 2025",
    type: "family",
    comment: "SUPERCONSIGLIATO: Dell'appartamento ci è piaciuto veramente tutto. Dalla posizione comoda con tutti i servizi di trasporto, volendo c'è anche una ciclabile che arriva fino al Vaticano. Comodissimo per chi vuole visitare il centro di Roma e per raggiungere lo stadio Olimpico. Appartamento nuovo, con tutti i servizi, molto pulito. Il proprietario molto accogliente e gentile."
  },
  {
    id: 2,
    name: "Federica",
    country: "italia", 
    rating: 10,
    score: 10,
    date: "Giugno 2025",
    type: "family",
    comment: "Ci siamo innamorati di questo appartamento appena entrati. Luminoso, super pulito e ben arredato. Per non parlare della disponibilità di Francesco, il proprietario, ha soddisfatto ogni nostra esigenza."
  },
  {
    id: 3,
    name: "Alessandra",
    country: "italia",
    rating: 10,
    score: 10,
    date: "Aprile 2025", 
    type: "solo",
    comment: "L'appartamento è nuovo, pulitissimo e dotato di ogni comfort. Ha anche un ampio balcone dal quale abbiamo apprezzato l'aria fresca e fruzzantina della serata. Il proprietario, molto simpatico e disponibile, ci ha accolto di persona. La casa si trova in una posizione molto centrale ma silenziosa."
  }
]

const nextReview = () => {
  if (!allReviews || allReviews.length === 0) return
  
  stopAutoAdvance() // Stop auto when user interacts
  if (currentReviewIndex.value < allReviews.length - 1) {
    currentReviewIndex.value++
  } else {
    currentReviewIndex.value = 0 // Loop back
  }
  setTimeout(startAutoAdvance, 10000) // Restart auto after 10s
}

const previousReview = () => {
  if (!allReviews || allReviews.length === 0) return
  
  stopAutoAdvance() // Stop auto when user interacts
  if (currentReviewIndex.value > 0) {
    currentReviewIndex.value--
  } else {
    currentReviewIndex.value = allReviews.length - 1 // Loop to last
  }
  setTimeout(startAutoAdvance, 10000) // Restart auto after 10s
}

const goToReview = (index: number) => {
  if (!allReviews || allReviews.length === 0 || index < 0 || index >= allReviews.length) return
  
  stopAutoAdvance() // Stop auto when user interacts
  currentReviewIndex.value = index
  setTimeout(startAutoAdvance, 10000) // Restart auto after 10s
}
</script>