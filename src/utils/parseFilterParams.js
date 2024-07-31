import { CONTACT_TYPE } from '../constants/index.js';

// сервісна функція перевірки чи isFavourite є boolean
const parseBoolean = (isFavourite) => {
  // перевірка чи є передане значення строкою
  if (typeof isFavourite !== 'string') return;

  // перевірка чи є передане значення true або false
  if (['true', 'false'].includes(isFavourite)) {
    return isFavourite;
  }

  // перетворення строки value на boolean
  const parsedValue = JSON.parse(isFavourite);

  return parsedValue;
};

const parseType = (contactType) => {
  if (typeof contactType !== 'string') {
    return;
  }
  if (CONTACT_TYPE.includes(contactType)) {
    return contactType;
  }
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
