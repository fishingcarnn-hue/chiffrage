import type { ReactNode } from "react";

export const INFOS = {
  nom: "Gules Cemali",
  statut: "Entrepreneur individuel",
  siret: "931 802 763 00017",
  adresse: "4 rue Jean Aubrion, 57070 Metz, France",
  email: "fishingcarnn@gmail.com",
  telephone: "", // laissez vide pour ne pas l’afficher
  tva: "TVA non applicable, article 293 B du CGI",
  site: "https://chiffrage-omega.vercel.app",
  prix: "45 €",
  livraison: "15 décembre 2026",
  garantieJours: 30,
  remboursementJours: 14,
  maj: "25 octobre 2026",
};

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-8 font-titre text-2xl font-bold text-sapin">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-3">{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="mt-3 list-disc space-y-2 pl-6">{children}</ul>;
}

export function LegalPage({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode;
}) {
  return (
    <main className="px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <a href="/" className="text-sm font-semibold text-brule underline">
          ← Retour à l’accueil
        </a>
        <h1 className="mt-4 font-titre text-4xl font-bold text-sapin">
          {titre}
        </h1>
        <p className="mt-2 text-sm text-encre/70">
          Dernière mise à jour : {INFOS.maj}
        </p>
        {children}
      </div>
    </main>
  );
}