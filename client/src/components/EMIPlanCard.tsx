import type { EMIPlan } from "../types";

export default function EMIPlanCard({
  plan,
  selected,
  onSelect
}: {
  plan: EMIPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label className={`block rounded-2xl border p-4 cursor-pointer ${selected ? "ring-2 ring-black" : ""}`}>
      <input
        type="radio"
        name="emiPlan"
        className="hidden"
        checked={selected}
        onChange={onSelect}
      />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">
            ₹{plan.monthlyAmount.toLocaleString()} / month
          </div>
          <div className="text-sm text-gray-600">
            Tenure: {plan.tenureMonths} months • Interest: {plan.interestAPR}%
            {plan.cashback ? ` • Cashback: ₹${plan.cashback.toLocaleString()}` : ""}
          </div>
          {plan.provider && (
            <div className="text-xs mt-1 text-gray-500">{plan.provider}</div>
          )}
        </div>
        <div className="text-xs px-2 py-1 border rounded-xl">Select</div>
      </div>
    </label>
  );
}
