'use client';

import { encryption } from 'src/utils/encryption';

import axios, { endpoints } from 'src/lib/axios';

import { setSession } from './utils';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export interface SignInResponse {
  user: User;
  companies: Company[];
  accessToken: string;
}

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const params = { email };
    const decryptedPassword = encryption(password);

    const response = await axios.post<APIResponse<SignInResponse>>(endpoints.auth.login, params, {
      headers: { password: decryptedPassword },
    });

    const { accessToken } = response.data.data;

    if (!accessToken) {
      throw new Error('ไม่พบข้อมูลผู้เข้าใช้งาน');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await axios.post(endpoints.auth.logout);
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
