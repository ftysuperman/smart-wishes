/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chinese-red': '#C8102E',
        'gold-foil': '#D4AF37',
        'ink-black': '#1A1A1A',
        'ivory-white': '#FAF9F6',
        'vermilion': '#E63946',
        'royal-gold': '#C5A059',
        'jade-green': '#0A7038',
        'paper-white': '#F5F5F0',
      },
      fontFamily: {
        'serif-display': ['"Noto Serif SC"', '"Songti SC"', 'serif'],
        'sans-body': ['"Noto Sans SC"', '"PingFang SC"', 'sans-serif'],
      },
      backgroundImage: {
        'pattern-cloud': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'gradient-golden': 'linear-gradient(135deg, #D4AF37 0%, #F5D76E 50%, #D4AF37 100%)',
        'gradient-imperial': 'linear-gradient(135deg, #C8102E 0%, #8B0000 100%)',
      },
      boxShadow: {
        'elegant': '0 4px 30px rgba(200, 16, 46, 0.15)',
        'golden-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'floating': '0 10px 40px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}