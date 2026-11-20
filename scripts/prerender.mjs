import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

process.env.NODE_ENV = 'production';
process.env.VERCEL = '1';
process.env.SESSION_SECRET ||= 'static-build-only-secret';

const { default: app } = await import('../build/server/index.js');
const outputRoot = resolve('build/client');
const routes = ['/', '/privacy', '/terms'];

for (const route of routes) {
	const response = await app.fetch(new Request(`https://static-build.local${route}`));
	if (!response.ok) throw new Error(`Could not prerender ${route}: ${response.status}`);

	const outputPath = route === '/'
		? resolve(outputRoot, 'index.html')
		: resolve(outputRoot, route.slice(1), 'index.html');

	await mkdir(dirname(outputPath), { recursive: true });
	await writeFile(outputPath, await response.text());
	console.log(`Prerendered ${route} -> ${outputPath}`);
}
