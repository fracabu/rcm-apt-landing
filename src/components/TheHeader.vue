<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-neutral-50/95 backdrop-blur-sm shadow-sm transition-all duration-300 border-b border-roma-100/20">
    <nav class="container mx-auto px-4 py-1">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img 
            src="/rcmlanding logo.png" 
            alt="Roma Caput Mundi Logo" 
            class="h-20 w-20 md:h-24 md:w-24"
          >
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#servizi" class="text-neutral-700 hover:text-roma-600 transition-colors duration-200">{{ $t('nav.services') }}</a>
          <a href="#gallery" class="text-neutral-700 hover:text-roma-600 transition-colors duration-200">{{ $t('nav.photos') }}</a>
          <a href="#recensioni" class="text-neutral-700 hover:text-roma-600 transition-colors duration-200">{{ $t('nav.reviews') }}</a>
          <a href="#contatti" class="text-neutral-700 hover:text-roma-600 transition-colors duration-200">{{ $t('nav.contacts') }}</a>
          <LanguageSwitcher />
          <a href="#contatti" class="btn-3d btn-3d-sm">
            {{ $t('nav.availability') }}
          </a>
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
          <a href="#servizi" @click="closeMobileMenu" class="text-neutral-700 hover:text-roma-600 transition-colors duration-200">{{ $t('nav.services') }}</a>
          <a href="#gallery" @click="closeMobileMenu" class="text-neutral-700 hover:text-roma-600 transition-colors duration-200">{{ $t('nav.photos') }}</a>
          <a href="#recensioni" @click="closeMobileMenu" class="text-neutral-700 hover:text-roma-600 transition-colors duration-200">{{ $t('nav.reviews') }}</a>
          <a href="#contatti" @click="closeMobileMenu" class="text-neutral-700 hover:text-roma-600 transition-colors duration-200">{{ $t('nav.contacts') }}</a>
          <div class="flex justify-center">
            <LanguageSwitcher />
          </div>
          <a href="#contatti" @click="closeMobileMenu" class="btn-3d btn-3d-md w-full text-center">
            {{ $t('nav.availability') }}
          </a>
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