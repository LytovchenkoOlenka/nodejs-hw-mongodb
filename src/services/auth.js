import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const registerUser = async (user) => {
  const isDuplicatedEmail = await UsersCollection.findOne({
    email: user.email,
  });
  if (isDuplicatedEmail) {
    throw createHttpError(409, 'Email in use');
  }
  const encryptedPassword = await bcrypt.hash(user.password, 10);

  return await UsersCollection.create({
    ...user,
    password: encryptedPassword,
  });
};
