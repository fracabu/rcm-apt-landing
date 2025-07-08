<template>
  <div 
    v-if="showBanner" 
    class="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-lg"
  >
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex-1">
          <p class="text-sm">
            🍪 Utilizziamo cookie per migliorare la tua esperienza di navigazione e analizzare il traffico del sito. 
            Continuando a navigare accetti il nostro utilizzo dei cookie.
          </p>
          <router-link to="/privacy" class="text-roman-300 hover:text-roman-200 underline text-xs">
            Leggi la Privacy Policy
          </router-link>
        </div>
        
        <div class="flex gap-3">
          <button 
            @click="acceptEssential"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Solo Essenziali
          </button>
          <button 
            @click="acceptAll"
            class="px-4 py-2 bg-roman-600 text-white rounded-lg hover:bg-roman-700 transition-colors text-sm"
          >
            Accetta Tutti
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

onMounted(() => {
  // Check if user has already made a choice
  const cookieConsent = localStorage.getItem('cookieConsent')
  if (!cookieConsent) {
    showBanner.value = true
  }
})

const acceptAll = () => {
  localStorage.setItem('cookieConsent', 'all')
  showBanner.value = false
  
  // Here you would initialize analytics and other tracking scripts
  console.log('All cookies accepted')
}

const acceptEssential = () => {
  localStorage.setItem('cookieConsent', 'essential')
  showBanner.value = false
  
  // Only initialize essential functionality
  console.log('Only essential cookies accepted')
}
</script>