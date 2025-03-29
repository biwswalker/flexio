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

interface DashboardState {
  overview: DashboardOverview;
}
