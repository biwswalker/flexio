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
