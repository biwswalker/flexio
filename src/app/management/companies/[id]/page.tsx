import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CompanyDetailView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Company Summary - ${CONFIG.appName}` };

export default async function Page() {
  return <CompanyDetailView />;
}
