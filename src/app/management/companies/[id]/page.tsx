import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getCompany } from 'src/services/company';

import { CompanyDetailView } from 'src/sections/company/view';

// ----------------------------------------------------------------------
type Props = {
  params: { id: string };
};

export const metadata: Metadata = { title: `Company Summary - ${CONFIG.appName}` };

export default async function Page({ params }: Props) {
  const { id } = params;
  const company = await getCompany(id);
  return <CompanyDetailView company={company} />;
}
