import { Meta, Links, ScrollRestoration, Scripts } from '@remix-run/react';
import { PreventFlashOnWrongTheme, useTheme } from 'remix-themes';
import { cn } from '~/other/utils';

export type DocumentProps = {
	children: React.ReactNode;
	ssrTheme: boolean;
};

export default function Document({ children, ssrTheme }: DocumentProps) {
	const [theme] = useTheme();

	return (
		<html id='root' lang='en' suppressHydrationWarning={true} className={cn(theme)}>
			<head>
				<Meta />
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' media='(prefers-color-scheme: light)' content='white' />
				<meta name='theme-color' media='(prefers-color-scheme: dark)' content='black' />

				<PreventFlashOnWrongTheme ssrTheme={ssrTheme} />
				<Links />
			</head>
			<body>
				{children}
				<Scripts />
				<ScrollRestoration />
			</body>
		</html>
	);
}
