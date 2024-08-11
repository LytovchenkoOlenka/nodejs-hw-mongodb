import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  registerUsersSchema,
  loginUsersSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

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

router.post(
  '/auth/send-reset-email',
  jsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/auth/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
