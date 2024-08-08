import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import { registerUsersSchema, loginUsersSchema } from '../validation/auth.js';

const jsonParser = express.json();

const router = express.Router();

router.post(
  '/auth/register',
  jsonParser,
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/auth/login',
  jsonParser,
  validateBody(loginUsersSchema),
  ctrlWrapper(loginUserController),
);

router.post('/auth/logout', jsonParser, ctrlWrapper(logoutUserController));

router.post('/auth/refresh', jsonParser, ctrlWrapper(refreshSessionController));

export default router;
