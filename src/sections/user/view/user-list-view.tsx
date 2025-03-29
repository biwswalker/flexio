'use client';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

import { UserTableView } from './user-table-view';

// ----------------------------------------------------------------------

export function UserListView() {
  const { company } = useAuthContext();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="รายการผู้ใช้งาน"
        links={[{ name: 'ผู้ใช้งานระบบ', href: paths.user.root }, { name: 'รายการ' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.user.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            เพิ่มผู้ใช้ใหม่
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <UserTableView companyId={company?.id} />
    </DashboardContent>
  );
}
