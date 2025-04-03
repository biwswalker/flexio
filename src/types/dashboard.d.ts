type TDashboardPeriod = 'WEEKLY' | 'MONTHLY' | 'YEARLY';
interface DashboardState {
  overview: DashboardOverview;
  detail: DashboardDetail;
  accounts: Account[];
}

interface OverviewSeries {
  total: number;
  percent: number;
  series: number[];
}

interface DashboardOverview {
  balance: number;
  income: OverviewSeries;
  expense: OverviewSeries;
}

interface DetailData {
  type: TTransactionType;
  label: string;
  percent: number;
  total: number;
  series: number[];
}

interface DashboardDetail {
  period: TDashboardPeriod;
  labels: string[];
  data: DetailData[];
}
