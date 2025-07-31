import emailjs from '@emailjs/browser'
import type { Booking } from '../types'

// Configurazione EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const initEmailJS = () => {
  console.log('🔍 EmailJS Configuration Check:', {
    hasPublicKey: !!EMAILJS_PUBLIC_KEY,
    hasServiceId: !!EMAILJS_SERVICE_ID,
    hasTemplateId: !!EMAILJS_TEMPLATE_ID,
    environment: import.meta.env.MODE,
    publicKey: EMAILJS_PUBLIC_KEY ? `${EMAILJS_PUBLIC_KEY.substring(0, 8)}...` : 'MISSING',
    serviceId: EMAILJS_SERVICE_ID || 'MISSING',
    templateId: EMAILJS_TEMPLATE_ID || 'MISSING'
  })
  
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    console.error('❌ EmailJS configuration missing:', {
      EMAILJS_PUBLIC_KEY: !!EMAILJS_PUBLIC_KEY,
      EMAILJS_SERVICE_ID: !!EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID: !!EMAILJS_TEMPLATE_ID
    })
    return false
  }
  
  emailjs.init(EMAILJS_PUBLIC_KEY)
  console.log('✅ EmailJS configurato per invio email')
  return true
}

export const sendBookingNotification = async (bookingData: Booking): Promise<boolean> => {
  // Calcola numero di notti
  const nights = calculateNights(bookingData.checkIn, bookingData.checkOut)
  
  // Prepara i dati per EmailJS template (dichiarato fuori dal try per essere accessibile nel catch)
  const templateData = {
    from_name: bookingData.name,
    from_email: bookingData.email,
    phone: bookingData.phone,
    phone_clean: bookingData.phone.replace(/\D/g, ''), // Solo numeri per WhatsApp
    checkin_date: new Date(bookingData.checkIn).toLocaleDateString('it-IT'),
    checkout_date: new Date(bookingData.checkOut).toLocaleDateString('it-IT'),
    guests: bookingData.guests,
    nights: `${nights} ${nights === 1 ? 'notte' : 'notti'}`,
    message: bookingData.message || 'Nessun messaggio aggiuntivo',
    booking_date: new Date().toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  try {
    console.log('🔍 Starting email send process...')
    
    // Check for problematic email domains
    const email = bookingData.email.toLowerCase()
    const problematicDomains = ['hotmail.com', 'hotmail.it', 'live.com', 'outlook.com', 'outlook.it']
    const isProblematicDomain = problematicDomains.some(domain => email.includes(domain))
    
    if (isProblematicDomain) {
      console.warn('⚠️ Email con dominio potenzialmente problematico per EmailJS:', email)
    }
    
    if (!initEmailJS()) {
      console.error('❌ EmailJS configuration failed')
      throw new Error('EmailJS service not available. Please check configuration.')
    }

    console.log('📧 Invio email tramite EmailJS:', bookingData)

    // Debug: log dei dati che stiamo inviando
    console.log('📧 Dati template EmailJS:', templateData)
    console.log('📧 Config EmailJS:', { 
      serviceId: EMAILJS_SERVICE_ID, 
      templateId: EMAILJS_TEMPLATE_ID,
      publicKey: EMAILJS_PUBLIC_KEY 
    })

    // Invia email tramite EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateData
    )
    
    console.log('✅ Email inviata con successo tramite EmailJS:', result.status, result.text)
    return true

  } catch (error) {
    console.error('❌ Errore invio email tramite EmailJS:', error)
    
    // Log dettagliato dell'errore per debug
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
    }
    
    // Log specifico per errori EmailJS
    if (error && typeof error === 'object' && 'status' in error) {
      console.error('EmailJS Error Status:', (error as any).status)
      console.error('EmailJS Error Text:', (error as any).text)
      
      // Messaggio specifico per domini problematici
      const email = bookingData.email.toLowerCase()
      const problematicDomains = ['hotmail.com', 'hotmail.it', 'live.com', 'outlook.com', 'outlook.it']
      const isProblematicDomain = problematicDomains.some(domain => email.includes(domain))
      
      if (isProblematicDomain && (error as any).status === 400) {
        console.error('🚨 PROBLEMA DOMINIO EMAIL: EmailJS ha difficoltà con domini Hotmail/Outlook/Live')
        console.error('💡 SOLUZIONE: Il cliente può usare Gmail, Yahoo o altri domini')
      }
    }
    
    // Log della configurazione per debug
    console.error('Configuration debug:', {
      hasServiceId: !!EMAILJS_SERVICE_ID,
      hasTemplateId: !!EMAILJS_TEMPLATE_ID,
      hasPublicKey: !!EMAILJS_PUBLIC_KEY,
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      env: import.meta.env.MODE
    })
    
    // Log del payload inviato
    console.error('Template data sent:', templateData)
    
    // Anche se l'email fallisce, la prenotazione è salvata nel database
    console.warn('⚠️ Email fallita ma prenotazione salvata nel database')
    return false
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