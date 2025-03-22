'use client';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserCardList } from '../user-card-list';

// ----------------------------------------------------------------------

export function UserCardsView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="User cards"
        links={[{ name: 'ผู้ใช้งานระบบ', href: paths.user.root }, { name: 'Cards' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.user.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            ผู้ใช้งานใหม่
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList users={[]} />
    </DashboardContent>
  );
}
