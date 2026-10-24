"use client";

import { useEffect, useState } from "react";
import { creerClient } from "../../lib/supabase/client";

type Rep = { id: string; libelle: string };
type Question = { id: string; texte: string; reponses: Rep[] };
type Donnees = { nom: string; questions: Question[] };

function arrondir(n: number) {
  return Math.round(n / 10) * 10;
}

function euros(n: number) {
  return arrondir(n).toLocaleString("fr-FR") + " €";
}

export default function Widget({ id }: { id: string }) {
  const [donnees, setDonnees] = useState<Donnees | null>(null);
  const [choix, setChoix] = useState<string[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await creerClient().rpc("obtenir_questionnaire", { p_id: id });
      if (error || !data) setErreur("Questionnaire introuvable.");
      else setDonnees(data as Donnees);
    })();
  }, []);

  async function repondre(idReponse: string) {
    const nouveau = [...choix, idReponse];
    setChoix(nouveau);
    if (donnees && nouveau.length === donnees.questions.length) {
      const { data, error } = await creerClient().rpc("estimer", {
        p_questionnaire: id,
        p_reponses: nouveau,
      });
      if (error) setErreur(error.message);
      else setTotal(Number(data));
    }
  }

  function recommencer() {
    setChoix([]);
    setTotal(null);
  }

  if (erreur) return <p className="text-brule">{erreur}</p>;
  if (!donnees) return <p>Chargement...</p>;
  if (donnees.questions.length === 0) return <p>Ce questionnaire est vide.</p>;

  if (total !== null) {
    return (
      <div className="text-center">
        <p className="text-lg">Votre projet est estimé entre</p>
        <p className="mt-2 text-4xl font-semibold text-sapin">
          {euros(total * 0.85)} et {euros(total * 1.15)}
        </p>
        <button onClick={recommencer} className="mt-8 text-sapin underline">
          Recommencer
        </button>
      </div>
    );
  }

  const index = choix.length;
  const question = donnees.questions[index];  if (!question) return <p>Calcul en cours...</p>;

  return (
    <div>
      <p className="text-sm text-encre/60">
        Question {index + 1} sur {donnees.questions.length}
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-sapin">{question.texte}</h1>
      <div className="mt-6 space-y-3">
        {question.reponses.map((r) => (
          <button
            key={r.id}
            onClick={() => repondre(r.id)}
            className="block w-full rounded-lg border-2 border-sapin/30 bg-white px-4 py-4 text-left text-lg hover:border-brule"
          >
            {r.libelle}
          </button>
        ))}
        {question.reponses.length === 0 && <p className="text-encre/60">Aucune réponse définie.</p>}
      </div>
    </div>
  );
}