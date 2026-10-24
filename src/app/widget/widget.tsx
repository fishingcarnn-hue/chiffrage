
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

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [envoi, setEnvoi] = useState<"attente" | "envoi" | "ok" | "erreur">("attente");

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
    setEnvoi("attente");
  }

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("envoi");
    const { error } = await creerClient().rpc("enregistrer_demande", {
      p_questionnaire: id,
      p_reponses: choix,
      p_nom: nom,
      p_email: email,
      p_telephone: telephone,
    });
    setEnvoi(error ? "erreur" : "ok");
  }

  if (erreur) return <p className="text-brule">{erreur}</p>;
  if (!donnees) return <p>Chargement...</p>;
  if (donnees.questions.length === 0) return <p>Ce questionnaire est vide.</p>;

  if (total !== null) {
    return (
      <div>
        <div className="text-center">
          <p className="text-lg">Votre projet est estimé entre</p>
          <p className="mt-2 text-4xl font-semibold text-sapin">
            {euros(total * 0.85)} et {euros(total * 1.15)}
          </p>
        </div>

        {envoi === "ok" ? (
          <p className="mt-8 rounded-lg bg-white p-4 text-center text-lg text-sapin">
            Merci ! Votre demande a bien été transmise. L'agence vous recontactera très vite.
          </p>
        ) : (
          <form onSubmit={envoyer} className="mt-8 space-y-3">
            <p className="font-semibold">Recevez un devis précis : laissez vos coordonnées.</p>
            <input
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Votre nom"
              className="w-full rounded border border-sapin/30 bg-white px-3 py-3"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              className="w-full rounded border border-sapin/30 bg-white px-3 py-3"
            />
            <input
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Téléphone (facultatif)"
              className="w-full rounded border border-sapin/30 bg-white px-3 py-3"
            />
            <button
              type="submit"
              disabled={envoi === "envoi"}
              className="w-full rounded-lg bg-brule px-4 py-3 text-lg font-semibold text-white"
            >
              {envoi === "envoi" ? "Envoi..." : "Être recontacté"}
            </button>
            <p className="text-xs text-encre/60">
              Vos coordonnées sont transmises à l'agence uniquement pour répondre à votre demande.
            </p>
            {envoi === "erreur" && (
              <p className="text-brule">Une erreur est survenue. Vérifiez votre email et réessayez.</p>
            )}
          </form>
        )}

        <div className="mt-6 text-center">
          <button onClick={recommencer} className="text-sapin underline">
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  const index = choix.length;
  const question = donnees.questions[index];
  if (!question) return <p>Calcul en cours...</p>;

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