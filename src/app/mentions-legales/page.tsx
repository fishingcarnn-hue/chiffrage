import type { Metadata } from "next";
import { INFOS, LegalPage, H2, P } from "../legal";

export const metadata: Metadata = { title: "Mentions légales | Chiffrage" };

export default function Page() {
  return (
    <LegalPage titre="Mentions légales">
      <H2>Éditeur du site</H2>
      <P>
        {INFOS.site.replace("https://", "")} est édité par {INFOS.nom},{" "}
        {INFOS.statut.toLowerCase()}.
      </P>
      <P>
        SIRET : {INFOS.siret}
        <br />
        Adresse : {INFOS.adresse}
        <br />
        Email : {INFOS.email}
        {INFOS.telephone ? (
          <>
            <br />
            Téléphone : {INFOS.telephone}
          </>
        ) : null}
        <br />
        {INFOS.tva}
      </P>
      <P>Directeur de la publication : {INFOS.nom}.</P>

      <H2>Hébergeur</H2>
      <P>
        Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
        Site : vercel.com.
      </P>

      <H2>Paiements</H2>
      <P>
        Les paiements sont traités par Stripe Payments Europe Ltd. L’éditeur
        n’a jamais accès à vos coordonnées bancaires complètes.
      </P>

      <H2>Propriété intellectuelle</H2>
      <P>
        Les textes, la structure et les éléments graphiques du site sont la
        propriété de l’éditeur. Toute reproduction sans autorisation écrite est
        interdite.
      </P>

      <H2>Contact</H2>
      <P>Pour toute question : {INFOS.email}.</P>
    </LegalPage>
  );
}