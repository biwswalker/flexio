export const USER_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'ใช้งาน' },
  { value: 'INACTIVE', label: 'ห้ามใช้งาน' },
];

export const USER_ROLE: TRole[] = [`OWNER`, `ADMIN`, `FINANCIAL`];

export const getUserRoleName = (role: TRole) => {
  switch (role) {
    case 'OWNER':
      return 'เจ้าของ';
    case 'ADMIN':
      return 'ผู้ดูแลระบบ';
    case 'FINANCIAL':
      return 'ผู้จัดการบัญชี';
    default:
      return '';
  }
};
