import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // <--- 1. IMPORTANTE: Importar isso
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EditorPro - Conversor e Editor",
  description: "Edite fotos e converta vídeos em GIF online e grátis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        
        {/* 2. O SCRIPT NOVO VEM AQUI (Social Bar) */}
        <Script 
          src="https://pl28418542.effectivegatecpm.com/8b/ff/60/8bff60fb176e7885456182286c3e7271.js" 
          strategy="afterInteractive"
        />

        {/* Barra de Navegação */}
        <nav className="w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              EditorPro
            </span>
            <div className="text-sm text-slate-400">Versão Beta</div>
          </div>
        </nav>

        {children}

        <footer className="py-8 text-center text-slate-600 text-sm">
          <p>© 2026 EditorPro. Processamento local e seguro.</p>
        </footer>
      </body>
    </html>
  );
}