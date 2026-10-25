import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";

function signatureValide(corps: string, entete: string | null, secret: string) {
  if (!entete) return false;
  let horodatage = "";
  const signatures: string[] = [];
  for (const morceau of entete.split(",")) {
    const [cle, valeur] = morceau.split("=");
    if (cle === "t") horodatage = valeur;
    if (cle === "v1") signatures.push(valeur);
  }
  if (!horodatage || signatures.length === 0) return false;
  const age = Math.abs(Date.now() / 1000 - Number(horodatage));
  if (!(age < 300)) return false;
  const attendue = createHmac("sha256", secret).update(horodatage + "." + corps).digest("hex");
  return signatures.some(
    (s) => s.length === attendue.length && timingSafeEqual(Buffer.from(s), Buffer.from(attendue))
  );
}

export async function POST(request: Request) {
  const secrets = [process.env.STRIPE_WEBHOOK_SECRET, process.env.STRIPE_WEBHOOK_SECRET_LIVE].filter(
    (s): s is string => Boolean(s)
  );
  if (secrets.length === 0) return new Response("Configuration manquante", { status: 500 });

  const corps = await request.text();
  const entete = request.headers.get("stripe-signature");
  if (!secrets.some((s) => signatureValide(corps, entete, s))) {
    return new Response("Signature invalide", { status: 400 });
  }

  const evenement = JSON.parse(corps);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );

  if (evenement.type === "checkout.session.completed") {
    const s = evenement.data.object;
    const email = String(s.customer_details?.email ?? s.customer_email ?? "").toLowerCase();
    if (email && s.payment_status !== "unpaid") {
      const { error } = await supabase.from("abonnements").upsert({
        email,
        statut: "actif",
        stripe_customer: s.customer ?? null,
        stripe_subscription: s.subscription ?? null,
        maj_le: new Date().toISOString(),
      });
      if (error) return new Response("Erreur base", { status: 500 });
    }
  }

  if (evenement.type === "customer.subscription.deleted") {
    const s = evenement.data.object;
    const { error } = await supabase
      .from("abonnements")
      .update({ statut: "annule", maj_le: new Date().toISOString() })
      .eq("stripe_subscription", s.id);
    if (error) return new Response("Erreur base", { status: 500 });
  }

  return new Response("ok");
}