import { Link, useNavigate } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { errorMessages } from '~/other/vars';
import { useMemo } from 'react';

export type ErrorProps = {
	text?: string;
	title?: string;
	status: keyof typeof errorMessages;
};

export default function Error({ status, text, title }: ErrorProps) {
	const navigate = useNavigate();

	const messages = useMemo(() => {
		return errorMessages[status || 500] || errorMessages[500];
	}, [status]);

	return (
		<div className='mt-48 flex h-full w-full'>
			<div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
				<h1 className='text-[7rem] font-bold leading-tight'>{status || 500}</h1>
				<h3 className='text-2xl font-bold'>{title || messages.title}</h3>
				<p className='text-center text-muted-foreground'>
					{text || messages.description}
				</p>
				<div className='mt-2 flex gap-2'>
					<Button variant='outline' onClick={() => navigate(-1)}>Go Back</Button>
					<Link to={'/'}><Button variant='outline'>Go Home</Button></Link>
				</div>
			</div>
		</div>
	);
}
