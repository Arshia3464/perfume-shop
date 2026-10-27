import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { hashPassword } from "better-auth/crypto";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Clear existing test data in reverse order of foreign keys
  console.log("🧹 Clearing old records...");
  await db.delete(schema.sliderItem);
  await db.delete(schema.orderItem);
  await db.delete(schema.order);
  await db.delete(schema.wishlistItem);
  await db.delete(schema.cartItem);
  await db.delete(schema.session);
  await db.delete(schema.account);
  await db.delete(schema.verification);
  await db.delete(schema.product);
  await db.delete(schema.user);

  // 2. Seed Users (8 records)
  console.log("👤 Seeding users...");
  const users = await db
    .insert(schema.user)
    .values([
      {
        id: "usr_admin_01",
        name: "عرشیا عبدوس",
        email: "admin@example.com",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
        role: "admin",
      },
      {
        id: "usr_client_02",
        name: "سارا راد",
        email: "sara@example.com",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        role: "user",
      },
      {
        id: "usr_client_03",
        name: "کیان مرادی",
        email: "kian@example.com",
        emailVerified: false,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        role: "user",
      },
      {
        id: "usr_client_04",
        name: "النا رستمی",
        email: "elena@example.com",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        role: "user",
      },
      {
        id: "usr_client_05",
        name: "نوید تهرانی",
        email: "navid@example.com",
        emailVerified: false,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        role: "user",
      },
      {
        id: "usr_client_06",
        name: "ماهان صفری",
        email: "mahan@example.com",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
        role: "user",
      },
      {
        id: "usr_client_07",
        name: "نگار هاشمی",
        email: "negar@example.com",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
        role: "user",
      },
      {
        id: "usr_client_08",
        name: "رضا کریمی",
        email: "reza@example.com",
        emailVerified: false,
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
        role: "user",
      },
    ])
    .returning();

  // 3. Seed Accounts & Sessions
  console.log("🔐 Seeding auth accounts & sessions...");
  const hashedPassword = await hashPassword("admin123456");
  await db.insert(schema.account).values(
    users.map((u, i) => ({
      id: `acc_0${i + 1}`,
      accountId: u.email,
      providerId: "credential",
      userId: u.id,
      password: hashedPassword,
    })),
  );

  await db.insert(schema.session).values(
    users.map((u, i) => ({
      id: `sess_0${i + 1}`,
      token: `token_random_hash_${i + 1}_${Date.now()}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      userId: u.id,
    })),
  );

  // 4. Seed Verifications
  console.log("✉️ Seeding verifications...");
  await db.insert(schema.verification).values(
    users.map((u, i) => ({
      id: `ver_0${i + 1}`,
      identifier: u.email,
      value: `otp_${100000 + i * 11111}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    })),
  );

  // 5. Seed Products (12 Luxury Persian Products)
  console.log("🧴 Seeding products...");
  const products = await db
    .insert(schema.product)
    .values([
      {
        id: "prod_01",
        name: "Creed Aventus",
        description:
          "شاهکاری بی‌بدیل با رایحه خنک و تلخ. ترکیبی قدرتمند از آناناس، چوب غان و مشک که نمادی از قدرت و موفقیت است.",
        price: 18500000,
        stock: 12,
        brand: "Creed",
        gender: "men",
        season: "all-season",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800",
        tags: "لوکس,خنک,تلخ,امضا",
        createdBy: users[0].id,
      },
      {
        id: "prod_02",
        name: "Tom Ford Ombré Leather",
        description:
          "رایحه‌ای عمیق و تاریک از چرم خالص که با ظرافت‌های گل یاسمن و هل، حسی از جسارت و جذابیت مهارنشدنی را تداعی می‌کند.",
        price: 12400000,
        stock: 8,
        brand: "Tom Ford",
        gender: "unisex",
        season: "winter",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800",
        tags: "چرمی,گرم,تلخ,شبانه",
        createdBy: users[0].id,
      },
      {
        id: "prod_03",
        name: "Bleu de Chanel Parfum",
        description:
          "عمیق‌ترین و ماندگارترین نسخه از خانواده بلو. ترکیبی از چوب صندل کالدونیای جدید و مرکبات که اوج وقار مردانه را به تصویر می‌کشد.",
        price: 14200000,
        stock: 15,
        brand: "Chanel",
        gender: "men",
        season: "all-season",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800",
        tags: "چوبی,مرکباتی,کلاسیک,رسمی",
        createdBy: users[0].id,
      },
      {
        id: "prod_04",
        name: "Baccarat Rouge 540 Extrait",
        description:
          "کیمیاگری بویایی کورکجان؛ سمفونی درخشانی از زعفران، یاس، عنبر و چوب سدر که روی پوست شما می‌رقصد و ردی فراموش‌نشدنی به جا می‌گذارد.",
        price: 28000000,
        stock: 5,
        brand: "Maison Francis Kurkdjian",
        gender: "unisex",
        season: "autumn",
        volumeMl: 70,
        image:
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800",
        tags: "عنبر,شیرین,زعفران,نیش",
        createdBy: users[0].id,
      },
      {
        id: "prod_05",
        name: "Dior Oud Ispahan",
        description:
          "سفری به کاخ‌های شرقی؛ تلفیقی باشکوه از عود قدرتمند و رز لطیف دمشقی که هویتی قاطع و در عین حال مخملی خلق می‌کند.",
        price: 16500000,
        stock: 10,
        brand: "Christian Dior",
        gender: "unisex",
        season: "winter",
        volumeMl: 125,
        image:
          "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800",
        tags: "عود,رز,شرقی,کالکشن‌خاص",
        createdBy: users[0].id,
      },
      {
        id: "prod_06",
        name: "Xerjoff Naxos",
        description:
          "ادای احترامی به سیسیل؛ ترکیبی مست‌کننده از تنباکوی مرغوب، عسل، وانیل و مرکبات ایتالیایی که حسی از ثروت و اصالت را منتقل می‌کند.",
        price: 15900000,
        stock: 7,
        brand: "Xerjoff",
        gender: "unisex",
        season: "autumn",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1615397323281-22fb1b835e7d?w=800",
        tags: "تنباکویی,عسل,شیرین,ایتالیایی",
        createdBy: users[0].id,
      },
      {
        id: "prod_07",
        name: "Amouage Interlude Man",
        description:
          "شاهکار دودی و بالزامیک؛ تضادی زیبا میان نت‌های پونه کوهی، کندر و چرم که در نهایت به آرامشی عمیق در قلب آشوب می‌رسد.",
        price: 17800000,
        stock: 6,
        brand: "Amouage",
        gender: "men",
        season: "winter",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1595425970377-c9703c486578?w=800",
        tags: "دودی,ادویه‌ای,سنگین,پادشاه",
        createdBy: users[0].id,
      },
      {
        id: "prod_08",
        name: "Kilian Angels' Share",
        description:
          "جامی لبریز از کنیاک اعلا، دارچین و پرالین. رایحه‌ای به شدت جذاب و اغواگر که گرمای یک شب زمستانی را به آغوش شما می‌آورد.",
        price: 13500000,
        stock: 14,
        brand: "Kilian",
        gender: "unisex",
        season: "winter",
        volumeMl: 50,
        image:
          "https://images.unsplash.com/photo-1629198728070-80d227282b8a?w=800",
        tags: "گورماند,کنیاک,دارچین,گرم",
        createdBy: users[0].id,
      },
      {
        id: "prod_09",
        name: "Parfums de Marly Layton",
        description:
          "هارمونی بی‌نظیر سیب، وانیل و هل در بستری از چوب‌های گران‌بها. عطری که همزمان کلاسیک، مدرن، فرش و به شدت باکلاس است.",
        price: 14900000,
        stock: 11,
        brand: "Parfums de Marly",
        gender: "men",
        season: "all-season",
        volumeMl: 125,
        image:
          "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800",
        tags: "سیب,وانیل,جذاب,همه‌پسند",
        createdBy: users[0].id,
      },
      {
        id: "prod_10",
        name: "Marc-Antoine Barrois Ganymede",
        description:
          "عطری از آینده؛ ترکیبی شفاف، مینیمال و فضایی از زعفران، ماندارین و جیر که قواعد عطرسازی مدرن را از نو تعریف می‌کند.",
        price: 11200000,
        stock: 9,
        brand: "Marc-Antoine Barrois",
        gender: "unisex",
        season: "spring",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800",
        tags: "مینیمال,معدنی,مدرن,فضایی",
        createdBy: users[0].id,
      },
      {
        id: "prod_11",
        name: "Le Labo Santal 33",
        description:
          "رایحه‌ای آیکونیک از چوب صندل استرالیایی، پاپیروس و چرم که حس آزادی در دشت‌های پهناور غرب آمریکا را تداعی می‌کند.",
        price: 16900000,
        stock: 4,
        brand: "Le Labo",
        gender: "unisex",
        season: "autumn",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800",
        tags: "چوب‌صندل,پودری,خاص,هنری",
        createdBy: users[0].id,
      },
      {
        id: "prod_12",
        name: "Roja Parfums Elysium",
        description:
          "نهایت کمال در یک عطر خنک. انفجاری از گریپ‌فروت، لیمو و خس‌خس در بالاترین سطح خلوص که حس حضور در بهشت را القا می‌کند.",
        price: 22000000,
        stock: 3,
        brand: "Roja Parfums",
        gender: "men",
        season: "summer",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800",
        tags: "خنک,سیتروسی,رواتی,گران‌قیمت",
        createdBy: users[0].id,
      },
    ])
    .returning();

  // 6. Seed Cart Items (12 records)
  console.log("🛒 Seeding cart items...");
  await db.insert(schema.cartItem).values([
    {
      id: "cart_01",
      userId: users[1].id,
      productId: products[0].id,
      quantity: 1,
    },
    {
      id: "cart_02",
      userId: users[1].id,
      productId: products[1].id,
      quantity: 2,
    },
    {
      id: "cart_03",
      userId: users[2].id,
      productId: products[2].id,
      quantity: 1,
    },
    {
      id: "cart_04",
      userId: users[3].id,
      productId: products[3].id,
      quantity: 1,
    },
    {
      id: "cart_05",
      userId: users[4].id,
      productId: products[4].id,
      quantity: 3,
    },
    {
      id: "cart_06",
      userId: users[5].id,
      productId: products[5].id,
      quantity: 1,
    },
    {
      id: "cart_07",
      userId: users[5].id,
      productId: products[6].id,
      quantity: 1,
    },
    {
      id: "cart_08",
      userId: users[6].id,
      productId: products[7].id,
      quantity: 2,
    },
    {
      id: "cart_09",
      userId: users[7].id,
      productId: products[8].id,
      quantity: 1,
    },
    {
      id: "cart_10",
      userId: users[1].id,
      productId: products[9].id,
      quantity: 1,
    },
    {
      id: "cart_11",
      userId: users[2].id,
      productId: products[10].id,
      quantity: 1,
    },
    {
      id: "cart_12",
      userId: users[3].id,
      productId: products[11].id,
      quantity: 2,
    },
  ]);

  // 7. Seed Wishlist Items (12 records)
  console.log("❤️ Seeding wishlist items...");
  await db.insert(schema.wishlistItem).values([
    { id: "wish_01", userId: users[1].id, productId: products[3].id },
    { id: "wish_02", userId: users[1].id, productId: products[7].id },
    { id: "wish_03", userId: users[2].id, productId: products[0].id },
    { id: "wish_04", userId: users[2].id, productId: products[1].id },
    { id: "wish_05", userId: users[3].id, productId: products[11].id },
    { id: "wish_06", userId: users[4].id, productId: products[5].id },
    { id: "wish_07", userId: users[5].id, productId: products[8].id },
    { id: "wish_08", userId: users[6].id, productId: products[4].id },
    { id: "wish_09", userId: users[7].id, productId: products[6].id },
    { id: "wish_10", userId: users[7].id, productId: products[9].id },
    { id: "wish_11", userId: users[7].id, productId: products[2].id },
    { id: "wish_12", userId: users[1].id, productId: products[10].id },
  ]);

  // 8. Seed Orders & Order Items (8 orders, 12 historical items)
  console.log("📦 Seeding orders & historical items...");
  const orders = await db
    .insert(schema.order)
    .values([
      {
        id: "ord_1001",
        userId: users[1].id,
        total: 18500000,
        status: "delivered",
        customerName: "سارا راد",
        customerPhone: "09121112233",
        province: "تهران",
        city: "تهران",
        shippingAddress:
          "زعفرانیه، خیابان آصف، کوچه بهار، برج پارمیس، پلاک ۱۲، واحد ۵",
        postalCode: "1969713511",
      },
      {
        id: "ord_1002",
        userId: users[2].id,
        total: 26600000,
        status: "processing",
        customerName: "کیان مرادی",
        customerPhone: "09352223344",
        province: "اصفهان",
        city: "اصفهان",
        shippingAddress:
          "خیابان چهارباغ بالا، مجتمع تجاری کوثر، طبقه دوم، پلاک ۴۴",
        postalCode: "8173695123",
      },
      {
        id: "ord_1003",
        userId: users[3].id,
        total: 28000000,
        status: "shipped",
        customerName: "النا رستمی",
        customerPhone: "09173334455",
        province: "فارس",
        city: "شیراز",
        shippingAddress: "بلوار ارم، کوچه ۱۵، فرعی سوم، ساختمان سپهر، پلاک ۴",
        postalCode: "7144893120",
      },
      {
        id: "ord_1004",
        userId: users[4].id,
        total: 16500000,
        status: "processing",
        customerName: "نوید تهرانی",
        customerPhone: "09124445566",
        province: "گیلان",
        city: "رشت",
        shippingAddress: "گلسار، بلوار توحید، خیابان ۱۰۸، ساختمان آریا، واحد ۵",
        postalCode: "4165789123",
      },
      {
        id: "ord_1005",
        userId: users[5].id,
        total: 33700000,
        status: "delivered",
        customerName: "ماهان صفری",
        customerPhone: "09195556677",
        province: "تهران",
        city: "تهران",
        shippingAddress: "شهرک غرب، بلوار دادمان، خیابان فخار مقدم، پلاک ۲۲",
        postalCode: "1466782211",
      },
      {
        id: "ord_1006",
        userId: users[6].id,
        total: 13500000,
        status: "cancelled",
        customerName: "نگار هاشمی",
        customerPhone: "09126667788",
        province: "مازندران",
        city: "ساری",
        shippingAddress: "خیابان فرهنگ، کوچه پیوندی، پلاک ۸",
        postalCode: "4817734567",
      },
      {
        id: "ord_1007",
        userId: users[7].id,
        total: 11200000,
        status: "shipped",
        customerName: "رضا کریمی",
        customerPhone: "09367778899",
        province: "خراسان رضوی",
        city: "مشهد",
        shippingAddress: "بلوار سجاد، خیابان بهارستان، مجتمع باران، واحد ۱۲",
        postalCode: "9186643210",
      },
      {
        id: "ord_1008",
        userId: users[1].id,
        total: 12400000,
        status: "delivered",
        customerName: "سارا راد",
        customerPhone: "09121112233",
        province: "تهران",
        city: "تهران",
        shippingAddress:
          "زعفرانیه، خیابان آصف، کوچه بهار، برج پارمیس، پلاک ۱۲، واحد ۵",
        postalCode: "1969713511",
      },
    ])
    .returning();

  await db.insert(schema.orderItem).values([
    {
      id: "oit_01",
      orderId: orders[0].id, // 18.5M total
      productId: products[0].id, // Aventus
      quantity: 1,
      priceAtPurchase: 18500000,
      snapshotName: products[0].name,
      snapshotBrand: products[0].brand,
      snapshotImage: products[0].image,
      snapshotVolumeMl: products[0].volumeMl,
    },
    {
      id: "oit_02",
      orderId: orders[1].id, // 26.6M total
      productId: products[1].id, // Ombre Leather
      quantity: 1,
      priceAtPurchase: 12400000,
      snapshotName: products[1].name,
      snapshotBrand: products[1].brand,
      snapshotImage: products[1].image,
      snapshotVolumeMl: products[1].volumeMl,
    },
    {
      id: "oit_03",
      orderId: orders[1].id, // 26.6M total
      productId: products[2].id, // Bleu de Chanel
      quantity: 1,
      priceAtPurchase: 14200000,
      snapshotName: products[2].name,
      snapshotBrand: products[2].brand,
      snapshotImage: products[2].image,
      snapshotVolumeMl: products[2].volumeMl,
    },
    {
      id: "oit_04",
      orderId: orders[2].id, // 28M total
      productId: products[3].id, // Baccarat
      quantity: 1,
      priceAtPurchase: 28000000,
      snapshotName: products[3].name,
      snapshotBrand: products[3].brand,
      snapshotImage: products[3].image,
      snapshotVolumeMl: products[3].volumeMl,
    },
    {
      id: "oit_05",
      orderId: orders[3].id, // 16.5M total
      productId: products[4].id, // Oud Ispahan
      quantity: 1,
      priceAtPurchase: 16500000,
      snapshotName: products[4].name,
      snapshotBrand: products[4].brand,
      snapshotImage: products[4].image,
      snapshotVolumeMl: products[4].volumeMl,
    },
    {
      id: "oit_06",
      orderId: orders[4].id, // 33.7M total
      productId: products[5].id, // Naxos
      quantity: 1,
      priceAtPurchase: 15900000,
      snapshotName: products[5].name,
      snapshotBrand: products[5].brand,
      snapshotImage: products[5].image,
      snapshotVolumeMl: products[5].volumeMl,
    },
    {
      id: "oit_07",
      orderId: orders[4].id, // 33.7M total
      productId: products[6].id, // Interlude
      quantity: 1,
      priceAtPurchase: 17800000,
      snapshotName: products[6].name,
      snapshotBrand: products[6].brand,
      snapshotImage: products[6].image,
      snapshotVolumeMl: products[6].volumeMl,
    },
    {
      id: "oit_08",
      orderId: orders[5].id, // 13.5M total
      productId: products[7].id, // Angels Share
      quantity: 1,
      priceAtPurchase: 13500000,
      snapshotName: products[7].name,
      snapshotBrand: products[7].brand,
      snapshotImage: products[7].image,
      snapshotVolumeMl: products[7].volumeMl,
    },
    {
      id: "oit_09",
      orderId: orders[6].id, // 11.2M total
      productId: products[9].id, // Ganymede
      quantity: 1,
      priceAtPurchase: 11200000,
      snapshotName: products[9].name,
      snapshotBrand: products[9].brand,
      snapshotImage: products[9].image,
      snapshotVolumeMl: products[9].volumeMl,
    },
    {
      id: "oit_10",
      orderId: orders[7].id, // 12.4M total
      productId: products[1].id, // Ombre Leather again
      quantity: 1,
      priceAtPurchase: 12400000,
      snapshotName: products[1].name,
      snapshotBrand: products[1].brand,
      snapshotImage: products[1].image,
      snapshotVolumeMl: products[1].volumeMl,
    },
  ]);

  // 9. Seed Slider Items (6 records)
  console.log("🖼️ Seeding banner sliders...");
  await db.insert(schema.sliderItem).values([
    {
      id: "sld_01",
      productId: products[0].id,
      text: "اونتوس؛ پادشاه بلامنازع روایح نیش در خانه رویال",
      image:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200",
      order: 1,
      active: true,
    },
    {
      id: "sld_02",
      productId: products[4].id,
      text: "عود اصفهان؛ اصالت شرقی با امضای دیور",
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200",
      order: 2,
      active: true,
    },
    {
      id: "sld_03",
      productId: products[1].id,
      text: "امبره لدر؛ نهایت جسارت در یک شاهکار چرمی",
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200",
      order: 3,
      active: true,
    },
    {
      id: "sld_04",
      productId: products[3].id,
      text: "باکارات روژ؛ درخشش زعفران و عنبر روی پوست",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200",
      order: 4,
      active: true,
    },
    {
      id: "sld_05",
      productId: products[2].id,
      text: "بلو شنل؛ وقار و کلاسیکِ مدرن",
      image:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1200",
      order: 5,
      active: true,
    },
    {
      id: "sld_06",
      productId: products[7].id,
      text: "آنجلز شیر؛ جامی گرم برای شب‌های سرد",
      image:
        "https://images.unsplash.com/photo-1629198728070-80d227282b8a?w=1200",
      order: 6,
      active: false,
    },
  ]);

  console.log("✅ Seeding completed successfully with expanded Persian data!");
  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  client.end();
  process.exit(1);
});
