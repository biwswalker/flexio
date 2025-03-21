import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { OverviewBankingView } from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewBankingView />;
}
