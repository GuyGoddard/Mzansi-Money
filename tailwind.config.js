/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#E1F5EE',
          100: '#9FE1CB',
          400: '#5DCAA5',
          500: '#1D9E75',
          600: '#0F6E56',
          700: '#085041',
          900: '#04342C',
        },
        amber: {
          50:  '#FAEEDA',
          100: '#FAC775',
          400: '#EF9F27',
          500: '#BA7517',
          700: '#633806',
          900: '#412402',
        },
        blue: {
          50:  '#E6F1FB',
          100: '#B5D4F4',
          400: '#378ADD',
          500: '#185FA5',
          700: '#0C447C',
          900: '#042C53',
        },
        coral: {
          50:  '#FAECE7',
          100: '#F5C4B3',
          500: '#D85A30',
          900: '#4A1B0C',
        },
        sand: {
          50:  '#F9F7F2',
          100: '#F1EFE8',
          200: '#D3D1C7',
          400: '#888780',
          600: '#5F5E5A',
          900: '#2C2C2A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Poppins', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
