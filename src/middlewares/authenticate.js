import createHttpError from 'http-errors';

import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const [bearer, accessToken] = req.headers.authorization.split(' ', 2);

  if (bearer !== 'Bearer' || !accessToken) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};
