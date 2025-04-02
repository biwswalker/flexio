'use client';

import { useEffect, useCallback } from 'react';
import { useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { getAccounts } from 'src/services/account';
import { DashboardContent } from 'src/layouts/dashboard';
import { getDashboardDetail, getDashboardOverview } from 'src/services/dashboard';

import { useAuthContext } from 'src/auth/hooks';

import { BankingOverview } from '../banking-overview';
import { BankingCurrentBalance } from '../banking-current-balance';
import { BankingBalanceStatistics } from '../banking-balance-statistics';

// ----------------------------------------------------------------------

export function OverviewBankingView() {
  const { company } = useAuthContext();

  const dashboardState = useSetState<DashboardState>({
    overview: {
      balance: 0,
      expense: {
        percent: 0,
        total: 0,
        series: Array(12).fill(0),
      },
      income: {
        percent: 0,
        total: 0,
        series: Array(12).fill(0),
      },
    },
    detail: {
      period: 'WEEKLY',
      labels: [],
      data: [],
    },
    accounts: [],
  });

  const handleGetDashboardData = useCallback(async () => {
    try {
      const overviewData = await getDashboardOverview(company?.id);
      const detailData = await getDashboardDetail('WEEKLY', company?.id);
      const accountData = await getAccounts(company?.id);
      dashboardState.setState({
        overview: overviewData,
        detail: detailData,
        accounts: accountData,
      });
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (company) {
      handleGetDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  const handleChangeDetailPeriod = useCallback(
    async (_period: TDashboardPeriod) => {
      const detailData = await getDashboardDetail(_period, company?.id);
      dashboardState.setField('detail', detailData);
    },
    [company, dashboardState]
  );

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <BankingOverview data={dashboardState.state.overview} />

            <BankingBalanceStatistics
              title="สรุปรายละเอียดบัญชี"
              subheader="รายละเอียดบัญชีตามช่วงเวลา"
              data={dashboardState.state.detail}
              onChangePeriod={handleChangeDetailPeriod}
            />

            {/* <BankingExpensesCategories
              title="หมวดหมู่ค่าใช้จ่าย"
              chart={{
                series: [
                  { label: 'Entertainment', value: 22 },
                  { label: 'Fuel', value: 18 },
                  { label: 'Fast food', value: 16 },
                  { label: 'Cafe', value: 17 },
                  { label: 'Сonnection', value: 14 },
                  { label: 'Healthcare', value: 22 },
                  { label: 'Fitness', value: 10 },
                  { label: 'Supermarket', value: 21 },
                ],
                icons: [
                  <Iconify icon="streamline:dices-entertainment-gaming-dices-solid" />,
                  <Iconify icon="maki:fuel" />,
                  <Iconify icon="ion:fast-food" />,
                  <Iconify icon="maki:cafe" />,
                  <Iconify icon="basil:mobile-phone-outline" />,
                  <Iconify icon="solar:medical-kit-bold" />,
                  <Iconify icon="ic:round-fitness-center" />,
                  <Iconify icon="solar:cart-3-bold" />,
                ],
              }}
            /> */}

            {/* <BankingRecentTransitions
              title="รายการเงินล่าสุด"
              tableData={_bankingRecentTransitions}
              headCells={[
                { id: 'description', label: 'รายละเอียด' },
                { id: 'date', label: 'เวลา' },
                { id: 'amount', label: 'จำนวน' },
                { id: 'status', label: 'สถานะ' },
                { id: '' },
              ]}
            /> */}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <BankingCurrentBalance list={dashboardState.state.accounts} />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
