<template>
  <footer class="text-white py-12" style="background: linear-gradient(135deg, rgba(224, 72, 110, 0.85) 0%, rgba(204, 45, 86, 0.85) 50%, rgba(224, 72, 110, 0.85) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-serif font-bold mb-4">{{ $t('footer.company_name') }}</h3>
          <p class="text-roma-200 mb-4">
            {{ $t('footer.description') }}
          </p>
          <div class="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61580886698287" target="_blank" class="text-roma-300 hover:text-gold-400 transition-colors">
              <FacebookIcon class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.links.title') }}</h3>
          <ul class="space-y-2">
            <li><router-link to="/servizi" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('footer.links.services') }}</router-link></li>
            <li><router-link to="/galleria" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('footer.links.gallery') }}</router-link></li>
            <li><router-link to="/recensioni" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('footer.links.reviews') }}</router-link></li>
            <li><router-link to="/concerti" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('footer.links.concerts') }}</router-link></li>
            <li><router-link to="/ristoranti" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('pages.restaurants') }}</router-link></li>
            <li><router-link to="/contatti" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('footer.links.contacts') }}</router-link></li>
            <li><router-link to="/privacy" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('footer.links.privacy') }}</router-link></li>
            <li><router-link to="/cancellazione" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('footer.links.cancellation') }}</router-link></li>
            <li><router-link to="/admin" class="text-roma-200 hover:text-roma-gold-400 transition-colors">{{ $t('footer.links.admin') }}</router-link></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.contact.title') }}</h3>
          <div class="space-y-2 text-roma-200">
            <div class="flex items-center">
              <MailIcon class="mr-2 h-4 w-4" />
              <a href="mailto:info@romacaputmundiapt.it" class="hover:text-roma-gold-400 transition-colors">
               info@romacaputmundiapt.it
              </a>
            </div>
            <div class="flex items-center">
              <PhoneIcon class="mr-2 h-4 w-4" />
              <a href="https://wa.me/393204933807" class="hover:text-roma-gold-400 transition-colors">
                +39 320 49 33 807
              </a>
            </div>
            <div class="flex items-center">
              <MapPinIcon class="mr-2 h-4 w-4" />
              <span>Via Romeo Rodriguez Pereira n.33 00136 Roma</span>
            </div>
          </div>
        </div>

        <!-- Hours & Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Orari & Info</h3>
          <div class="space-y-2 text-roma-200">
            <div class="flex items-center">
              <ClockIcon class="mr-2 h-4 w-4" />
              <span>{{ $t('footer.contact.checkin') }}</span>
            </div>
            <div class="flex items-center">
              <Clock3Icon class="mr-2 h-4 w-4" />
              <span>{{ $t('footer.contact.checkout') }}</span>
            </div>
            <div class="text-sm text-roma-300 mt-3">
              Licenza: 058091-CAV-12914
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-roma-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="text-roma-300 text-sm mb-4 md:mb-0">
          © 2024 RomaCaputMundiApt. CIN: IT058091B4DGY9ABNC
        </div>
        <div class="flex items-center space-x-4 text-sm text-roma-300">
          <router-link to="/privacy" class="hover:text-roma-gold-400 transition-colors">Privacy Policy</router-link>
          <span>•</span>
          <router-link to="/cancellazione" class="hover:text-roma-gold-400 transition-colors">{{ $t('footer.legal.cancellation') }}</router-link>
          <span>•</span>
          <router-link to="/admin" class="hover:text-roma-gold-400 transition-colors">Admin</router-link>
        </div>
      </div>
    </div>
    
    <!-- Credits -->
    <div class="text-center mt-6">
      <div class="text-roma-300 text-sm">
        {{ $t('footer.developed') }} <strong class="text-roma-gold-400">CodeCraftStudio</strong>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  FacebookIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  Clock3Icon
} from 'lucide-vue-next'
</script>