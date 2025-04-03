import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = applyCaseMiddleware(axios.create({ baseURL: CONFIG.serverUrl }), {
  ignoreHeaders: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  users: '/api/users',
  me: '/api/me',
  auth: {
    login: '/api/login',
    logout: '/api/logout',
    forgotPassword: '/api/forgot-password',
    resetPassword: '/api/reset-password',
  },
  company: '/api/company',
  project: '/api/project',
  incomeExpense: '/api/income-expense',
  account: '/api/account',
  expense: '/api/expense',
  invoice: '/api/invoice',
  quotation: '/api/quotation',
  receipt: '/api/receipt',
  commission: '/api/commission',
  transactionCategory: '/api/trx-category',
  profitLoss: {
    root: '/api/profit-loss',
    cashFlow: '/api/cash-flow',
    balanceSheet: '/api/balance-sheet',
  },
  dashboard: {
    overview: '/api/dashboard/overview',
    detail: '/api/dashboard/detail',
  },
};
