/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'var(--font-jetbrains-mono)', 'SFMono-Regular', 'ui-monospace', 'monospace'],
      },
      colors: {
        editor: {
          bg: '#1e1e1e',
          sidebar: '#252525',
          border: '#333333',
          highlight: '#8cc700',
        },
        syntax: {
          keyword: '#c678dd',
          type: '#e5c07b',
          decorator: '#e06c75',
          string: '#98c379',
          number: '#d19a66',
          component: '#61afef',
          method: '#56b6c2',
          property: '#56b6c2',
          comment: '#7f848e',
        },
      },
      boxShadow: {
        'editor': '0 2px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};