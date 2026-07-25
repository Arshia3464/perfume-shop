"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoBagHandleOutline,
  IoLocationOutline,
  IoCardOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { updateCartQuantity, removeFromCart } from "@/app/cart/actions";
import { createCashOnDeliveryOrder } from "@/app/actions/order"; // Our order creation action
import { useCheckoutStore } from "./useCheckoutStore";

// Luxury Storefront Geographic Iran Dataset Map
const IRAN_REGIONS: Record<string, string[]> = {
  تهران: ["تهران", "تجریش", "ری", "اسلامشهر", "شهریار", "پرند", "دماوند"],
  اصفهان: ["اصفهان", "کاشان", "خمینی‌شهر", "نجف‌آباد", "شاهین‌شهر", "فولادشهر"],
  فارس: ["شیراز", "مرودشت", "جهرم", "فسا", "کازرون", "لارستان"],
  "خراسان رضوی": ["مشهد", "نیشابور", "سبزوار", "تربت حیدریه", "قوچان"],
  مازندران: ["ساری", "بابل", "آمل", "قائم‌شهر", "تنکابن", "رامسر", "نوشهر"],
  گیلان: ["رشت", "انزلی", "لاهیجان", "لنگرود", "تالش", "آستارا"],
  "آذربایجان شرقی": ["تبریز", "مراغه", "مرند", "میانه", "اهر", "بناب"],
  یزد: ["یزد", "میبد", "اردکان", "بافق", "ابرکوه"],
};

type CartItem = {
  id: string;
  quantity: number;
  productId: string | null;
  name: string;
  price: number;
  image: string | null;
  brand: string;
};

type Props = {
  initialItems: CartItem[];
  userId: string;
  BASE_URL: string | undefined;
};

export default function CartPageClient({
  initialItems,
  userId,
  BASE_URL,
}: Props) {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isPending, startTransition] = useTransition();
  const [orderLoading, setOrderLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pulling step indicators and buffered logistics data cleanly from Zustand memory
  const currentStep = useCheckoutStore((state) => state.currentStep);
  const setStep = useCheckoutStore((state) => state.setStep);
  const shipping = useCheckoutStore((state) => state.shipping);
  const updateShipping = useCheckoutStore((state) => state.updateShipping);
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQtyAdjust = (
    itemId: string,
    currentQty: number,
    delta: number,
  ) => {
    const targetQty = currentQty + delta;
    if (targetQty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: targetQty } : i)),
      );
    }
    startTransition(async () => {
      await updateCartQuantity(itemId, targetQty);
    });
  };

  const handleItemRemoval = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    startTransition(async () => {
      await removeFromCart(itemId);
    });
  };

  // Submit flow handling for Cash on Delivery
  const handleFinalOrderSubmit = async () => {
    setErrorMessage("");

    // Simple validation guard clauses
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.province ||
      !shipping.city ||
      !shipping.address ||
      !shipping.zipCode
    ) {
      setErrorMessage("تکمیل تمام فیلدهای اطلاعات ارسال الزامی است.");
      setStep("shipping");
      return;
    }

    setOrderLoading(true);

    const formattedCartItems = items.map((i) => ({
      id: i.productId ?? "",
      name: i.name,
      brand: i.brand,
      image: i.image ?? "",
      volumeMl: null, // Fallback if not populated on item layout schemas yet
      price: i.price,
      quantity: i.quantity,
    }));

    const result = await createCashOnDeliveryOrder({
      customerName: shipping.fullName,
      customerPhone: shipping.phone,
      province: shipping.province,
      city: shipping.city,
      shippingAddress: shipping.address,
      postalCode: shipping.zipCode,
      cartItems: formattedCartItems,
    });

    setOrderLoading(false);

    if (result.success) {
      resetCheckout(); // Wipes Zustand form memory
      setItems([]); // Local client state update
      router.push(`/checkout/success?id=${result.orderId}`); // Take them directly to a premium receipt route
    } else {
      setErrorMessage(result.error ?? "خطایی رخ داد.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Stepper Progress Bar Timeline Header */}
      <div className="border-b border-accent/20 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            سبد خرید فعال شما
          </h1>
          <p className="text-xs text-primary/60 mt-1">
            مدیریت و نهایی‌سازی گام‌به‌گام محموله سفارشی ROYAL
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium">
          <button
            onClick={() => setStep("review")}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${currentStep === "review" ? "bg-primary text-background border-primary" : "bg-secondary/40 border-accent/10 text-primary/60"}`}
          >
            ۰۱. بررسی سبد
          </button>
          <span className="text-primary/20">←</span>
          <button
            disabled={items.length === 0}
            onClick={() => setStep("shipping")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${items.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${currentStep === "shipping" ? "bg-primary text-background border-primary" : "bg-secondary/40 border-accent/10 text-primary/60"}`}
          >
            ۰۲. اطلاعات ارسال
          </button>
          <span className="text-primary/20">←</span>
          <button
            disabled={items.length === 0}
            onClick={() => setStep("payment")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${items.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${currentStep === "payment" ? "bg-primary text-background border-primary" : "bg-secondary/40 border-accent/10 text-primary/60"}`}
          >
            ۰۳. پرداخت و تایید
          </button>
        </div>
      </div>

      {/* Grid Layout Layout Workspace Splitter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* RIGHT COLUMN: CONTENT INPUT CHASSIS */}
        <div className="lg:col-span-8 space-y-4">
          {/* Global error feedback pane */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl font-medium">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: CART RECONCILIATION WINDOW */}
          {currentStep === "review" && (
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="py-24 text-center border border-dashed border-accent/20 rounded-2xl bg-secondary/10 space-y-3">
                  <IoBagHandleOutline className="w-8 h-8 mx-auto text-primary/30" />
                  <p className="text-sm text-primary/40">
                    هیچ محصولی در سبد خرید شما یافت نشد.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl bg-secondary/20 border border-accent/10 items-center transition-all hover:border-accent/20"
                  >
                    <div className="relative w-20 h-20 bg-secondary rounded-lg overflow-hidden shrink-0 border border-accent/5">
                      {item.image ? (
                        <img
                          src={`${BASE_URL}/${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary/40" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <span className="block text-[10px] uppercase tracking-widest text-primary/40 font-medium">
                        {item.brand}
                      </span>
                      <h3 className="text-sm font-medium text-primary truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-primary/70 font-medium mt-1">
                        {(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
                        تومان
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between h-20">
                      <div className="flex items-center border border-accent/20 rounded-md bg-background overflow-hidden">
                        <button
                          disabled={isPending || orderLoading}
                          onClick={() =>
                            handleQtyAdjust(item.id, item.quantity, -1)
                          }
                          className="p-1 hover:bg-secondary text-primary/70 transition-colors cursor-pointer disabled:opacity-40"
                        >
                          <IoRemoveOutline className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs px-2 w-7 text-center select-none font-medium">
                          {item.quantity.toLocaleString("fa-IR")}
                        </span>
                        <button
                          disabled={isPending || orderLoading}
                          onClick={() =>
                            handleQtyAdjust(item.id, item.quantity, 1)
                          }
                          className="p-1 hover:bg-secondary text-primary/70 transition-colors cursor-pointer disabled:opacity-40"
                        >
                          <IoAddOutline className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        disabled={isPending || orderLoading}
                        onClick={() => handleItemRemoval(item.id)}
                        className="text-primary/40 hover:text-red-700 p-1 transition-colors cursor-pointer disabled:opacity-40"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING LOGISTICS */}
          {currentStep === "shipping" && (
            <div className="bg-secondary/10 border border-accent/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-accent/10 pb-3">
                <IoLocationOutline className="w-5 h-5 text-accent" />
                <h2 className="text-sm font-medium">
                  مشخصات گیرنده و جزئیات پستی گالری لوکس ROYAL
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-primary/60 font-medium">
                    نام و نام خانوادگی تحویل‌گیرنده
                  </label>
                  <input
                    type="text"
                    value={shipping.fullName}
                    onChange={(e) =>
                      updateShipping({ fullName: e.target.value })
                    }
                    placeholder="مثال: عرشیا احمدی"
                    className="w-full p-3 bg-background text-xs border border-accent/10 rounded-xl focus:outline-none focus:border-accent/40 text-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-primary/60 font-medium">
                    شماره تلفن همراه (جهت هماهنگی ارسال)
                  </label>
                  <input
                    type="tel"
                    value={shipping.phone}
                    onChange={(e) => updateShipping({ phone: e.target.value })}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full p-3 bg-background text-xs border border-accent/10 rounded-xl focus:outline-none focus:border-accent/40 text-left text-primary"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-primary/60 font-medium">
                    استان
                  </label>
                  <select
                    value={shipping.province}
                    onChange={(e) =>
                      updateShipping({ province: e.target.value, city: "" })
                    }
                    className="w-full p-3 bg-background text-xs border border-accent/10 rounded-xl focus:outline-none focus:border-accent/40 cursor-pointer text-primary"
                  >
                    <option value="">انتخاب استان...</option>
                    {Object.keys(IRAN_REGIONS).map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-primary/60 font-medium">
                    شهر
                  </label>
                  <select
                    disabled={!shipping.province}
                    value={shipping.city}
                    onChange={(e) => updateShipping({ city: e.target.value })}
                    className="w-full p-3 bg-background text-xs border border-accent/10 rounded-xl focus:outline-none focus:border-accent/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-primary"
                  >
                    <option value="">انتخاب شهر...</option>
                    {shipping.province &&
                      IRAN_REGIONS[shipping.province].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] text-primary/60 font-medium">
                    کد پستی ده رقمی
                  </label>
                  <input
                    type="text"
                    value={shipping.zipCode}
                    onChange={(e) =>
                      updateShipping({ zipCode: e.target.value })
                    }
                    placeholder="مثال: ۱۴۵۷۸۹۶۳۲۱"
                    className="w-full p-3 bg-background text-xs border border-accent/10 rounded-xl focus:outline-none focus:border-accent/40 text-left text-primary"
                    dir="ltr"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[11px] text-primary/60 font-medium">
                    نشانی دقیق پستی محل تحویل محموله
                  </label>
                  <textarea
                    rows={3}
                    value={shipping.address}
                    onChange={(e) =>
                      updateShipping({ address: e.target.value })
                    }
                    placeholder="خیابان ولیعصر، نرسیده به میدان ونک، کوچه..."
                    className="w-full p-3 bg-background text-xs border border-accent/10 rounded-xl focus:outline-none focus:border-accent/40 resize-none text-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CASH ON DELIVERY METHOD VIEW */}
          {currentStep === "payment" && (
            <div className="bg-secondary/10 border border-accent/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-accent/10 pb-3">
                <IoCardOutline className="w-5 h-5 text-accent" />
                <h2 className="text-sm font-medium">انتخاب شیوه پرداخت</h2>
              </div>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-xl border border-accent/30 bg-background cursor-pointer hover:border-accent/50 transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="gateway"
                      defaultChecked
                      className="accent-primary"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold block text-primary">
                        پرداخت درب منزل (Cash on Delivery)
                      </span>
                      <span className="text-[11px] text-muted-foreground block">
                        تسویه حساب وجه نهایی پس از تحویل، رویت و تایید اصالت
                        فیزیکی عطر
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-accent/10 px-2 py-0.5 rounded-sm text-accent font-bold">
                    فعال
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* LEFT COLUMN: RECEIPT TOTAL DETAILS */}
        {items.length > 0 && (
          <div className="lg:col-span-4 bg-secondary/30 border border-accent/20 rounded-2xl p-6 lg:sticky lg:top-8 space-y-6">
            <h2 className="text-sm font-medium border-b border-accent/10 pb-3">
              خلاصه صورت‌حساب
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-primary/70">
                <span>تعداد کل اقلام انتخابی</span>
                <span>{totalQuantity.toLocaleString("fa-IR")} عدد</span>
              </div>
              <div className="flex justify-between text-xs text-primary/70">
                <span>هزینه لجیستیک و بسته‌بندی نفیس</span>
                <span className="text-emerald-700 font-medium">رایگان</span>
              </div>

              <div className="border-t border-accent/10 pt-4 mt-2 flex justify-between items-baseline">
                <span className="text-sm font-medium">جمع کل نهایی سفارش</span>
                <span className="text-lg font-bold text-primary">
                  {subtotal.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            {/* Step triggers with mutation actions hooked smoothly */}
            {currentStep === "review" && (
              <button
                onClick={() => setStep("shipping")}
                className="w-full py-3 bg-primary text-background text-xs font-medium rounded-xl hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer"
              >
                تأیید و ورود به مرحله اطلاعات ارسال
              </button>
            )}
            {currentStep === "shipping" && (
              <button
                onClick={() => setStep("payment")}
                className="w-full py-3 bg-primary text-background text-xs font-medium rounded-xl hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer"
              >
                ثبت اطلاعات و رفتن به مرحله تایید سفارش
              </button>
            )}
            {currentStep === "payment" && (
              <button
                onClick={handleFinalOrderSubmit}
                disabled={orderLoading}
                className="w-full py-3 bg-primary text-background text-xs font-bold rounded-xl hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer gap-2 disabled:opacity-50"
              >
                <IoCheckmarkCircleOutline className="w-4 h-4" />
                {orderLoading
                  ? "در حال ثبت نهایی..."
                  : "تایید نهایی و ثبت پرداخت در محل"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
