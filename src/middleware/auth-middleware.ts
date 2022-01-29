import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     export interface Request {
//       session: {
//         userId: string,
//         email: string
//       }
//     }
//   }
// }

export interface CustomRequest extends Request {
  session: {
    userId: string,
    email: string
  }
}

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const myReq = req as CustomRequest;
    const token = req.headers['token']; // better definition for express be careful with upper case
    if (!token) {
      throw new Error('missing header token');
    }
    const { userId, email }: { userId: string, email: string } = jwt.verify(
      token as string,
      process.env.SECRET_JWT!
    ) as { userId: string, email: string };
    myReq.session  = { userId, email };
    next();
  } catch (e: any) {
    res.status(401).send(e.message);
  }
};

export const checkIp = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log('hostname', req.hostname);
  next();
};
