import { Link, useNavigate } from '@remix-run/react';
import { Button } from '~/components/ui/button';
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
