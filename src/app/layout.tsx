import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const titre = Fraunces({
  subsets: ["latin"],
  variable: "--f-titre",
  display: "swap",
});

const texte = Instrument_Sans({
  subsets: ["latin"],
  variable: "--f-texte",
  display: "swap",
});

const DESCRIPTION =
  "Un questionnaire de 4 questions, une fourchette de prix en 10 secondes. Votre équipe ne reçoit que les demandes qui ont déjà vu votre ordre de grandeur.";

export const metadata: Metadata = {
  metadataBase: new URL("https://chiffrage-omega.vercel.app"),
  title: "Chiffrage : vos visiteurs veulent un prix tout de suite",
  description: DESCRIPTION,
  openGraph: {
    title: "Vos visiteurs veulent un prix tout de suite. Donnez-le-leur sur votre site.",
    description: DESCRIPTION,
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14342b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${titre.variable} ${texte.variable}`}>
      <body>{children}</body>
    </html>
  );
}