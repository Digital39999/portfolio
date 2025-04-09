export type Simplify<T> = {
	[K in keyof T]: T[K];
};

export type TimeUnits = 'ns' | 'µs' | 'ms' | 's' | 'm' | 'h' | 'd' | 'w';
