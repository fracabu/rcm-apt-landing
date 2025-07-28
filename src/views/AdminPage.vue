<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Area Admin</h1>
            <p class="text-gray-600">Gestione prenotazioni Roma Caput Mundi</p>
          </div>
          <button 
            @click="handleLogout"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Login Form -->
      <div v-if="!isAuthenticated" class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Accesso Admin</h2>
          <p class="text-gray-600 mt-2">Inserisci le credenziali per accedere</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              id="email"
              v-model="loginForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roman-500 focus:border-roman-500"
              placeholder="admin@example.com"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roman-500 focus:border-roman-500"
              placeholder="••••••••"
            >
          </div>

          <button
            type="submit"
            :disabled="authLoading"
            class="w-full bg-roman-600 text-white py-2 rounded-lg hover:bg-roman-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="authLoading">Accesso in corso...</span>
            <span v-else">Accedi</span>
          </button>
        </form>

        <!-- Error Message -->
        <div v-if="loginError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 text-sm">{{ loginError }}</p>
        </div>
      </div>

      <!-- Dashboard -->
      <div v-else class="space-y-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-full">
                <CalendarIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Prenotazioni Totali</p>
                <p class="text-2xl font-semibold text-gray-900">{{ bookings.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-full">
                <TrendingUpIcon class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Questo Mese</p>
                <p class="text-2xl font-semibold text-gray-900">{{ currentMonthBookings }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-full">
                <UsersIcon class="w-6 h-6 text-purple-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Ospiti Totali</p>
                <p class="text-2xl font-semibold text-gray-900">{{ totalGuests }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bookings Table -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Prenotazioni Recenti</h3>
            <button 
              @click="refreshBookings"
              :disabled="bookingsLoading"
              class="bg-roma-600 text-white px-4 py-2 rounded-lg hover:bg-roma-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <LoaderIcon v-if="bookingsLoading" class="w-4 h-4 animate-spin" />
              <span>{{ bookingsLoading ? 'Aggiornamento...' : 'Aggiorna' }}</span>
            </button>
          </div>

          <div v-if="bookingsLoading" class="p-8 text-center">
            <LoaderIcon class="inline-block animate-spin h-8 w-8 text-roma-600" />
            <p class="mt-2 text-gray-600">Caricamento prenotazioni...</p>
          </div>

          <div v-else-if="bookings.length === 0" class="p-8 text-center text-gray-500">
            <FileTextIcon class="mx-auto h-12 w-12 text-gray-400" />
            <p class="mt-2">Nessuna prenotazione trovata</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ospiti</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contatto</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Richiesta</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ booking.name }}</div>
                      <div class="text-sm text-gray-500">{{ booking.email }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{{ formatDate(booking.checkIn) }} - {{ formatDate(booking.checkOut) }}</div>
                    <div class="text-xs text-gray-500">{{ calculateNights(booking.checkIn, booking.checkOut) }} notti</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ booking.guests }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{{ booking.phone }}</div>
                    <a :href="`mailto:${booking.email}`" class="text-roman-600 hover:text-roman-800">Invia Email</a>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDateTime(booking.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { LoaderIcon, FileTextIcon, CalendarIcon, TrendingUpIcon, UsersIcon } from 'lucide-vue-next'
import { login, logout, isAuthenticated, isLoading as authLoading } from '../stores/auth'
import { fetchBookings, bookings, isLoading as bookingsLoading } from '../stores/bookings'

const router = useRouter()

const loginForm = ref({
  email: '',
  password: ''
})

const loginError = ref('')

const handleLogin = async () => {
  try {
    loginError.value = ''
    await login(loginForm.value.email, loginForm.value.password)
    // After successful login, fetch bookings
    await fetchBookings()
  } catch (error) {
    console.error('Login error:', error)
    loginError.value = 'Credenziali non valide. Riprova.'
  }
}

const handleLogout = async () => {
  try {
    await logout()
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const currentMonthBookings = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  return bookings.value.filter(booking => {
    if (!booking.createdAt) return false
    
    try {
      // Gestisce sia Date objects che Firestore Timestamps
      const dateObj = booking.createdAt.toDate ? booking.createdAt.toDate() : new Date(booking.createdAt)
      
      if (isNaN(dateObj.getTime())) return false
      
      return dateObj.getMonth() === currentMonth && dateObj.getFullYear() === currentYear
    } catch (error) {
      console.warn('Errore calcolo mese corrente:', error, booking.createdAt)
      return false
    }
  }).length
})

const totalGuests = computed(() => {
  return bookings.value.reduce((total, booking) => total + booking.guests, 0)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('it-IT')
}

const formatDateTime = (date: Date | { toDate(): Date } | any) => {
  if (!date) return 'N/A'
  
  try {
    // Gestisce sia Date objects che Firestore Timestamps
    const dateObj = date.toDate ? date.toDate() : new Date(date)
    
    if (isNaN(dateObj.getTime())) return 'Data non valida'
    
    return dateObj.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.warn('Errore formattazione data:', error, date)
    return 'Data non valida'
  }
}

const calculateNights = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = end.getTime() - start.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const refreshBookings = async () => {
  if (isAuthenticated.value) {
    await fetchBookings()
  }
}

// Remove automatic fetchBookings on mount to avoid permission errors
// fetchBookings will be called after successful login in handleLogin
</script>