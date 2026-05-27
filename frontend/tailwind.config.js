/**
 * Налаштування Tailwind CSS для стилів ApexGaming.
 * Тут задаються файли, які Tailwind перевіряє, і додаткові кольори.
 */

/** Тип конфігурації Tailwind, щоб редактор краще підказував поля. */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
