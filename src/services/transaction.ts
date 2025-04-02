import { omitBy, isEmpty } from 'es-toolkit/compat';

import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

/** **************************************
 * Add Transaction
 *************************************** */
export const addTransaction = async (request: AddTransactionRequest): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('companyId', request.companyId);
    formData.append('accountId', request.accountId);
    formData.append('amount', request.amount.toString());
    formData.append('transactionType', request.transactionType);
    formData.append('transactionDate', request.transactionDate);
    formData.append('paymentMethod', request.paymentMethod);
    formData.append('projectId', request.projectId || '');
    formData.append('description', request.description || '');
    formData.append('transactionCategory', request.transactionCategory || '');
    if (request.evidenceImage instanceof File) {
      formData.append('evidenceImage', request.evidenceImage || '');
    }
    const response = await axios.postForm<APIResponse<Transaction>>(
      endpoints.incomeExpense,
      formData
    );

    if (!response.data?.success) {
      throw new Error('ไม่พบข้อมูลบริษัท');
    }

    return true;
  } catch (error) {
    console.error('Error during fetching company:', error);
    throw error;
  }
};

/** **************************************
 * Get Transaction
 *************************************** */
export const getTransactions = async (
  companyId: string,
  params?: Partial<TransactionRequestParam>
): Promise<GetTransactionResponse[]> => {
  try {
    const _params = omitBy(params ?? {}, isEmpty);
    const response = await axios.get<APIResponse<GetTransactionResponse[]>>(
      `${endpoints.incomeExpense}/${companyId}`,
      { params: _params }
    );
    const transactions = response.data?.data;

    if (transactions.length <= 0) {
      throw new Error('ไม่พบข้อมูลบริษัท');
    }

    return transactions;
  } catch (error) {
    console.error('Error during fetching transactions:', error);
    throw error;
  }
};
