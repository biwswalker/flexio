import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CompanyCreateView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `สร้างผู้ใช้งาน - ${CONFIG.appName}` };

export default function Page() {
  return <CompanyCreateView />;
}
