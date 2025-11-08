import "dotenv/config";
import { connectDB } from "../config/db";
import { ProductModel } from "../models/Product";
import { EMIPlanModel } from "../models/EMIPlan";
import { toSlug } from "../utils/slug";

const productsData = [
  {
    name: "Apple iPhone 17 Pro",
    brand: "Apple",
    description: "Premium smartphone with A19 chip and ProMotion display.",
    variants: [
      {
        name: "256GB / Silver",
        mrp: 149999,
        price: 139999,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]
      },
      {
        name: "512GB / Space Black",
        mrp: 169999,
        price: 159999,
        images: ["https://images.unsplash.com/photo-1510552776732-01acc9a4c1f0"]
      }
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    description: "Flagship with S Pen and top-tier camera.",
    variants: [
      {
        name: "256GB / Titanium Gray",
        mrp: 129999,
        price: 119999,
        images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"]
      },
      {
        name: "512GB / Titanium Black",
        mrp: 139999,
        price: 129999,
        images: ["https://images.unsplash.com/photo-1518779578993-ec3579fee39f"]
      }
    ]
  },
  {
    name: "OnePlus 13 Pro",
    brand: "OnePlus",
    description: "Fast, smooth experience with Hasselblad cameras.",
    variants: [
      {
        name: "256GB / Emerald",
        mrp: 84999,
        price: 79999,
        images: ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5"]
      },
      {
        name: "512GB / Obsidian",
        mrp: 94999,
        price: 89999,
        images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c"]
      }
    ]
  }
];

const mkPlans = (product: any) => {
  const plans: any[] = [];
  product.variants.forEach((v: any) => {
    plans.push(
      {
        productId: product._id,
        variantId: v._id,
        tenureMonths: 6,
        interestAPR: 0,
        monthlyAmount: Math.round(v.price / 6),
        cashback: 1500,
        provider: "ZeroCost MF-backed"
      },
      {
        productId: product._id,
        variantId: v._id,
        tenureMonths: 9,
        interestAPR: 8.5,
        monthlyAmount: Math.round((v.price * (1 + 0.085 * 9 / 12)) / 9),
        cashback: 0,
        provider: "Balanced MF Plan"
      },
      {
        productId: product._id,
        variantId: v._id,
        tenureMonths: 12,
        interestAPR: 10.5,
        monthlyAmount: Math.round((v.price * (1 + 0.105)) / 12),
        cashback: 2000,
        provider: "Growth MF Plan"
      }
    );
  });
  return plans;
};

(async () => {
  const uri = process.env.MONGO_URI!;
  await connectDB(uri);

  await EMIPlanModel.deleteMany({});
  await ProductModel.deleteMany({});

  for (const p of productsData) {
    const baseSlug = toSlug(p.name);
    const product = await ProductModel.create({ ...p, baseSlug });
    const plans = mkPlans(product);
    await EMIPlanModel.insertMany(plans);
  }

  console.log("✅ Seed complete");
  process.exit(0);
})();
