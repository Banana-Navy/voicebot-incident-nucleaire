import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:{default:"Info Nucléaire Belgique",template:"%s — Info Nucléaire Belgique"},description:"Prototype de voicebot multilingue fondé sur les consignes officielles belges et européennes relatives aux urgences nucléaires et radiologiques."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
