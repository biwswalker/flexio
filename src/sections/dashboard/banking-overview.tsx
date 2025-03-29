import type { CardProps } from '@mui/material/Card';

import { useMemo } from 'react';
import NextLink from 'next/link';
import { useTabs } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { today } from 'src/utils/format-time';
import { fPercent, fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';
import { CustomTabs } from 'src/components/custom-tabs';

// ----------------------------------------------------------------------
interface Props extends CardProps {
  data: DashboardOverview;
}

export function BankingOverview({ sx, data, ...other }: Props) {
  const theme = useTheme();

  const TABS = useMemo(
    () => [
      {
        value: 'income',
        label: 'รายได้',
        percent: data.income.percent,
        total: data.income.total,
        chart: { series: [{ data: data.income.series }] },
      },
      {
        value: 'expenses',
        label: 'รายจ่าย',
        percent: data.income.percent,
        total: data.income.total,
        chart: { series: [{ data: data.expense.series }] },
      },
    ],
    [data]
  );

  const tabs = useTabs('income');

  const chartColors =
    tabs.value === 'income' ? [theme.palette.primary.dark] : [theme.palette.warning.dark];

  const chartOptions = useChart({
    colors: chartColors,
    xaxis: {
      categories: [
        'ม.ค.',
        'ก.พ.',
        'มี.ค.',
        'เม.ย.',
        'พ.ค.',
        'มิ.ย.',
        'ก.ค.',
        'ส.ค.',
        'ก.ย',
        'ต.ค.',
        'พ.ย.',
        'ธ.ค.',
      ],
    },
    stroke: { width: 3 },
    tooltip: {
      y: { formatter: (value: number) => fCurrency(value), title: { formatter: () => '' } },
    },
  });

  const renderBalance = () => (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          mb: 1,
          gap: 0.5,
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
          typography: 'subtitle2',
        }}
      >
        ยอดคงเหลือรวม (ปี {today('YYYY')})
        <Tooltip title="ยอดเงินคงเหลือจากการคำนวนรายรับ-รายจ่าย">
          <Iconify width={16} icon="eva:info-outline" sx={{ color: 'text.disabled' }} />
        </Tooltip>
      </Box>

      <Box sx={{ typography: 'h3' }}>{fCurrency(data.balance)} บาท</Box>
    </Box>
  );

  const renderActions = () => (
    <Box sx={{ gap: 1, display: 'flex' }}>
      <Button
        variant="soft"
        size="small"
        startIcon={<Iconify width={16} icon="mingcute:add-line" />}
        component={NextLink}
        href={paths.management.accounts.new}
      >
        เพิ่มบัญชีธนาคาร
      </Button>
    </Box>
  );

  const renderTabs = () => (
    <CustomTabs
      value={tabs.value}
      onChange={tabs.onChange}
      variant="fullWidth"
      sx={{ my: 3, borderRadius: 2 }}
      slotProps={{
        indicator: { borderRadius: 1.5, boxShadow: theme.vars.customShadows.z4 },
        tab: { p: 3 },
      }}
    >
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={
            <Box
              sx={{
                width: 1,
                display: 'flex',
                gap: { xs: 1, md: 2.5 },
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  borderRadius: '50%',
                  alignItems: 'center',
                  color: 'primary.lighter',
                  justifyContent: 'center',
                  bgcolor: 'primary.darker',
                  display: { xs: 'none', md: 'inline-flex' },
                  ...(tab.value === 'expenses' && {
                    color: 'warning.lighter',
                    bgcolor: 'warning.darker',
                  }),
                }}
              >
                <Iconify
                  width={24}
                  icon={
                    tab.value === 'expenses'
                      ? 'eva:diagonal-arrow-right-up-fill'
                      : 'eva:diagonal-arrow-left-down-fill'
                  }
                />
              </Box>

              <div>
                <Box
                  sx={{
                    mb: 1,
                    gap: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    typography: 'subtitle2',
                  }}
                >
                  {tab.label}
                  <Tooltip title={tab.label} placement="top">
                    <Iconify width={16} icon="eva:info-outline" sx={{ color: 'text.disabled' }} />
                  </Tooltip>
                </Box>

                <Box sx={{ typography: 'h4' }}>{fCurrency(tab.total)} บาท</Box>
              </div>

              <Label
                color={tab.percent < 0 ? 'error' : 'success'}
                startIcon={
                  tab.percent !== 0 && (
                    <Iconify
                      width={24}
                      icon={
                        tab.percent < 0
                          ? 'solar:double-alt-arrow-down-bold-duotone'
                          : 'solar:double-alt-arrow-up-bold-duotone'
                      }
                    />
                  )
                }
                sx={{ top: 8, right: 8, position: { md: 'absolute' } }}
              >
                {tab.percent > 0 && '+'}
                {fPercent(tab.percent)}
              </Label>
            </Box>
          }
        />
      ))}
    </CustomTabs>
  );

  return (
    <Card sx={[{ p: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Box
        sx={{
          gap: 2,
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {renderBalance()}
        {renderActions()}
      </Box>

      {renderTabs()}

      <Chart
        type="line"
        series={tabs.value === 'income' ? TABS[0].chart.series : TABS[1].chart.series}
        options={chartOptions}
        sx={{ height: 270 }}
      />
    </Card>
  );
}
