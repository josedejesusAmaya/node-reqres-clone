import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleRequestError = (req: Request, res: Response, next: NextFunction): void => {
    const result = validationResult(req);

    result.isEmpty() ? next() : res.status(400).send({errors: result.array()});
};
