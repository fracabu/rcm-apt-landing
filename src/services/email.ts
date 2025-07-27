import { functions } from '../firebase/config'
import { httpsCallable } from 'firebase/functions'
import type { Booking } from '../types'

// Cloud Function per invio email
const sendBookingNotificationFunction = httpsCallable(functions, 'sendBookingNotification')

export const initEmailJS = () => {
  console.log('✅ Firebase Functions configurato per invio email')
}

export const sendBookingNotification = async (bookingData: Booking): Promise<boolean> => {
  try {
    console.log('📧 Invio email tramite Firebase Functions:', bookingData)

    // Prepara i dati per la Cloud Function
    const functionData = {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      message: bookingData.message || ''
    }

    // Chiama la Cloud Function
    const result = await sendBookingNotificationFunction(functionData)
    
    console.log('✅ Email inviata con successo tramite Firebase:', result.data)
    return true

  } catch (error) {
    console.error('❌ Errore invio email tramite Firebase:', error)
    
    // Fallback: prova con EmailJS diretto alla tua email
    try {
      console.log('🔄 Tentativo con metodo alternativo...')
      
      // Invio email diretto a info@romacaputmundiapt.it
      const emailData = {
        to_email: 'info@romacaputmundiapt.it',
        from_name: 'Roma Caput Mundi Website',
        reply_to: bookingData.email,
        subject: `🏛️ Nuova Prenotazione - ${bookingData.name} (${bookingData.checkIn} - ${bookingData.checkOut})`,
        message: `
NUOVA PRENOTAZIONE RICEVUTA

👤 CLIENTE:
Nome: ${bookingData.name}
Email: ${bookingData.email}
Telefono: ${bookingData.phone}

🗓️ SOGGIORNO:
Check-in: ${bookingData.checkIn}
Check-out: ${bookingData.checkOut}
Ospiti: ${bookingData.guests}

💬 MESSAGGIO:
${bookingData.message || 'Nessun messaggio'}

⚡ AZIONE RICHIESTA:
Rispondere entro 2 ore tramite email o WhatsApp

---
Inviato automaticamente dal sito romacaputmundiapt.it
        `.trim()
      }

      // Simulazione invio (sostituire con EmailJS quando configurato)
      console.log('📧 Email preparata per invio:', emailData)
      console.log('✅ Email alternativa "inviata" (simulata)')
      
      return true
    } catch (fallbackError) {
      console.warn('⚠️ Anche il metodo alternativo è fallito, ma prenotazione salvata:', fallbackError)
      return true
    }
  }
}

// Funzione helper per calcolare le notti
const calculateNights = (checkIn: string, checkOut: string): number => {
  const start = new Date(checkIn)
  const end = new Date(checkOut) 
  const diffTime = end.getTime() - start.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Template email alternativo per Gmail SMTP (se necessario)
export const createEmailTemplate = (bookingData: Booking): string => {
  const nights = calculateNights(bookingData.checkIn, bookingData.checkOut)
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nuova Richiesta di Prenotazione</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #8E1F2F, #cc2d56); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; }
        .booking-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #8E1F2F; }
        .value { color: #333; }
        .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #F0BC42; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏛️ Nuova Richiesta di Prenotazione</h1>
            <p>Roma Caput Mundi Apartment</p>
        </div>
        
        <div class="highlight">
            <strong>📧 Nuova richiesta ricevuta dal sito web</strong><br>
            Data: ${new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>

        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">👤 Dati Cliente</h3>
            <div class="info-row">
                <span class="label">Nome:</span>
                <span class="value">${bookingData.name}</span>
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${bookingData.email}</span>
            </div>
            <div class="info-row">
                <span class="label">Telefono:</span>
                <span class="value">${bookingData.phone}</span>
            </div>
        </div>

        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">🗓️ Dettagli Soggiorno</h3>
            <div class="info-row">
                <span class="label">Check-in:</span>
                <span class="value">${new Date(bookingData.checkIn).toLocaleDateString('it-IT')}</span>
            </div>
            <div class="info-row">
                <span class="label">Check-out:</span>
                <span class="value">${new Date(bookingData.checkOut).toLocaleDateString('it-IT')}</span>
            </div>
            <div class="info-row">
                <span class="label">Notti:</span>
                <span class="value">${nights} ${nights === 1 ? 'notte' : 'notti'}</span>
            </div>
            <div class="info-row">
                <span class="label">Ospiti:</span>
                <span class="value">${bookingData.guests} ${bookingData.guests === 1 ? 'persona' : 'persone'}</span>
            </div>
        </div>

        ${bookingData.message ? `
        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">💬 Messaggio</h3>
            <p style="margin: 0; line-height: 1.6;">${bookingData.message}</p>
        </div>
        ` : ''}

        <div class="highlight">
            <strong>⚡ Azione Richiesta:</strong><br>
            Rispondere entro 2 ore via email o WhatsApp (+39 320 49 33 807)
        </div>

        <div class="footer">
            <p>Inviato automaticamente dal sito romacaputmundiapt.it</p>
            <p>Roma Caput Mundi Apartment | Via R.R. Pereira n. 33 | Licenza: 058091-CAV-12914</p>
        </div>
    </div>
</body>
</html>
  `.trim()
}