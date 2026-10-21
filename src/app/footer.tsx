export default function Footer() {
  return (
    <footer className="border-t border-sapin/15 px-5 py-8 text-center text-sm text-encre/70">
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a href="/mentions-legales" className="underline">
          Mentions légales
        </a>
        <a href="/cgv" className="underline">
          Conditions générales de vente
        </a>
        <a href="/confidentialite" className="underline">
          Politique de confidentialité
        </a>
      </nav>
    </footer>
  );
}