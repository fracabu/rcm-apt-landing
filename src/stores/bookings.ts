import { ref } from 'vue'
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/config'
import type { Booking } from '../types'

export const bookings = ref<Booking[]>([])
export const isLoading = ref(false)

export const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
  try {
    isLoading.value = true
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...booking,
      createdAt: new Date()
    })
    return docRef.id
  } catch (error) {
    console.error('Errore nel salvare la prenotazione:', error)
    throw error
  } finally {
    isLoading.value = false
  }
}

export const fetchBookings = async () => {
  try {
    isLoading.value = true
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    bookings.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[]
  } catch (error) {
    console.error('Errore nel recuperare le prenotazioni:', error)
    throw error
  } finally {
    isLoading.value = false
  }
}