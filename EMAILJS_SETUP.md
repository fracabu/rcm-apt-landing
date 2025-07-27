# 📧 Configurazione EmailJS per Roma Caput Mundi

## 🚀 Setup Rapido

### 1. Crea Account EmailJS
1. Vai su [https://emailjs.com](https://emailjs.com)
2. Registrati gratuitamente 
3. Verifica l'email

### 2. Configurazione Servizio Email

#### Opzione A: Gmail (Consigliata)
1. **Add Service** → **Gmail**
2. **Service ID**: `service_rcm_booking`
3. Autorizza l'accesso Gmail
4. Conferma setup

#### Opzione B: SMTP Personalizzato (Aruba)
1. **Add Service** → **Other (SMTP)**
2. **Service ID**: `service_rcm_booking`
3. **SMTP Settings**:
   ```
   Host: smtps.aruba.it
   Port: 465 (SSL) o 587 (TLS)
   Username: info@romacaputmundiapt.it
   Password: [password email Aruba]
   ```

### 3. Crea Template Email
1. **Email Templates** → **Create New Template**
2. **Template ID**: `template_booking`
3. **Template Name**: "Booking Notification"

#### Template HTML:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nuova Prenotazione - {{from_name}}</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <div style="background: linear-gradient(135deg, #8E1F2F, #cc2d56); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 24px;">🏛️ Nuova Richiesta di Prenotazione</h1>
            <p style="margin: 5px 0 0 0;">Roma Caput Mundi Apartment</p>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #F0BC42; margin: 20px 0;">
            <strong>📧 Nuova richiesta ricevuta dal sito web</strong><br>
            Data: {{booking_date}}
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8E1F2F; margin-top: 0;">👤 Dati Cliente</h3>
            <p><strong>Nome:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Telefono:</strong> {{phone}}</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8E1F2F; margin-top: 0;">🗓️ Dettagli Soggiorno</h3>
            <p><strong>Check-in:</strong> {{checkin_date}}</p>
            <p><strong>Check-out:</strong> {{checkout_date}}</p>
            <p><strong>Notti:</strong> {{nights}}</p>
            <p><strong>Ospiti:</strong> {{guests}} persone</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8E1F2F; margin-top: 0;">💬 Messaggio</h3>
            <p>{{message}}</p>
        </div>

        <div style="background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
            <strong>⚡ Azione Richiesta:</strong><br>
            Rispondere entro 2 ore via email o WhatsApp (+39 320 49 33 807)
        </div>

        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Inviato automaticamente dal sito romacaputmundiapt.it</p>
            <p>Roma Caput Mundi Apartment | Via R.R. Pereira n. 33 | Licenza: 058091-CAV-12914</p>
        </div>
    </div>
</body>
</html>
```

#### Template Settings:
- **To Email**: `info@romacaputmundiapt.it`
- **To Name**: `Roma Caput Mundi`
- **Subject**: `🏛️ Nuova Prenotazione - {{from_name}} ({{checkin_date}} - {{checkout_date}})`
- **Reply To**: `{{from_email}}`

### 4. Ottieni le Chiavi API
1. **Account** → **General**
2. Copia **Public Key**
3. **Email Services** → Copia **Service ID**
4. **Email Templates** → Copia **Template ID**

### 5. Configura Variabili d'Ambiente
Aggiorna il file `.env`:

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_rcm_booking
VITE_EMAILJS_TEMPLATE_ID=template_booking  
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
```

### 6. Test della Configurazione
1. Riavvia il server di sviluppo: `npm run dev`
2. Compila il form di contatto sul sito
3. Controlla la console browser per errori
4. Verifica arrivo email su `info@romacaputmundiapt.it`

## 🔧 Troubleshooting

### Email non arrivano
1. **Controlla spam/junk** della casella destinazione
2. **Verifica configurazione SMTP** (se usi Aruba)
3. **Controlla console browser** per errori EmailJS
4. **Verifica quota EmailJS** (200 email/mese gratis)

### Errori Console
- `EmailJS not initialized`: Controlla Public Key
- `Template not found`: Verifica Template ID
- `Service error`: Controlla Service ID e config SMTP

### Limiti EmailJS Free
- **200 email/mese** (sufficienti per iniziare)
- **50KB per email** (template attuale OK)
- Per volumi maggiori: upgrade a piano paid

## 💡 Note

1. **Privacy**: EmailJS invia dal browser, i dati passano per i loro server
2. **Backup**: Le richieste sono comunque salvate nel database Firebase
3. **Monitoraggio**: Controlla dashboard EmailJS per statistiche invii
4. **Sicurezza**: Le variabili VITE_ sono pubbliche, non mettere dati sensibili

## 🆘 Supporto
- **EmailJS Docs**: https://www.emailjs.com/docs/
- **EmailJS Support**: https://www.emailjs.com/docs/faq/