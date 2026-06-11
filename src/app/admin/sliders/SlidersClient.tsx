"use client";

import { useState } from "react";
import { createSlider, updateSlider, deleteSlider } from "./actions";

type Slider = {
  id: string;
  image: string | null;
  order: number;
  productId: string;
  text: string | null;
  active: boolean;
};

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  brand: string;
  gender: string;
  image: string | null;
};

export default function SlidersClient({
  Sliders,
  Products,
}: {
  Sliders: Slider[];
  Products: Product[];
}) {
  const [editing, setEditing] = useState<Slider | null>(null);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    id: "",
    productId: "",
    text: "",
    image: "",
    order: 0,
  });

  function resetForm() {
    setForm({
      id: "",
      productId: "",
      text: "",
      image: "",
      order: 0,
    });
  }

  function openEdit(slider: Slider) {
    setEditing(slider);
    setForm({
      id: slider.id,
      productId: slider.productId,
      text: slider.text || "",
      image: slider.image || "",
      order: slider.order,
    });
  }

  async function handleCreate() {
    const fd = new FormData();
    fd.append("productId", form.productId);
    fd.append("text", form.text);
    fd.append("image", form.image);
    fd.append("order", String(form.order));

    await createSlider(fd);
    setOpen(false);
    resetForm();
  }

  async function handleUpdate() {
    const fd = new FormData();
    fd.append("id", form.id);
    fd.append("productId", form.productId);
    fd.append("text", form.text);
    fd.append("image", form.image);
    fd.append("order", String(form.order));

    await updateSlider(fd);
    setEditing(null);
    resetForm();
  }

  async function handleDelete(id: string) {
    await deleteSlider(id);
  }

  return (
    <div className="min-h-screen p-6 bg-zinc-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">اسلایدرها</h1>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-black text-white rounded-xl"
          >
            افزودن اسلاید
          </button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-5">
          {Sliders.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border overflow-hidden shadow-sm"
            >
              <div
                className="h-40 bg-zinc-100 cursor-pointer"
                onClick={() => openEdit(s)}
              >
                {s.image ? (
                  <img src={s.image} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    بدون تصویر
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <p className="text-sm font-medium">{s.text || "بدون متن"}</p>

                <p className="text-xs text-gray-500">ترتیب: {s.order}</p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="text-xs px-3 py-1 border rounded-lg"
                  >
                    ویرایش
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-xs px-3 py-1 border rounded-lg text-red-500"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CREATE MODAL */}
        {open && (
          <Modal onClose={() => setOpen(false)}>
            <SliderForm
              form={form}
              setForm={setForm}
              products={Products}
              onSubmit={handleCreate}
              title="افزودن اسلاید"
            />
          </Modal>
        )}

        {/* EDIT MODAL */}
        {editing && (
          <Modal onClose={() => setEditing(null)}>
            <SliderForm
              form={form}
              setForm={setForm}
              products={Products}
              onSubmit={handleUpdate}
              title="ویرایش اسلاید"
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

/* ---------------- MODAL ---------------- */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl p-5"
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------- FORM ---------------- */

function SliderForm({ form, setForm, products, onSubmit, title }: any) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold">{title}</h2>

      {/* PRODUCT SELECT */}
      <select
        value={form.productId}
        onChange={(e) => setForm({ ...form, productId: e.target.value })}
        className="w-full border rounded-xl p-2"
      >
        <option value="">انتخاب محصول</option>
        {products.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        placeholder="متن"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
        className="w-full border rounded-xl p-2"
      />

      <input
        placeholder="عکس (URL)"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="w-full border rounded-xl p-2"
      />

      <input
        type="number"
        placeholder="ترتیب"
        value={form.order}
        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
        className="w-full border rounded-xl p-2"
      />

      <button
        onClick={onSubmit}
        className="w-full bg-black text-white py-2 rounded-xl"
      >
        ذخیره
      </button>
    </div>
  );
}
