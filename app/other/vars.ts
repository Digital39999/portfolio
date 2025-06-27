import { FaGithub, FaTwitter, FaDiscord, FaEnvelope, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaTwitch, FaReddit } from 'react-icons/fa';
import { SiWakatime, SiMastodon, SiTelegram, SiTiktok, SiThreads } from 'react-icons/si';
import { Socials } from '~/utils/info.server';
import { FaBluesky } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';

export const socialIcons: Record<Socials, IconType> = {
	github: FaGithub,
	twitter: FaTwitter,
	email: FaEnvelope,
	discord: FaDiscord,
	bluesky: FaBluesky,
	wakatime: SiWakatime,
	linkedin: FaLinkedin,
	facebook: FaFacebook,
	instagram: FaInstagram,
	youtube: FaYoutube,
	twitch: FaTwitch,
	reddit: FaReddit,
	mastodon: SiMastodon,
	telegram: SiTelegram,
	tiktok: SiTiktok,
	threads: SiThreads,
};

export const errorMessages = {
	400: {
		title: 'Bad Request',
		description: 'The request was invalid or could not be processed.',
	},
	401: {
		title: 'Unauthorized Access',
		description: 'Please log in to access this resource or your session has expired.',
	},
	403: {
		title: 'Forbidden',
		description: 'You do not have permission to access this resource.',
	},
	404: {
		title: 'Page Not Found',
		description: 'The page you are looking for does not exist or has been moved.',
	},
	500: {
		title: 'Internal Server Error',
		description: 'An unexpected error occurred while processing your request.',
	},
	503: {
		title: 'Service Unavailable',
		description: 'The server is currently unavailable. Please try again later.',
	},
	429: {
		title: 'Rate Limited',
		description: 'You have exceeded the rate limit for this resource.',
	},
};
