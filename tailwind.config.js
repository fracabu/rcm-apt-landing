/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-modern': 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 25%, #f5f5f4 100%)',
        'gradient-elegant': 'linear-gradient(135deg, #fdf2f4 0%, #f9f7ff 30%, #faf7f5 60%, #f8fafc 100%)',
        'gradient-roma': 'linear-gradient(135deg, #fdf2f4 0%, #fce7ea 20%, #f9f7ff 40%, #faf7f5 70%, #f8fafc 100%)',
        'gradient-warm': 'linear-gradient(135deg, #fdfbf7 0%, #fff9f5 30%, #fef7f0 60%, #fdf4f0 100%)',
      },
      colors: {
        // AS Roma inspired palette
        roma: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d7',
          300: '#f4a8b6',
          400: '#ec7590',
          500: '#e0486e',
          600: '#cc2d56',
          700: '#ab1f47',
          800: '#8E1F2F', // Rosso granata primario
          900: '#7a1a28',
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
          50: '#FDF9F5', // Sfondo principale caldo
          100: '#FAF9F7', // Sfondo alternativo
          200: '#f5f5f4',
          300: '#e7e5e4',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#2C2C2C', // Testo principale (più scuro)
          900: '#1A1A1A', // Testo scuro (più scuro)
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