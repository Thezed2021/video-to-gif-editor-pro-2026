import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. Configuração de SEO (Para o Google te achar)
export const metadata: Metadata = {
  title: "EditorPro - Conversor de Vídeo para GIF e Editor de Fotos Online",
  description: "Ferramenta gratuita para transformar vídeos em GIFs e editar imagens direto no navegador. Sem marcas d'água, rápido e seguro.",
  keywords: ["editor de fotos", "converter video em gif", "mp4 para gif", "editor online", "gratis"],
  openGraph: {
    title: "EditorPro - Ferramentas de Mídia Gratuitas",
    description: "Edite fotos e crie GIFs no seu navegador.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* 2. Script do Google Adsense (Coloque seu ID real depois) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-SEU_ID_AQUI"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        {/* Barra de Navegação Simples */}
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
          <p>© 2024 EditorPro. Processamento local e seguro.</p>
        </footer>
      </body>
    </html>
  );
}