"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSliders,
  FiPlus,
  FiX,
  FiUpload,
  FiCheck,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";
import { createSlider, updateSlider, deleteSlider } from "./actions";
import { useRouter } from "next/navigation";

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

type SliderFormState = {
  id: string;
  productId: string;
  text: string;
  image: string; // Existing URL or placeholder path
  order: number;
};

const defaultForm: SliderFormState = {
  id: "",
  productId: "",
  text: "",
  image: "",
  order: 0,
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
  const [form, setForm] = useState<SliderFormState>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  function resetForm() {
    setForm(defaultForm);
  }

  function openCreate() {
    resetForm();
    setOpen(true);
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

  async function handleCreate(file: File | null) {
    setIsSubmitting(true);
    const fd = new FormData();
    fd.append("productId", form.productId);
    fd.append("text", form.text);
    fd.append("order", String(form.order));

    if (file) {
      fd.append("image", file);
    }

    await createSlider(fd);
    setOpen(false);
    resetForm();
    setIsSubmitting(false);
    router.refresh();
  }

  async function handleUpdate(file: File | null) {
    setIsSubmitting(true);
    const fd = new FormData();
    fd.append("id", form.id);
    fd.append("productId", form.productId);
    fd.append("text", form.text);
    fd.append("order", String(form.order));

    if (file) {
      fd.append("image", file);
    } else {
      fd.append("image", form.image);
    }

    await updateSlider(fd);
    setEditing(null);
    resetForm();
    setIsSubmitting(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (confirm("آیا از حذف این بنر اطمینان دارید؟")) {
      await deleteSlider(id);
      router.refresh();
    }
  }

  const productLookup = useMemo(() => {
    return new Map(Products.map((p) => [p.id, p]));
  }, [Products]);

  return (
    <div className="space-y-8 w-full max-w-6xl" dir="rtl">
      {/* ───── HEADER SECTOR ───── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--accent)]/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[var(--accent)] text-xs font-medium uppercase tracking-wider">
            <FiSliders className="w-3.5 h-3.5" />
            <span>Showcase Editorial Control</span>
          </div>
          <h1 className="text-2xl font-light tracking-tight text-[var(--foreground)]">
            بنرهای اسلایدر اصلی
          </h1>
          <p className="text-xs text-[var(--foreground)]/40 font-light">
            مدیریت، چینش ردیف و بیانیه‌های تصویری ویترین صفحه نخست استودیو
            ROYAL.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 self-start sm:self-center px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--primary)] text-sm font-medium hover:bg-[var(--accent)]/90 active:scale-[0.98] transition-all duration-300 shadow-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>افزودن اسلاید جدید</span>
        </button>
      </div>

      {/* ───── SLIDERS CARD DATA GRID ───── */}
      {Sliders.length === 0 ? (
        <div className="border border-dashed border-[var(--accent)]/20 rounded-2xl p-12 text-center text-sm text-[var(--foreground)]/40 font-light">
          هیچ بنری برای ویترین اصلی تنظیم نشده است.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Sliders.map((s) => {
            const linkedProduct = productLookup.get(s.productId);
            return (
              <div
                key={s.id}
                className="group bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 flex flex-col text-right"
              >
                {/* Visual Banner Screen Aspect */}
                <div
                  className="aspect-[16/9] bg-[var(--secondary)]/30 overflow-hidden relative border-b border-[var(--accent)]/10 cursor-pointer"
                  onClick={() => openEdit(s)}
                >
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.text || "Banner"}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--foreground)]/20 text-xs font-light">
                      فاقد تصویر آرشیو
                    </div>
                  )}
                  <div className="absolute left-3 top-3 bg-[var(--background)]/80 backdrop-blur-md border border-[var(--accent)]/20 text-[10px] px-2.5 py-0.5 rounded-md text-[var(--foreground)]/60 font-mono font-light">
                    اولویت: {s.order.toLocaleString("fa-IR")}
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    {linkedProduct && (
                      <span className="text-[10px] tracking-wider text-[var(--accent)] font-medium uppercase">
                        متصل به: {linkedProduct.brand} — {linkedProduct.name}
                      </span>
                    )}
                    <h2 className="text-sm font-medium text-[var(--foreground)] leading-relaxed line-clamp-2">
                      {s.text || "بدون متن توصیفی"}
                    </h2>
                  </div>

                  {/* Operational Controls CTA */}
                  <div className="flex gap-2 border-t border-[var(--accent)]/5 pt-3.5">
                    <button
                      onClick={() => openEdit(s)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[var(--accent)]/20 text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:border-[var(--accent)]/50 rounded-lg transition-colors font-light"
                    >
                      <FiEdit3 className="w-3.5 h-3.5" />
                      <span>ویرایش</span>
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-rose-500/10 text-rose-400 hover:bg-rose-500/5 rounded-lg transition-colors font-light mr-auto"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span>حذف اسلاید</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ───── INTERACTIVE MODALS BOUNDARY ───── */}
      <AnimatePresence mode="wait">
        {open && (
          <Modal
            key="create-slider-modal"
            onClose={() => {
              setOpen(false);
              resetForm();
            }}
          >
            <SliderForm
              form={form}
              setForm={setForm}
              products={Products}
              onSubmit={handleCreate}
              title="تنظیم بنر ویترین جدید"
              subtitle="یک عطر هدف متصل انتخاب کرده و گزاره بیانیه مد را وارد نمایید."
              isSubmitting={isSubmitting}
            />
          </Modal>
        )}

        {editing && (
          <Modal
            key="edit-slider-modal"
            onClose={() => {
              setEditing(null);
              resetForm();
            }}
          >
            <SliderForm
              form={form}
              setForm={setForm}
              products={Products}
              onSubmit={handleUpdate}
              title="اصلاح شناسنامه بنر ویترین"
              subtitle="جایگزینی تصاویر بوم آرشیو، اولویت چینش ردیف و متن نمایشی اسلاید."
              isSubmitting={isSubmitting}
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
        className="bg-[var(--background)] border border-[var(--accent)]/30 rounded-2xl p-6 w-full max-w-md relative shadow-xl z-10 max-h-[90vh] overflow-y-auto antialiased"
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

/* ───── INTERNAL SCHEMATIC CONFIGURATION FORM ───── */
type SliderFormProps = {
  form: SliderFormState;
  setForm: React.Dispatch<React.SetStateAction<SliderFormState>>;
  products: Product[];
  onSubmit: (file: File | null) => Promise<void>;
  title: string;
  subtitle: string;
  isSubmitting: boolean;
};

function SliderForm({
  form,
  setForm,
  products,
  onSubmit,
  title,
  subtitle,
  isSubmitting,
}: SliderFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.productId) {
      alert("لطفا یک محصول هدف را متصل کنید.");
      return;
    }
    await onSubmit(selectedFile);
  }

  const previewSrc = previewUrl || form.image;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right antialiased">
      <div>
        <h2 className="text-lg font-light text-[var(--foreground)] tracking-tight">
          {title}
        </h2>
        <p className="text-[11px] text-[var(--foreground)]/40 font-light mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* LINKED PRODUCT SELECT */}
      <div className="space-y-1">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          اتصال به رایحه مرجع
        </label>
        <select
          required
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light cursor-pointer appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23c4a882' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
            backgroundPosition: "left 12px center",
            backgroundSize: "16px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <option value="" className="bg-[var(--background)]">
            انتخاب عطر هدف...
          </option>
          {products.map((p) => (
            <option
              key={p.id}
              value={p.id}
              className="bg-[var(--background)] text-[var(--foreground)] text-xs"
            >
              {p.brand} — {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* EDITORIAL BANNER TEXT */}
      <div className="space-y-1">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          عنوان بیانیه عطر (متن روی اسلاید)
        </label>
        <input
          required
          placeholder="مانند: عود اسپاهان؛ تجسم شکوه خاورمیانه در نت‌های شرقی"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light placeholder:text-[var(--foreground)]/30"
        />
      </div>

      {/* ROW PRIORITY PATTERN */}
      <div className="space-y-1">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          اولویت ترتیب نمایش (عدد کوچکتر = اولویت بالاتر)
        </label>
        <input
          required
          type="number"
          placeholder="مانند: ۱"
          value={form.order || ""}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="w-full bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[var(--accent)] text-[var(--foreground)] font-light"
        />
      </div>

      {/* IMAGE ARTIFACT DISK SELECTION */}
      <div className="space-y-1.5">
        <label className="text-[11px] text-[var(--foreground)]/50 font-light">
          بوم تصویر عرید اسلایدر (کاور ۱۶:۹ توصیه می‌شود)
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center justify-center gap-2 px-4 py-2 border border-[var(--accent)]/30 rounded-xl bg-[var(--secondary)]/10 hover:bg-[var(--secondary)]/30 text-xs text-[var(--foreground)]/70 cursor-pointer transition-colors font-light">
            <FiUpload className="w-3.5 h-3.5" />
            <span>بارگذاری بوم تصویر...</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {previewSrc && (
            <img
              src={previewSrc}
              alt="Preview"
              className="w-16 h-9 object-cover rounded-lg border border-[var(--accent)]/20 shadow-sm"
            />
          )}
        </div>
      </div>

      {/* SUBMIT FORM CONTROL */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 bg-[var(--foreground)] text-[var(--background)] py-2.5 rounded-xl text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <FiCheck className="w-4 h-4" />
        <span>
          {isSubmitting ? "در حال ذخیره‌سازی..." : "ذخیره و انتشار بنر ویترین"}
        </span>
      </button>
    </form>
  );
}
