import { omitBy, isEmpty } from 'es-toolkit/compat';

import { encryption } from 'src/utils/encryption';

import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

/** **************************************
 * Create User
 *************************************** */
export const createUser = async (request: CreateUserRequest): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('name', request.name);
    formData.append('email', request.email);
    formData.append('password', encryption(request.password));
    formData.append('role', request.role);
    formData.append('companyIds', JSON.stringify(request.companyIds));
    if (request.profileImage instanceof File) {
      formData.append('profileImage', request.profileImage || '');
    }
    const response = await axios.postForm<APIResponse<User>>(endpoints.users, formData);

    if (!response.data?.success) {
      throw new Error('ไม่พบข้อมูลผู้่ใช้');
    }

    return true;
  } catch (error) {
    console.error('Error during fetching user:', error);
    throw error;
  }
};

/** **************************************
 * Get User
 *************************************** */
export const getUsers = async (params?: Partial<FilterUser>): Promise<UserResponse[]> => {
  try {
    const _params = omitBy(params ?? {}, isEmpty);
    const response = await axios.get<APIResponse<UserResponse[]>>(`${endpoints.users}`, {
      params: _params,
    });
    const users = response.data?.data;

    return users;
  } catch (error) {
    console.error('Error during fetching users:', error);
    throw error;
  }
};
