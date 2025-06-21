import { useRevalidator } from '@remix-run/react';
import { useEffect } from 'react';

export function useReinvalidator(interval: number, shouldRun = true) {
	const revalidator = useRevalidator();

	useEffect(() => {
		if (!shouldRun) return;

		const iv = setInterval(() => {
			revalidator.revalidate();
		}, interval);

		return () => clearInterval(iv);
	}, [interval, shouldRun, revalidator]);
}
