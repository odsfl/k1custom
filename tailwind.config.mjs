/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A0A0A',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#BFBFBF',
          300: '#8A8A8A',
          400: '#5C5C5C',
          500: '#333333',
          600: '#1F1F1F',
          700: '#141414',
          800: '#0A0A0A',
          900: '#000000',
        },
        gold: {
          DEFAULT: '#1FA8FF',
          50: '#E5F4FF',
          100: '#C7E7FE',
          200: '#9CD6FF',
          300: '#5DBDFF',
          400: '#1FA8FF',
          500: '#1796E8',
          600: '#0C8CDB',
          700: '#0871B0',
          800: '#075A8E',
          900: '#043E62',
        },
        teal: {
          DEFAULT: '#1FA8FF',
          50: '#E5F4FF',
          100: '#C7E7FE',
          200: '#9CD6FF',
          300: '#5DBDFF',
          400: '#1FA8FF',
          500: '#1796E8',
          600: '#0C8CDB',
          700: '#0871B0',
          800: '#075A8E',
          900: '#043E62',
        },
        cream: '#FAFAFA',
        stone: '#F0F0F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Barlow Condensed"', 'Impact', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #1FA8FF 0%, #5DBDFF 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};
