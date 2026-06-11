import { useState } from "react";
import { updateProduct } from "./actions";

export function EditProductForm({ product }: { product: any }) {
  const [gender, setGender] = useState(product.gender);

  const [image, setImage] = useState(product.image || "");

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

        await updateProduct(formData);

        window.location.reload();
      }}
      className="space-y-4"
    >
      <h2 className="text-lg font-semibold">ویرایش محصول</h2>

      <input type="hidden" name="id" value={product.id} />

      <input
        name="name"
        defaultValue={product.name}
        placeholder="نام محصول"
        className="w-full border rounded-xl px-3 py-2"
      />

      <textarea
        name="description"
        defaultValue=""
        placeholder="توضیحات"
        className="w-full border rounded-xl px-3 py-2 min-h-28"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          name="price"
          type="number"
          defaultValue={product.price}
          placeholder="قیمت"
          className="border rounded-xl px-3 py-2"
        />

        <input
          name="stock"
          type="number"
          defaultValue={product.stock}
          placeholder="موجودی"
          className="border rounded-xl px-3 py-2"
        />
      </div>

      <input
        name="brand"
        defaultValue={product.brand}
        placeholder="برند"
        className="w-full border rounded-xl px-3 py-2"
      />

      {/* GENDER */}
      <div className="flex gap-2">
        {["men", "women", "unisex"].map((g) => (
          <button
            type="button"
            key={g}
            onClick={() => setGender(g)}
            className={`px-4 py-2 rounded-xl border text-sm transition ${
              gender === g ? "bg-black text-white" : "bg-white"
            }`}
          >
            {g === "men" ? "مردانه" : g === "women" ? "زنانه" : "یونی‌سکس"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          name="season"
          placeholder="فصل"
          className="border rounded-xl px-3 py-2"
        />

        <input
          name="volumeMl"
          type="number"
          placeholder="حجم"
          className="border rounded-xl px-3 py-2"
        />
      </div>

      {/* IMAGE */}
      <div className="space-y-3">
        <input type="file" accept="image/*" onChange={handleImage} />

        {image && (
          <img
            src={image ?? undefined}
            className="w-28 h-28 rounded-2xl object-cover border"
          />
        )}
      </div>

      <button className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
        ذخیره تغییرات
      </button>
    </form>
  );
}
