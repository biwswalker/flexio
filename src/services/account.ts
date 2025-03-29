import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

/** **************************************
 * Accounts
 *************************************** */
export const getAccounts = async (companyId?: string): Promise<Account[]> => {
  try {
    const response = await axios.get<APIResponse<Account[]>>(
      endpoints.account,
      companyId ? { params: { companyId } } : undefined
    );
    const accounts = response.data?.data;

    if (accounts.length <= 0) {
      throw new Error('ไม่พบข้อมูลบัญชี');
    }

    return accounts;
  } catch (error) {
    console.error('Error during fetching account:', error);
    throw error;
  }
};
