import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

// Читаємо змінну оточення PORT
const PORT = Number(env('PORT', '3000'));

// Функція створення сервера
export const setupServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH
  app.use(express.json());

  // Middleware CORS(доступ до ресурсу з будь-якого джерела)
  app.use(cors());

  // Middleware для логування
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //   app.get('/', (req, res) => {
  //     res.json({ message: 'Hello world!' });
  //   });

  //Отримання колекції контактів
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      data: contacts,
      message: 'Successfully found contacts!',
    });
  });

  //Отримання контакта за id
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  // Middleware для обробки випадку, коли клієнт звертається до неіснуючого маршруту
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Middleware для обробких помилок (приймає 4 аргументи)
  // Додається завжди самим останнім, після всіх інших middleware та маршрутів
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
