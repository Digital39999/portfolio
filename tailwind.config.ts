import tailwindCssAnimate from 'tailwindcss-animate';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				'darker-gray': '#080808',

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
