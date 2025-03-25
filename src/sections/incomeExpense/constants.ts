export const paymentMethods: Record<TPaymentMethod, string> = {
  CASH: 'เงินสด',
  TRANSFER: 'โอนเงิน',
};

export const transactionTypes: Record<TTransactionType, string> = {
  INCOME: 'รายรับ',
  EXPENSE: 'รายจ่าย',
};

export const getPaymentMethodText = (paymentMethod: TPaymentMethod) =>
  paymentMethods[paymentMethod] || '';

export const getTransactionTypeText = (txType: TTransactionType) => transactionTypes[txType] || '';
export const getTransactionTypeColor = (txType: TTransactionType) =>
  txType === 'INCOME' ? '' : 'error';
