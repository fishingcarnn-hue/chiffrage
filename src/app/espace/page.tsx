import { Suspense } from "react";
import { redirect } from "next/navigation";
import { creerClientServeur } from "../../lib/supabase/server";
import Deconnexion from "./deconnexion";
import Demandes from "./demandes";
import Questionnaires from "./questionnaires";

const PAYMENT_URL = "https://buy.stripe.com/cNi00idm919i0bY3aL4c801";

async function Contenu() {
  const supabase = await creerClientServeur();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/connexion");

  const email = (data.user.email ?? "").toLowerCase();
  const { data: abonnement } = await supabase
    .from("abonnements")
    .select("statut")
    .eq("email", email)
    .maybeSingle();

  if (abonnement?.statut !== "actif") {
    return (
      <>
        <h1 className="text-3xl font-semibold text-sapin">Abonnement requis</h1>
        <p className="mt-3">
          Aucun abonnement actif n'est associé à l'adresse {email}. Si vous avez payé avec une autre adresse,
          connectez-vous avec celle-ci.
        </p>
        <a
          href={PAYMENT_URL}
          className="mt-6 inline-block rounded-lg bg-brule px-5 py-3 font-semibold text-white"
        >
          Réserver ma place fondateur
        </a>
        <Deconnexion />
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-sapin">Mon espace</h1>
      <p className="mt-3">Connecté en tant que {data.user.email}</p>
      <Demandes />
      <Questionnaires />
      <Deconnexion />
    </>
  );
}

export default function Espace() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Suspense fallback={<p>Chargement...</p>}>
        <Contenu />
      </Suspense>
    </main>
  );
}