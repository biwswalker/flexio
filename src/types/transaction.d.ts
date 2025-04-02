type TPaymentMethod = 'CASH' | 'TRANSFER';
type TTransactionType = 'INCOME' | 'EXPENSE';

interface Transaction {
  id: string;
  txId: string;
  companyId: string;
  projectId: string;
  accountId: string;
  amount: number;
  description: string;
  transactionCategory: string;
  transactionType: TTransactionType;
  transactionDate: string;
  paymentMethod: TPaymentMethod;
  evidenceImageUrl: string;
  createdAt: string;
  createdBy: string;
}

interface GetTransactionResponse extends Transaction {
  transactionCategoryName: string;
  projectName: string;
  accountBank: string;
  accountBankName: string;
  createUserName: string;
}

interface FilterTransaction {
  txId?: string;
  categories?: string[];
  paymentMethods?: string[];
  accountIds?: string[];
  projectIds?: string[];
  userIds?: string[];
  companyId?: string;
  txStartDate?: IDatePickerControl;
  txEndDate?: IDatePickerControl;
}

interface AddTransactionRequest {
  companyId: string;
  accountId: string;
  amount: number;
  transactionType: TTransactionType;
  transactionDate: string;
  paymentMethod: TPaymentMethod;
  projectId?: string;
  description?: string;
  transactionCategory?: string;
  evidenceImage?: File | string | undefined;
}

interface TransactionRequestParam {
  txId: string;
  transactionType: TTransactionType;
  paymentMethod: TPaymentMethod;
  accountId: string[];
  projectId: string[];
  transactionStartDate: string | Date;
  transactionEndDate: string | Date;
  transactionCategory: string;
}
