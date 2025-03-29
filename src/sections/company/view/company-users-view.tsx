'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { getCompany } from 'src/services/company';

import { LoadingScreen } from 'src/components/loading-screen';

import { UserTableView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export function CompanyUsersView() {
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

  return <UserTableView companyId={company?.id} />;
}
