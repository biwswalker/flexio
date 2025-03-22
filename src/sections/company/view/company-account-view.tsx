'use client';

import Grid from '@mui/material/Grid2';
import { Box, Card, Button, CardHeader } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { CompanyLayout } from '../company-layout';
import { CompanyAccountCard } from '../company-account-card';

// ----------------------------------------------------------------------

type Props = {
  company: Company;
  accounts: Account[];
};

export function CompanyAccountView({ company, accounts }: Props) {
  return (
    <CompanyLayout company={company}>
      <Card>
        <CardHeader
          title="รายการบัญชี"
          action={
            <Button color="primary" variant="text" startIcon={<Iconify icon="ic:round-plus" />}>
              เพิ่มบัญชีใหม่
            </Button>
          }
        />
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {accounts.map((account) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={account.id}>
                <CompanyAccountCard
                  accountName={account.bankName}
                  accountNumber={account.bankNumber}
                  bank={account.bank}
                  status=""
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </CompanyLayout>
  );
}
