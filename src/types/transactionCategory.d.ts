type TCategoryStatus = 'ACTIVE' | 'INACTIVE';

interface TransactionCategory {
  id: string;
  name: string;
  status: TCategoryStatus;
  type: TTransactionType;
  icon: string;
  color: string;
}

interface GetTransactionCategoryParam {
  name: string;
  status: TCategoryStatus;
  type: TTransactionType;
}
