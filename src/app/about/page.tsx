export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* HERO */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            درباره ما
          </h1>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            ما یک برند ساده نیستیم — ما تجربه‌ای از رایحه، خاطره و احساس هستیم.
          </p>
        </section>

        {/* STORY */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">داستان ما</h2>

          <p className="text-gray-600 leading-loose text-sm md:text-base">
            همه چیز از یک علاقه ساده شروع شد؛ علاقه‌ای به بوهایی که می‌توانند
            خاطرات را زنده کنند. از خیابان‌های بارانی گرفته تا شب‌های گرم
            تابستان، هر رایحه داستانی در خود دارد.
          </p>

          <p className="text-gray-600 leading-loose text-sm md:text-base">
            ما تصمیم گرفتیم این تجربه را به یک مجموعه تبدیل کنیم — مجموعه‌ای از
            عطرهای خاص که فقط بو نیستند، بلکه احساس هستند.
          </p>
        </section>

        {/* MISSION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">ماموریت ما</h2>

          <p className="text-gray-600 leading-loose text-sm md:text-base">
            ماموریت ما ساده است: ارائه عطرهایی که شخصیت شما را تعریف می‌کنند، نه
            فقط بوی شما را.
          </p>

          <p className="text-gray-600 leading-loose text-sm md:text-base">
            ما باور داریم هر فرد باید بتواند رایحه‌ای داشته باشد که کاملاً با
            هویت او هماهنگ است — نه تکراری، نه عمومی، بلکه شخصی.
          </p>
        </section>

        {/* VALUES */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">ارزش‌های ما</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-2xl p-5 space-y-2">
              <h3 className="font-medium">کیفیت</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                استفاده از بهترین ترکیبات برای ساخت رایحه‌های ماندگار.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-5 space-y-2">
              <h3 className="font-medium">اصالت</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                هیچ رایحه‌ای کپی نیست — همه چیز طراحی اختصاصی دارد.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-5 space-y-2">
              <h3 className="font-medium">تجربه</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                تمرکز ما روی احساس شما هنگام استفاده از هر عطر است.
              </p>
            </div>
          </div>
        </section>

        {/* INGREDIENTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">فرآیند انتخاب رایحه</h2>

          <p className="text-gray-600 leading-loose text-sm md:text-base">
            هر عطر قبل از ورود به مجموعه ما، چندین مرحله تست کیفیت و ترکیب را
            پشت سر می‌گذارد. ما فقط محصولی را انتخاب می‌کنیم که بتواند احساس
            واقعی ایجاد کند، نه فقط بوی خوش.
          </p>

          <p className="text-gray-600 leading-loose text-sm md:text-base">
            از نت‌های ابتدایی تا نت‌های پایانی، هر جزئیات با دقت بررسی می‌شود تا
            تجربه‌ای کامل و هماهنگ ایجاد شود.
          </p>
        </section>

        {/* CLOSING */}
        <section className="text-center space-y-4">
          <h2 className="text-xl font-semibold">با ما همراه شوید</h2>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            این فقط یک فروشگاه نیست — این یک تجربه است. تجربه‌ای که هر بار با یک
            رایحه جدید شروع می‌شود.
          </p>

          <button className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition">
            مشاهده محصولات
          </button>
        </section>
      </div>
    </div>
  );
}
