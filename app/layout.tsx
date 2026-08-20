import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Voicebot Incident Nucléaire", template: "%s — Voicebot Incident Nucléaire" },
  description: "Prototype de Voicebot multilingue fondé sur les consignes officielles belges et européennes relatives aux urgences nucléaires et radiologiques.",
  icons: { icon: "/nuclear-logo.png", shortcut: "/nuclear-logo.png", apple: "/nuclear-logo.png" },
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
