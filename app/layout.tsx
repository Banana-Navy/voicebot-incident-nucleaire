import type { Metadata } from "next";
import "./globals.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const metadata: Metadata = {
  title: { default: "Nuclear Incident Voicebot", template: "%s — Nuclear Incident Voicebot" },
  description: "English-language voicebot prototype based on official Belgian and European nuclear and radiological emergency guidance.",
  icons: { icon: `${basePath}/nuclear-logo.png`, shortcut: `${basePath}/nuclear-logo.png`, apple: `${basePath}/nuclear-logo.png` },
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
