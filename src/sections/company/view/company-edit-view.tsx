'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { getCompany } from 'src/services/company';

import { LoadingScreen } from 'src/components/loading-screen';

import { CompanyLayout } from '../company-layout';
import { NewCompanyForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

export function CompanyEditView() {
  const params = useParams();
  const shortName = String(params.id);
  const [company, setCompany] = useState<Company | undefined>(undefined);

  useEffect(() => {
    handleGetCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetCompany = async () => {
    const _company = await getCompany(shortName);
    setCompany(_company);
  };

  if (!company) {
    return <LoadingScreen />;
  }

  return (
    <CompanyLayout>
      <NewCompanyForm company={company} />
    </CompanyLayout>
  );
}
