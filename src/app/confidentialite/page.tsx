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
          <strong>Connexion à votre espace :</strong> votre adresse email, pour
          vous envoyer un lien de connexion et vérifier que votre abonnement
          est actif. Base légale : l’exécution du contrat.
        </li>
        <li>
          <strong>Contenu de votre espace :</strong> les questionnaires, les
          questions, les réponses et les montants que vous configurez.
        </li>
        <li>
          <strong>Emails :</strong> ceux que vous m’envoyez (questions,
          remboursement), conservés le temps de traiter votre demande.
        </li>
      </Ul>

      <H2>Données des visiteurs de votre site</H2>
      <P>
        Lorsqu’un visiteur de votre site utilise un questionnaire Chiffrage et
        laisse ses coordonnées, vous restez responsable de ces données : c’est
        vous qui décidez de les recueillir et de les utiliser pour répondre à sa
        demande. Chiffrage agit uniquement comme sous-traitant : le service
        enregistre pour votre compte le nom, l’adresse email, le téléphone
        (facultatif), les réponses choisies et le montant estimé, et ne les
        utilise à aucune autre fin.
      </P>
      <P>
        Il vous revient d’informer vos visiteurs, par exemple dans la politique
        de confidentialité de votre propre site. Si un visiteur exerce ses
        droits auprès de Chiffrage, la demande vous est transmise. Ces données
        sont conservées tant que votre compte est actif, puis supprimées sur
        votre demande ou au plus tard 3 mois après la fin de votre abonnement.
      </P>

      <H2>Cookies et mesure d’audience</H2>
      <P>
        Ce site n’utilise aucun cookie publicitaire ni outil de suivi. Lorsque
        vous vous connectez à votre espace, un cookie technique, indispensable
        au fonctionnement de la connexion, est déposé sur votre appareil. Si
        une mesure d’audience respectueuse de la vie privée est ajoutée, cette
        page sera mise à jour.
      </P>

      <H2>Avec qui sont partagées vos données</H2>
      <Ul>
        <li>Stripe, pour le paiement.</li>
        <li>Vercel, pour l’hébergement du site.</li>
        <li>Supabase, pour la base de données et la connexion.</li>
        <li>Resend, pour l’envoi des emails de connexion.</li>
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
        contact, sauf les données des visiteurs, régies par le paragraphe
        correspondant ci-dessus.
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