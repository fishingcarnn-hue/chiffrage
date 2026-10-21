import type { Metadata } from "next";
import { INFOS, LegalPage, H2, P, Ul } from "../legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Chiffrage",
};

export default function Page() {
  return (
    <LegalPage titre="Politique de confidentialité">
      <H2>Qui est responsable de vos données</H2>
      <P>
        {INFOS.nom}, {INFOS.statut.toLowerCase()}, {INFOS.adresse}. Contact :{" "}
        {INFOS.email}.
      </P>

      <H2>Quelles données, pourquoi</H2>
      <Ul>
        <li>
          <strong>Achat :</strong> votre nom, votre email et les informations
          de facturation, pour gérer votre abonnement et vous envoyer l’accès.
          Base légale : l’exécution du contrat.
        </li>
        <li>
          <strong>Paiement :</strong> les données de carte sont saisies chez
          Stripe et ne passent jamais par ce site.
        </li>
        <li>
          <strong>Emails :</strong> ceux que vous m’envoyez (questions,
          remboursement), conservés le temps de traiter votre demande.
        </li>
      </Ul>

      <H2>Cookies et mesure d’audience</H2>
      <P>
        Ce site n’utilise aucun cookie publicitaire ni outil de suivi. Si une
        mesure d’audience respectueuse de la vie privée est ajoutée, cette page
        sera mise à jour.
      </P>

      <H2>Avec qui sont partagées vos données</H2>
      <Ul>
        <li>Stripe, pour le paiement.</li>
        <li>Vercel, pour l’hébergement du site.</li>
      </Ul>
      <P>
        Ces prestataires peuvent traiter des données hors de l’Union
        européenne, dans le cadre de garanties reconnues (clauses
        contractuelles types).
      </P>

      <H2>Durée de conservation</H2>
      <P>
        Les données de facturation sont conservées 10 ans (obligation
        comptable). Les autres données sont supprimées 3 ans après le dernier
        contact.
      </P>

      <H2>Vos droits</H2>
      <P>
        Vous pouvez demander l’accès, la rectification ou la suppression de
        vos données, ou vous opposer à leur traitement, en écrivant à{" "}
        {INFOS.email}. En cas de désaccord, vous pouvez saisir la CNIL
        (cnil.fr).
      </P>
    </LegalPage>
  );
}