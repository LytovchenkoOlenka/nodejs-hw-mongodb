import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';
// import { Student } from '../models/student.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    data: contacts,
    message: 'Successfully found contacts!',
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact === null) {
    // throw createHttpError(404, 'Student not found');
    return next(createHttpError(404, 'Student not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
