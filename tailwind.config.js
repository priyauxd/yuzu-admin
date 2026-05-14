/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yuzu: {
          50: '#fffbeb',
          100: '#f5ede7',
          200: '#fef08a',
          300: '#fcd34d',
          400: '#f6c453',
          500: '#f5d000',
          600: '#ca8a04',
          700: '#a16207',
          800: '#601919',
          900: '#4c1515',
        },
        brand: {
          bg: '#ffffff',
          paper: '#ffffff',
          warm: '#f5ede7',
          text: '#3e3f40',
          'text-secondary': '#808284',
          'text-tertiary': '#535862',
          'text-disabled': '#d9d9da',
          border: '#d5d7da',
          hover: '#f5f5f5',
        },
        neutral: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#d9d9da',
          400: '#a6a6a8',
          500: '#888d96',
          600: '#6b7280',
          700: '#4d4e4f',
          800: '#3c4047',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px -1px #f5f5f5, 0 1px 3px 0 #f5f5f5',
        md: '0 2px 4px -2px #0a0d120f, 0 4px 6px -1px #0a0d121a',
        button: '0 4px 7.8px -1px #f5f5f5, 0 0 3px -2px #f5f5f5',
      },
    },
  },
  plugins: [],
}
