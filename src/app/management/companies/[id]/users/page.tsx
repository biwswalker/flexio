import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CompanyLayout } from 'src/sections/company/company-layout';
import { CompanyUsersView } from 'src/sections/company/view/company-users-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Company Users - ${CONFIG.appName}`,
};

export default async function Page() {
  return (
    <CompanyLayout>
      <CompanyUsersView />
    </CompanyLayout>
  );
}
