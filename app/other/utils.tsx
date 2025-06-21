import { CurrentlyPlayingTrack, TimeUnits } from '~/other/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Theme } from 'remix-themes';
import axios from 'axios';

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

export async function getCurrentlyPlayingTrack(username: string | null): Promise<CurrentlyPlayingTrack['item'] | null> {
	if (!username) return null;

	const url = `https://api.stats.fm/api/v1/users/${username}/streams/current`;
	return await axios.get<CurrentlyPlayingTrack>(url).then((r) => r.data.item).catch(() => null);
}

export function formatTrackName(name: string, maxLength = 50): string {
	const parentheticalMatch = name.match(/^(.+?\))[\s-]*?/);
	if (parentheticalMatch) name = parentheticalMatch[1] || name;

	const featIndex = name.toLowerCase().indexOf('[feat');
	if (featIndex !== -1) name = name.substring(0, featIndex).trim();

	const dashIndex = name.indexOf(' - ');
	if (dashIndex !== -1) name = name.substring(0, dashIndex).trim();

	if (name.length > maxLength) name = name.substring(0, maxLength - 3).trim() + '..';
	return name;
}
