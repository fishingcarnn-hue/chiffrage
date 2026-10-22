"use client";

import { useState } from "react";
import { creerClient } from "../../lib/supabase/client";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [detail, setDetail] = useState("");
  const [etat, setEtat] = useState<"attente" | "envoi" | "envoye" | "erreur">("attente");

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEtat("envoi");
    const supabase = creerClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setDetail(error ? error.message : "");
    setEtat(error ? "erreur" : "envoye");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-semibold text-sapin">Connexion</h1>
      <p className="mt-3">Entrez votre adresse mail. Vous recevrez un lien pour vous connecter, sans mot de passe.</p>
      <form onSubmit={envoyer} className="mt-8 space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@agence.fr"
          className="w-full rounded border border-sapin/30 bg-white px-4 py-3"
        />
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="w-full rounded bg-brule px-4 py-3 font-semibold text-white"
        >
          {etat === "envoi" ? "Envoi..." : "Recevoir mon lien"}
        </button>
      </form>
      {etat === "envoye" && <p className="mt-6 text-sapin">Lien envoyé. Regardez votre boîte mail (et les spams).</p>}
      {etat === "erreur" && <p className="mt-6 text-brule">Un problème est survenu : {detail}</p>}
    </main>
  );
}