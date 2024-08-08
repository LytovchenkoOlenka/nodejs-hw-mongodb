import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

import { FIFTEEN_MINUTES, MONTH } from '../constants/index.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + MONTH),
  };
};

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

export const loginUser = async (email, password) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorize');
  }
  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });
};

export const logoutUser = (sessionId) => {
  return SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Session token is expired');
  }

  await SessionsCollection.deleteOne({ _id: session._id });

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
