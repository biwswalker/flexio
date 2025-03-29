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
    console.error('Error during fetching overview:', error);
    throw error;
  }
};
