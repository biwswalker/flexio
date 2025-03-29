import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CompanyAccountView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Company Account - ${CONFIG.appName}`,
};

export default async function Page() {
  return <CompanyAccountView />;
}
