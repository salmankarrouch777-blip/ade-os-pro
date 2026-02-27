import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // 🔥 LA LÍNEA MÁGICA: Ahora Tailwind leerá todo lo que programemos dentro de src
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Mantenemos estas por si acaso tuvieras archivos fuera
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'page-bg': '#0c0c0f',
        'dark-bg': '#0f0f14',
        'charcoal': '#282828',
        'surface': '#16161d',
        'card-gray': '#1a1a22',
        'accent-purple': '#6A28E3',
        'accent-cyan': '#00C9B1',
        'neon-purple': '#7C4DFF',
        'neon-cyan': '#00E5FF',
        'accent-violet': '#a78bfa',
      },
      fontFamily: {
        sans: ['var(--font-sans, ui-sans-serif, system-ui, sans-serif)'],
        mono: ['var(--font-mono, ui-monospace, monospace)'],
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(0, 201, 177, 0.35)',
        'glow-purple': '0 0 40px -10px rgba(106, 40, 227, 0.4)',
        'glow-white': '0 0 24px rgba(255, 255, 255, 0.2)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config