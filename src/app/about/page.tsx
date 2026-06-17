import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="container mx-auto px-6 py-20 space-y-24">
        {/* ───────── HERO ───────── */}
        <section className="relative text-center space-y-6">
          {/* ghost text */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="select-none text-[10rem] font-black opacity-[0.03]">
              ما
            </span>
          </div>

          <p className="text-xs tracking-[0.35em] text-muted-foreground">
            درباره برند
          </p>

          <h1 className="text-4xl font-black leading-[1.2] lg:text-6xl">
            ما فقط عطر نمی‌فروشیم
            <br />
            <span className="text-[var(--accent)]">ما خاطره می‌سازیم</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-muted-foreground">
            ما یک برند ساده نیستیم — ما تجربه‌ای از رایحه، خاطره و احساس هستیم.
            هر عطر در این مجموعه یک روایت است، نه یک محصول.
          </p>
        </section>

        {/* ───────── STORY SPLIT ───────── */}
        <section className="grid gap-16 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <p className="text-xs tracking-[0.35em] text-muted-foreground">
              داستان ما
            </p>

            <h2 className="text-3xl font-bold leading-[1.3]">
              شروع از یک خاطره ساده
            </h2>

            <p className="text-sm leading-8 text-muted-foreground">
              همه چیز از علاقه به بوهایی شروع شد که خاطره را زنده می‌کنند.
              خیابان‌های بارانی، شب‌های گرم، و لحظه‌هایی که فقط یک رایحه
              می‌تواند آن‌ها را برگرداند.
            </p>

            <p className="text-sm leading-8 text-muted-foreground">
              این مجموعه ساخته شد تا عطرها فقط “بو” نباشند — بلکه احساس باشند.
            </p>
          </div>

          {/* visual block */}
          <div className="relative overflow-hidden rounded-3xl bg-[var(--secondary)]/30 min-h-[420px] flex items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            <div className="relative opacity-20 flex flex-col items-center gap-1">
              <div className="h-3 w-6 rounded-t-full bg-foreground" />
              <div className="h-2 w-10 bg-foreground" />
              <div className="h-52 w-28 rounded-b-xl bg-foreground" />
            </div>
          </div>
        </section>

        {/* ───────── MISSION ───────── */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-xs tracking-[0.35em] text-muted-foreground">
              ماموریت
            </p>

            <h2 className="text-3xl font-bold">تعریف هویت از طریق رایحه</h2>

            <p className="mx-auto max-w-2xl text-sm leading-8 text-muted-foreground">
              ماموریت ما ارائه عطرهایی است که شخصیت شما را تعریف می‌کنند، نه فقط
              بوی شما را.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "هویت",
                body: "هر عطر باید بازتاب شخصیت باشد، نه تکرار بازار.",
              },
              {
                title: "انتخاب",
                body: "فقط رایحه‌هایی وارد مجموعه می‌شوند که احساس واقعی ایجاد کنند.",
              },
              {
                title: "تجربه",
                body: "تمرکز ما روی حس نهایی کاربر است، نه فقط محصول.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/40 bg-[var(--secondary)]/30 p-6 space-y-2"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── PROCESS ───────── */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-xs tracking-[0.35em] text-muted-foreground">
              انتخاب رایحه
            </p>

            <h2 className="text-3xl font-bold">هر عطر یک فیلتر سخت دارد</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6 text-sm leading-8 text-muted-foreground">
              <p>
                هر محصول قبل از ورود، چندین مرحله بررسی کیفیت و تست رایحه را پشت
                سر می‌گذارد.
              </p>

              <p>
                ما فقط عطرهایی را انتخاب می‌کنیم که بتوانند احساس واقعی ایجاد
                کنند — نه فقط بوی خوش.
              </p>

              <p>
                از نت اولیه تا نت پایانی، همه چیز باید هماهنگ و ماندگار باشد.
              </p>
            </div>

            <div className="rounded-3xl border border-border/40 bg-[var(--secondary)]/20 p-8 space-y-4">
              {[
                { label: "تست رایحه", value: "مرحله 01" },
                { label: "بررسی کیفیت", value: "مرحله 02" },
                { label: "انتخاب نهایی", value: "مرحله 03" },
              ].map((s) => (
                <div
                  key={s.value}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{s.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── VALUES ───────── */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-xs tracking-[0.35em] text-muted-foreground">
              ارزش‌ها
            </p>

            <h2 className="text-3xl font-bold">چیزی که ما به آن پایبندیم</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "کیفیت",
                body: "استفاده از بهترین ترکیبات برای تجربه‌ای ماندگار.",
              },
              {
                title: "اصالت",
                body: "هیچ رایحه‌ای کپی نیست، همه چیز انتخاب‌شده است.",
              },
              {
                title: "احساس",
                body: "تمرکز اصلی ما روی احساسی است که عطر ایجاد می‌کند.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border/40 bg-[var(--secondary)]/30 p-6"
              >
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="text-center space-y-6">
          <p className="text-xs tracking-[0.35em] text-muted-foreground">
            همراه ما باشید
          </p>

          <h2 className="text-3xl font-bold">این فقط یک فروشگاه نیست</h2>

          <p className="mx-auto max-w-xl text-sm leading-8 text-muted-foreground">
            این یک تجربه است — تجربه‌ای که هر بار با یک رایحه جدید شروع می‌شود.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-8 py-3 text-sm font-medium text-[var(--background)] transition hover:scale-105"
          >
            مشاهده محصولات
          </Link>
        </section>
      </div>
    </div>
  );
}
