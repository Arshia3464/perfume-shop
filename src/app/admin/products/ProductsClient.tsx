"use client";

import { useMemo, useState } from "react";
import { createProduct } from "./actions";
import { EditProductForm } from "./EditProductForm";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  brand: string;
  gender: string;
  image: string | null;
  description?: string | null;
  season?: string | null;
  volumeMl?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export default function ProductsClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  return (
    <div className="min-h-screen w-full p-6" dir="rtl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">محصولات</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت محصولات فروشگاه</p>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
        >
          افزودن محصول
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          placeholder="جستجوی محصول..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/5"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition text-right"
          >
            {/* IMAGE */}
            <div className="h-48 bg-gray-100 overflow-hidden">
              {p.image ? (
                <img
                  src={p.image ?? undefined}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  بدون تصویر
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              <h2 className="font-medium line-clamp-1">{p.name}</h2>

              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span>{p.brand}</span>
                <span>•</span>
                <span>
                  {p.gender === "men"
                    ? "مردانه"
                    : p.gender === "women"
                      ? "زنانه"
                      : "یونی‌سکس"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-sm">
                  {p.price.toLocaleString()} تومان
                </span>
                <span className="text-xs text-gray-400">{p.stock} عدد</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ADD MODAL */}
      {addOpen && (
        <Modal onClose={() => setAddOpen(false)}>
          <AddProductForm />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <EditProductForm product={selected} />
        </Modal>
      )}
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function AddProductForm() {
  const [gender, setGender] = useState("unisex");
  const [image, setImage] = useState("");

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
        window.location.reload();
      }}
      className="space-y-4"
    >
      <h2 className="text-lg font-semibold">افزودن محصول</h2>

      <input
        name="name"
        placeholder="نام محصول"
        className="w-full border rounded-xl px-3 py-2"
      />

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

      <input
        name="brand"
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
            className={`px-4 py-2 rounded-xl border text-sm ${
              gender === g ? "bg-black text-white" : "bg-white"
            }`}
          >
            {g === "men" ? "مردانه" : g === "women" ? "زنانه" : "یونی‌سکس"}
          </button>
        ))}
      </div>

      {/* IMAGE */}
      <div className="space-y-2">
        <input type="file" accept="image/*" onChange={handleImage} />
        {image && (
          <img
            src={image}
            className="w-24 h-24 rounded-xl object-cover border"
          />
        )}
      </div>

      <button className="w-full bg-black text-white py-3 rounded-xl">
        ذخیره محصول
      </button>
    </form>
  );
}
