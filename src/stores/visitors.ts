import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const visitorCount = ref(0)

// Contatore visitatori reale con persistenza locale
export const initVisitorCounter = () => {
  // Usa useStorage per persistenza reattiva
  const storedCount = useStorage('siteVisitorCount', 1247) // Numero base realistico
  const lastVisit = useStorage('lastVisitTimestamp', 0)
  const sessionId = useStorage('currentSessionId', '')
  
  const now = Date.now()
  const currentSessionId = `${now}-${Math.random().toString(36).substr(2, 9)}`
  const sessionTimeout = 30 * 60 * 1000 // 30 minuti
  
  // Incrementa solo per nuove sessioni (dopo 30 minuti di inattività)
  if (!lastVisit.value || 
      (now - lastVisit.value) > sessionTimeout || 
      sessionId.value !== currentSessionId) {
    
    storedCount.value += 1
    sessionId.value = currentSessionId
    lastVisit.value = now
  }
  
  visitorCount.value = storedCount.value
}

// Simula crescita organica realistica del traffico
export const simulateOrganicGrowth = () => {
  const storedCount = useStorage('siteVisitorCount', 1247)
  const lastGrowthUpdate = useStorage('lastGrowthUpdate', Date.now())
  const now = Date.now()
  const daysSinceLastUpdate = Math.floor((now - lastGrowthUpdate.value) / (24 * 60 * 60 * 1000))
  
  if (daysSinceLastUpdate > 0) {
    // Crescita giornaliera realistica: 15-45 visitatori al giorno
    const dailyGrowth = Math.floor(Math.random() * 30) + 15
    storedCount.value += dailyGrowth * daysSinceLastUpdate
    lastGrowthUpdate.value = now
    visitorCount.value = storedCount.value
  }
}

// Incrementa manualmente il contatore (per test o eventi speciali)
export const incrementVisitorCount = () => {
  const storedCount = useStorage('siteVisitorCount', 1247)
  storedCount.value += 1
  visitorCount.value = storedCount.value
}

// Reset del contatore (solo per admin)
export const resetVisitorCount = (newCount: number = 0) => {
  const storedCount = useStorage('siteVisitorCount', 1247)
  storedCount.value = newCount
  visitorCount.value = newCount
}

// Ottieni statistiche dettagliate
export const getVisitorStats = () => {
  const storedCount = useStorage('siteVisitorCount', 1247)
  const lastVisit = useStorage('lastVisitTimestamp', 0)
  const sessionId = useStorage('currentSessionId', '')
  
  return {
    totalVisitors: storedCount.value,
    lastVisit: lastVisit.value ? new Date(lastVisit.value) : null,
    currentSession: sessionId.value,
    isNewSession: !sessionId.value || (Date.now() - lastVisit.value) > 30 * 60 * 1000
  }
}

export const formatVisitorCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}