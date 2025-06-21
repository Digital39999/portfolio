export type Simplify<T> = {
	[K in keyof T]: T[K];
};

export type TimeUnits = 'ns' | 'µs' | 'ms' | 's' | 'm' | 'h' | 'd' | 'w';

export type CurrentlyPlayingTrack = {
	item: {
		date: Date;
		isPlaying: boolean;
		progressMs: number;
		deviceName?: string;
		track: {
			id: number;
			name: string;
			explicit: boolean;
			durationMs: number;
			spotifyPopularity: number;
			spotifyPreview?: string;
			appleMusicPreview?: string;
			albums: { id: number; name: string; image: string; }[];
			artists: { id: number; name: string; image: string; }[];
			externalIds: {
				spotify?: string[];
				appleMusic?: string[];
			} | null;
		} | null;
	};
};
