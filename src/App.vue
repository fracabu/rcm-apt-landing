<template>
  <router-view />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'

const { locale } = useI18n()

// Aggiorna il tag lang dell'HTML in base alla lingua selezionata
const htmlLang = computed(() => locale.value)

useHead({
  htmlAttrs: {
    lang: htmlLang
  },
  link: [
    {
      rel: 'alternate',
      hreflang: 'it',
      href: 'https://romacaputmundiapt.it'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://romacaputmundiapt.it/en'
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: 'https://romacaputmundiapt.it'
    }
  ]
})
</script>