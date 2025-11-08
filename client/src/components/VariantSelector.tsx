import type { Variant } from "../types";

export default function VariantSelector({
  variants,
  selectedId,
  onChange
}: {
  variants: Variant[];
  selectedId: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => (
        <button
          key={v._id}
          onClick={() => onChange(v._id)}
          className={`px-3 py-2 rounded-xl border text-sm ${
            selectedId === v._id ? "bg-black text-white" : "bg-white"
          }`}
          title={`${v.name} • ₹${v.price.toLocaleString()}`}
        >
          {v.name}
        </button>
      ))}
    </div>
  );
}
