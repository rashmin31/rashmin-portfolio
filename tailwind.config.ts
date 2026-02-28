import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#131722',
        surface: '#1e2033',
        accent: '#2962ff',
        'accent-warm': '#26a69a',
        muted: '#363c4e',
        'text-primary': '#d1d4dc',
        'text-secondary': '#787b86',
        'bull-green': '#26a69a',
        'bear-red': '#ef5350',
        'chart-grid': '#363c4e',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-cal-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
