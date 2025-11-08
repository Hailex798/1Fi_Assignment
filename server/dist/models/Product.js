"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const VariantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    images: [{ type: String, required: true }]
}, { _id: true });
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    baseSlug: { type: String, required: true, unique: true },
    description: String,
    variants: { type: [VariantSchema], default: [] }
}, { timestamps: true });
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
