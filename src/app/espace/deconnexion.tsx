"use client";

import { useRouter } from "next/navigation";
import { creerClient } from "../../lib/supabase/client";

export default function Deconnexion() {
  const router = useRouter();

  async function sortir() {
    await creerClient().auth.signOut();
    router.push("/connexion");
    router.refresh();
  }

  return (
    <button
      onClick={sortir}
      className="mt-8 rounded border border-sapin px-4 py-2 text-sapin"
    >
      Se déconnecter
    </button>
  );
}