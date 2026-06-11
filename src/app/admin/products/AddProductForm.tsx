"use client";

import { useState } from "react";
import { createProduct } from "./actions";

type Gender = "men" | "women" | "unisex";

export default function AddProductForm() {
  const [gender, setGender] = useState<Gender>("unisex");
  const [image, setImage] = useState<string>("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form
      action={async (formData) => {
        formData.append("gender", gender);
        formData.append("image", image);
        await createProduct(formData);
      }}
      className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold">افزودن محصول جدید</h2>

      {/* Name */}
      <input
        name="name"
        placeholder="نام محصول"
        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
      />

      {/* Price + Stock */}
      <div className="grid grid-cols-2 gap-3">
        <input
          name="price"
          placeholder="قیمت"
          className="border rounded-xl px-3 py-2"
        />

        <input
          name="stock"
          placeholder="موجودی"
          className="border rounded-xl px-3 py-2"
        />
      </div>

      {/* Brand */}
      <input
        name="brand"
        placeholder="برند"
        className="w-full border rounded-xl px-3 py-2"
      />

      {/* Gender Switch */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">مناسب برای</p>

        <div className="flex gap-2">
          {(["men", "women", "unisex"] as Gender[]).map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => setGender(g)}
              className={`px-4 py-2 rounded-xl border text-sm transition ${
                gender === g
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {g === "men" && "مردانه"}
              {g === "women" && "زنانه"}
              {g === "unisex" && "یونی‌سکس"}
            </button>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">تصویر محصول</p>

        <input type="file" accept="image/*" onChange={handleImage} />

        {image && (
          <img
            src={image}
            className="w-24 h-24 object-cover rounded-xl border"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90"
      >
        افزودن محصول
      </button>
    </form>
  );
}
