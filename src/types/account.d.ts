type TAccountStatus = 'ACTIVE' | 'INACTIVE';

interface Account {
  id: string;
  companyId: string;
  bank: string;
  bankName: string;
  bankNumber: string;
  bankBranch: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  status: TAccountStatus;
}

interface AddAccountRequest {
  companyId: string;
  bank: string;
  bankName: string;
  bankNumber: string;
  bankBranch: string;
  status: TAccountStatus;
}
