import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

// Читаємо змінну оточення PORT
const PORT = Number(env('PORT', '3000'));

// Функція створення сервера
export const setupServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH, але парсить він на всіх запитах
  // app.use(express.json());

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

  app.use(contactsRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
