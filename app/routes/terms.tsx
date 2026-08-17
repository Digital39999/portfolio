import { Markdown } from '~/components/Markdown';
import termsMarkdown from '~/other/legal/terms.md?raw';

export function meta() {
	return [
		{ title: 'Terms of Service' },
		{ name: 'description', content: 'Terms of Service for crni.xyz' },
	];
}

export default function Terms() {
	return (
		<div className='flex flex-col items-center relative z-10 max-w-4xl mx-auto gap-8'>
			<div className='bg-white dark:bg-darker-gray p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full'>
				<Markdown>{termsMarkdown}</Markdown>
			</div>
		</div>
	);
}
