import { Request, Response } from 'express';

import { products, Product } from '../../data/products';

const getProducts = (req: Request, res: Response): void => {
  const query = req.query;
  const page = Number(query.page);
  const perPage = 3;
  const total: number = products.length;
  const totalPages: number = Math.ceil(total / perPage);
  const start: number = (page - 1) * perPage;
  const end: number = page * perPage;

  res.send({
    page: page,
    per_page: perPage,
    total: total,
    total_pages: totalPages,
    data: products.slice(start, end > total ? total : end),
    support: {
      url: 'https://reqres.in/#support-heading',
      text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
    },
  });
};

const getProductById = (req: Request, res: Response): void => {
  const { productId } = req.params;
  const index: number = products.findIndex((item) => item.id === Number(productId));
  index !== -1 ? res.send({ data: products[index] }) : res.status(404).send({});
};

const createProduct = (req: Request, res: Response) => {
  const { name, year, color, pantone_value }: Product = req.body;
  const newProduct: Product = {
    id: products.length + 1,
    name,
    year,
    color,
    pantone_value,
  };
  products.push(newProduct);
  res.send(newProduct);
};

const updateProduct = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index: number = products.findIndex((item) => item.id === id);

  if (index !== -1) {
    const { name, year, color, pantone_value }: Product = req.body;
    products[index] = {
      id,
      name,
      year,
      color,
      pantone_value,
    };
    res.send({ data: products[index] });
  } else {
    res.status(404).send({});
  }
};

const partialUpdateProduct = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index: number = products.findIndex((item) => item.id === id);

  if (index !== -1) {
    const { name, year, color, pantone_value }: Product = req.body;
    const product = products[index];
    products[index] = {
      id: id || product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantone_value: pantone_value || product.pantone_value,
    };
    res.send({ data: products[index] });
  } else {
    res.status(404).send({});
  }
};

const updateProductAndNotify = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index: number = products.findIndex((item) => item.id === id);
  const { client, data } = req.body;

  if (index !== -1) {
    const { name, year, color, pantone_value } = data;
    const product = products[index];
    products[index] = {
      id: id || product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantone_value: pantone_value || product.pantone_value,
    };
    res.send({ data: products[index], message: `Email sent to ${client}` });
  } else {
    res.status(404).send({});
  }
};

const deleteProductById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index: number = products.findIndex((item) => item.id === id);

  if (index !== -1) {
    products.splice(index, 1);
    res.send({});
  } else {
    res.status(404).send({});
  }
};

export = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  partialUpdateProduct,
  updateProductAndNotify,
  deleteProductById,
};
