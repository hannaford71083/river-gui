const mode = process.env.TAILWIND_MODE ? 'jit' : 'aot';

module.exports = {
  mode: 'aot',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}