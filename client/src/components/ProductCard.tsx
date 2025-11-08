import { Link } from "react-router-dom";
import type { ProductCard as ProductCardType } from "../types";

export default function ProductCard({ p }: { p: ProductCardType }) {
  return (
    <Link to={`/products/${p.slug}`} className="group">
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
        <div className="p-4">
          <div className="text-xs text-gray-500">{p.brand}</div>
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-gray-600 mt-1">
            ₹{p.priceRange.min.toLocaleString()} – ₹{p.priceRange.max.toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
}
