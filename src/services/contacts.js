import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => {
  return ContactsCollection.find();
};

//Другий варіант створення функції роботи з бд
// export const getAllContacts = async () => {
//   const contacts = await ContactsCollection.find();
//   return contacts;
// };

export const getContactById = (contactId) => {
  return ContactsCollection.findById(contactId);
};

// export const getContactById = async (contactsId) => {
//   const contact = await ContactsCollection.findById(contactsId);
//   return contact;
// };

export const createContact = (contact) => {
  return ContactsCollection.create(contact);
};

export const deleteContact = (contactId) => {
  return ContactsCollection.findByIdAndDelete(contactId);
};

export const editContact = (contactId, contact, options = {}) => {
  return ContactsCollection.findByIdAndUpdate(contactId, contact, {
    new: true,
    ...options,
  });
};
