import { Request, Response } from 'express';
// import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Users, User } from '../../db/schemas/user';
import { Products } from '../../db/schemas/product';
import { sendError, validateObjectId } from '../../utils/response';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await Users.find().select({ password: 0, __v: 0 });
  res.send(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: string = req.params.id;
    validateObjectId(userId);
    // const user = await Users.findById(new Types.ObjectId(userId)); // not necesary to cast
    // const user = await Users.findById(userId).select('id');
    // const user = await Users.findById(userId).select({ _id: 1 });
    const user: User | null = await Users.findById(userId).select({ password: 0, __v: 0 });
    user ? res.send(user) : res.status(404).send({});
  } catch (e) {
    sendError(res, e);
  }
};

export const createUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, first_name, last_name, avatar, password }: User = req.body;
  try {
    const hash: string = await bcrypt.hash(password, 15);
    const newUser: User = await Users.create({
      email,
      first_name,
      last_name,
      avatar,
      password: hash,
    });
    res.send(newUser);
  } catch (e) {
    sendError(res, e);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: string = req.params.id;
    validateObjectId(userId);
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (deletedUser) {
      const deletedProducts = await Products.deleteMany({ user: deletedUser._id }); // cast to ObjectId
      deletedProducts ? res.send('Ok') : res.status(404).send({});
    } else {
      res.status(404).send({});
    }
  } catch (e: any) {
    sendError(res, e);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: User | null = await Users.findOne({ email });
    if (!user) {
      throw { code: 404, message: 'User not found' }; 
    }
    const isAValidUser: boolean = await bcrypt.compare(password, user.password);
    if (!isAValidUser) {
      throw {code: 401, message: 'Invalid password'};
    }

    const expiresInSeg = 60 * 60;
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: expiresInSeg });
    res.send({ token, expiresIn: expiresInSeg });
  } catch (e) {
    sendError(res, e);
  }
};
