import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "JHPCS Tratador • App do Piscineiro",
  description: "Aplicativo Oficial de Campo para Tratadores e Piscineiros JHoston Pools",
  manifest: "/manifest-pwa.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "JHPCS Tratador",
  },
};

export default function PwaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {children}
    </div>
  );
}
