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
    const response = await axios.get<APIResponse<Company>>(`${endpoints.company}/${id}`);
    const company = response.data?.data;

    if (!company) {
      throw new Error('ไม่พบข้อมูลบริษัท');
    }

    return company;
  } catch (error) {
    console.error('Error during fetching company:', error);
    throw error;
  }
};

/** **************************************
 * Create Company
 *************************************** */
export const createCompany = async (request: CreateCompanyRequest): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('name', request.name);
    formData.append('shortName', request.shortName);
    formData.append('address', request.address || '');
    formData.append('subDistrict', request.subDistrict || '');
    formData.append('district', request.district || '');
    formData.append('province', request.province || '');
    formData.append('postcode', request.postcode || '');
    formData.append('phone', request.phone || '');
    formData.append('email', request.email || '');

    if (request.imageUrl instanceof File) {
      formData.append('imageUrl', request.imageUrl || '');
    }
    const response = await axios.postForm<APIResponse<Company>>(endpoints.company, formData);

    if (!response.data?.success) {
      throw new Error('ไม่พบข้อมูลบริษัท');
    }

    return true;
  } catch (error) {
    console.error('Error during fetching company:', error);
    throw error;
  }
};
