import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { TransactionListView } from 'src/sections/incomeExpense/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `รายการรายรับ/รายจ่าย - ${CONFIG.appName}` };

export default function Page() {
  return <TransactionListView />;
}
