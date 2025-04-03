import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

/* **************************************
 * Dashboard Overview
 *************************************** */
export const getDashboardOverview = async (companyId?: string): Promise<DashboardOverview> => {
  try {
    const response = await axios.get<APIResponse<DashboardOverview>>(
      `${endpoints.dashboard.overview}/${companyId}`
    );
    const overview = response.data?.data;

    if (!overview) {
      throw new Error('ไม่พบข้อมูล');
    }

    return overview;
  } catch (error) {
    console.error('Error during fetching dashboard overview:', error);
    throw error;
  }
};

/* **************************************
 * Dashboard Detail
 *************************************** */
export const getDashboardDetail = async (
  period: TDashboardPeriod,
  companyId?: string
): Promise<DashboardDetail> => {
  try {
    const response = await axios.get<APIResponse<DashboardDetail>>(
      `${endpoints.dashboard.detail}/${companyId}`,
      { params: { period } }
    );
    const detail = response.data?.data;

    if (!detail) {
      throw new Error('ไม่พบข้อมูล');
    }

    return detail;
  } catch (error) {
    console.error('Error during fetching dashboard detail:', error);
    throw error;
  }
};
