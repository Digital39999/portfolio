import ErrorComp from '~/components/ErrorPage';
import { Layout } from '~/components/Layout';

export async function loader() {
	return new Response(null, { status: 404 });
}

export default function ErrorPage() {
	return (
		<Layout>
			<ErrorComp status={404} />
		</Layout>
	);
}
