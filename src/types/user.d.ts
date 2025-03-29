type TRole = 'OWNER' | 'ADMIN' | 'FINANCIAL';
type TUserStatus = 'ACTIVE' | 'INACTIVE';

interface User {
  id: string;
  name: string;
  email: string;
  role: TRole;
  imageUrl: string;
  status: TUserStatus;
  createdAt: string;
  updatedAt: string;
}

interface FilterUser {
  name?: string;
  email?: string;
  roles?: TRole[];
  companyIds?: string[];
  status?: TUserStatus | 'ALL';
}

interface UserResponse extends User {
  companies: Company[];
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: TRole;
  companyIds: string[];
  profileImage: File | string | undefined;
}
