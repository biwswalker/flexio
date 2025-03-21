type TRole = 'OWNER' | 'ADMIN' | 'FINANCIAL';

interface User {
  id: string;
  name: string;
  email: string;
  role: TRole;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
