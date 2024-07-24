// другий варіант перевірки помилки
// import { HttpError } from 'http-errors';
import { isHttpError } from 'http-errors';

// Middleware для обробких помилок (приймає 4 аргументи)
// Додається завжди самим останнім, після всіх інших middleware та маршрутів
export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
  }

  // Перевірка, чи отримали ми помилку від createHttpError
  //   if (err instanceof HttpError) {
  //     res.status(err.status).json({
  //       status: err.status,
  //       message: err.name,
  //       data: err,
  //     });
  //     return;
  //   }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
