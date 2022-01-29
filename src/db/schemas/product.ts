import { Schema, model, Document, Types } from 'mongoose';

import { User } from './user';

interface Product extends Document {
  name: string;
  year: number;
  price: number | null;
  color: string;
  pantone_value?: string;
  user: Types.ObjectId | User | string;
}

const schema = new Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, default: 0 }, // not required
    color: String,
    pantone_value: String,
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true } // embedded documents
});

const Products = model<Product>('product', schema); 

export {
    Products,
    Product
};
