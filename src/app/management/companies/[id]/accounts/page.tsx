import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { _bankingCreditCard } from 'src/_mock';
import { getCompany } from 'src/services/company';

import { CompanyAccountView } from 'src/sections/company/view';

// ----------------------------------------------------------------------
type Props = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: `Company Account - ${CONFIG.appName}`,
};

export default async function Page({ params }: Props) {
  const { id } = params;
  const company = await getCompany(id);

  return <CompanyAccountView company={company} accounts={_bankingCreditCard} />;
}
