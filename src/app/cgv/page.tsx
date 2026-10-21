import type { Metadata } from "next";
import { INFOS, LegalPage, H2, P, Ul } from "../legal";

export const metadata: Metadata = {
  title: "Conditions générales de vente | Chiffrage",
};

export default function Page() {
  return (
    <LegalPage titre="Conditions générales de vente">
      <H2>1. Objet</H2>
      <P>
        Ces conditions encadrent la vente de l’abonnement « Chiffrage, accès
        fondateur » par {INFOS.nom}, {INFOS.statut.toLowerCase()} (SIRET{" "}
        {INFOS.siret}, {INFOS.adresse}). Le service s’adresse aux
        professionnels. Il permet d’intégrer à leur site un questionnaire qui
        affiche une fourchette de prix et de recevoir les demandes classées
        par montant estimé.
      </P>

      <H2>2. Nature de l’offre : accès anticipé</H2>
      <P>
        Au jour de la commande, le service est en cours de construction.
        L’acheteur réserve une place au tarif fondateur. Le service sera mis à
        sa disposition au plus tard le <strong>{INFOS.livraison}</strong>. Il
        est considéré comme livré lorsque l’acheteur peut se connecter,
        créer un questionnaire, l’intégrer à son site et recevoir des demandes
        classées par montant estimé.
      </P>

      <H2>3. Prix et paiement</H2>
      <P>
        Le prix est de {INFOS.prix} par mois, {INFOS.tva}. Il est
        prélevé chaque mois par carte bancaire via Stripe, à partir de la
        commande. Le tarif fondateur de {INFOS.prix} par mois est garanti tant
        que l’abonnement n’est pas interrompu.
      </P>

      <H2>4. Satisfait ou remboursé</H2>
      <Ul>
        <li>
          Pendant {INFOS.garantieJours} jours à compter de la commande, vous
          pouvez demander le remboursement intégral des sommes versées, sans
          justificatif, par simple email à {INFOS.email}.
        </li>
        <li>
          Si le service n’est pas livré au plus tard le {INFOS.livraison}, les
          sommes versées sont remboursées automatiquement, sans démarche de
          votre part.
        </li>
        <li>
          Le remboursement est effectué sur le moyen de paiement utilisé, dans
          un délai de {INFOS.remboursementJours} jours après la demande ou
          après la date de livraison manquée.
        </li>
      </Ul>

      <H2>5. Résiliation</H2>
      <P>
        L’abonnement est sans engagement et résiliable à tout moment, par
        email à {INFOS.email}. La résiliation prend effet à la fin de la
        période mensuelle déjà payée. Aucun nouveau prélèvement n’a lieu
        ensuite.
      </P>

      <H2>6. Responsabilité</H2>
      <P>
        Les fourchettes de prix affichées par le service sont calculées à
        partir des règles que vous définissez : elles ne constituent pas un
        devis ferme. L’éditeur n’est pas responsable des décisions
        commerciales prises sur cette base. Sa responsabilité est limitée aux
        sommes versées au cours des 12 derniers mois.
      </P>

      <H2>7. Données personnelles</H2>
      <P>
        Le traitement des données est décrit dans la politique de
        confidentialité, accessible depuis le pied de page.
      </P>

      <H2>8. Droit applicable</H2>
      <P>
        Ces conditions sont soumises au droit français. En cas de litige, et à
        défaut d’accord amiable, les tribunaux de Metz sont compétents.
      </P>
    </LegalPage>
  );
}