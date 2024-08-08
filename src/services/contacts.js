import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactsQuery.where('userId').equals(userId);

  //Використовуємо Promise.all для того,щоб робити два асинхронних запити одночасно, бо вони незалежні один від одного
  const [countContacts, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  const paginationData = calculatePaginationData(countContacts, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

//Другий варіант створення функції роботи з бд
// export const getAllContacts = async () => {
//   const contacts = await ContactsCollection.find();
//   return contacts;
// };

export const getContactById = (id, userId) => {
  return ContactsCollection.findOne({ _id: id, userId });
};

export const createContact = (contact) => {
  return ContactsCollection.create(contact);
};

export const deleteContact = (id, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: id, userId });
};

export const editContact = (contactId, userId, updates, options = {}) => {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId: userId },
    updates,
    {
      new: true,
      ...options,
    },
  );
};
