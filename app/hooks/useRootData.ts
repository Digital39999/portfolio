import { PortfolioConfig } from '~/utils/info.server';
import { useMatches } from '@remix-run/react';

export function useRootData() {
	return useMatches()[0]?.data as {
		userInfo: PortfolioConfig;
	} || {};
}
