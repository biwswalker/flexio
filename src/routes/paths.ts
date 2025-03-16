// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '',
  DASHBOARD: '/dashboard',
  USERS: '/users',
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
  },
};
