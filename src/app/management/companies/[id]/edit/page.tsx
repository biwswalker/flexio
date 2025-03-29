import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CompanyEditView } from 'src/sections/company/view';

// ----------------------------------------------------------------------
export const metadata: Metadata = {
  title: `Company Detail - ${CONFIG.appName}`,
};

export default async function Page() {
  return <CompanyEditView />;
}
