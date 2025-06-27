import { parseZodError } from '~/utils/functions.server';
import { z } from 'zod';

export type PortfolioConfig = z.infer<typeof InfoSchema>;
export type Socials = typeof socialsList[number];

const socialsList = ['github', 'twitter', 'email', 'discord', 'bluesky', 'wakatime', 'linkedin', 'facebook', 'instagram', 'youtube', 'twitch', 'reddit', 'mastodon', 'telegram', 'tiktok', 'threads'] as const;

const info: PortfolioConfig = {
	name: 'Digital',

	avatar: '/avatar.webp',
	pronouns: ['he', 'him'],
	title: 'Full-stack Developer',
	description: 'I\'m a student pursuing full-stack development and software engineering, with a strong interest in backend systems. I enjoy working with server-side technologies, databases, and APIs to build scalable, efficient, and maintainable applications.\nI\'m always looking for projects that challenge me to deepen my understanding of system architecture, performance optimization, and cloud infrastructure.\nWhen I\'m not coding, I\'m usually diving into backend architecture articles, contributing to open source projects, or exploring how different systems scale in the real world.',
	meta: 'Making things that work — and work well. Want to know more? Check out my profile and get in touch!',

	utcOffset: 2,
	themeColor: '#ea435c',
	colorScheme: 'red',

	statsFmUsername: 'digital39999',

	socials: {
		github: 'https://github.com/Digital39999',
		twitter: 'https://twitter.com/Digital39999',
		email: 'mailto:contact@crni.xyz',
		discord: 'https://discord.gg/4rphpersCa',
		bluesky: 'https://bsky.app/profile/crni.xyz',
		wakatime: 'https://wakatime.com/Digital',
	},

	technologies: [
		['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'TailwindCSS', 'Vite', 'NextJS', 'Remix', 'VSCode', 'Markdown'],
		['NodeJS', 'ExpressJS', 'GoLang', 'GraphQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ', 'Prisma', 'Docker', 'Linux'],
		['Git', 'GitHub', 'GitHubActions', 'GitLab', 'BitBucket', 'NPM', 'PNPM', 'Cloudflare', 'Netlify', 'Vercel', 'Ubuntu'],
		['Discord', 'DiscordBots', 'DiscordJS', 'Gmail', 'Mastodon', 'Notion', 'StackOverflow'],
		['Arduino', 'LaTeX', 'Postman', 'Sentry', 'Windows'],
	],

	readmeStats: { // Placeholders: {text_color}, {icon_color}, {bg_color}, {title_color}
		wakatime: 'https://github-readme-stats.crni.xyz/api/wakatime?username=Digital&hide_title=true&disable_animations=true&bg_color={bg_color}&title_color={title_color}&text_color={text_color}&icon_color={icon_color}&langs_count=5&range=all_time&hide_border=true',
		github: 'https://github-readme-stats.crni.xyz/api?username=Digital39999&count_private=true&disable_animations=true&card_width=150&show_icons=true&hide=contribs&bg_color={bg_color}&hide_title=true&title_color={title_color}&text_color={text_color}&icon_color={icon_color}&hide_border=true',
	},

	projects: [{
		name: 'Status Bot',
		description: 'Real-time monitoring service.',
		url: 'https://statusbot.us',
		icon: 'https://statusbot.us/logo-full.webp',
	}, {
		name: 'System Updates',
		description: 'Discord updates / datamining bot.',
		icon: 'https://cf.crni.xyz/Rhl5PHZSAT.png',
		url: 'https://top.gg/bot/872501852644704337',
	}, {
		name: 'Textional Voice',
		description: 'Speech to text bot for Discord.',
		icon: 'https://cf.crni.xyz/RUFbGUPeYU.png',
		url: 'https://top.gg/bot/1097907896987160666',
	}, {
		name: 'TS-Prisma',
		description: 'Utility library for TypeScript and Prisma.',
		icon: 'https://cf.crni.xyz/L0Fl8Unic9.png',
		url: 'https://github.com/Digital39999/ts-prisma',
	}, {
		name: 'Channel Watch',
		description: 'Channel messages tool with token login.',
		icon: 'https://cw.crni.xyz/logo.png',
		url: 'https://cw.crni.xyz',
	}, {
		name: 'Vlsm Calculator',
		description: 'Network subnetting calculator tool.',
		icon: 'https://vlsm.crni.xyz/logo.webp',
		url: 'https://vlsm.crni.xyz',
	}, {
		name: 'Whisper Models',
		description: 'Downloader for speech recognition models.',
		url: 'https://github.com/Digital39999/whisper-models',
	}, {
		name: 'Redis Scheduler',
		description: 'Redis job scheduler and webhook trigger.',
		url: 'https://github.com/Digital39999/redis-scheduler',
	}, {
		name: 'Analytics Engine',
		description: 'Real-time analytics engine for any service.',
		url: 'https://github.com/Digital39999/analytics-engine',
	}],
};

const InfoSchema = z.object({
	name: z.string(),
	title: z.string(),
	avatar: z.string(),
	pronouns: z.array(z.string()),
	description: z.string(),
	meta: z.string(),

	utcOffset: z.number(),
	themeColor: z.string().regex(/^#[0-9A-F]{6}$/i),
	colorScheme: z.enum(['red', 'blue', 'green', 'purple', 'pink', 'orange', 'yellow', 'gray']),

	socials: z.object(Object.fromEntries(socialsList.map((social) => [social, z.string().url()]))).partial().optional(),

	statsFmUsername: z.string().optional(),
	technologies: z.array(z.array(z.string())),

	readmeStats: z.object({
		wakatime: z.string(),
		github: z.string(),
	}).partial().optional(),

	projects: z.array(z.object({
		url: z.string(),
		name: z.string(),
		icon: z.string().optional(),
		description: z.string(),
	})),
});

const validatedInfo = InfoSchema.safeParse(info);
if (!validatedInfo.success) throw new Error(JSON.stringify(parseZodError(validatedInfo.error), null, 5));

export default validatedInfo.data;
