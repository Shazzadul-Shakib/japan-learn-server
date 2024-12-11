import bcrypt from 'bcrypt';
import config from '../config';

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, config.salt);
};

export const comparePassword = async (
  givenPassword: string,
  savedPassword: string,
) => {
  return await bcrypt.compare(givenPassword, savedPassword);
};
