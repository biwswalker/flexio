import { omitBy, isEmpty } from 'es-toolkit/compat';

import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

/** **************************************
 * Get Transaction Category
 *************************************** */
export const getTransactionCategory = async (
  params?: Partial<GetTransactionCategoryParam>
): Promise<TransactionCategory[]> => {
  try {
    const _params = omitBy(params ?? {}, isEmpty);
    const response = await axios.get<APIResponse<TransactionCategory[]>>(
      `${endpoints.transactionCategory}`,
      { params: _params }
    );
    const categorys = response.data?.data;

    if (categorys.length <= 0) {
      throw new Error('ไม่พบข้อมูลบริษัท');
    }

    return categorys;
  } catch (error) {
    console.error('Error during fetching transaction category:', error);
    throw error;
  }
};
