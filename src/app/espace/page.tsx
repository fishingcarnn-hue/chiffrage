import { Suspense } from "react";
import { redirect } from "next/navigation";
import { creerClientServeur } from "../../lib/supabase/server";
import Deconnexion from "./deconnexion";

async function Contenu() {
  const supabase = await creerClientServeur();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/connexion");
  return (
    <>
      <h1 className="text-3xl font-semibold text-sapin">Mon espace</h1>
      <p className="mt-3">Connecté en tant que {data.user.email}</p>
      <Deconnexion />
    </>
  );
}

export default function Espace() {
  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <Suspense fallback={<p>Chargement...</p>}>
        <Contenu />
      </Suspense>
    </main>
  );
}