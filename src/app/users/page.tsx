import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `รายชื่อผู้ใช้งาน - ${CONFIG.appName}` };

export default function Page() {
  return <UserListView />;
}
