import { create } from "zustand";

// 1. Describe what our store's data looks like using TypeScript
type CheckoutStep = "review" | "shipping" | "payment";

type ShippingData = {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  zipCode: string;
  address: string;
};

type CheckoutStore = {
  currentStep: CheckoutStep;
  shipping: ShippingData;
  setStep: (step: CheckoutStep) => void;
  updateShipping: (fields: Partial<ShippingData>) => void;
  resetCheckout: () => void;
};

// 2. Build the actual store container
export const useCheckoutStore = create<CheckoutStore>((set) => ({
  // Baseline initial state
  currentStep: "review",
  shipping: {
    fullName: "",
    phone: "",
    province: "",
    city: "",
    zipCode: "",
    address: "",
  },

  // Functions (actions) to change the values from any component
  setStep: (step) => set({ currentStep: step }),

  updateShipping: (fields) =>
    set((state) => ({
      shipping: { ...state.shipping, ...fields },
    })),

  resetCheckout: () =>
    set({
      currentStep: "review",
      shipping: {
        fullName: "",
        phone: "",
        province: "",
        city: "",
        zipCode: "",
        address: "",
      },
    }),
}));
