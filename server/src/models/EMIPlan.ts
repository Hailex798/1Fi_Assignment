import { Schema, model, Types } from "mongoose";

export interface EMIPlan {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  tenureMonths: number;
  interestAPR: number;
  monthlyAmount: number;
  cashback?: number;
  provider?: string;
}

const EMIPlanSchema = new Schema<EMIPlan>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: Schema.Types.ObjectId, required: true },
    tenureMonths: { type: Number, required: true },
    interestAPR: { type: Number, required: true },
    monthlyAmount: { type: Number, required: true },
    cashback: { type: Number, default: 0 },
    provider: { type: String }
  },
  { timestamps: true }
);

EMIPlanSchema.index({ productId: 1, variantId: 1 });

export const EMIPlanModel = model<EMIPlan>("EMIPlan", EMIPlanSchema);
