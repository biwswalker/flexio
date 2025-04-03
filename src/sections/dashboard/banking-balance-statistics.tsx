import type { CardProps } from '@mui/material/Card';

import { useMemo, useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { fPercent, fCurrency } from 'src/utils/format-number';

import { Chart, useChart, ChartSelect, ChartLegends } from 'src/components/chart';

// ----------------------------------------------------------------------
type ChartData = {
  labels: string[];
  percents: string[];
  totals: string[];
};
type Props = CardProps & {
  title?: string;
  subheader?: string;
  data: DashboardDetail;
  onChangePeriod: (period: TDashboardPeriod) => void;
  // options?: ChartOptions;
};

const PERIOD_NAMEs: string[] = ['รายสัปดาห์', 'รายเดือน', 'รายปี'];

const getPeriodValue = (period: string): TDashboardPeriod => {
  switch (period) {
    case 'รายสัปดาห์':
      return 'WEEKLY';
    case 'รายเดือน':
      return 'MONTHLY';
    case 'รายปี':
      return 'YEARLY';
    default:
      return 'WEEKLY';
  }
};

export function BankingBalanceStatistics({
  title,
  subheader,
  data,
  onChangePeriod,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const [selectedSeries, setSelectedSeries] = useState(PERIOD_NAMEs[0]);

  const chartLegends = useMemo(
    () =>
      data.data.reduce(
        (prev: ChartData, curr) => ({
          labels: [...prev.labels, curr.label],
          percents: [...prev.percents, fPercent(curr.percent)],
          totals: [...prev.totals, fCurrency(curr.total)],
        }),
        {
          labels: [],
          percents: [],
          totals: [],
        }
      ),
    [data]
  );

  const chartColors = [
    theme.palette.primary.dark,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const chartOptions = useChart({
    stroke: { width: 2, colors: ['transparent'] },
    colors: chartColors,
    xaxis: { categories: data.labels },
    tooltip: { y: { formatter: (value: number) => fCurrency(value) } },
    // ...options,
  });

  const handleChangeSeries = useCallback(
    (newValue: string) => {
      const _newValue = getPeriodValue(newValue) as TDashboardPeriod;
      setSelectedSeries(newValue);
      onChangePeriod(_newValue);
    },
    [onChangePeriod]
  );

  return (
    <Card sx={sx} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ChartSelect
            options={PERIOD_NAMEs.map((item) => item)}
            value={selectedSeries}
            onChange={handleChangeSeries}
          />
        }
        sx={{ mb: 3 }}
      />

      <ChartLegends
        colors={chartOptions?.colors}
        labels={chartLegends.labels}
        // sublabels={chartLegends.percents}
        values={chartLegends.totals}
        sx={{ px: 3, gap: 3 }}
      />

      <Chart
        type="bar"
        series={data.data.map((detail) => ({ name: detail.label, data: detail.series }))}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{
          pl: 1,
          py: 2.5,
          pr: 2.5,
          height: 320,
        }}
      />
    </Card>
  );
}
