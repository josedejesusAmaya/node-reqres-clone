import { Request, Response } from "express";

const errorRoute = (req: Request, res: Response): void => {
    res.status(404).send('No found');
}

export default errorRoute;
