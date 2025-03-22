'use client';

import type { DashboardContentProps } from 'src/layouts/dashboard';

import { removeLastSlash } from 'minimal-shared/utils';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  {
    label: 'General1',
    icon: <Iconify width={24} icon="solar:user-id-bold" />,
    href: paths.user.root,
  },
  {
    label: 'Billing1',
    icon: <Iconify width={24} icon="solar:bill-list-bold" />,
    href: `${paths.user.root}/billing`,
  },
  {
    label: 'Notifications1',
    icon: <Iconify width={24} icon="solar:bell-bing-bold" />,
    href: `${paths.user.root}/notifications`,
  },
  {
    label: 'Social links1',
    icon: <Iconify width={24} icon="solar:share-bold" />,
    href: `${paths.user.root}/socials`,
  },
  {
    label: 'Security1',
    icon: <Iconify width={24} icon="ic:round-vpn-key" />,
    href: `${paths.user.root}/change-password`,
  },
];

// ----------------------------------------------------------------------

export function AccountLayout({ children, ...other }: DashboardContentProps) {
  const pathname = usePathname();

  return (
    <DashboardContent {...other}>
      <CustomBreadcrumbs
        heading="Account"
        links={[{ name: 'ผู้ใช้งานระบบ', href: paths.user.root }, { name: 'Account' }]}
        sx={{ mb: 3 }}
      />

      <Tabs value={removeLastSlash(pathname)} sx={{ mb: { xs: 3, md: 5 } }}>
        {NAV_ITEMS.map((tab) => (
          <Tab
            component={RouterLink}
            key={tab.href}
            label={tab.label}
            icon={tab.icon}
            value={tab.href}
            href={tab.href}
          />
        ))}
      </Tabs>

      {children}
    </DashboardContent>
  );
}
