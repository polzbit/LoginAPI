import crypto from 'crypto';

export const hash = (value: string, salt: string) => {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(value);
  const hashedValue = hash.digest('hex');
  return {
    salt,
    hashedValue,
  };
};

export const generateToken = () => {
  return { token: crypto.randomBytes(48).toString('hex'), date: Date.now() };
};

export const generateSalt = (rounds: number = 12) => {
  if (rounds >= 15) {
    throw new Error(`${rounds} is greater than 15,Must be less that 15`);
  }
  return crypto
    .randomBytes(Math.ceil(rounds / 2))
    .toString('hex')
    .slice(0, rounds);
};

export const hashPassword = (password: string) => {
  const salt = generateSalt();
  const { hashedValue: hashedPassword } = hash(password, salt);
  return {
    salt,
    hashedPassword,
  };
};

export const compare = (
  value: string,
  hashToCompare: { salt: string; hashedValue: string },
) => {
  const { salt, hashedValue } = hashToCompare;
  const hashed = hash(value, salt);

  return hashed.hashedValue === hashedValue;
};
