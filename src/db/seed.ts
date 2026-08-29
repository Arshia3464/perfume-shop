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

  // 2. Seed Users (5 records)
  console.log("👤 Seeding users...");
  const users = await db
    .insert(schema.user)
    .values([
      {
        id: "usr_admin_01",
        name: "Arshia Abdos",
        email: "admin@example.com",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
        role: "admin",
      },
      {
        id: "usr_client_02",
        name: "Sara Rad",
        email: "sara@example.com",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        role: "user",
      },
      {
        id: "usr_client_03",
        name: "Kian Moradi",
        email: "kian@example.com",
        emailVerified: false,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        role: "user",
      },
      {
        id: "usr_client_04",
        name: "Elena Rostami",
        email: "elena@example.com",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        role: "user",
      },
      {
        id: "usr_client_05",
        name: "Navid Tehrani",
        email: "navid@example.com",
        emailVerified: false,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        role: "user",
      },
    ])
    .returning();

  // 3. Seed Accounts & Sessions (5 records each)
  console.log("🔐 Seeding auth accounts & sessions...");
  const hashedPassword = await hashPassword("admin123456");
  await db.insert(schema.account).values(
    users.map((u, i) => ({
      id: `acc_0${i + 1}`,
      accountId: `provider_acc_${u.id}`,
      providerId: "credential",
      userId: u.id,
      password: hashedPassword,
    })),
  );

  await db.insert(schema.session).values(
    users.map((u, i) => ({
      id: `sess_0${i + 1}`,
      token: `token_random_hash_${i + 1}_${Date.now()}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      userId: u.id,
    })),
  );

  // 4. Seed Verifications (5 records)
  console.log("✉️ Seeding verifications...");
  await db.insert(schema.verification).values(
    users.map((u, i) => ({
      id: `ver_0${i + 1}`,
      identifier: u.email,
      value: `otp_${100000 + i * 11111}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 mins
    })),
  );

  // 5. Seed Products (5 records)
  console.log("🧴 Seeding products...");
  const products = await db
    .insert(schema.product)
    .values([
      {
        id: "prod_01",
        name: "Aventus Royal Noir",
        description:
          "A signature blend of smoky birch, blackcurrant, and crisp bergamot for a commanding presence.",
        price: 4850000,
        stock: 18,
        brand: "Creed",
        gender: "men",
        season: "all-season",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800",
        tags: "luxury,smoky,fruity,signature",
        createdBy: users[0].id,
      },
      {
        id: "prod_02",
        name: "Baccarat Rouge Amber 540",
        description:
          "Luminous and sophisticated breezy floral notes intertwined with rich amberwood and cedar.",
        price: 6200000,
        stock: 12,
        brand: "Maison Francis Kurkdjian",
        gender: "unisex",
        season: "autumn",
        volumeMl: 70,
        image:
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800",
        tags: "amber,sweet,floral,woody",
        createdBy: users[0].id,
      },
      {
        id: "prod_03",
        name: "Santal 33 Essence",
        description:
          "An intoxicating aroma of Australian sandalwood, cardamom, violet, and leather.",
        price: 5400000,
        stock: 25,
        brand: "Le Labo",
        gender: "unisex",
        season: "winter",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800",
        tags: "woody,leather,powdery,cardamom",
        createdBy: users[0].id,
      },
      {
        id: "prod_04",
        name: "Coco Mademoiselle Velvet",
        description:
          "An oriental fragrance with a bold character featuring fresh sparks of orange and sensual patchouli.",
        price: 3950000,
        stock: 9,
        brand: "Chanel",
        gender: "women",
        season: "spring",
        volumeMl: 100,
        image:
          "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800",
        tags: "citrus,patchouli,rose,elegant",
        createdBy: users[0].id,
      },
      {
        id: "prod_05",
        name: "Tobacco Vanille Reserve",
        description:
          "Opulent, warm, and iconic artisanal scent with tobacco leaf and aromatic spice notes.",
        price: 5900000,
        stock: 15,
        brand: "Tom Ford",
        gender: "unisex",
        season: "winter",
        volumeMl: 50,
        image:
          "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800",
        tags: "warm-spicy,vanilla,tobacco,sweet",
        createdBy: users[0].id,
      },
    ])
    .returning();

  // 6. Seed Cart Items (5 records)
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
  ]);

  // 7. Seed Wishlist Items (5 records)
  console.log("❤️ Seeding wishlist items...");
  await db.insert(schema.wishlistItem).values([
    { id: "wish_01", userId: users[1].id, productId: products[2].id },
    { id: "wish_02", userId: users[1].id, productId: products[4].id },
    { id: "wish_03", userId: users[2].id, productId: products[0].id },
    { id: "wish_04", userId: users[3].id, productId: products[1].id },
    { id: "wish_05", userId: users[4].id, productId: products[3].id },
  ]);

  // 8. Seed Orders & Order Items (5 orders, 5 order item snapshots)
  console.log("📦 Seeding orders & historical items...");
  const orders = await db
    .insert(schema.order)
    .values([
      {
        id: "ord_1001",
        userId: users[1].id,
        total: 4850000,
        status: "delivered",
        customerName: "Sara Rad",
        customerPhone: "09121112233",
        province: "تهران",
        city: "تهران",
        shippingAddress:
          "خیابان ولیعصر، بالاتر از میدان ونک، کوچه نگار، پلاک ۱۲",
        postalCode: "1969713511",
      },
      {
        id: "ord_1002",
        userId: users[2].id,
        total: 6200000,
        status: "processing",
        customerName: "Kian Moradi",
        customerPhone: "09352223344",
        province: "اصفهان",
        city: "اصفهان",
        shippingAddress: "خیابان چهارباغ بالا، مجتمع تجاری کوثر، طبقه دوم",
        postalCode: "8173695123",
      },
      {
        id: "ord_1003",
        userId: users[3].id,
        total: 5400000,
        status: "shipped",
        customerName: "Elena Rostami",
        customerPhone: "09173334455",
        province: "فارس",
        city: "شیراز",
        shippingAddress: "بلوار ارم، کوچه ۱۵، فرعی سوم، پلاک ۴",
        postalCode: "7144893120",
      },
      {
        id: "ord_1004",
        userId: users[4].id,
        total: 3950000,
        status: "processing",
        customerName: "Navid Tehrani",
        customerPhone: "09124445566",
        province: "گیلان",
        city: "رشت",
        shippingAddress: "گلسار، خیابان ۱۰۸، ساختمان آریا، واحد ۵",
        postalCode: "4165789123",
      },
      {
        id: "ord_1005",
        userId: users[1].id,
        total: 5900000,
        status: "cancelled",
        customerName: "Sara Rad",
        customerPhone: "09121112233",
        province: "تهران",
        city: "تهران",
        shippingAddress:
          "خیابان ولیعصر، بالاتر از میدان ونک، کوچه نگار، پلاک ۱۲",
        postalCode: "1969713511",
      },
    ])
    .returning();

  await db.insert(schema.orderItem).values([
    {
      id: "oit_01",
      orderId: orders[0].id,
      productId: products[0].id,
      quantity: 1,
      priceAtPurchase: 4850000,
      snapshotName: products[0].name,
      snapshotBrand: products[0].brand,
      snapshotImage: products[0].image,
      snapshotVolumeMl: products[0].volumeMl,
    },
    {
      id: "oit_02",
      orderId: orders[1].id,
      productId: products[1].id,
      quantity: 1,
      priceAtPurchase: 6200000,
      snapshotName: products[1].name,
      snapshotBrand: products[1].brand,
      snapshotImage: products[1].image,
      snapshotVolumeMl: products[1].volumeMl,
    },
    {
      id: "oit_03",
      orderId: orders[2].id,
      productId: products[2].id,
      quantity: 1,
      priceAtPurchase: 5400000,
      snapshotName: products[2].name,
      snapshotBrand: products[2].brand,
      snapshotImage: products[2].image,
      snapshotVolumeMl: products[2].volumeMl,
    },
    {
      id: "oit_04",
      orderId: orders[3].id,
      productId: products[3].id,
      quantity: 1,
      priceAtPurchase: 3950000,
      snapshotName: products[3].name,
      snapshotBrand: products[3].brand,
      snapshotImage: products[3].image,
      snapshotVolumeMl: products[3].volumeMl,
    },
    {
      id: "oit_05",
      orderId: orders[4].id,
      productId: products[4].id,
      quantity: 1,
      priceAtPurchase: 5900000,
      snapshotName: products[4].name,
      snapshotBrand: products[4].brand,
      snapshotImage: products[4].image,
      snapshotVolumeMl: products[4].volumeMl,
    },
  ]);

  // 9. Seed Slider Items (5 records)
  console.log("🖼️ Seeding banner sliders...");
  await db.insert(schema.sliderItem).values([
    {
      id: "sld_01",
      productId: products[0].id,
      text: "The King of Niche Fragrances: Aventus Royal Noir",
      image:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200",
      order: 1,
      active: true,
    },
    {
      id: "sld_02",
      productId: products[1].id,
      text: "Pure Elegance & Amber Glow: Baccarat 540",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200",
      order: 2,
      active: true,
    },
    {
      id: "sld_03",
      productId: products[2].id,
      text: "Iconic Australian Sandalwood: Santal 33",
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200",
      order: 3,
      active: true,
    },
    {
      id: "sld_04",
      productId: products[3].id,
      text: "Sensual Floral Charm: Coco Mademoiselle",
      image:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1200",
      order: 4,
      active: true,
    },
    {
      id: "sld_05",
      productId: products[4].id,
      text: "Warm Velvet & Spiced Tobacco: Reserve Edition",
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200",
      order: 5,
      active: false,
    },
  ]);

  console.log("✅ Seeding completed successfully with 5 items per table!");
  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  client.end();
  process.exit(1);
});
