import { addBooking } from '../stores/bookings'
import { sendBookingNotification } from './email'
import type { Booking } from '../types'

export const submitBooking = async (formData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
  try {
    const bookingData = {
      ...formData,
      status: 'pending' as const
    }

    const docId = await addBooking(bookingData)
    console.log('Prenotazione salvata con ID:', docId)
    return docId
  } catch (error) {
    console.error('Errore nel salvare la prenotazione:', error)
    throw error
  }
}

export const sendBookingEmail = async (bookingData: Booking) => {
  try {
    console.log('Invio email per prenotazione:', bookingData)
    
    // Invia notifica email a info@romacaputmundiapt.it
    const emailSent = await sendBookingNotification(bookingData)
    
    if (!emailSent) {
      throw new Error('Invio email fallito')
    }
    
    return true
  } catch (error) {
    console.error('Errore nell\'invio email:', error)
    throw error
  }
}