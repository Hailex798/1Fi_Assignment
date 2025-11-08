import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import type { ProductCard as ProductCardType } from "../types";

export default function ProductsList() {
  const [items, setItems] = useState<ProductCardType[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api.listProducts()
      .then((res) => setItems(res.items as any))
      .catch((e) => setErr(e.message));
  }, []);

  if (err) return <div className="text-red-600">{err}</div>;
  if (!items) return <Loading />;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Smartphones</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
