import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
} from '../services/auth.js';
// import { MONTH } from '../constants/index.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

const setupSession = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    // expires: new Date(Date.now() + MONTH),
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    // expires: new Date(Date.now() + MONTH),
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (typeof req.cookies.sessionId === 'string') {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).end();
};

export const refreshSessionController = async (req, res) => {
  const session = await refreshUsersSession(
    req.cookies.sessionId,
    req.cookies.refreshToken,
  );

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
