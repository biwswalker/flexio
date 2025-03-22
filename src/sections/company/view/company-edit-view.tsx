'use client';

import { CompanyLayout } from '../company-layout';
import { NewCompanyForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  company: Company;
};

export function CompanyEditView({ company }: Props) {
  return (
    <CompanyLayout company={company}>
      <NewCompanyForm company={company} />
    </CompanyLayout>
  );
}
