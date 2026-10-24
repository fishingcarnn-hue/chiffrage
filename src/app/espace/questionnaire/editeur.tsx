"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { creerClient } from "../../../lib/supabase/client";

type Reponse = { id: string; libelle: string; montant: number; ordre: number };
type Question = { id: string; texte: string; ordre: number; reponses: Reponse[] };

function BlocReponses({ question, recharger }: { question: Question; recharger: () => void }) {
  const [libelle, setLibelle] = useState("");
  const [montant, setMontant] = useState("");
  const [erreur, setErreur] = useState("");

  const reponses = [...question.reponses].sort((a, b) => a.ordre - b.ordre);

  async function ajouter(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    const prochain = Math.max(0, ...reponses.map((r) => r.ordre)) + 1;
    const { error } = await creerClient()
      .from("reponses")
      .insert({ question_id: question.id, libelle, montant: Number(montant), ordre: prochain });
    if (error) {
      setErreur(error.message);
      return;
    }
    setLibelle("");
    setMontant("");
    recharger();
  }

  async function supprimer(id: string) {
    await creerClient().from("reponses").delete().eq("id", id);
    recharger();
  }

  return (
    <div className="mt-3">
      <ul className="space-y-1">
        {reponses.map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded bg-creme px-3 py-1">
            <span>
              {r.libelle} : <strong>{Number(r.montant)} €</strong>
            </span>
            <button onClick={() => supprimer(r.id)} className="text-sm text-brule underline">
              Supprimer
            </button>
          </li>
        ))}
        {reponses.length === 0 && <li className="text-sm text-encre/60">Aucune réponse pour l'instant.</li>}
      </ul>
      <form onSubmit={ajouter} className="mt-2 flex gap-2">
        <input
          required
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          placeholder="Réponse (ex : 50 à 500 produits)"
          className="flex-1 rounded border border-sapin/30 bg-white px-2 py-1"
        />
        <input
          required
          type="number"
          min="0"
          step="any"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          placeholder="€"
          className="w-24 rounded border border-sapin/30 bg-white px-2 py-1"
        />
        <button type="submit" className="rounded bg-sapin px-3 py-1 text-white">
          +
        </button>
      </form>
      {erreur && <p className="mt-1 text-sm text-brule">{erreur}</p>}
    </div>
  );
}

export default function Editeur({ id }: { id: string }) {
  const [nom, setNom] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [texte, setTexte] = useState("");
  const [erreur, setErreur] = useState("");

  async function charger() {
    const supabase = creerClient();
    const q = await supabase.from("questionnaires").select("nom").eq("id", id).single();
    if (q.error) {
      setErreur(q.error.message);
      return;
    }
    setNom(q.data.nom);
    const r = await supabase
      .from("questions")
      .select("id, texte, ordre, reponses(id, libelle, montant, ordre)")
      .eq("questionnaire_id", id)
      .order("ordre");
    if (r.error) setErreur(r.error.message);
    else setQuestions((r.data ?? []) as Question[]);
  }

  useEffect(() => {
    charger();
  }, []);

  async function ajouter(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    const prochain = Math.max(0, ...questions.map((q) => q.ordre)) + 1;
    const { error } = await creerClient()
      .from("questions")
      .insert({ questionnaire_id: id, texte, ordre: prochain });
    if (error) {
      setErreur(error.message);
      return;
    }
    setTexte("");
    charger();
  }

  async function supprimer(idQuestion: string) {
    await creerClient().from("questions").delete().eq("id", idQuestion);
    charger();
  }

  return (
    <>
      <Link href="/espace" className="text-sapin underline">
        Retour à mon espace
      </Link>
      <h1 className="mt-4 text-3xl font-semibold text-sapin">{nom}</h1>
      <h2 className="mt-8 text-xl font-semibold text-sapin">Questions</h2>
      <div className="mt-4 space-y-4">
        {questions.map((q, i) => (
          <div key={q.id} className="rounded border border-sapin/20 bg-white p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold">
                {i + 1}. {q.texte}
              </p>
              <button onClick={() => supprimer(q.id)} className="text-sm text-brule underline">
                Supprimer
              </button>
            </div>
            <BlocReponses question={q} recharger={charger} />
          </div>
        ))}
        {questions.length === 0 && <p className="text-encre/60">Aucune question pour l'instant.</p>}
      </div>
      <form onSubmit={ajouter} className="mt-6 flex gap-2">
        <input
          required
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Nouvelle question (ex : Combien de produits ?)"
          className="flex-1 rounded border border-sapin/30 bg-white px-3 py-2"
        />
        <button type="submit" className="rounded bg-brule px-4 py-2 font-semibold text-white">
          Ajouter
        </button>
      </form>
      {erreur && <p className="mt-3 text-brule">{erreur}</p>}
    </>
  );
}