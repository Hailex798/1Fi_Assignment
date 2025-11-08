const BASE = import.meta.env.VITE_API_BASE;
if (!BASE) {
  throw new Error("VITE_API_BASE environment variable is not set");
}
console.log("API BASE:", BASE);
export const api = {
  async listProducts() {
    const res = await fetch(`${BASE}/products`);
    if (!res.ok) throw new Error("Failed to load products");
    return res.json() as Promise<{ items: any[] }>;
  },
  async getProduct(slug: string, variantId?: string) {
    const q = variantId ? `?variantId=${variantId}` : "";
    const res = await fetch(`${BASE}/products/${slug}${q}`);
    if (!res.ok) throw new Error("Product not found");
    return res.json() as Promise<{
      product: any;
      selectedVariantId: string;
      emiPlans: any[];
    }>;
  }
};
