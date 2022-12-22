import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';
export const parseJWT = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const generateJWT = (data: any) => {
  return jwt.sign(
    {
      ...data,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    secret,
  );
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, secret);
};
