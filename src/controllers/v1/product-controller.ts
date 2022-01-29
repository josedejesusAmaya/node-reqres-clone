import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { Products, Product } from '../../db/schemas/product';
import { CustomRequest } from '../../middleware/auth-middleware';
import { sendError, validateObjectId } from '../../utils/response';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const query = req.query;
  const page = Number(query.page);
  const perPage = 3;
  const myReq = req as CustomRequest;
  const user = myReq.session.userId;
  const total: number = await Products.count({ user });
  const totalPages: number = Math.ceil(total / perPage);
  const start: number = (page - 1) * perPage;
  const products: Product[] = await Products.find({
    user,
  })
    .skip(start)
    .limit(perPage);

  res.send({
    page: page,
    per_page: perPage,
    total: total,
    total_pages: totalPages,
    data: products,
    support: {
      url: 'https://reqres.in/#support-heading',
      text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
    },
  });
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: string = req.params.id;
    const myReq = req as CustomRequest;
    validateObjectId(productId);
    const product = await Products.findOne({
      _id: productId,
      user: myReq.session.userId,
    }).populate({
      path: 'user',
      select: { password: 0, __v: 0 },
    });
    product ? res.send({ data: product }) : res.status(404).send({});
  } catch (e: any) {
    sendError(res, e);
  }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const myReq = req as CustomRequest;
    const { name, year, price, color, pantone_value } = req.body;
    const user = myReq.session.userId;
    validateObjectId(user);
    const newProduct = await Products.create({
      name,
      year,
      price,
      color,
      pantone_value,
      user,
    });
    res.send(newProduct);
  } catch (e) {
    sendError(res, e);
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const myReq = req as CustomRequest;
    const productId: string = req.params.id;
    const { name, year, price, color, pantone_value } = req.body;
    const user = myReq.session.userId;
    const newData = {
      name,
      year,
      price,
      color,
      pantone_value,
      user,
    };
    const updatedProduct = await Products.findOneAndUpdate(
      { _id: productId, user },
      newData
    ); // return the data before the update
    updatedProduct ? res.send({ data: 'Ok' }) : res.status(404).send({});
  } catch (e) {
    sendError(res, e);
  }
};

const partialUpdateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const myReq = req as CustomRequest;
    const productId: string = req.params.id;
    validateObjectId(productId);
    const { name, year, price, color, pantone_value } = req.body;
    const user = myReq.session.userId;
    const product = await Products.findOne({
      _id: productId,
      user,
    });
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.color = color || product.color;
      product.pantone_value = pantone_value || product.pantone_value;

      await product.save();
      res.send({ data: product });
    } else {
      res.status(404).send({});
    }
  } catch (e: any) {
    sendError(res, e);
  }
};

const updateProductAndNotify = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const myReq = req as CustomRequest;
    const productId: string = req.params.id;
    validateObjectId(productId);
    const { client, data } = req.body;
    const { name, year, price, color, pantone_value } = data;
    const user = myReq.session.userId;
    const product = await Products.findOne({
      _id: productId,
      user,
    });
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.color = color || product.color;
      product.pantone_value = pantone_value || product.pantone_value;

      await product.save();
      res.send({ data: product, message: `Email sent to ${client}` });
    } else {
      res.status(404).send({});
    }
  } catch (e: any) {
    sendError(res, e);
  }
};

const deleteProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const myReq = req as CustomRequest;
    const productId: string = req.params.id;
    validateObjectId(productId);
    const user = myReq.session.userId;
    const deleted = await Products.deleteOne({
      _id: productId,
      user,
    });
    deleted.deletedCount > 0 ? res.send({}) : res.status(404).send({});
  } catch (e: any) {
    sendError(res, e);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  partialUpdateProduct,
  updateProductAndNotify,
  deleteProductById,
};
