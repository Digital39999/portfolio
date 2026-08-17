import { cn } from '~/other/utils';

export type MarkdownProps = {
	children: string;
	className?: string;
};

function renderInline(text: string, keyPrefix: string) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g);

	return parts.map((part, index) => {
		if (part.startsWith('**') && part.endsWith('**')) {
			return <strong key={`${keyPrefix}-${index}`} className='font-semibold text-zinc-800 dark:text-white'>{part.slice(2, -2)}</strong>;
		}

		return <span key={`${keyPrefix}-${index}`}>{part}</span>;
	});
}

export function Markdown({ children, className }: MarkdownProps) {
	const lines = children.split('\n');

	return (
		<div className={cn('flex flex-col gap-3', className)}>
			{lines.map((line, index) => {
				const trimmed = line.trim();

				if (!trimmed) return <div key={index} className='h-2' />;

				if (trimmed.startsWith('### ')) {
					return <h3 key={index} className='mt-2 text-lg font-semibold text-zinc-800 dark:text-white'>{trimmed.slice(4)}</h3>;
				}

				if (trimmed.startsWith('## ')) {
					return <h2 key={index} className='mt-4 text-xl font-bold text-zinc-800 dark:text-white'>{trimmed.slice(3)}</h2>;
				}

				if (trimmed.startsWith('# ')) {
					return <h1 key={index} className='text-2xl font-bold text-zinc-800 dark:text-white'>{trimmed.slice(2)}</h1>;
				}

				if (trimmed.startsWith('- ')) {
					return (
						<ul key={index} className='flex flex-col gap-1 list-disc pl-6'>
							<li className='text-zinc-700 dark:text-zinc-300 leading-relaxed'>
								{renderInline(trimmed.slice(2), `${index}-item`)}
							</li>
						</ul>
					);
				}

				return (
					<p key={index} className='text-zinc-700 dark:text-zinc-300 leading-relaxed'>
						{renderInline(trimmed, `${index}-text`)}
					</p>
				);
			})}
		</div>
	);
}
