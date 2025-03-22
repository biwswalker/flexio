'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { _bankingCreditCard, _bankingRecentTransitions } from 'src/_mock';

import { Iconify } from 'src/components/iconify/iconify';

import { BankingOverview } from '../banking-overview';
import { BankingCurrentBalance } from '../banking-current-balance';
import { BankingBalanceStatistics } from '../banking-balance-statistics';
import { BankingRecentTransitions } from '../banking-recent-transitions';
import { BankingExpensesCategories } from '../banking-expenses-categories';

// ----------------------------------------------------------------------

export function OverviewBankingView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <BankingOverview />

            <BankingBalanceStatistics
              title="สรุปรายละเอียดบัญชี"
              subheader="รายละเอียดบัญชีตามช่วงเวลา"
              chart={{
                series: [
                  {
                    name: 'รายสัปดาห์',
                    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                    data: [
                      { name: 'รายได้', data: [24, 41, 35, 151, 49] },
                      { name: 'รายจ่าย', data: [24, 56, 77, 88, 99] },
                      { name: 'อื่นๆ', data: [40, 34, 77, 88, 99] },
                    ],
                  },
                  {
                    name: 'รายเดือน',
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    data: [
                      { name: 'รายได้', data: [83, 112, 119, 88, 103, 112, 114, 108, 93] },
                      { name: 'รายจ่าย', data: [46, 46, 43, 58, 40, 59, 54, 42, 51] },
                      { name: 'อื่นๆ', data: [25, 40, 38, 35, 20, 32, 27, 40, 21] },
                    ],
                  },
                  {
                    name: 'รายปี',
                    categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
                    data: [
                      { name: 'รายได้', data: [76, 42, 29, 41, 27, 96] },
                      { name: 'รายจ่าย', data: [46, 44, 24, 43, 44, 43] },
                      { name: 'อื่นๆ', data: [23, 22, 37, 38, 32, 25] },
                    ],
                  },
                ],
              }}
            />

            <BankingExpensesCategories
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
            />

            <BankingRecentTransitions
              title="รายการเงินล่าสุด"
              tableData={_bankingRecentTransitions}
              headCells={[
                { id: 'description', label: 'รายละเอียด' },
                { id: 'date', label: 'เวลา' },
                { id: 'amount', label: 'จำนวน' },
                { id: 'status', label: 'สถานะ' },
                { id: '' },
              ]}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <BankingCurrentBalance list={_bankingCreditCard} />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
