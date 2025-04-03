'use client';

import { useParams } from 'next/navigation';
import { useBoolean } from 'minimal-shared/hooks';
import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid2';
import { Box, Card, Button, CardHeader } from '@mui/material';

import { getCompany } from 'src/services/company';
import { getAccounts } from 'src/services/account';

import { Iconify } from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';

import { BankNewEditForm } from 'src/sections/bank/bank-new-edit-form';

import { CompanyLayout } from '../company-layout';
import { CompanyAccountCard } from '../company-account-card';

// ----------------------------------------------------------------------

export function CompanyAccountView() {
  const addBankAccountForm = useBoolean();
  const params = useParams();
  const shortName = String(params.id);
  const [company, setCompany] = useState<Company | undefined>(undefined);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    handleGetCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (company) {
      handleGetAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  const handleGetCompany = async () => {
    const _company = await getCompany(shortName);
    setCompany(_company);
  };

  const handleGetAccount = useCallback(async () => {
    if (company) {
      const _accounts = await getAccounts(company?.id);
      setAccounts(_accounts);
    }
  }, [company]);

  const handleOnAddBankAccountComplete = useCallback(async () => {
    await handleGetAccount();
    addBankAccountForm.onFalse();
  }, [addBankAccountForm, handleGetAccount]);

  if (!company) {
    return <LoadingScreen />;
  }

  const renderAddBankForm = () => (
    <BankNewEditForm
      company={company}
      open={addBankAccountForm.value}
      onClose={addBankAccountForm.onFalse}
      onComplete={handleOnAddBankAccountComplete}
    />
  );

  return (
    <>
      <CompanyLayout>
        <Card>
          <CardHeader
            title="รายการบัญชี"
            action={
              <Button
                onClick={addBankAccountForm.onTrue}
                color="primary"
                variant="text"
                startIcon={<Iconify icon="ic:round-plus" />}
              >
                เพิ่มบัญชีใหม่
              </Button>
            }
          />
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {accounts.map((account) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={account.id}>
                  <CompanyAccountCard account={account} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </CompanyLayout>
      {renderAddBankForm()}
    </>
  );
}
