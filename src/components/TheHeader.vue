<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 border-b border-roma-200/30">
    <nav class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img 
            src="/rcmlanding logo.png" 
            alt="Roma Caput Mundi Logo" 
            class="h-16 w-16 md:h-20 md:w-20 rounded-full shadow-md border-2 border-roma-200"
          >
          <div class="hidden md:block">
            <h1 class="text-xl font-serif font-bold text-roma-800">Roma Caput Mundi</h1>
            <p class="text-sm text-roma-600">Appartamento Vaticano</p>
          </div>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/servizi" class="nav-link">{{ $t('nav.services') }}</router-link>
          <router-link to="/galleria" class="nav-link">{{ $t('nav.photos') }}</router-link>
          <router-link to="/recensioni" class="nav-link">{{ $t('nav.reviews') }}</router-link>
          <router-link to="/concerti" class="nav-link">Concerti</router-link>
          <router-link to="/musei" class="nav-link">Musei</router-link>
          <router-link to="/contatti" class="nav-link">{{ $t('nav.contacts') }}</router-link>
          <LanguageSwitcher />
          <router-link to="/contatti" class="btn-primary">
            {{ $t('nav.availability') }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-roma-50 transition-colors">
          <MenuIcon v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <XIcon v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4 border-t pt-4">
        <div class="flex flex-col space-y-4">
          <router-link to="/servizi" @click="closeMobileMenu" class="nav-link-mobile">{{ $t('nav.services') }}</router-link>
          <router-link to="/galleria" @click="closeMobileMenu" class="nav-link-mobile">{{ $t('nav.photos') }}</router-link>
          <router-link to="/recensioni" @click="closeMobileMenu" class="nav-link-mobile">{{ $t('nav.reviews') }}</router-link>
          <router-link to="/concerti" @click="closeMobileMenu" class="nav-link-mobile">Concerti</router-link>
          <router-link to="/musei" @click="closeMobileMenu" class="nav-link-mobile">Musei</router-link>
          <router-link to="/contatti" @click="closeMobileMenu" class="nav-link-mobile">{{ $t('nav.contacts') }}</router-link>
          <div class="flex justify-center">
            <LanguageSwitcher />
          </div>
          <router-link to="/contatti" @click="closeMobileMenu" class="btn-primary w-full text-center">
            {{ $t('nav.availability') }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuIcon, XIcon } from 'lucide-vue-next'
import LanguageSwitcher from './LanguageSwitcher.vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.nav-link {
  @apply text-neutral-700 hover:text-roma-600 font-medium transition-all duration-300 hover:scale-105;
}

.nav-link.router-link-active {
  @apply text-roma-600 font-semibold;
}

.nav-link-mobile {
  @apply text-neutral-700 hover:text-roma-600 font-medium transition-colors duration-200 py-2;
}

.nav-link-mobile.router-link-active {
  @apply text-roma-600 font-semibold;
}

.btn-primary {
  @apply bg-gradient-to-r from-roma-600 to-roma-700 hover:from-roma-700 hover:to-roma-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl;
}
</style>