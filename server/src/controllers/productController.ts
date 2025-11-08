import { Request, Response } from "express";
import { ProductModel } from "../models/Product";
import { EMIPlanModel } from "../models/EMIPlan";

export const listProducts = async (_req: Request, res: Response) => {
  const products = await ProductModel.find({})
    .select("name brand baseSlug variants")
    .lean();

  const mapped = products.map((p) => {
    const img = p.variants?.[0]?.images?.[0] ?? "";
    const minPrice = Math.min(...p.variants.map(v => v.price));
    const maxPrice = Math.max(...p.variants.map(v => v.price));
    return {
      name: p.name,
      brand: p.brand,
      slug: p.baseSlug,
      image: img,
      priceRange: { min: minPrice, max: maxPrice }
    };
  });

  res.json({ items: mapped });
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { variantId } = req.query;

  const product = await ProductModel.findOne({ baseSlug: slug }).lean();
  if (!product) return res.status(404).json({ error: "Product not found" });

  const selectedVariantId =
    (variantId as string) || (product.variants[0]?._id?.toString() ?? null);

  const plans = selectedVariantId
    ? await EMIPlanModel.find({
        productId: product._id,
        variantId: selectedVariantId
      }).sort({ tenureMonths: 1 }).lean()
    : [];

  res.json({
    product: {
      _id: product._id,
      name: product.name,
      brand: product.brand,
      slug: product.baseSlug,
      description: product.description,
      variants: product.variants
    },
    selectedVariantId,
    emiPlans: plans
  });
};
