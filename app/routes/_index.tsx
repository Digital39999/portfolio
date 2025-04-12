import { FaGithub, FaTwitter, FaDiscord, FaEnvelope, FaUser, FaClock } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Separator } from '~/components/ui/separator';
import { useEffect, useMemo, useState } from 'react';
import { useRootData } from '~/hooks/useRootData';
import { cn, parseStatsUrl } from '~/other/utils';
import { Theme, useTheme } from 'remix-themes';
import { Socials } from '~/utils/info.server';
import { SiWakatime } from 'react-icons/si';
import { FaBluesky } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';
import { Link } from '@remix-run/react';

const socialIcons: Record<Socials, IconType> = {
	github: FaGithub,
	twitter: FaTwitter,
	email: FaEnvelope,
	discord: FaDiscord,
	bluesky: FaBluesky,
	wakatime: SiWakatime,
};

export default function Index() {
	const { userInfo } = useRootData();
	const [theme] = useTheme();

	const [isClient, setIsClient] = useState(false);
	useEffect(() => setIsClient(true), []);

	const timeData = useMemo(() => {
		if (!isClient) return { formattedTime: 'Loading..', timeDifferenceMessage: 'Loading..' };

		const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
		const timezoneOffsetInHours = -(timezoneOffsetInMinutes / 60);
		const date = new Date();
		date.setHours(date.getHours() + (timezoneOffsetInHours - userInfo.utcOffset));

		const formattedHours = date.getHours() % 12 || 12;
		const formattedMinutes = String(date.getMinutes()).padStart(2, '0');
		const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
		const timezoneOffset = userInfo.utcOffset - timezoneOffsetInHours;

		const timeDifferenceMessage = timezoneOffset === 0
			? 'same as you'
			: `${Math.abs(timezoneOffset)} hour${Math.abs(timezoneOffset) > 1 ? 's' : ''} ${timezoneOffset > 0 ? 'ahead' : 'behind'}`;

		return {
			formattedTime: `${formattedHours}:${formattedMinutes} ${ampm}`,
			timeDifferenceMessage,
		};
	}, [isClient, userInfo.utcOffset]);

	const SocialLinks = useMemo(() => {
		return Object.entries(userInfo.socials || {}).map(([key, value]) => {
			const Icon = socialIcons[key as Socials];
			const displayName = key.charAt(0).toUpperCase() + key.slice(1);
			let username = value;

			if (value.startsWith('https://')) {
				username = value.replace(/.*\/([^/]+)$/, '$1');
			} else if (value.startsWith('mailto:')) {
				username = value.replace('mailto:', '');
			}

			return (
				<div key={key} className='flex items-center gap-2 text-zinc-700 dark:text-zinc-300 justify-between'>
					<div className='flex items-center gap-2'>
						<Icon className='w-5 h-5 text-custom-red-500' />
						<span className='font-medium'>{displayName}</span>
					</div>

					<Link
						to={value}
						target='_blank'
						className='text-zinc-700 dark:text-zinc-300 hover:!text-custom-red-500 transition-colors duration-200'
						rel='noopener noreferrer'
					>
						{username}
					</Link>
				</div>
			);
		});
	}, [userInfo.socials]);

	// console.log(userInfo.technologies.map((group) => `<img src="https://skillicons.dev/icons?i=${group.join(',').toLowerCase()}" />"`).join('\n<br />\n'));

	return (
		<div className='flex flex-col items-center relative z-10 max-w-6xl mx-auto gap-8'>
			<div className='flex flex-col md:flex-row gap-4'>
				<div className='flex md:flex-col items-center w-full md:w-auto md:justify-between gap-4 md:fixed md:top-32 z-10'>
					<div className='relative w-32 h-32 md:w-72 md:h-72 flex-shrink-0 rounded-3xl overflow-hidden border-2 border-custom-red-500'>
						<img src={userInfo.avatar} alt='Profile' className='object-cover w-full h-full' />
					</div>

					<div className='flex flex-col text-left w-full md:flex-1 gap-2 mt-auto'>
						<h1 className='text-4xl font-extrabold text-zinc-800 dark:text-white'>
							{userInfo.name}
						</h1>

						<p className='text-xl font-bold text-custom-red-500'>
							{userInfo.title}
						</p>

						<Separator className='mt-3 md:mt-0 md:my-3 mx-auto' />

						<div className='flex-col space-y-2 hidden md:flex'>
							<div className='flex items-center gap-2 text-zinc-700 dark:text-zinc-300 justify-between'>
								<div className='flex items-center gap-2'>
									<FaUser className='w-5 h-5 text-custom-red-500' />
									<span className='font-medium'>Pronouns</span>
								</div>

								<p className='text-zinc-700 dark:text-zinc-300 transition-colors duration-200'>
									{userInfo.pronouns.join('/')}
								</p>
							</div>

							<div className='flex items-center gap-2 text-zinc-700 dark:text-zinc-300 justify-between'>
								<div className='flex items-center gap-2'>
									<FaClock className='w-5 h-5 text-custom-red-500' />
									<span className='font-medium'>Local Time</span>
								</div>

								<Tooltip delayDuration={50}>
									<TooltipTrigger>
										<p className='text-zinc-700 dark:text-zinc-300 transition-colors duration-200'>
											{timeData.formattedTime}
										</p>
									</TooltipTrigger>
									<TooltipContent className='max-w-xs' sideOffset={5}>
										<p className='text-sm font-semibold'>{timeData.timeDifferenceMessage}</p>
									</TooltipContent>
								</Tooltip>
							</div>
						</div>

						{Object.entries(userInfo.socials || {}).length > 0 && (
							<div className='flex-col space-y-2 hidden md:flex'>
								<Separator className='mt-3 md:mt-0 md:my-3 mx-auto' />

								<div className='flex flex-col space-y-2'>
									{SocialLinks}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className='bg-white dark:bg-darker-gray p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 flex md:hidden w-full flex-col gap-4'>
					<div className='flex flex-col space-y-2'>
						<div className='flex items-center gap-2 text-zinc-700 dark:text-zinc-300 justify-between'>
							<div className='flex items-center gap-2'>
								<FaUser className='w-5 h-5 text-custom-red-500' />
								<span className='font-medium'>Pronouns</span>
							</div>

							<p className='text-zinc-700 dark:text-zinc-300 transition-colors duration-200'>
								{userInfo.pronouns.join('/')}
							</p>
						</div>

						<div className='flex items-center gap-2 text-zinc-700 dark:text-zinc-300 justify-between'>
							<div className='flex items-center gap-2'>
								<FaClock className='w-5 h-5 text-custom-red-500' />
								<span className='font-medium'>Local Time</span>
							</div>

							<Tooltip delayDuration={50}>
								<TooltipTrigger>
									<p className='text-zinc-700 dark:text-zinc-300 transition-colors duration-200'>
										{timeData.formattedTime}
									</p>
								</TooltipTrigger>
								<TooltipContent className='max-w-xs' sideOffset={5}>
									<p className='text-sm font-semibold'>{timeData.timeDifferenceMessage}</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</div>

					{Object.entries(userInfo.socials || {}).length > 0 && (
						<>
							<Separator className='mx-auto' />

							<div className='flex flex-col space-y-2'>
								{SocialLinks}
							</div>
						</>
					)}
				</div>

				<div className='flex flex-col space-y-4 md:ml-80 mt-0'>
					<div className='bg-white dark:bg-darker-gray p-6 rounded-xl border border-zinc-200 dark:border-zinc-800'>
						<h2 className='text-2xl font-bold text-zinc-800 dark:text-white mb-4'>Hello there! 👋</h2>

						{userInfo.description.split('\n').map((line, index) => (
							<p key={index} className='text-zinc-700 dark:text-zinc-300 leading-relaxed mt-3'>
								{line}
							</p>
						))}
					</div>

					<div className='bg-white dark:bg-darker-gray p-6 rounded-xl border border-zinc-200 dark:border-zinc-800'>
						<h2 className='text-2xl font-bold text-zinc-800 dark:text-white mb-4'>🚀 Technologies & Tools</h2>

						<div className='flex flex-col gap-3'>
							{userInfo.technologies.map((group, index) => (
								<div key={index} className={cn('flex flex-wrap gap-3', index === 0 ? 'mt-3' : '')}>
									{group.map((tech) => (
										<Tooltip key={tech}>
											<TooltipTrigger>
												<img
													key={tech}
													src={`https://skillicons.dev/icons?i=${tech.toLowerCase()}`}
													alt={tech}
													className='w-8 h-8 md:w-10 md:h-10'
												/>
											</TooltipTrigger>
											<TooltipContent>
												<h2 className='text-md font-semibold'>{tech}</h2>
											</TooltipContent>
										</Tooltip>
									))}
								</div>
							))}
						</div>
					</div>

					{userInfo.readmeStats && Object.keys(userInfo.readmeStats).length > 0 && (
						<div className='bg-white dark:bg-darker-gray p-6 rounded-xl border border-zinc-200 dark:border-zinc-800'>
							<h2 className='text-2xl font-bold text-zinc-800 dark:text-white mb-4'>📊 Stats</h2>

							<div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
								{Object.entries(userInfo.readmeStats).map(([key, value]) => {
									const parsedUrl = parseStatsUrl(value, theme || Theme.DARK, userInfo.themeColor);

									return (
										<div key={key} className='flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800'>
											<img
												alt={key}
												src={parsedUrl}
												className='w-full h-auto rounded-xl'
											/>
										</div>
									);
								})}
							</div>
						</div>
					)}

					<div className='bg-white dark:bg-darker-gray p-6 rounded-xl border border-zinc-200 dark:border-zinc-800'>
						<h2 className='text-2xl font-bold text-zinc-800 dark:text-white mb-4'>📌 Projects</h2>

						<p className='text-zinc-700 dark:text-zinc-300 mb-4'>
							Here are some of my projects. Private contributions and projects are not listed here for privacy reasons.
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
							{userInfo.projects.map((project) => (
								<Link key={project.name} to={project.url} target='_blank' rel='noopener noreferrer'>
									<div className='bg-zinc-50 dark:bg-darker-gray p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200'>
										<div className='flex items-center gap-4'>
											{project.icon ? (
												<img src={project.icon} alt={`${project.name} Icon`} className='w-12 h-12 rounded-full' />
											) : (
												<div className='w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex justify-center items-center'>
													<FaGithub className='text-gray-500 dark:text-gray-300 w-6 h-6' />
												</div>
											)}

											<div className='flex-1'>
												<h3 className='text-xl font-semibold text-zinc-800 dark:text-white'>{project.name}</h3>
												<p className='text-sm text-zinc-600 dark:text-zinc-300 '>{project.description}</p>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
