"use client";

import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  const logout = async () => {
    await authClient.signOut();

    // refresh page to update session state
    window.location.reload();
  };

  return (
    <button
      onClick={logout}
      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
    >
      خروج
    </button>
  );
}
