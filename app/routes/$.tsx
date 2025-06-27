import ErrorComp from '~/components/ErrorPage';

export async function loader() {
	return new Response(null, { status: 404 });
}

export default function ErrorPage() {
	return <ErrorComp status={404} />;
}
