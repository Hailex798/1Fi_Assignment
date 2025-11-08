import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import type { Variant, EMIPlan, ProductDetail as ProductDetailType } from "../types";

export default function ProductDetail() {
  const { slug } = useParams();
  const [sp, setSp] = useSearchParams();

  const [data, setData] = useState<{
    product: ProductDetailType | null;
    selectedVariantId: string | null;
    plans: EMIPlan[];
  }>({ product: null, selectedVariantId: null, plans: [] });

  const [err, setErr] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [downpayment, setDownpayment] = useState(20245);
  const [customDownpayment, setCustomDownpayment] = useState("");

  const variantIdParam = sp.get("variantId") || undefined;

  // Fallback data for demo purposes when API is not available
  const fallbackData = {
    product: {
      _id: "demo-iphone-17-pro",
      name: "Apple iPhone 17 Pro (Silver, 256 GB)",
      brand: "Apple",
      slug: "apple-iphone-17-pro",
      description: "The most advanced iPhone yet with titanium design and A17 Pro chip",
      variants: [
        {
          _id: "variant-256gb-silver",
          name: "256 GB, Silver",
          mrp: 149900,
          price: 134900,
          images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"]
        },
        {
          _id: "variant-512gb-silver",
          name: "512 GB, Silver",
          mrp: 169900,
          price: 154900,
          images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"]
        }
      ]
    },
    selectedVariantId: "variant-256gb-silver",
    plans: [
      {
        _id: "plan-3m",
        tenureMonths: 3,
        interestAPR: 0,
        monthlyAmount: 38221,
        cashback: 0,
        provider: "Snapmint"
      },
      {
        _id: "plan-6m",
        tenureMonths: 6,
        interestAPR: 1.73,
        monthlyAmount: 21442,
        cashback: 0,
        provider: "Snapmint"
      },
      {
        _id: "plan-9m",
        tenureMonths: 9,
        interestAPR: 1.88,
        monthlyAmount: 15281,
        cashback: 0,
        provider: "Snapmint"
      },
      {
        _id: "plan-12m",
        tenureMonths: 12,
        interestAPR: 1.89,
        monthlyAmount: 12106,
        cashback: 0,
        provider: "Snapmint"
      }
    ]
  };

  // Use fallback data if API fails or no data
  const currentData = (err || !data.product) ? fallbackData : data;
  const currentSelectedVariantId = (err || !data.selectedVariantId) ? fallbackData.selectedVariantId : data.selectedVariantId;

  const selectedVariant: Variant | null = useMemo(() => {
    if (!currentData.product || !currentSelectedVariantId) return null;
    return currentData.product.variants.find(v => v._id === currentSelectedVariantId) || null;
  }, [currentData, currentSelectedVariantId]);

  useEffect(() => {
    if (!slug) return;
    api.getProduct(slug, variantIdParam)
      .then((res) => {
        setData({
          product: res.product,
          selectedVariantId: res.selectedVariantId,
          plans: res.emiPlans
        });
        // Set first plan as default
        if (res.emiPlans.length > 0) {
          setSelectedPlanId(res.emiPlans[0]._id);
        }
        // Reset downpayment when product changes
        if (res.product && res.product.variants.length > 0) {
          const variant = res.product.variants.find((v: Variant) => v._id === res.selectedVariantId);
          if (variant) {
            setDownpayment(Math.round(variant.price * 0.15)); // Default to 15%
            setCustomDownpayment("");
          }
        }
      })
      .catch((e) => setErr(e.message));
  }, [slug, variantIdParam]);

  // Reset downpayment when variant changes
  useEffect(() => {
    if (selectedVariant) {
      setDownpayment(Math.round(selectedVariant.price * 0.15));
      setCustomDownpayment("");
      setSelectedPlanId(null); // Reset plan selection
    }
  }, [selectedVariant]);

  if (!currentData.product || !selectedVariant) return <Loading />;

  const image = selectedVariant.images[0];

  // EMI Calculation Functions
  const calculateEMI = (principal: number, rate: number, tenure: number): number => {
    if (rate === 0) {
      return Math.round(principal / tenure);
    }
    const monthlyRate = rate / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const getFinanceAmount = (): number => {
    return selectedVariant.price - downpayment;
  };

  const getCalculatedPlans = () => {
    const financeAmount = getFinanceAmount();
    return currentData.plans.map(plan => ({
      ...plan,
      calculatedMonthlyAmount: calculateEMI(financeAmount, plan.interestAPR, plan.tenureMonths),
      totalAmount: financeAmount,
      downpaymentUsed: downpayment
    }));
  };

  const calculatedPlans = getCalculatedPlans();

  // Debug: Log calculations for testing
  if (process.env.NODE_ENV === 'development' && selectedVariant) {
    console.log('EMI Calculations:', {
      productPrice: selectedVariant.price,
      downpayment,
      financeAmount: getFinanceAmount(),
      plans: calculatedPlans.map(p => ({
        tenure: p.tenureMonths,
        rate: p.interestAPR,
        emi: p.calculatedMonthlyAmount,
        total: p.calculatedMonthlyAmount * p.tenureMonths + downpayment
      }))
    });
  }

  const onVariantChange = (id: string) => {
    setSelectedPlanId(null);
    setSp((prev) => {
      prev.set("variantId", id);
      return prev;
    }, { replace: true });
  };

  const selectedPlan = calculatedPlans.find(p => p._id === selectedPlanId);

  // Set default selected plan if none selected
  if (!selectedPlanId && calculatedPlans.length > 0) {
    setSelectedPlanId(calculatedPlans[0]._id);
  }

  // Predefined downpayment options based on product price
  const getDownpaymentOptions = () => {
    if (!selectedVariant) return [];
    const price = selectedVariant.price;
    return [
      Math.round(price * 0.15), // 15% of price
      Math.round(price * 0.30), // 30% of price
      Math.round(price * 0.50), // 50% of price
    ];
  };

  const downpaymentOptions = getDownpaymentOptions();

  // Validation functions
  const isValidDownpayment = (amount: number): boolean => {
    if (!selectedVariant) return false;
    return amount >= 1000 && amount <= selectedVariant.price * 0.8;
  };

  const getMinDownpayment = (): number => 1000;
  const getMaxDownpayment = (): number => selectedVariant ? Math.round(selectedVariant.price * 0.8) : 0;

  // Mock images for thumbnail gallery
  const mockImages = Array(6).fill(image);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
        <div className="flex items-center text-xs sm:text-sm text-gray-500 space-x-1 sm:space-x-2 overflow-x-auto">
          <span className="whitespace-nowrap">Shop on EMI</span>
          <span>&gt;</span>
          <span className="whitespace-nowrap">Smart Phones</span>
          <span>&gt;</span>
          <span className="whitespace-nowrap">{currentData.product.brand}</span>
          <span className="hidden sm:inline">&gt;</span>
          <span className="text-gray-900 truncate hidden sm:inline">{currentData.product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left side - Images */}
          <div className="order-1">
            {/* Mobile: Main image first, then thumbnails */}
            <div className="lg:hidden">
              <div className="bg-gray-50 rounded-lg p-4 sm:p-8 flex items-center justify-center mb-4">
                <img
                  src={image}
                  alt={currentData.product.name}
                  className="max-w-full max-h-64 sm:max-h-80 object-contain"
                />
              </div>

              {/* Mobile thumbnail scroll */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {mockImages.slice(0, 6).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-12 h-12 sm:w-16 sm:h-16 border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-teal-500' : 'border-gray-200'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Thumbnails on left, main image on right */}
            <div className="hidden lg:flex">
              {/* Thumbnail images */}
              <div className="flex flex-col space-y-2 mr-4">
                {mockImages.slice(0, 6).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-teal-500' : 'border-gray-200'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                  <img
                    src={image}
                    alt={currentData.product.name}
                    className="max-w-full max-h-96 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Color and Storage selectors - Desktop only */}
            <div className="hidden lg:block mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Silver</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => {
                    const variantId = e.target.value;
                    if (variantId) onVariantChange(variantId);
                  }}
                  value={currentSelectedVariantId || ''}
                >
                  {currentData.product.variants.map(variant => (
                    <option key={variant._id} value={variant._id}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="order-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{currentData.product.name}</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4">({selectedVariant.name})</p>

            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">₹{selectedVariant.price.toLocaleString()}</div>

            {/* Mobile: Color and Storage selectors */}
            <div className="lg:hidden mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Silver</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => {
                    const variantId = e.target.value;
                    if (variantId) onVariantChange(variantId);
                  }}
                  value={currentSelectedVariantId || ''}
                >
                  {currentData.product.variants.map(variant => (
                    <option key={variant._id} value={variant._id}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Downpayment section */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Choose a Downpayment</h3>
              <div className="space-y-3">
                {/* Predefined downpayment options */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {downpaymentOptions.map((amount, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDownpayment(amount);
                        setCustomDownpayment("");
                      }}
                      className={`px-3 sm:px-4 py-2 rounded-md font-medium text-xs sm:text-sm ${downpayment === amount && !customDownpayment
                        ? "bg-teal-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom downpayment input */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">Or enter custom amount:</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customDownpayment}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setCustomDownpayment(e.target.value);
                      if (isValidDownpayment(value)) {
                        setDownpayment(value);
                      }
                    }}
                    min={getMinDownpayment()}
                    max={getMaxDownpayment()}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 text-sm sm:text-base ${customDownpayment && !isValidDownpayment(parseInt(customDownpayment) || 0)
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-teal-500'
                      }`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Min: ₹{getMinDownpayment().toLocaleString()} | Max: ₹{getMaxDownpayment().toLocaleString()} (80% of price)
                  </p>
                  {customDownpayment && !isValidDownpayment(parseInt(customDownpayment) || 0) && (
                    <p className="text-xs text-red-500 mt-1">
                      Please enter an amount between ₹{getMinDownpayment().toLocaleString()} and ₹{getMaxDownpayment().toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Finance amount display */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Product Price:</span>
                    <span>₹{selectedVariant.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Downpayment:</span>
                    <span>₹{downpayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-2 mt-2">
                    <span>Finance Amount:</span>
                    <span>₹{getFinanceAmount().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EMI Plans */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Choose EMI Tenure</h3>
              <div className="space-y-3">
                {calculatedPlans.map((plan) => {
                  const isSelected = selectedPlanId === plan._id;
                  const isNoEMI = plan.tenureMonths <= 3 && plan.interestAPR === 0;
                  const totalPayable = plan.calculatedMonthlyAmount * plan.tenureMonths + downpayment;
                  const totalInterest = totalPayable - selectedVariant.price;

                  return (
                    <div
                      key={plan._id}
                      onClick={() => setSelectedPlanId(plan._id)}
                      className={`border rounded-lg cursor-pointer transition-all ${isSelected
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center justify-between p-3 sm:p-4">
                        <div className="flex items-center flex-1 min-w-0">
                          <input
                            type="radio"
                            name="emi"
                            className="mr-2 sm:mr-3 shrink-0"
                            checked={isSelected}
                            onChange={() => setSelectedPlanId(plan._id)}
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-sm sm:text-base">
                              ₹{plan.calculatedMonthlyAmount.toLocaleString()} x {plan.tenureMonths} months
                            </div>
                            <div className="text-xs text-gray-500">
                              Total: ₹{totalPayable.toLocaleString()}
                              {totalInterest > 0 && (
                                <span className="ml-2">
                                  (Interest: ₹{totalInterest.toLocaleString()})
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 ml-2 text-right">
                          {isNoEMI ? (
                            <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                              NO EMI
                            </div>
                          ) : (
                            <div className="text-xs sm:text-sm text-gray-500">
                              {plan.interestAPR}% per month
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expanded details when selected */}
                      {isSelected && (
                        <div className="border-t bg-teal-25 px-3 sm:px-4 py-2">
                          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                            <div>
                              <span className="font-medium">Finance Amount:</span>
                              <br />₹{getFinanceAmount().toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">Processing Fee:</span>
                              <br />₹0 (Waived)
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-gray-500 mt-2 italic">
                EMIs starting 3rd Dec • No hidden charges • Easy approval
              </p>

              {/* Cost comparison */}
              {selectedPlan && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Cost Comparison</h4>
                  <div className="space-y-1 text-xs text-blue-800">
                    <div className="flex justify-between">
                      <span>Pay Full Amount Today:</span>
                      <span>₹{selectedVariant.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pay with EMI (Total):</span>
                      <span>₹{(selectedPlan.calculatedMonthlyAmount * selectedPlan.tenureMonths + downpayment).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>
                        {selectedPlan.interestAPR === 0 ? 'You Save:' : 'Additional Cost:'}
                      </span>
                      <span className={selectedPlan.interestAPR === 0 ? 'text-green-600' : 'text-orange-600'}>
                        ₹{Math.abs((selectedPlan.calculatedMonthlyAmount * selectedPlan.tenureMonths + downpayment) - selectedVariant.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buy button */}
            <button
              onClick={() => {
                if (!selectedPlanId) return alert("Please select an EMI plan");
                const totalPayable = selectedPlan!.calculatedMonthlyAmount * selectedPlan!.tenureMonths + downpayment;
                const totalInterest = totalPayable - selectedVariant.price;

                alert(
                  `Order Summary:\n\n` +
                  `Product: ${currentData.product!.name} (${selectedVariant.name})\n` +
                  `Price: ₹${selectedVariant.price.toLocaleString()}\n\n` +
                  `Downpayment: ₹${downpayment.toLocaleString()}\n` +
                  `Finance Amount: ₹${getFinanceAmount().toLocaleString()}\n\n` +
                  `EMI Plan: ${selectedPlan!.tenureMonths} months @ ${selectedPlan!.interestAPR}%\n` +
                  `Monthly EMI: ₹${selectedPlan!.calculatedMonthlyAmount.toLocaleString()}\n` +
                  `Total Payable: ₹${totalPayable.toLocaleString()}\n` +
                  `Total Interest: ₹${totalInterest.toLocaleString()}\n\n` +
                  `Ready to proceed with this plan?`
                );
              }}
              className="w-full bg-teal-600 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!selectedPlanId || getFinanceAmount() <= 0}
            >
              {selectedPlan ? (
                <>Buy on {selectedPlan.tenureMonths} months EMI - ₹{selectedPlan.calculatedMonthlyAmount.toLocaleString()}/month</>
              ) : (
                'Select EMI Plan'
              )}
            </button>

            <p className="text-xs text-gray-500 mt-2">*Deal starts payment per credit/debit order value</p>
          </div>
        </div>
      </div>
    </div>
  );
}