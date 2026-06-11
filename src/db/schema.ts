import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", {
    mode: "boolean",
  })
    .default(false)
    .notNull(),
  image: text("image"),
  role: text("role").notNull().default("user"), // "user" | "admin"
  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),

  updatedAt: integer("updated_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),

  expiresAt: integer("expires_at", {
    mode: "timestamp_ms",
  }).notNull(),

  token: text("token").notNull().unique(),

  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),

  updatedAt: integer("updated_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),

  ipAddress: text("ip_address"),

  userAgent: text("user_agent"),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),

  accountId: text("account_id").notNull(),

  providerId: text("provider_id").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  accessToken: text("access_token"),

  refreshToken: text("refresh_token"),

  idToken: text("id_token"),

  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp_ms",
  }),

  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp_ms",
  }),

  scope: text("scope"),

  password: text("password"),

  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),

  updatedAt: integer("updated_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),

  identifier: text("identifier").notNull(),

  value: text("value").notNull(),

  expiresAt: integer("expires_at", {
    mode: "timestamp_ms",
  }).notNull(),

  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),

  updatedAt: integer("updated_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const product = sqliteTable("product", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),
  description: text("description"),

  price: integer("price").notNull(),
  stock: integer("stock").notNull(),

  brand: text("brand").notNull(),

  gender: text("gender").notNull(), // "men" | "women" | "unisex"
  season: text("season"), // optional

  volumeMl: integer("volume_ml"),

  image: text("image"),

  tags: text("tags"), // store JSON string or comma-separated

  createdBy: text("created_by"), // optional admin tracking

  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const cartItem = sqliteTable("cart_item", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  productId: text("product_id")
    .notNull()
    .references(() => product.id, {
      onDelete: "cascade",
    }),

  quantity: integer("quantity").notNull().default(1),
});

export const wishlistItem = sqliteTable("wishlist_item", {
  id: text("id").primaryKey(),

  userId: text("user_id").notNull(),
  productId: text("product_id").notNull(),
});

export const order = sqliteTable("order", {
  id: text("id").primaryKey(),

  userId: text("user_id").notNull(),

  total: integer("total").notNull(),

  status: text("status").notNull().default("pending"),
  // pending | paid | shipped | delivered

  createdAt: text("created_at"),
});

export const orderItem = sqliteTable("order_item", {
  id: text("id").primaryKey(),

  orderId: text("order_id").notNull(),

  productId: text("product_id").notNull(),

  quantity: integer("quantity").notNull(),
  priceAtPurchase: integer("price_at_purchase").notNull(),
});

export const sliderItem = sqliteTable("slider_item", {
  id: text("id").primaryKey(),

  productId: text("product_id")
    .notNull()
    .references(() => product.id, {
      onDelete: "cascade",
    }),

  text: text("text"),

  image: text("image"),

  order: integer("order").notNull().default(0),

  active: integer("active", {
    mode: "boolean",
  })
    .notNull()
    .default(true),
});
