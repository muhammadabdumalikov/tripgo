import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				navy: '#1B1B3A',
  				pink: '#FF4B6C',
  				'pink-dark': '#ff3357'
  			},
  			primary: {
  				'50': '#FFF1F2',
  				'100': '#FFE4E6',
  				'200': '#FECDD3',
  				'300': '#FDA4AF',
  				'400': '#FB7185',
  				'500': '#FF4B6C',
  				'600': '#E11D48',
  				'700': '#BE123C',
  				'800': '#9F1239',
  				'900': '#881337',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#FFF1F2',
  				'100': '#FFE4E6',
  				'200': '#FECDD3',
  				'300': '#FDA4AF',
  				'400': '#FB7185',
  				'500': '#FF385C',
  				'600': '#E11D48',
  				'700': '#BE123C',
  				'800': '#9F1239',
  				'900': '#881337',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				amber: '#F59E0B',
  				emerald: '#10B981',
  				indigo: '#6366F1',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			neutral: {
  				'50': '#F8FAFC',
  				'100': '#F1F5F9',
  				'200': '#E2E8F0',
  				'300': '#CBD5E1',
  				'400': '#94A3B8',
  				'500': '#64748B',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1E293B',
  				'900': '#0F172A',
  				DEFAULT: '#1E293B'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
