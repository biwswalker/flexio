'use client';

import { useMemo } from 'react';
import { removeLastSlash } from 'minimal-shared/utils';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

type Props = {
  company: Company;
  children: React.ReactNode;
};

export function CompanyLayout({ company, children }: Props) {
  const { name, id } = company;
  const pathname = usePathname();

  const NAV_ITEMS = useMemo(
    () => [
      {
        label: 'สรุปรายละเอียด',
        href: paths.management.companies.detail(id),
      },
      {
        label: 'ข้อมูลบริษัท',
        href: `${paths.management.companies.edit(id)}`,
      },
      {
        label: 'รายชื่อผู้ใช้งาน',
        href: `${paths.management.companies.users(id)}`,
      },
      {
        label: 'บัญชีธนาคาร',
        href: `${paths.management.companies.accounts(id)}`,
      },
    ],
    [id]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs heading={name} links={[{ name: 'รายละเอียดบริษัท' }]} sx={{ mb: 3 }} />

      <Tabs value={removeLastSlash(pathname)} sx={{ mb: { xs: 3, md: 5 } }}>
        {NAV_ITEMS.map((tab) => (
          <Tab
            component={RouterLink}
            key={tab.href}
            label={tab.label}
            // icon={tab.icon}
            value={tab.href}
            href={tab.href}
          />
        ))}
      </Tabs>

      {children}
    </DashboardContent>
  );
}
