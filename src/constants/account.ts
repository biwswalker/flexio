export const paymentMethods: Record<TPaymentMethod, string> = {
  CASH: 'เงินสด',
  TRANSFER: 'โอนเงิน',
};

export const transactionTypes: Record<TTransactionType, string> = {
  INCOME: 'รายรับ',
  EXPENSE: 'รายจ่าย',
};

export const ACCOUNT_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'ใช้งาน' },
  { value: 'INACTIVE', label: 'ห้ามใช้งาน' },
];

export const TRANSACTION_TYPE_OPTIONS = [
  { label: 'รายรับ', value: 'INCOME' },
  { label: 'รายจ่าย', value: 'EXPENSE' },
];

export const PAYMENT_METHOD_OPTIONS = [
  { label: 'เงินสด', value: 'CASH' },
  { label: 'โอน', value: 'TRANSFER' },
];

export const BANK_PROVIDER = [
  { value: 'BBL', label: 'ธนาคารกรุงเทพ' },
  { value: 'KBANK', label: 'ธนาคารกสิกรไทย' },
  { value: 'KTB', label: 'ธนาคารกรุงไทย' },
  { value: 'SCB', label: 'ธนาคารไทยพาณิชย์' },
  { value: 'BAY', label: 'ธนาคารกรุงศรีอยุธยา' },
  { value: 'TTB', label: 'ธนาคารทหารไทยธนชาต' },
  { value: 'KK', label: 'ธนาคารเกียรตินาคิน' },
  { value: 'TISCO', label: 'ธนาคารทิสโก้' },
  { value: 'CIMBT', label: 'ธนาคารซีไอเอ็มบีไทย' },
  { value: 'UOB', label: 'ธนาคารยูโอบี' },
  { value: 'GSB', label: 'ธนาคารออมสิน' },
  { value: 'GHB', label: 'ธนาคารอาคารสงเคราะห์' },
  { value: 'BACC', label: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร' },
];

export const getAccountStatusName = (status: TAccountStatus) => {
  const _status = ACCOUNT_STATUS_OPTIONS.find((_option) => _option.value === status);
  return _status?.label ?? '';
};

export const getPaymentMethodText = (paymentMethod: TPaymentMethod) =>
  paymentMethods[paymentMethod] || '';

export const getTransactionTypeText = (txType: TTransactionType) => transactionTypes[txType] || '';
export const getTransactionTypeColor = (txType: TTransactionType) =>
  txType === 'INCOME' ? 'success.main' : 'error.main';

export const getAccountStatusColor = (status: string) =>
  status === 'ACTIVE' ? 'success' : 'warning';

export const getBankName = (value: string, onlyName = false) => {
  const _bank = BANK_PROVIDER.find((bank) => bank.value === value);
  if (onlyName && _bank) {
    return _bank.label.replace('ธนาคาร', '')?.trim();
  }
  return _bank?.label || '';
};
