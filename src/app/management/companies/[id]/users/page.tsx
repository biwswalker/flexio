import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getCompany } from 'src/services/company';

import { UserTableView } from 'src/sections/user/view';
import { CompanyLayout } from 'src/sections/company/company-layout';

// ----------------------------------------------------------------------
type Props = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: `Company Users - ${CONFIG.appName}`,
};

export default async function Page({ params }: Props) {
  const { id } = params;
  const company = await getCompany(id);

  return (
    <CompanyLayout company={company}>
      <UserTableView companyId={id} />
    </CompanyLayout>
  );
}
