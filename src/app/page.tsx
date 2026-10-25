// ====== À MODIFIER ICI SI BESOIN ======
const PRIX = "45 €";
const DATE_LIVRAISON = "15 décembre 2026";
const GARANTIE_JOURS = 30;
const PAYMENT_URL = "https://buy.stripe.com/cNi00idm919i0bY3aL4c801";
// ======================================

const BOUTON = `Réserver ma place fondateur, ${PRIX}/mois`;

const benefices = [
  {
    titre: "Un prix avant de quitter votre site",
    texte:
      "Le visiteur répond à 4 questions et voit une fourchette tout de suite. Il n'ouvre plus un autre onglet pour demander ailleurs.",
  },
  {
    titre: "Fini les devis qui ne mènent à rien",
    texte:
      "Les demandes qui arrivent ont déjà vu votre ordre de grandeur. Votre équipe ne chiffre plus dans le vide.",
  },
  {
    titre: "Les grosses demandes en premier",
    texte:
      "Chaque demande arrive classée par montant estimé. Vous répondez d'abord à celles qui comptent.",
  },
];

function Bouton() {
  return (
    <a
      href={PAYMENT_URL}
      className="block w-full rounded-xl bg-brule px-6 py-5 text-center text-xl font-semibold text-white shadow-[0_4px_0_0_#a63a1b] active:translate-y-[2px] active:shadow-[0_2px_0_0_#a63a1b]"
    >
      {BOUTON}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <section className="bg-sapin px-5 pb-12 pt-10 text-creme">
        <div className="mx-auto max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brule">
            Pour les agences de gestion de boutiques en ligne
          </p>
          <h1 className="font-titre text-4xl font-bold leading-tight sm:text-5xl">
            Vos visiteurs veulent un prix tout de suite. Donnez-le-leur sur
            votre site.
          </h1>
          <p className="mt-5 text-xl text-creme/85">
            Un questionnaire de 4 questions, une fourchette de prix en 10
            secondes, et votre équipe ne reçoit que les demandes qui ont déjà
            vu votre ordre de grandeur.
          </p>
          <div className="mt-8">
            <Bouton />
            <p className="mt-3 text-center text-sm text-creme/80">
              Sans engagement, résiliable à tout moment.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-xl">
          <h2 className="font-titre text-3xl font-bold text-sapin">
            Ce que coûte une demande de devis
          </h2>
          <p className="mt-4 text-xl">
            Exemple de calcul : 20 demandes de devis par mois × 45 minutes ={" "}
            <strong>15 heures passées à chiffrer</strong>, dont une partie ne
            répondra jamais.
          </p>
          <p className="mt-3 text-sm text-encre/70">
            Ceci est un exemple, pas une statistique. Remplacez par vos
            propres chiffres.
          </p>
        </div>
      </section>

      <section className="border-y border-sapin/15 bg-white px-5 py-12">
        <div className="mx-auto max-w-xl">
          <h2 className="font-titre text-3xl font-bold text-sapin">
            Trois choses qui changent
          </h2>
          <ol className="mt-6 space-y-6">
            {benefices.map((b, i) => (
              <li key={b.titre} className="flex gap-4">
                <span className="font-titre text-4xl font-bold leading-none text-brule">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{b.titre}</h3>
                  <p className="mt-1 text-encre/85">{b.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-xl rounded-2xl border-2 border-sapin p-6">
          <h2 className="font-titre text-3xl font-bold text-sapin">
            Accès fondateur
          </h2>
          <p className="mt-3 text-xl">
            <strong>{PRIX}/mois</strong>, garanti à vie pour les premiers
            acheteurs.
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              Accès immédiat dès votre paiement : connectez-vous, créez votre questionnaire et intégrez-le à votre site.
              
            </li>
            <li>
              <strong>Satisfait ou remboursé {GARANTIE_JOURS} jours</strong> :
              un simple email suffit pour être remboursé intégralement.
            </li>
            <li>
              Votre espace s'ouvre dès que le paiement est validé, avec la même adresse mail.
         
            </li>
          </ul>
          <div className="mt-6">
            <Bouton />
            <p className="mt-3 text-center text-sm text-encre/70">
              Sans engagement, résiliable à tout moment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}