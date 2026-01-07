'use client'; // Transforma a página em Client-Side para gerenciar o carregamento

import dynamic from 'next/dynamic';

// Carregamento Dinâmico (Lazy Loading) com SSR Desativado
// Isso corrige o erro de build ao impedir que o servidor toque no FFmpeg
const VideoToGif = dynamic(
  () => import('../components/VideoToGif'), 
  { 
    ssr: false, // O segredo está aqui: Desativa renderização no servidor
    loading: () => (
      <div className="w-full h-64 bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-800 animate-pulse">
        <p className="text-slate-400">Carregando Conversor...</p>
      </div>
    )
  }
);

const ImageEditor = dynamic(
  () => import('../components/ImageEditor'), 
  { 
    ssr: false,
    loading: () => (
        <div className="w-full h-64 bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-800 animate-pulse">
          <p className="text-slate-400">Carregando Editor...</p>
        </div>
      )
  }
);

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto space-y-12">
      
      {/* Cabeçalho de Marketing */}
      <section className="text-center space-y-4 py-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Edite e Converta. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Simples e Rápido.
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Transforme seus vídeos em GIFs leves ou edite suas fotos com filtros profissionais. 
          Tudo processado no seu dispositivo, sem upload para servidores.
        </p>
      </section>

      {/* Espaço para Anúncio (Topo) */}
      <div className="w-full h-32 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-center text-slate-600">
        <span className="text-sm tracking-widest uppercase">Publicidade</span>
      </div>

      {/* Área das Ferramentas */}
      <div className="grid gap-12">
        
        {/* Bloco 1: Vídeo para GIF */}
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">1</div>
                <h3 className="text-2xl font-bold text-white">Conversor de Vídeo para GIF</h3>
            </div>
            <VideoToGif />
        </div>

        {/* Bloco 2: Editor de Fotos */}
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white">2</div>
                <h3 className="text-2xl font-bold text-white">Editor de Imagens</h3>
            </div>
            <ImageEditor />
        </div>

      </div>

      {/* Espaço para Anúncio (Fim) */}
      <div className="w-full h-32 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-center text-slate-600 mt-12">
        <span className="text-sm tracking-widest uppercase">Publicidade</span>
      </div>

    </main>
  );
}