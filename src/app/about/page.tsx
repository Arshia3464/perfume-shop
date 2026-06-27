import Link from "next/link";
import Image from "next/image";
import {
  IoSparklesOutline,
  IoArrowBackOutline,
  IoCreateOutline,
  IoLayersOutline,
} from "react-icons/io5";

export default function AboutPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-primary"
    >
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl space-y-20 md:space-y-32">
        {/* ───────── HERO EDITORIAL ───────── */}
        <section className="relative text-center space-y-4 max-w-3xl mx-auto">
          {/* Background Ambient Text */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
            <span className="select-none text-[8rem] md:text-[14rem] font-black opacity-[0.02] tracking-widest">
              عتیق
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-bold text-accent">
            <IoSparklesOutline className="w-3 h-3" />
            <span>روایت خانه عطر عتیق</span>
          </div>

          <h1 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl text-primary">
            تلاقی مینی‌مالیسم مدرن
            <br />
            <span className="text-accent">و اصالت بویایی</span>
          </h1>

          <p className="text-xs md:text-sm leading-6 md:leading-7 text-neutral-500 font-medium pt-2">
            مجموعه عتیق بر پایه این باور شکل گرفته است که روایح، فراتر از
            ترکیبات شیمیایی، امضاهایی نامرئی از هویت و خاطرات ما هستند. ما در
            این تالار، هنر بویایی را در قالب دست‌ریزها و شاهکارهای کمیاب نیش
            بازتعریف می‌کنیم.
          </p>
        </section>

        {/* ───────── STORY SPLIT ───────── */}
        <section className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="space-y-4 lg:col-span-6">
            <span className="text-[10px] tracking-wider text-accent font-bold uppercase block">
              فلسفه ما
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-primary">
              آغاز از یک شیفتگی بی‌پایان
            </h2>
            <p className="text-xs md:text-sm leading-7 text-neutral-500 font-medium">
              همه چیز از جست‌وجو برای یافتن مفاهیمی آغاز شد که کلمات از بیان
              آن‌ها عاجز بودند؛ نوت‌هایی که باران یک عصر پاییزی، سکوت ابهت‌آمیز
              چوب‌های کهن یا طراوت بازارهای مدیترانه‌ای را بدون هیچ واسطه‌ای
              بازسازی کنند.
            </p>
            <p className="text-xs md:text-sm leading-7 text-neutral-400 font-medium">
              هدف ما در عتیق، ایجاد پناهگاهی برای کلکسیونرها و علاقه‌مندانی است
              که به دنبال روایح متمایز، اصیل و به دور از هیاهوی بازارهای تجاری
              انبوه هستند.
            </p>
          </div>

          {/* Premium Visual Frame */}
          <div className="relative overflow-hidden rounded-3xl border border-secondary/60 bg-secondary/10 aspect-video lg:aspect-square w-full lg:col-span-6 h-[320px] lg:h-[400px] shadow-xs">
            <Image
              src="https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&w=800&q=80"
              alt="هنر عطرسازی نیش"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale-[10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ───────── MISSION & VALUE CARDS ───────── */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-wider text-neutral-400 font-bold uppercase block">
              چشم‌انداز
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-primary">
              تفسیر کاراکتر در قالب اسانس
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "تمایز فردی",
                body: "هر اثر در کاتالوگ عتیق باید بازتابی از یک شخصیت مستقل باشد، نه تکرار کلیشه‌های رایج بازار.",
              },
              {
                title: "کیوریتوری سخت‌گیرانه",
                body: "تنها اسانس‌هایی به این صندوقچه راه می‌یابند که دارای عمق، هماهنگی و خلوص بویایی مثال‌زدنی باشند.",
              },
              {
                title: "تجربه بویایی خالص",
                body: "تمرکز ما بر روی معماری نوت‌ها و احساس نهایی شماست؛ فراتر از نام برندها و بسته‌بندی‌های تجاری.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-secondary/50 bg-secondary/10 p-5 md:p-6 space-y-2 hover:border-neutral-300 transition duration-200"
              >
                <h3 className="font-bold text-sm text-primary">{item.title}</h3>
                <p className="text-xs leading-6 text-neutral-400 font-medium">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── SELECTION PROCESS ───────── */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-wider text-neutral-400 font-bold uppercase block">
              فرآیند اصالت
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-primary">
              فیلترهای سه‌گانه ارزیابی روایح
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="space-y-4 text-xs md:text-sm leading-7 text-neutral-500 font-medium lg:col-span-6">
              <p>
                پیش از قرارگیری هر رایحه در کاتالوگ رسمی، اسانس مورد نظر از
                جنبه‌های مختلفی از جمله پایداری هرم بویایی، تغییر نوت منظم و
                خلوص مواد اولیه مورد ارزیابی دقیق قرار می‌گیرد.
              </p>
              <p>
                ما تعهد به اصالت را در جزءجزء فرآیند انتقال عطرها رعایت می‌کنیم
                تا دکانت نهایی، کاملاً وفادار به شاهکار اولیه طراح آن باشد.
              </p>
            </div>

            <div className="rounded-2xl border border-secondary/50 bg-secondary/10 p-6 space-y-3 lg:col-span-6 w-full">
              {[
                { label: "آنالیز و تایید اصالت هرم بویایی", value: "۰۱" },
                { label: "سنجش خلوص و پایداری اسانس", value: "۰۲" },
                { label: "کیوریتوری و انتقال آزمایشگاهی دست‌ریز", value: "۰۳" },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-secondary/40 pb-2.5 last:border-b-0 last:pb-0"
                >
                  <span className="text-xs font-bold text-primary">
                    {s.label}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-accent">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── EDITORIAL FOOTER CTA ───────── */}
        <section className="text-center space-y-4 max-w-xl mx-auto border-t border-secondary/60 pt-12 md:pt-16">
          <span className="text-[10px] tracking-wider text-accent font-bold uppercase block">
            همگام با روایح اصیل
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-primary">
            یک سفر بویایی سفارشی
          </h2>
          <p className="text-xs md:text-sm leading-6 text-neutral-500 font-medium">
            گالری عتیق بستری برای کشف امضاهای جدید است؛ تجربه‌ای منحصر‌به‌فرد که
            با هر شیشه عطر، روایتی جدید از شما را بازگو می‌کند.
          </p>

          <div className="pt-2">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-background transition hover:opacity-90 active:scale-95 duration-150 shadow-xs"
            >
              <span>مرور کاتالوگ روایح</span>
              <IoArrowBackOutline className="w-3.5 h-3.5 transition duration-300 transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
