import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

/** **************************************
 * Company
 *************************************** */
export const getCompanies = async (): Promise<Company[]> => {
  try {
    const response = await axios.get<APIResponse<Company[]>>(endpoints.company);
    const company = response.data?.data;

    if (company.length <= 0) {
      throw new Error('ไม่พบข้อมูลบริษัท');
    }

    return company;
  } catch (error) {
    console.error('Error during fetching company:', error);
    throw error;
  }
};

export const getCompany = async (id: string): Promise<Company> => {
  try {
    const response = await axios.get<APIResponse<Company[]>>(endpoints.company, { params: { id } });
    const company = response.data?.data;

    if (company.length <= 0) {
      throw new Error('ไม่พบข้อมูลบริษัท');
    }

    return company[0];
  } catch (error) {
    console.error('Error during fetching company:', error);
    throw error;
  }
};
