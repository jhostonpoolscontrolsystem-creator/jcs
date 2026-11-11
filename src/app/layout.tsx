import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GlobalCommandPalette } from "@/components/GlobalCommandPalette";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "JHPCS • JHoston Pools Control System | Revestimentos Monolíticos & Auditoria de Garantia",
  description: "Sistema Avançado de Gestão, Digital Twin, Telemetria Físico-Química Contínua e Inteligência de Revestimentos Monolíticos JHoston Pools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased dark"
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JHPCS Tratador" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('JHPCS PWA ServiceWorker registrado com sucesso:', registration.scope);
                    },
                    function(err) {
                      console.log('Falha no registro do ServiceWorker:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
        {children}
        <GlobalCommandPalette />
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: '#0F172A',
              border: '1px solid rgba(51, 65, 85, 0.8)',
              color: '#F8FAFC',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            },
          }}
        />
      </body>
    </html>
  );
}
