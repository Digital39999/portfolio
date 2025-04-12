import { clsx, type ClassValue } from 'clsx';
import { TimeUnits } from '~/other/types';
import { twMerge } from 'tailwind-merge';
import { Theme } from 'remix-themes';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function time(number: number, from: TimeUnits = 's', to: TimeUnits = 'ms'): number {
	const units: Record<TimeUnits, number> = {
		'ns': 1,
		'µs': 1000,
		'ms': 1000000,
		's': 1000000000,
		'm': 60000000000,
		'h': 3600000000000,
		'd': 86400000000000,
		'w': 604800000000000,
	};

	if (from === to) return number;
	else return (number * units[from]) / units[to];
}

export function parseStatsUrl(url: string, theme: Theme, themeColor: string) {
	if (themeColor.startsWith('#')) themeColor = themeColor.slice(1);
	const textColor = theme === 'dark' ? 'ffffff' : '000000';
	const bgColor = theme === 'dark' ? '080808' : 'ffffff';

	return url
		.replace(/{bg_color}/g, bgColor)
		.replace(/{text_color}/g, textColor)
		.replace(/{icon_color}/g, themeColor)
		.replace(/{title_color}/g, themeColor);
}
