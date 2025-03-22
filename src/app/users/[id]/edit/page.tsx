import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `อัพเดทผู้ใช้งาน - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  // const currentUser = await Promise.resolve({})

  return <UserEditView user={undefined} />;
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';
export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    const users: User[] = [];
    return users.map((user) => ({ id: user.id }));
  }
  return [];
}
