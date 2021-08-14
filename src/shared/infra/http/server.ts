import cors from 'cors';

import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppErrors';
import routes from '@shared/infra/http/routes';
import uploaudConfig from '@config/uploaud';

import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploaudConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333);
