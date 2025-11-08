"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMIPlanModel = void 0;
const mongoose_1 = require("mongoose");
const EMIPlanSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    tenureMonths: { type: Number, required: true },
    interestAPR: { type: Number, required: true },
    monthlyAmount: { type: Number, required: true },
    cashback: { type: Number, default: 0 },
    provider: { type: String }
}, { timestamps: true });
EMIPlanSchema.index({ productId: 1, variantId: 1 });
exports.EMIPlanModel = (0, mongoose_1.model)("EMIPlan", EMIPlanSchema);
