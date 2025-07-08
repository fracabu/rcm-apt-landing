<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-roma-50 transition-colors text-sm"
      :class="{ 'bg-roma-50': isOpen }"
    >
      <span class="text-lg">{{ currentFlag }}</span>
      <span class="font-medium text-neutral-700">{{ currentLang.toUpperCase() }}</span>
      <ChevronDownIcon class="w-4 h-4 text-neutral-500 transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-roma-100 z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="switchLanguage(lang.code)"
        class="w-full flex items-center space-x-2 px-3 py-2 hover:bg-roma-50 transition-colors text-sm first:rounded-t-lg last:rounded-b-lg"
        :class="{ 'bg-roma-50 text-roma-600': currentLang === lang.code }"
      >
        <span class="text-lg">{{ lang.flag }}</span>
        <span class="font-medium">{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDownIcon } from 'lucide-vue-next'

const { locale } = useI18n()
const isOpen = ref(false)

const languages = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
]

const currentLang = computed(() => locale.value)
const currentFlag = computed(() => {
  const lang = languages.find(l => l.code === locale.value)
  return lang?.flag || '🇮🇹'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = (langCode: string) => {
  locale.value = langCode
  localStorage.setItem('preferred-language', langCode)
  isOpen.value = false
  
  // Update HTML lang attribute
  document.documentElement.lang = langCode
  
  // Update page title based on language
  updatePageTitle(langCode)
}

const updatePageTitle = (lang: string) => {
  const titles = {
    it: 'Rome Apartment Appiano FS - WiFi Netflix Sky - 2 fermate da San Pietro',
    en: 'Rome Apartment Appiano FS - WiFi Netflix Sky - 2 stops from St. Peter\'s'
  }
  document.title = titles[lang as keyof typeof titles] || titles.it
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  updatePageTitle(locale.value)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>