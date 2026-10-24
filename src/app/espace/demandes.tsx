"use client";

import { useEffect, useState } from "react";
import { creerClient } from "../../lib/supabase/client";

type Detail = { question: string; reponse: string };
type Demande = {
  id: string;
  nom: string;
  email: string;
  telephone: string | null;
  montant_estime: number;
  reponses: Detail[];
  cree_le: string;
  questionnaires: { nom: string } | null;
};

export default function Demandes() {
  const [liste, setListe] = useState<Demande[]>([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await creerClient()
        .from("demandes")
        .select("id, nom, email, telephone, montant_estime, reponses, cree_le, questionnaires(nom)")
        .order("montant_estime", { ascending: false });
      if (error) setErreur(error.message);
      else setListe((data ?? []) as unknown as Demande[]);
    })();
  }, []);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-sapin">Demandes reçues</h2>
      <p className="text-sm text-encre/60">Classées par montant estimé, la plus importante en premier.</p>
      {erreur && <p className="mt-3 text-brule">{erreur}</p>}
      <ul className="mt-4 space-y-3">
        {liste.map((d) => (
          <li key={d.id} className="rounded border border-sapin/20 bg-white p-4">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-2xl font-semibold text-sapin">
                {Number(d.montant_estime).toLocaleString("fr-FR")} €
              </p>
              <p className="text-sm text-encre/60">
                {new Date(d.cree_le).toLocaleDateString("fr-FR")}
                {d.questionnaires ? " · " + d.questionnaires.nom : ""}
              </p>
            </div>
            <p className="mt-1 font-semibold">{d.nom}</p>
            <p>
              <a href={"mailto:" + d.email} className="text-sapin underline">
                {d.email}
              </a>
              {d.telephone ? " · " + d.telephone : ""}
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-sm text-sapin">Voir ses réponses</summary>
              <ul className="mt-2 space-y-1 text-sm">
                {d.reponses.map((r, i) => (
                  <li key={i}>
                    <span className="text-encre/60">{r.question} </span>
                    <strong>{r.reponse}</strong>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
        {liste.length === 0 && <li className="text-encre/60">Aucune demande pour l'instant.</li>}
      </ul>
    </section>
  );
}