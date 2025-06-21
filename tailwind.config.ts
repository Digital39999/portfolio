import tailwindCssAnimate from 'tailwindcss-animate';
import type { Config } from 'tailwindcss';

export const colors = {
	'custom-red': {
		100: '#f8ccd1',
		200: '#f4a7b3',
		300: '#f18296',
		400: '#ec5d79',
		500: '#ea435c',
		600: '#d73d56',
		700: '#c0384f',
		800: '#a63249',
		900: '#8c2d42',
	},

	'custom-orange': {
		100: '#ffe0b3',
		200: '#ffcc80',
		300: '#ffb74d',
		400: '#ffa726',
		500: '#ff9800',
		600: '#fb8c00',
		700: '#f57c00',
		800: '#ef6c00',
		900: '#e65100',
	},

	'custom-yellow': {
		100: '#fff9c4',
		200: '#fff59d',
		300: '#fff176',
		400: '#ffee58',
		500: '#ffeb3b',
		600: '#fdd835',
		700: '#fbc02d',
		800: '#f9a825',
		900: '#f57f17',
	},

	'custom-green': {
		100: '#c8e6c9',
		200: '#a5d6a7',
		300: '#81c784',
		400: '#66bb6a',
		500: '#4caf50',
		600: '#43a047',
		700: '#388e3c',
		800: '#2e7d32',
		900: '#1b5e20',
	},

	'custom-blue': {
		100: '#bbdefb',
		200: '#90caf9',
		300: '#64b5f6',
		400: '#42a5f5',
		500: '#2196f3',
		600: '#1e88e5',
		700: '#1976d2',
		800: '#1565c0',
		900: '#0d47a1',
	},

	'custom-purple': {
		100: '#e1bee7',
		200: '#ce93d8',
		300: '#ba68c8',
		400: '#ab47bc',
		500: '#9c27b0',
		600: '#8e24aa',
		700: '#7b1fa2',
		800: '#6a1b9a',
		900: '#4a148c',
	},

	'custom-pink': {
		100: '#f8bbd0',
		200: '#f48fb1',
		300: '#f06292',
		400: '#ec407a',
		500: '#e91e63',
		600: '#d81b60',
		700: '#c2185b',
		800: '#ad1457',
		900: '#880e4f',
	},

	'custom-gray': {
		50: '#f9f9f9',
		100: '#f0f0f0',
		200: '#e0e0e0',
		300: '#d0d0d0',
		400: '#b0b0b0',
		500: '#909090',
		600: '#707070',
		700: '#505050',
		800: '#303030',
		900: '#101010',
	},

	'custom-brown': {
		100: '#d7ccc8',
		200: '#bcaaa4',
		300: '#a1887f',
		400: '#8d6e63',
		500: '#795548',
		600: '#6d4c41',
		700: '#5d4037',
		800: '#4e342e',
		900: '#3e2723',
	},
};

export type Colors =
	| 'red'
	| 'orange'
	| 'yellow'
	| 'green'
	| 'blue'
	| 'purple'
	| 'pink'
	| 'gray'
	| 'brown';

export default {
	darkMode: 'class',
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	safelist: [{
		pattern: /(?:text|bg|border)-custom-(?:red|blue|green|purple|pink|orange|yellow|gray)-(?:500|600)/,
	}],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				'darker-gray': '#080808',
				...colors,
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [tailwindCssAnimate],
} satisfies Config;
