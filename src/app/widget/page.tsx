import { Suspense } from "react";
import Widget from "./widget";

async function Contenu({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  if (!id) return <p>Questionnaire introuvable.</p>;
  return <Widget id={id} />;
}

export default function Page({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  return (
    <main className="mx-auto max-w-lg px-4 py-6">
      <Suspense fallback={<p>Chargement...</p>}>
        <Contenu searchParams={searchParams} />
      </Suspense>
    </main>
  );
}