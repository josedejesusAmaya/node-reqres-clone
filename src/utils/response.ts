import { Response } from 'express';
import { Types, mongo } from 'mongoose';

const { MongoError } = mongo;
const { ObjectId } = Types;

export const validateObjectId = (id: string): void => {
  if (!ObjectId.isValid(id)) {
    throw { code: 400, message: `Invalid ObjectId ${id}` };
  }
};

export const sendError = (res: Response, e: any): void => {
  if (e instanceof MongoError) {
    res.status(400).send({
      code: e.code,
      message: e.code === 11000 ? 'Duplicated value' : 'Error',
    });
    return;
  }
  const statusCode = e.code || 500;
  res.status(statusCode).send('Data error');
};
