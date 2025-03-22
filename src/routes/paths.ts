// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  MANAGEMENT: '/management',
  PROFILE: '/profile',
  SETTING: '/setting',
};

// ----------------------------------------------------------------------

export const paths = {
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    verify: `${ROOTS.AUTH}/verify`,
    updatePassword: `${ROOTS.AUTH}/update-password`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
  user: {
    root: ROOTS.USERS,
    new: `${ROOTS.USERS}/new`,
    edit: (userId: string) => `${ROOTS.USERS}/${userId}`,
    profile: ROOTS.PROFILE,
    setting: ROOTS.SETTING,
  },
  management: {
    companies: {
      root: `${ROOTS.MANAGEMENT}/companies`,
      new: `${ROOTS.MANAGEMENT}/companies/new`,
      detail: (shortName: string) => `${ROOTS.MANAGEMENT}/companies/${shortName}`,
    },
    projects: {
      root: `${ROOTS.MANAGEMENT}/projects`,
      new: `${ROOTS.MANAGEMENT}/projects/new`,
      detail: (shortName: string) => `${ROOTS.MANAGEMENT}/projects/${shortName}`,
    },
    incomeExpense: {
      root: `${ROOTS.MANAGEMENT}/income-expense`,
      transactions: `${ROOTS.MANAGEMENT}/income-expense/transactions`,
      expense: `${ROOTS.MANAGEMENT}/income-expense/expense`,
    },
    documents: {
      root: `${ROOTS.MANAGEMENT}/documents`,
      quotations: `${ROOTS.MANAGEMENT}/documents/quotations`,
      invoices: `${ROOTS.MANAGEMENT}/documents/invoices`,
      receives: `${ROOTS.MANAGEMENT}/documents/receives`,
    },
    accounts: {
      root: `${ROOTS.MANAGEMENT}/accounts`,
      new: `${ROOTS.MANAGEMENT}/accounts/new`,
    },
  },
};
