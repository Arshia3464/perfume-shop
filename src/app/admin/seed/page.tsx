"use client";

import { useState } from "react";
import { makeMeAdmin } from "./actions";

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await makeMeAdmin();
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 w-80 text-center">
        <h1 className="text-lg font-semibold">Admin Access Seeder</h1>

        <p className="text-sm text-gray-500">این فقط برای توسعه است</p>

        {!done ? (
          <button
            onClick={handleClick}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-xl"
          >
            {loading ? "در حال انجام..." : "من را ادمین کن"}
          </button>
        ) : (
          <p className="text-green-600 text-sm">شما اکنون ادمین هستید ✅</p>
        )}
      </div>
    </div>
  );
}
