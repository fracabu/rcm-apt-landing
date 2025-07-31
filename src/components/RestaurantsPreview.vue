<template>
  <section id="ristoranti" class="min-h-screen py-16 flex items-center" style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <div class="container mx-auto px-4">
      <!-- Two Column Layout - Images Left, Text Right -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
        
        <!-- Left Column - Food & Restaurant Images -->
        <div class="order-2 lg:order-1 space-y-4">
          <!-- Main food image -->
          <div class="relative group cursor-pointer">
            <img 
              src="/images/pasta.jpg" 
              alt="Piatti tipici romani - Carbonara e Amatriciana" 
              class="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <h4 class="font-bold text-xl mb-2">{{ $t('restaurants.preview.featured.title') }}</h4>
              <p class="text-sm opacity-90">{{ $t('restaurants.preview.featured.dishes') }}</p>
            </div>
            <!-- Food icon overlay -->
            <div class="absolute top-4 right-4">
              <div class="rounded-full p-3" style="background-color: #FFB600;">
                <UtensilsIcon class="w-6 h-6" style="color: #98142B;" />
              </div>
            </div>
          </div>
          
          <!-- Specialties highlights grid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-roma-600 to-roma-800 p-4 rounded-xl text-white text-center">
              <ChefHatIcon class="w-8 h-8 mx-auto mb-2" />
              <div class="font-bold text-sm">{{ $t('restaurants.preview.highlights.trattorias.title') }}</div>
              <div class="text-xs opacity-90">{{ $t('restaurants.preview.highlights.trattorias.subtitle') }}</div>
            </div>
            <div class="bg-gradient-to-br from-roma-gold-500 to-roma-gold-600 p-4 rounded-xl text-white text-center">
              <UtensilsIcon class="w-8 h-8 mx-auto mb-2" />
              <div class="font-bold text-sm">{{ $t('restaurants.preview.highlights.specialties.title') }}</div>
              <div class="text-xs opacity-90">{{ $t('restaurants.preview.highlights.specialties.subtitle') }}</div>
            </div>
          </div>
          
        </div>

        <!-- Right Column - Text Content -->
        <div class="order-1 lg:order-2 space-y-8">
          <!-- Section Header -->
          <div>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {{ $t('restaurants.hero.title') }}
            </h2>
            <p class="text-lg" style="color: #FFE5B3;">
              {{ $t('restaurants.hero.subtitle') }}
            </p>
          </div>

          <!-- Roman Specialties -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #FFB600;">
                <UtensilsIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ $t('restaurants.preview.dishes.carbonara') }}</h3>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #FFB600;">
                <ChefHatIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ $t('restaurants.preview.dishes.others') }}</h3>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #FFB600;">
                <MapPinIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ $t('restaurants.preview.dishes.trattorias') }}</h3>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #FFB600;">
                <WineIcon class="w-5 h-5" style="color: #98142B;" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ $t('restaurants.preview.dishes.wines') }}</h3>
              </div>
            </div>
          </div>


          <!-- CTA -->
          <div>
            <router-link to="/ristoranti" class="btn-3d btn-3d-md">
              <span class="shadow"></span>
              <span class="edge"></span>
              <span class="front">
                {{ $t('restaurants.cta.discover') }}
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
import { ChefHat as ChefHatIcon } from 'lucide-vue-next'
import { 
  UtensilsIcon,
  MapPinIcon,
  HeartIcon,
  Wine as WineIcon
} from 'lucide-vue-next'
</script>