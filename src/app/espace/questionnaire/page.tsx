import { Suspense } from "react";
import Editeur from "./editeur";

async function Contenu({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  if (!id) return <p>Questionnaire introuvable.</p>;
  return <Editeur id={id} />;
}

export default function Page({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <Suspense fallback={<p>Chargement...</p>}>
        <Contenu searchParams={searchParams} />
      </Suspense>
    </main>
  );
}