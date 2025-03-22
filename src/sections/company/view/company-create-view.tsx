'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { NewCompanyForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

export function CompanyCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="สร้างบริษัทใหม่"
        links={[{ name: 'บริษัท', href: paths.management.companies.root }, { name: 'ใหม่' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <NewCompanyForm />
    </DashboardContent>
  );
}
