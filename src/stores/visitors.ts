import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const visitorCount = ref(0)
export const todayVisitors = ref(0)
export const monthlyVisitors = ref(0)

// Contatore visitatori reale - SOLO visite autentiche
export const initVisitorCounter = () => {
  const storedCount = useStorage('siteVisitorCount', 0) // Parte da ZERO
  const lastVisit = useStorage('lastVisitTimestamp', 0)
  const sessionId = useStorage('currentSessionId', '')
  const dailyVisits = useStorage('dailyVisitCount', 0)
  const lastVisitDate = useStorage('lastVisitDate', '')
  const monthlyVisits = useStorage('monthlyVisitCount', 0)
  const lastMonthReset = useStorage('lastMonthReset', '')
  
  const now = Date.now()
  const today = new Date().toDateString()
  const currentMonth = new Date().getMonth() + new Date().getFullYear() * 12
  const currentSessionId = `${now}-${Math.random().toString(36).substr(2, 9)}`
  const sessionTimeout = 30 * 60 * 1000 // 30 minuti
  
  // Reset contatore giornaliero se è un nuovo giorno
  if (lastVisitDate.value !== today) {
    dailyVisits.value = 0
    lastVisitDate.value = today
  }
  
  // Reset contatore mensile se è un nuovo mese
  if (lastMonthReset.value !== currentMonth.toString()) {
    monthlyVisits.value = 0
    lastMonthReset.value = currentMonth.toString()
  }
  
  // Incrementa SOLO per visite reali (nuove sessioni)
  if (!lastVisit.value || 
      (now - lastVisit.value) > sessionTimeout || 
      sessionId.value !== currentSessionId) {
    
    storedCount.value += 1
    dailyVisits.value += 1
    monthlyVisits.value += 1
    sessionId.value = currentSessionId
    lastVisit.value = now
    
    console.log('🎯 Nuova visita reale registrata:', {
      totale: storedCount.value,
      oggi: dailyVisits.value,
      mese: monthlyVisits.value
    })
  }
  
  visitorCount.value = storedCount.value
  todayVisitors.value = dailyVisits.value
  monthlyVisitors.value = monthlyVisits.value
}

// Formatta i numeri per display
export const formatVisitorCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

// Incrementa manualmente il contatore (per test o eventi speciali)
export const incrementVisitorCount = () => {
  const storedCount = useStorage('siteVisitorCount', 0)
  const dailyVisits = useStorage('dailyVisitCount', 0)
  const monthlyVisits = useStorage('monthlyVisitCount', 0)
  
  storedCount.value += 1
  dailyVisits.value += 1
  monthlyVisits.value += 1
  
  visitorCount.value = storedCount.value
  todayVisitors.value = dailyVisits.value
  monthlyVisitors.value = monthlyVisits.value
  
  console.log('✅ Contatore incrementato manualmente')
}

// Reset completo di tutti i contatori
export const resetAllCounters = () => {
  // Rimuovi tutti i dati dal localStorage
  localStorage.removeItem('siteVisitorCount')
  localStorage.removeItem('dailyVisitCount') 
  localStorage.removeItem('monthlyVisitCount')
  localStorage.removeItem('lastVisitDate')
  localStorage.removeItem('lastMonthReset')
  localStorage.removeItem('lastVisitTimestamp')
  localStorage.removeItem('currentSessionId')
  localStorage.removeItem('lastGrowthUpdate') // Rimuovi anche vecchi dati fake
  
  // Reset valori reattivi
  visitorCount.value = 0
  todayVisitors.value = 0
  monthlyVisitors.value = 0
  
  console.log('🗑️ Tutti i contatori sono stati resettati a zero')
}

// Ottieni statistiche dettagliate (per debug o admin)
export const getVisitorStats = () => {
  const storedCount = useStorage('siteVisitorCount', 0)
  const lastVisit = useStorage('lastVisitTimestamp', 0)
  const sessionId = useStorage('currentSessionId', '')
  const dailyVisits = useStorage('dailyVisitCount', 0)
  const monthlyVisits = useStorage('monthlyVisitCount', 0)
  
  return {
    totalVisitors: storedCount.value,
    todayVisitors: dailyVisits.value,
    monthlyVisitors: monthlyVisits.value,
    lastVisit: lastVisit.value ? new Date(lastVisit.value) : null,
    currentSession: sessionId.value,
    isNewSession: !sessionId.value || (Date.now() - lastVisit.value) > 30 * 60 * 1000
  }
}

// Verifica se il visitatore è già stato contato oggi
export const isVisitorCountedToday = () => {
  const lastVisit = useStorage('lastVisitTimestamp', 0)
  const sessionTimeout = 30 * 60 * 1000
  return lastVisit.value && (Date.now() - lastVisit.value) <= sessionTimeout
}

// Per admin - visualizza tutte le statistiche
export const debugVisitorInfo = () => {
  const stats = getVisitorStats()
  console.table(stats)
  return stats
}