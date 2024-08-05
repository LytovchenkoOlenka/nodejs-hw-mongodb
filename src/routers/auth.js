import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import { registerUsersSchema } from '../validation/auth.js';

const jsonParser = express.json();

const router = express.Router();

router.post(
  '/auth/register',
  jsonParser,
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUserController),
);

export default router;
