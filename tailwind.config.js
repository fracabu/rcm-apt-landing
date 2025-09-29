/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // Gradienti morbidi aggiornati
        'gradient-modern': 'linear-gradient(135deg, #ffffff 0%, #fafaf9 25%, #f5f5f4 100%)',
        'gradient-elegant': 'linear-gradient(135deg, #fefefe 0%, #fdf2f4 30%, #fefcf6 60%, #f6f7f6 100%)',
        'gradient-roma': 'linear-gradient(135deg, #fefefe 0%, #fdf2f4 20%, #fce7ea 40%, #fefcf6 70%, #f6f7f6 100%)',
        'gradient-warm': 'linear-gradient(135deg, #fefefe 0%, #fefcf6 30%, #fef9ed 60%, #fdf4e0 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(224, 72, 110, 0.05) 0%, rgba(240, 188, 66, 0.05) 100%)',
        'gradient-section': 'linear-gradient(135deg, #fefefe 0%, #fafaf9 50%, #f5f5f4 100%)',
      },
      colors: {
        // AS Roma inspired palette (versione morbida)
        roma: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d7',
          300: '#f4a8b6',
          400: '#ec7590',
          500: '#e0486e', // Rosso principale (più morbido)
          600: '#cc2d56', // Rosso medio
          700: '#ab1f47', // Rosso intenso
          800: '#8E1F2F', // Rosso granata originale
          900: '#7a1a28', // Rosso più scuro
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#F0BC42', // Giallo Roma ufficiale
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Colori AS Roma ufficiali completi
        'roma-red': {
          50: '#fdf2f4',
          100: '#fce7ea', 
          200: '#f9d0d7',
          300: '#f4a8b6',
          400: '#ec7590',
          500: '#e0486e',
          600: '#cc2d56',
          700: '#ab1f47',
          800: '#8E1F2F', // Rosso granata AS Roma
          900: '#7a1a28',
        },
        'roma-gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a', 
          300: '#fcd34d',
          400: '#F0BC42', // Giallo AS Roma ufficiale
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        neutral: {
          50: '#fefefe', // Bianco puro
          100: '#fafaf9', // Sfondo principale molto chiaro
          200: '#f5f5f4', // Sfondo sezioni
          300: '#e7e5e4', // Bordi chiari
          400: '#a8a29e', // Testo secondario
          500: '#78716c', // Testo normale
          600: '#57534e', // Testo importante
          700: '#44403c', // Testo scuro
          800: '#292524', // Testo principale
          900: '#1c1917', // Nero
        },
        // Nuovi colori morbidi
        cream: {
          50: '#fefdfb',
          100: '#fefcf6',
          200: '#fef9ed',
          300: '#fdf4e0',
          400: '#faedc4',
          500: '#f6e4a6', // Crema principale
          600: '#e6d289',
          700: '#d4c06d',
          800: '#c2ae52',
          900: '#b09c38',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e8e3',
          200: '#c7d2c7',
          300: '#a4b8a4',
          400: '#819a81',
          500: '#6b8068', // Verde salvia morbido
          600: '#5a6b57',
          700: '#4a5748',
          800: '#3c463a',
          900: '#2f372e',
        },
        primary: {
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        roman: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d7',
          300: '#f4a8b6',
          400: '#ec7590',
          500: '#e0486e',
          600: '#cc2d56',
          700: '#ab1f47',
          800: '#8E1F2F', // Rosso granata AS Roma
          900: '#7a1a28',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}