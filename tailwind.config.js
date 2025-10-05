/** @type {import('tailwindcss').Config} */

export default{
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}', // Asegúrate de incluir la ruta de tus archivos
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Paleta de colores de NASA Space Apps
        'blue-yonder': '#2E96F5',
        'neon-blue': '#0960E1',
        'electric-blue': '#0042A6',
        'deep-blue': '#07173F',
        'rocket-red': '#E43700',
        'martian-red': '#8E1100',
        'neon-yellow': '#EAFE07',
      },
      fontFamily: {
        // 🖋️ Tipografía de NASA Space Apps
        sans: ['Overpass', 'sans-serif'],
        display: ['Fira Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}