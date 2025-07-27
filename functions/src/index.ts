import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

// Initialize Firebase Admin
admin.initializeApp();

interface BookingData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
}

// Configurazione SMTP Aruba
const smtpEmail = functions.config().smtp?.email || 'info@romacaputmundiapt.it';
const smtpPassword = functions.config().smtp?.password || '';

const transporter = nodemailer.createTransport({
  host: 'smtps.aruba.it',
  port: 465,
  secure: true,
  auth: {
    user: smtpEmail,
    pass: smtpPassword
  }
});

// Cloud Function per inviare email di notifica booking
export const sendBookingNotification = functions.https.onCall(async (data: BookingData, context) => {
  try {
    // Verifica che i dati richiesti siano presenti
    if (!data.name || !data.email || !data.checkIn || !data.checkOut) {
      throw new functions.https.HttpsError('invalid-argument', 'Dati richiesti mancanti');
    }

    // Calcola numero di notti
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Template email HTML
    const emailHTML = createBookingEmailTemplate(data, nights);

    // Configurazione email
    const mailOptions = {
      from: `"Roma Caput Mundi Booking" <${smtpEmail}>`,
      to: 'info@romacaputmundiapt.it',
      replyTo: data.email,
      subject: `🏛️ Nuova Prenotazione - ${data.name} (${checkIn.toLocaleDateString('it-IT')} - ${checkOut.toLocaleDateString('it-IT')})`,
      html: emailHTML,
      text: createBookingEmailText(data, nights)
    };

    // Invia email
    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email inviata con successo:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'Email di notifica inviata con successo'
    };

  } catch (error) {
    console.error('❌ Errore invio email:', error);
    throw new functions.https.HttpsError('internal', 'Errore nell\'invio email', error);
  }
});

// Funzione per creare template HTML email
function createBookingEmailTemplate(data: BookingData, nights: number): string {
  const bookingDate = new Date().toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nuova Prenotazione - ${data.name}</title>
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
        .action-box { background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
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
            Data e ora: ${bookingDate}
        </div>

        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">👤 Dati Cliente</h3>
            <div class="info-row">
                <span class="label">Nome:</span>
                <span class="value">${data.name}</span>
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
            </div>
            <div class="info-row">
                <span class="label">Telefono:</span>
                <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
            </div>
        </div>

        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">🗓️ Dettagli Soggiorno</h3>
            <div class="info-row">
                <span class="label">Check-in:</span>
                <span class="value">${new Date(data.checkIn).toLocaleDateString('it-IT')}</span>
            </div>
            <div class="info-row">
                <span class="label">Check-out:</span>
                <span class="value">${new Date(data.checkOut).toLocaleDateString('it-IT')}</span>
            </div>
            <div class="info-row">
                <span class="label">Notti:</span>
                <span class="value">${nights} ${nights === 1 ? 'notte' : 'notti'}</span>
            </div>
            <div class="info-row">
                <span class="label">Ospiti:</span>
                <span class="value">${data.guests} ${data.guests === 1 ? 'persona' : 'persone'}</span>
            </div>
        </div>

        ${data.message ? `
        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">💬 Messaggio del Cliente</h3>
            <p style="margin: 0; line-height: 1.6; background: white; padding: 15px; border-radius: 5px;">${data.message}</p>
        </div>
        ` : ''}

        <div class="action-box">
            <strong>⚡ Azione Richiesta:</strong><br>
            Rispondere entro 2 ore tramite:
            <ul style="margin: 10px 0;">
                <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/${data.phone.replace(/\D/g, '')}">${data.phone}</a></li>
            </ul>
        </div>

        <div class="footer">
            <p>Inviato automaticamente dal sito <strong>romacaputmundiapt.it</strong></p>
            <p>Roma Caput Mundi Apartment | Via R.R. Pereira n. 33 | Licenza: 058091-CAV-12914</p>
            <p style="margin-top: 10px; font-size: 10px; color: #999;">
                Per rispondere a questa email, clicca rispondi o scrivi direttamente a ${data.email}
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

// Funzione per creare versione testo email
function createBookingEmailText(data: BookingData, nights: number): string {
  const bookingDate = new Date().toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
🏛️ NUOVA RICHIESTA DI PRENOTAZIONE - Roma Caput Mundi

📧 Richiesta ricevuta dal sito web: ${bookingDate}

👤 DATI CLIENTE:
Nome: ${data.name}
Email: ${data.email}
Telefono: ${data.phone}

🗓️ DETTAGLI SOGGIORNO:
Check-in: ${new Date(data.checkIn).toLocaleDateString('it-IT')}
Check-out: ${new Date(data.checkOut).toLocaleDateString('it-IT')}
Notti: ${nights} ${nights === 1 ? 'notte' : 'notti'}
Ospiti: ${data.guests} ${data.guests === 1 ? 'persona' : 'persone'}

${data.message ? `💬 MESSAGGIO DEL CLIENTE:\n${data.message}\n\n` : ''}

⚡ AZIONE RICHIESTA:
Rispondere entro 2 ore tramite email (${data.email}) o WhatsApp (${data.phone})

---
Inviato automaticamente dal sito romacaputmundiapt.it
Roma Caput Mundi Apartment | Via R.R. Pereira n. 33 | Licenza: 058091-CAV-12914
  `.trim();
}