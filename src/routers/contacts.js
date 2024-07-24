import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

const router = Router();

//Отримання колекції контактів
router.get('/contacts', ctrlWrapper(getContactsController));

//Отримання контакта за id
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

export default router;
