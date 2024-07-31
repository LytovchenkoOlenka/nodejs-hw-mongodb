import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  //Використовуємо Promise.all для того,щоб робити два асинхронних запити одночасно, бо вони незалежні один від одного
  const [data, countContacts] = await Promise.all([
    ContactsCollection.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    ContactsCollection.countDocuments(),
  ]);

  // const data = await ContactsCollection.find().skip(skip).limit(limit).exec();
  // const countContacts = await ContactsCollection.countDocuments();

  const totalPages = Math.ceil(countContacts / perPage);

  return {
    data,
    page,
    perPage,
    totalItems: countContacts,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };

  // return ContactsCollection.find()
  //   .limit(perPage)
  //   .skip(page > 0 ? (page - 1) * perPage : 0);
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
