import { isOkStatus, post, get, patch } from '../utils/http/http';

const userPrefix = '/users';
const usersAPIRoutes = {
  validateReset: `${userPrefix}/validate-reset/:token`,
  validateEmail: `${userPrefix}/validate-email/:token`,
  validate: `${userPrefix}/validate`,
  forgotPassword: `${userPrefix}/forgot-password`,
  resetPassword: `${userPrefix}/reset-password`,
  login: `${userPrefix}/login`,
  register: `${userPrefix}/register`,
};

export const validateEmailAPI = async (token: string) => {
  const result = await patch(
    usersAPIRoutes.validateEmail.replace(':token', token),
  );
  if (!isOkStatus(result.status)) {
    return;
  }
  const { data } = await result.json();
  return data;
};

export const validateTokenAPI = async (token: string) => {
  const result = await get(
    usersAPIRoutes.validateReset.replace(':token', token),
  );
  if (!isOkStatus(result.status)) {
    return;
  }
  const { data } = await result.json();
  return data;
};

export const validateAPI = async () => {
  const result = await get(usersAPIRoutes.validate);
  if (!isOkStatus(result.status)) {
    return;
  }
  const { data } = await result.json();
  return data;
};

export const forgotPasswordAPI = async (email: string) => {
  const result = await post(usersAPIRoutes.forgotPassword, { email });
  if (!isOkStatus(result.status)) {
    return;
  }
  const { data } = await result.json();
  return data;
};

export const resetPasswordAPI = async (
  token: string,
  password: string,
  passwordRepeat: string,
) => {
  const result = await patch(usersAPIRoutes.resetPassword, {
    token,
    password,
    passwordRepeat,
  });
  if (!isOkStatus(result.status)) {
    return;
  }
  const { data } = await result.json();
  return data;
};

export const loginAPI = async (email: string, password: string) => {
  const result = await post(usersAPIRoutes.login, { email, password });
  if (!isOkStatus(result.status)) {
    return;
  }
  const { data } = await result.json();
  return data;
};

export const registerAPI = async (
  email: string,
  password: string,
  passwordRepeat: string,
) => {
  const result = await post(usersAPIRoutes.register, {
    email,
    password,
    passwordRepeat,
  });
  if (!isOkStatus(result.status)) {
    return;
  }
  const { status_code } = await result.json();
  return status_code;
};
