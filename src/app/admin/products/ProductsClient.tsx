"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBox,
  FiPlus,
  FiSearch,
  FiX,
  FiUpload,
  FiCheck,
} from "react-icons/fi";
import { createProduct, updateProduct } from "./actions";

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
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  return (
    <div className="space-y-8 w-full max-w-6xl" dir="rtl">
      {/* ───── HEADER SECTOR ───── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--accent)]/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[var(--accent)] text-xs font-medium uppercase tracking-wider">
            <FiBox className="w-3.5 h-3.5" />
            <span>Inventory Management</span>
          </div>
          <h1 className="text-2xl font-light tracking-tight text-[var(--foreground)]">
            آرشیو جامع محصولات
          </h1>
          <p className="text-xs text-[var(--foreground)]/40 font-light">
            کنترل و ویرایش عطرها، سطح موجودی و دکانت‌های استودیو ROYAL.
          </p>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center justify-center gap-2 self-start sm:self-center px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--primary)] text-sm font-medium hover:bg-[var(--accent)]/90 active:scale-[0.98] transition-all duration-300 shadow-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>افزودن عطر جدید</span>
        </button>
      </div>

      {/* ───── FILTER/SEARCH CONTROL ───── */}
      <div className="relative max-w-md">
        <span className="absolute right-4 top-1.5 bottom-0 flex items-center justify-center text-[var(--foreground)]/30">
          <FiSearch className="w-4 h-4" />
        </span>
        <input
          placeholder="جستجوی عنوان عطر یا نام برند..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl pr-11 pl-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all placeholder:text-[var(--foreground)]/30 text-[var(--foreground)] font-light"
        />
      </div>

      {/* ───── PRODUCT DATA GRID ───── */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-[var(--accent)]/20 rounded-2xl p-12 text-center text-sm text-[var(--foreground)]/40 font-light">
          هیچ رایحه‌ای منطبق با جستجوی شما یافت نشد.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              className="group bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer hover:border-[var(--accent)]/50 transition-all duration-300 flex flex-col text-right"
            >
              {/* Image Box */}
              <div className="aspect-[4/5] bg-[var(--secondary)]/30 overflow-hidden relative border-b border-[var(--accent)]/10">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--foreground)]/20 text-xs font-light">
                    فاقد تصویر آرشیو
                  </div>
                )}
                <div className="absolute left-3 top-3 bg-[var(--background)]/80 backdrop-blur-md border border-[var(--accent)]/20 text-[10px] px-2 py-0.5 rounded-md text-[var(--foreground)]/60 font-light">
                  {p.gender === "men"
                    ? "مردانه"
                    : p.gender === "women"
                      ? "زنانه"
                      : "یونیسکس"}
                </div>
              </div>

              {/* Data Details Block */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-wider text-[var(--accent)] font-medium uppercase">
                    {p.brand}
                  </span>
                  <h2 className="text-sm font-medium text-[var(--foreground)] line-clamp-1">
                    {p.name}
                  </h2>
                </div>

                <div className="flex items-end justify-between border-t border-[var(--accent)]/5 pt-3">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {p.price.toLocaleString("fa-IR")}{" "}
                    <span className="text-[10px] text-[var(--foreground)]/40 font-light">
                      تومان
                    </span>
                  </span>
                  <span
                    className={`text-[10px] font-light ${p.stock <= 2 ? "text-rose-400" : "text-[var(--foreground)]/40"}`}
                  >
                    {p.stock === 0
                      ? "اتمام انبار"
                      : `${p.stock.toLocaleString("fa-IR")} عدد`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ───── INTERACTIVE MODALS BOUNDARY ───── */}
      <AnimatePresence mode="wait">
        {/* ADD PRODUCT MODAL */}
        {addOpen && (
          <Modal key="add-modal" onClose={() => setAddOpen(false)}>
            <AddProductForm onClose={() => setAddOpen(false)} />
          </Modal>
        )}

        {/* EDIT PRODUCT MODAL */}
        {selected && (
          <Modal key="edit-modal" onClose={() => setSelected(null)}>
            <EditProductForm
              product={selected}
              onClose={() => setSelected(null)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───── EXPORTED REUSABLE WORKSPACE MODAL ───── */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-[var(--background)] border border-[var(--accent)]/30 rounded-2xl p-6 w-full max-w-lg relative shadow-xl z-10 max-h-[90vh] overflow-y-auto antialiased"
      >
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-[var(--foreground)]/40 hover:text-[var(--foreground)] transition-colors p-1"
        >
          <FiX className="w-4 h-4" />
        </button>
        {children}
      </motion.div>
    </div>
  );
}

/* ───── INTERNAL ADD PRODUCT FORM ───── */
function AddProductForm({ onClose }: { onClose: () => void }) {
  const [gender, setGender] = useState("unisex");
  const [season, setSeason] = useState("spring");
  // Holds local URL object string purely for visual dashboard previews
  const [preview, setPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create an instant runtime memory URL link for the img source layout
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        formData.append("gender", gender);
        formData.append("season", season);

        await createProduct(formData);
        setIsSubmitting(false);
        onClose();
        window.location.reload();
      }}
      className="space-y-4 text-right"
    >
      <div>
        <h2 className="text-lg font-light text-[var(--foreground)] tracking-tight">
          تنظیم شناسه عطر جدید
        </h2>
        <p className="text-[11px] text-[var(--foreground)]/40 font-light mt-0.5">
          مشخصات ساختاری رایحه را به طور دقیق وارد کنید.
        </p>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          نام محصول
        </label>
        <input
          required
          name="name"
          placeholder="مانند: عود اسپاهان"
          className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          توضیحات و بیانیه بویایی
        </label>
        <textarea
          required
          name="description"
          placeholder="بیانیه حسی رایحه، ساختار نت‌ها و هویت بویایی عطر..."
          className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] min-h-24 max-h-40 text-[var(--foreground)] font-light resize-y"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-[var(--foreground)]/50 font-light">
            قیمت (تومان)
          </label>
          <input
            required
            type="number"
            name="price"
            placeholder="قیمت رقم خام"
            className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-[var(--foreground)]/50 font-light">
            موجودی انبار
          </label>
          <input
            required
            type="number"
            name="stock"
            placeholder="تعداد عددی"
            className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-[var(--foreground)]/50 font-light">
            برند
          </label>
          <input
            required
            name="brand"
            placeholder="مانند: Dior"
            className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-[var(--foreground)]/50 font-light">
            حجم بطری (میلی‌لیتر)
          </label>
          <input
            required
            type="number"
            name="volumeMl"
            placeholder="مانند: ۱۰۰"
            className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          طیف مخاطبین هدف
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "unisex", label: "یونی‌سکس" },
            { id: "men", label: "مردانه" },
            { id: "women", label: "زنانه" },
          ].map((g) => (
            <button
              type="button"
              key={g.id}
              onClick={() => setGender(g.id)}
              className={`py-2 border text-xs rounded-xl transition-all duration-300 font-light ${
                gender === g.id
                  ? "bg-[var(--accent)] text-[var(--primary)] border-[var(--accent)]"
                  : "bg-[var(--secondary)]/10 border-[var(--accent)]/20 text-[var(--foreground)]/60 hover:bg-[var(--secondary)]/30"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          فصل بویایی توصیه شده
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: "spring", label: "بهار" },
            { id: "summer", label: "تابستان" },
            { id: "autumn", label: "پاییز" },
            { id: "winter", label: "زمستان" },
          ].map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setSeason(s.id)}
              className={`py-2 border text-xs rounded-xl transition-all duration-300 font-light ${
                season === s.id
                  ? "bg-[var(--accent)] text-[var(--primary)] border-[var(--accent)]"
                  : "bg-[var(--secondary)]/10 border-[var(--accent)]/20 text-[var(--foreground)]/60 hover:bg-[var(--secondary)]/30"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          تصویر آرشیوی محصول
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center justify-center gap-2 px-4 py-2 border border-[var(--accent)]/30 rounded-xl bg-[var(--secondary)]/10 hover:bg-[var(--secondary)]/30 text-xs text-[var(--foreground)]/70 cursor-pointer transition-colors font-light">
            <FiUpload className="w-3.5 h-3.5" />
            <span>بارگذاری تصویر...</span>
            <input
              required
              type="file"
              name="image" // CRUCIAL attribute flag for native FormData compilation
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-12 h-12 object-cover rounded-lg border border-[var(--accent)]/20 shadow-sm"
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 bg-[var(--foreground)] text-[var(--background)] py-2.5 rounded-xl text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {isSubmitting ? "در حال ثبت اطلاعات..." : "ذخیره و ثبت نهایی عطر"}
      </button>
    </form>
  );
}

/* ───── INTERNAL EDIT PRODUCT FORM ───── */
function EditProductForm({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [gender, setGender] = useState(product.gender || "unisex");
  const [season, setSeason] = useState(product.season || "spring");
  // Pre-populate with database image link string if available for preview layout
  const [preview, setPreview] = useState<string>(product.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        formData.append("gender", gender);
        formData.append("season", season);

        await updateProduct(formData);
        setIsSubmitting(false);
        onClose();
        window.location.reload();
      }}
      className="space-y-4 text-right antialiased"
    >
      <div>
        <h2 className="text-lg font-light text-[var(--foreground)] tracking-tight">
          ویرایش شناسنامه عطر
        </h2>
        <p className="text-[11px] text-[var(--foreground)]/40 font-light mt-0.5">
          اصلاح مشخصات ساختاری، موجودی انبار و بیانیه بویایی رایحه.
        </p>
      </div>

      <input type="hidden" name="id" value={product.id} />

      <div className="space-y-1">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          نام محصول
        </label>
        <input
          required
          name="name"
          defaultValue={product.name}
          className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          توضیحات و بیانیه بویایی
        </label>
        <textarea
          required
          name="description"
          defaultValue={product.description || ""}
          className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] min-h-24 max-h-40 text-[var(--foreground)] font-light resize-y"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-[var(--foreground)]/50 font-light">
            قیمت (تومان)
          </label>
          <input
            required
            type="number"
            name="price"
            defaultValue={product.price}
            className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-[var(--foreground)]/50 font-light">
            موجودی انبار
          </label>
          <input
            required
            type="number"
            name="stock"
            defaultValue={product.stock}
            className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-[var(--foreground)]/50 font-light">
            برند
          </label>
          <input
            required
            name="brand"
            defaultValue={product.brand}
            className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-[var(--foreground)]/50 font-light">
            حجم بطری (میلی‌لیتر)
          </label>
          <input
            required
            type="number"
            name="volumeMl"
            defaultValue={product.volumeMl || 100}
            className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          طیف مخاطبین هدف
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "unisex", label: "یونی‌سکس" },
            { id: "men", label: "مردانه" },
            { id: "women", label: "زنانه" },
          ].map((g) => (
            <button
              type="button"
              key={g.id}
              onClick={() => setGender(g.id)}
              className={`py-2 border text-xs rounded-xl transition-all duration-300 font-light ${
                gender === g.id
                  ? "bg-[var(--accent)] text-[var(--primary)] border-[var(--accent)]"
                  : "bg-[var(--secondary)]/10 border-[var(--accent)]/20 text-[var(--foreground)]/60 hover:bg-[var(--secondary)]/30"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          فصل بویایی توصیه شده
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: "spring", label: "بهار" },
            { id: "summer", label: "تابستان" },
            { id: "autumn", label: "پاییز" },
            { id: "winter", label: "زمستان" },
          ].map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setSeason(s.id)}
              className={`py-2 border text-xs rounded-xl transition-all duration-300 font-light ${
                season === s.id
                  ? "bg-[var(--accent)] text-[var(--primary)] border-[var(--accent)]"
                  : "bg-[var(--secondary)]/10 border-[var(--accent)]/20 text-[var(--foreground)]/60 hover:bg-[var(--secondary)]/30"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          تصویر آرشیوی محصول
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center justify-center gap-2 px-4 py-2 border border-[var(--accent)]/30 rounded-xl bg-[var(--secondary)]/10 hover:bg-[var(--secondary)]/30 text-xs text-[var(--foreground)]/70 cursor-pointer transition-colors font-light">
            <FiUpload className="w-3.5 h-3.5" />
            <span>بارگذاری تصویر جدید...</span>
            <input
              type="file"
              name="image" // CRUCIAL attribute flag for native FormData compilation
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-12 h-12 object-cover rounded-lg border border-[var(--accent)]/20 shadow-sm"
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 bg-[var(--foreground)] text-[var(--background)] py-2.5 rounded-xl text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <FiCheck className="w-4 h-4" />
        <span>
          {isSubmitting ? "در حال به‌روزرسانی..." : "ذخیره تغییرات شناسنامه"}
        </span>
      </button>
    </form>
  );
}
