'use client';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import { me } from './action';
import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';

import type { AuthState } from '../../types';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: undefined,
    companies: [],
    company: undefined,
    loading: true,
  });

  const handleSetCompany = useCallback(
    async (company: Company) => {
      setState({ ...state, company });
    },
    [setState, state]
  );

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await me();

        const { user, companies = [] } = response;

        if (companies.length > 0) {
          handleSetCompany(companies[0]);
        }

        setState({ user: { ...user, accessToken }, companies, loading: false });
      } else {
        setState({ user: undefined, companies: [], loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: undefined, companies: [], loading: false });
    }
  }, [setState, handleSetCompany]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'FINANCIAL' } : undefined,
      companies: state.companies ?? [],
      company: state.company,
      setCompany: handleSetCompany,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [state.user, state.companies, state.company, handleSetCompany, checkUserSession, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
