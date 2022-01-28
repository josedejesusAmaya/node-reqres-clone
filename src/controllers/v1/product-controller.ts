import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { Products, Product } from '../../db/schemas/product';
import { sendError, validateObjectId } from '../../utils/response';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const query = req.query;
  const page = Number(query.page);
  const perPage = 3;
  const total: number = await Products.count();
  const totalPages: number = Math.ceil(total / perPage);
  const start: number = (page - 1) * perPage;
  const products: Product[] = await Products.find().skip(start).limit(perPage);

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
    validateObjectId(productId);
    const product = await Products.findById(productId).populate({
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
    const { name, year, price, color, pantone_value, user }: Product = req.body;
    validateObjectId(user as string);
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
    const productId: string = req.params.id;
    const { name, year, price, color, pantone_value, user }: Product = req.body;
    if (user) {
      validateObjectId(user as string);
    }
    const newData = {
      name,
      year,
      price,
      color,
      pantone_value,
      user,
    };
    validateObjectId(productId);
    const updatedProduct = await Products.findByIdAndUpdate(productId, newData); // return the data before the update
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
    const productId: string = req.params.id;
    validateObjectId(productId);
    const { name, year, price, color, pantone_value, user }: Product = req.body;
    if (user) {
      validateObjectId(user as string);
    }
    const product = await Products.findById(productId);
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.color = color || product.color;
      product.pantone_value = pantone_value || product.pantone_value;
      product.user = user || product.user;

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
    const productId: string = req.params.id;
    validateObjectId(productId);
    const { client, data } = req.body;
    const { name, year, price, color, pantone_value, user }: Product = data;

    if (user) {
      validateObjectId(user as string);
    }
    const product = await Products.findById(productId);
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.color = color || product.color;
      product.pantone_value = pantone_value || product.pantone_value;
      product.user = user || product.user;

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
    const productId: string = req.params.id;
    validateObjectId(productId);
    const deleted = await Products.deleteOne({
      _id: new Types.ObjectId(productId),
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
