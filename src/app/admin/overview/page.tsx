import { db } from "@/db";
import {
  user,
  product,
  order,
  cartItem,
  wishlistItem,
  sliderItem,
} from "@/db/schema";

export default async function AdminOverviewPage() {
  const users = await db.select().from(user);
  const products = await db.select().from(product);
  const orders = await db.select().from(order);
  const carts = await db.select().from(cartItem);
  const wishlist = await db.select().from(wishlistItem);
  const sliders = await db.select().from(sliderItem);

  return (
    <div className="min-h-screen w-full text-left bg-zinc-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">Database Overview</h1>

        {/* USERS */}
        <Section title="Users">
          {users.map((u) => (
            <Row key={u.id}>
              {u.email} — {u.role}
            </Row>
          ))}
        </Section>

        {/* PRODUCTS */}
        <Section title="Products">
          {products.map((p) => (
            <Row key={p.id}>
              {p.name} — {p.price} — stock: {p.stock}
            </Row>
          ))}
        </Section>

        {/* ORDERS */}
        <Section title="Orders">
          {orders.map((o) => (
            <Row key={o.id}>
              {o.id.slice(0, 6)} — {o.total}
            </Row>
          ))}
        </Section>

        {/* CART */}
        <Section title="Cart Items">
          {carts.map((c) => (
            <Row key={c.id}>
              user: {c.userId.slice(0, 6)} — product: {c.productId.slice(0, 6)}{" "}
              — qty: {c.quantity}
            </Row>
          ))}
        </Section>

        {/* WISHLIST */}
        <Section title="Wishlist">
          {wishlist.map((w) => (
            <Row key={w.id}>
              user: {w.userId.slice(0, 6)} — product: {w.productId.slice(0, 6)}
            </Row>
          ))}
        </Section>

        {/* SLIDERS */}
        <Section title="Sliders">
          {sliders.map((s) => (
            <Row key={s.id}>
              product: {s.productId.slice(0, 6)} — order: {s.order}
            </Row>
          ))}
        </Section>
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-2xl p-4 space-y-2">
      <h2 className="font-semibold">{title}</h2>
      <div className="text-sm text-gray-600 space-y-1">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="border-b py-1 last:border-none">{children}</div>;
}
