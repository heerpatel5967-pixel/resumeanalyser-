/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070A14',
          900: '#0B1020', // requested dark navy base
          850: '#0F162B',
          800: '#151E38',
          750: '#1A2544',
          700: '#223055',
          600: '#2F4172',
        },
        brand: {
          purple: {
            DEFAULT: '#7357FF',
            light: '#937eff',
            dark: '#5838ea',
            glow: 'rgba(115, 87, 255, 0.35)',
          },
          cyan: {
            DEFAULT: '#00D9FF',
            light: '#61e7ff',
            dark: '#00b3d6',
            glow: 'rgba(0, 217, 255, 0.35)',
          },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(115,87,255,0.15) 0%, rgba(0,219,255,0.12) 50%, rgba(11,16,32,0) 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-purple': '0 0 25px -5px rgba(115, 87, 255, 0.45)',
        'glow-cyan': '0 0 25px -5px rgba(0, 217, 255, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
