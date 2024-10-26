module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  // Habilitar el modo dark
  daisyui: {
    themes: ["winter", "night"], // Activar ambos temas
  },
}
