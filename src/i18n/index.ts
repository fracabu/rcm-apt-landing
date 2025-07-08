import { createI18n } from 'vue-i18n'
import it from './locales/it.json'
import en from './locales/en.json'

const messages = {
  it,
  en
}

// Detect browser language or use stored preference
const getDefaultLocale = () => {
  const stored = localStorage.getItem('preferred-language')
  if (stored && ['it', 'en'].includes(stored)) {
    return stored
  }
  
  const browserLang = navigator.language.split('-')[0]
  return ['it', 'en'].includes(browserLang) ? browserLang : 'it'
}

export const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'it',
  messages
})

export default i18n