'use client';

import { useMemo } from 'react';
import * as changeCase from 'change-case';
import { removeLastSlash } from 'minimal-shared/utils';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useParams, usePathname } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function CompanyLayout({ children }: Props) {
  const params = useParams();
  const shortName = String(params.id);
  const pathname = usePathname();

  const NAV_ITEMS = useMemo(
    () => [
      {
        label: 'สรุปรายละเอียด',
        href: paths.management.companies.detail(shortName),
      },
      {
        label: 'ข้อมูลบริษัท',
        href: `${paths.management.companies.edit(shortName)}`,
      },
      {
        label: 'รายชื่อผู้ใช้งาน',
        href: `${paths.management.companies.users(shortName)}`,
      },
      {
        label: 'บัญชีธนาคาร',
        href: `${paths.management.companies.accounts(shortName)}`,
      },
    ],
    [shortName]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={changeCase.sentenceCase(shortName)}
        links={[{ name: 'รายละเอียดบริษัท' }]}
        sx={{ mb: 3 }}
      />

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
