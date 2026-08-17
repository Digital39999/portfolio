import { Markdown } from '~/components/Markdown';
import privacyMarkdown from '~/other/legal/privacy.md?raw';

export function meta() {
	return [
		{ title: 'Privacy Policy' },
		{ name: 'description', content: 'Privacy Policy for crni.xyz' },
	];
}

export default function Privacy() {
	return (
		<div className='flex flex-col items-center relative z-10 max-w-4xl mx-auto gap-8'>
			<div className='bg-white dark:bg-darker-gray p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full'>
				<Markdown>{privacyMarkdown}</Markdown>
			</div>
		</div>
	);
}
