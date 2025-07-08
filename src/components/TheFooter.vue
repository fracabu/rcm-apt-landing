<template>
  <footer class="bg-gradient-to-br from-roma-800 via-roma-800 to-roma-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-serif font-bold mb-4">Rome Apartment Appiano FS</h3>
          <p class="text-roma-200 mb-4">
            Bilocale 50m² nella tranquilla Balduina. A 100m dalla stazione Appiano FS, 2 fermate da San Pietro. 
            WiFi veloce, Netflix, Sky e tutti i comfort per un soggiorno perfetto.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-roma-300 hover:text-gold-400 transition-colors">
              <FacebookIcon class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Link Utili</h3>
          <ul class="space-y-2">
            <li><a href="#servizi" class="text-roma-200 hover:text-gold-400 transition-colors">Servizi</a></li>
            <li><a href="#gallery" class="text-roma-200 hover:text-gold-400 transition-colors">Galleria Foto</a></li>
            <li><a href="#recensioni" class="text-roma-200 hover:text-gold-400 transition-colors">Recensioni</a></li>
            <li><a href="#contatti" class="text-roma-200 hover:text-gold-400 transition-colors">Contatti</a></li>
            <li><router-link to="/privacy" class="text-roma-200 hover:text-roma-gold-400 transition-colors">Privacy Policy</router-link></li>
            <li><a href="#cancellation-policy" class="text-roma-200 hover:text-roma-gold-400 transition-colors">Termini di Cancellazione</a></li>
            <li><router-link to="/admin" class="text-roma-200 hover:text-roma-gold-400 transition-colors">Area Admin</router-link></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contatti</h3>
          <div class="space-y-2 text-roma-200">
            <div class="flex items-center">
              <MailIcon class="mr-2 h-4 w-4" />
              <a href="mailto:romacaputmundiguesthouse@gmail.com" class="hover:text-roma-gold-400 transition-colors">
               info@romacaputmundiapt.it
              </a>
            </div>
            <div class="flex items-center">
              <PhoneIcon class="mr-2 h-4 w-4" />
              <a href="https://wa.me/393123456789" class="hover:text-roma-gold-400 transition-colors">
                +39 320 49 33 807
              </a>
            </div>
            <div class="flex items-center">
              <MapPinIcon class="mr-2 h-4 w-4" />
              <span>Via Romeo Rodriguez Pereira n.33 00136 Roma</span>
            </div>
            <div class="flex items-center">
              <ClockIcon class="mr-2 h-4 w-4" />
              <span>Check-in 15:00-22:00</span>
            </div>
            <div class="flex items-center">
              <Clock3Icon class="mr-2 h-4 w-4" />
              <span>Check-out entro le 11:00</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-roma-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="text-roma-300 text-sm mb-4 md:mb-0">
          © 2024 Rome Apartment Appiano FS. Licenza: 058091-CAV-12914, IT058091B4DGY9ABNC
        </div>
        <div class="flex items-center space-x-4 text-sm text-roma-300">
          <router-link to="/privacy" class="hover:text-roma-gold-400 transition-colors">Privacy Policy</router-link>
          <span>•</span>
          <a href="#cancellation-policy" class="hover:text-roma-gold-400 transition-colors">Cancellazione</a>
          <span>•</span>
          <router-link to="/admin" class="hover:text-roma-gold-400 transition-colors">Admin</router-link>
        </div>
      </div>
    </div>
    
    <!-- Visitor Counter & Credits -->
    <div class="text-center mt-6 space-y-2">
      <div class="text-roma-400 text-xs">
        <UsersIcon class="inline h-3 w-3 mr-1" />
        {{ formatVisitorCount(visitorCount) }} {{ $t('footer.visitors') }} · 
        <span class="text-roma-gold-400">{{ getMonthlyVisitors() }}</span> questo mese
      </div>
      <div class="text-roma-300 text-sm">
        {{ $t('footer.developed') }} <strong class="text-roma-gold-400">CodeCraftStudio</strong>
      </div>
      <div class="flex items-center justify-center space-x-2">
        <strong>Rome Apartment Appiano FS</strong>
        <span>-</span>
        <em>{{ $t('footer.tagline') }}</em>
        <HomeIcon class="h-4 w-4 text-roma-gold-400" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { 
  FacebookIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon, 
  Clock3Icon, 
  UsersIcon, 
  HeartIcon, 
  HomeIcon 
} from 'lucide-vue-next'
import { 
  visitorCount, 
  initVisitorCounter, 
  formatVisitorCount,
  simulateOrganicGrowth 
} from '../stores/visitors'

const getMonthlyVisitors = () => {
  // Stima realistica: 20-30% del traffico totale nell'ultimo mese
  const monthlyEstimate = Math.floor(visitorCount.value * 0.25)
  return formatVisitorCount(monthlyEstimate)
}

onMounted(() => {
  initVisitorCounter()
  simulateOrganicGrowth()
})
</script>