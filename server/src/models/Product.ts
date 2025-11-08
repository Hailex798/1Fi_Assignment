import { Schema, model, Types } from "mongoose";

export interface Variant {
  _id: Types.ObjectId;
  name: string;
  price: number;
  mrp: number;
  images: string[];
}

export interface Product {
  _id: Types.ObjectId;
  name: string;
  brand: string;
  baseSlug: string;
  description?: string;
  variants: Variant[];
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema<Variant>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    images: [{ type: String, required: true }]
  },
  { _id: true }
);

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    baseSlug: { type: String, required: true, unique: true },
    description: String,
    variants: { type: [VariantSchema], default: [] }
  },
  { timestamps: true }
);

export const ProductModel = model<Product>("Product", ProductSchema);
