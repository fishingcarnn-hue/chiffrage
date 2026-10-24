"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { creerClient } from "../../lib/supabase/client";

type Questionnaire = { id: string; nom: string };

export default function Questionnaires() {
  const [liste, setListe] = useState<Questionnaire[]>([]);
  const [nom, setNom] = useState("");
  const [erreur, setErreur] = useState("");

  async function charger() {
    const { data, error } = await creerClient()
      .from("questionnaires")
      .select("id, nom")
      .order("cree_le", { ascending: false });
    if (error) setErreur(error.message);
    else setListe(data ?? []);
  }

  useEffect(() => {
    charger();
  }, []);

  async function ajouter(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    const { error } = await creerClient().from("questionnaires").insert({ nom });
    if (error) {
      setErreur(error.message);
      return;
    }
    setNom("");
    charger();
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-sapin">Mes questionnaires</h2>
      <form onSubmit={ajouter} className="mt-4 flex gap-2">
        <input
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Ex : Création de boutique"
          className="flex-1 rounded border border-sapin/30 bg-white px-3 py-2"
        />
        <button type="submit" className="rounded bg-brule px-4 py-2 font-semibold text-white">
          Créer
        </button>
      </form>
      {erreur && <p className="mt-3 text-brule">{erreur}</p>}
      <ul className="mt-4 space-y-2">
        {liste.map((q) => (
          <li key={q.id}>
            <Link
              href={`/espace/questionnaire?id=${q.id}`}
              className="block rounded border border-sapin/20 bg-white px-3 py-2 hover:border-sapin"
            >
              {q.nom}
            </Link>
          </li>
        ))}
        {liste.length === 0 && <li className="text-encre/60">Aucun questionnaire pour l'instant.</li>}
      </ul>
    </section>
  );
}