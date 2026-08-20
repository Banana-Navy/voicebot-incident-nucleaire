import type { Metadata } from "next";
import "./globals.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const metadata: Metadata = {
  title: { default: "Voicebot Incident Nucléaire", template: "%s — Voicebot Incident Nucléaire" },
  description: "Prototype de Voicebot multilingue fondé sur les consignes officielles belges et européennes relatives aux urgences nucléaires et radiologiques.",
  icons: { icon: `${basePath}/nuclear-logo.png`, shortcut: `${basePath}/nuclear-logo.png`, apple: `${basePath}/nuclear-logo.png` },
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
