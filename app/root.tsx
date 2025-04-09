import { isRouteErrorResponse, Outlet, useLoaderData, useRouteError } from '@remix-run/react';
import { LoaderFunctionArgs, LinksFunction, json, MetaArgs } from '@remix-run/node';
import { createThemeAction, Theme, ThemeProvider } from 'remix-themes';
import { themeSessionResolver } from '~/utils/storage.server';
import { TooltipProvider } from './components/ui/tooltip';
import { cssBundleHref } from '@remix-run/css-bundle';
import ErrorComp from '~/components/ErrorPage';
import { Layout } from '~/components/Layout';
import { keywords } from './other/keywords';
import info from '~/utils/info.server';
import { StrictMode } from 'react';
import Document from '~/document';
import '~/styles/global.css';

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
	{ rel: 'manifest', href: '/manifest.json' },
	{ rel: 'icon', href: '/favicon.ico' },
];

export function meta({ data }: MetaArgs<typeof loader>) {
	return [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },

		{ title: data?.userInfo.name },
		{ name: 'description', content: data?.userInfo.meta },

		{ property: 'og:title', content: data?.userInfo.name },
		{ property: 'og:description', content: data?.userInfo.meta },
		{ property: 'og:image', content: data?.userInfo.avatar },

		{ name: 'twitter:title', content: data?.userInfo.name },
		{ name: 'twitter:description', content: data?.userInfo.meta },
		{ name: 'twitter:image', content: data?.userInfo.avatar },

		{ name: 'keywords', content: keywords.join(', ') },
		{ name: 'theme-color', content: data?.userInfo.themeColor },

		{ httpEquiv: 'Content-Security-Policy', content: 'img-src * data: blob:;' },
	];
}

export function shouldReinvalidate() {
	return false;
}

export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);
	return json({ ssrTheme: getTheme(), userInfo: info });
}

export const action = createThemeAction(themeSessionResolver);

export default function App() {
	const { ssrTheme } = useLoaderData<typeof loader>();

	return (
		<StrictMode>
			<ThemeProvider specifiedTheme={ssrTheme} themeAction='/'>
				<Document ssrTheme={Boolean(ssrTheme)}>
					<Layout>
						<TooltipProvider delayDuration={0}>
							<Outlet />
						</TooltipProvider>
					</Layout>
				</Document>
			</ThemeProvider>
		</StrictMode>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	return (
		<StrictMode>
			<ThemeProvider specifiedTheme={Theme.DARK} themeAction='/'>
				<Document ssrTheme={false}>
					<Layout>
						{isRouteErrorResponse(error) ? (
							<ErrorComp status={error.status as never} text={error.data} title={error.statusText} />
						) : error instanceof Error ? (
							<ErrorComp status={500} text={error.message} />
						) : (
							<ErrorComp status={500} />
						)}
					</Layout>
				</Document>
			</ThemeProvider>
		</StrictMode>
	);
}
