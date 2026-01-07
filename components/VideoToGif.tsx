'use client';

import { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export default function VideoToGif() {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0); // Barra de progresso

  // Configurações do Usuário
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(5);
  const [width, setWidth] = useState(320); // Resolução
  const [fps, setFps] = useState(10); // "Taxa de bits" / Fluidez

  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    setIsLoading(true);
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    
    ffmpeg.on('log', ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });

    // Monitorar progresso (Estimado)
    ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100));
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    setLoaded(true);
    setIsLoading(false);
  };

  const convertToGif = async () => {
    if (!loaded || !videoFile) return;
    setIsLoading(true);
    setProgress(0);
    const ffmpeg = ffmpegRef.current;

    // Escreve o arquivo na memória
    await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

    // Comando FFmpeg com as opções do usuário
    // -ss : Tempo de início
    // -t : Duração
    // -vf : Filtros de vídeo (FPS e Escala)
    await ffmpeg.exec([
        '-ss', startTime.toString(),
        '-t', duration.toString(),
        '-i', 'input.mp4', 
        '-vf', `fps=${fps},scale=${width}:-1:flags=lanczos`, 
        '-c:v', 'gif', 
        'output.gif'
    ]);

    // Lê o resultado
    const data = await ffmpeg.readFile('output.gif');
    const url = URL.createObjectURL(new Blob([data], { type: 'image/gif' }));
    setGifUrl(url);
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
           🎬 Conversor de GIF Pro
        </h2>
        {videoFile && (
             <button onClick={() => {setVideoFile(null); setGifUrl(null)}} className="text-xs text-red-400 hover:text-red-300">Limpar</button>
        )}
      </div>
      
      {!loaded ? (
        <button 
            onClick={load} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
            disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-pulse">Carregando Motor de Vídeo... (Aguarde)</span>
          ) : '🚀 Ativar Conversor (Download Único)'}
        </button>
      ) : (
        <div className="space-y-6">
            
            {/* 1. Upload */}
            {!videoFile && (
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-10 text-center hover:bg-slate-800/50 transition cursor-pointer relative">
                    <input 
                        type="file" 
                        onChange={(e) => e.target.files && setVideoFile(e.target.files[0])}
                        accept="video/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <p className="text-slate-400">Clique ou arraste seu vídeo MP4 aqui</p>
                </div>
            )}

            {/* 2. Configurações (Só aparece se tiver vídeo) */}
            {videoFile && (
                <div className="grid md:grid-cols-2 gap-6 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">✂️ Corte (Segundos)</h4>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 block mb-1">Início</label>
                                <input type="number" value={startTime} onChange={(e) => setStartTime(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" min="0"/>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 block mb-1">Duração</label>
                                <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" min="1" max="20"/>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">Arquivo selecionado: {videoFile.name}</p>
                    </div>

                    <div className="space-y-4">
                         <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider">⚙️ Qualidade & Tamanho</h4>
                         
                         <div>
                            <label className="text-xs text-slate-500 block mb-1">Largura (Resolução)</label>
                            <select value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white">
                                <option value="240">240px (Muito Leve)</option>
                                <option value="320">320px (Redes Sociais)</option>
                                <option value="480">480px (Qualidade SD)</option>
                                <option value="720">720px (HD - Pesado)</option>
                            </select>
                         </div>

                         <div>
                            <label className="text-xs text-slate-500 block mb-1 flex justify-between">
                                <span>Fluidez (FPS): {fps}</span>
                                <span className="text-slate-600">{fps < 12 ? 'Leve' : 'Suave'}</span>
                            </label>
                            <input type="range" min="5" max="30" value={fps} onChange={(e) => setFps(Number(e.target.value))} className="w-full accent-blue-500"/>
                         </div>
                    </div>

                    <div className="md:col-span-2">
                        <button 
                            onClick={convertToGif}
                            disabled={isLoading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? `Convertendo... ${progress > 0 ? progress + '%' : ''}` : '✨ Criar GIF Agora'}
                        </button>
                    </div>
                </div>
            )}

            {/* Logs Técnicos (Ocultos mas úteis para debug) */}
            <p ref={messageRef} className="hidden text-xs text-gray-600 font-mono mt-2 truncate"></p>

            {/* 3. Resultado */}
            {gifUrl && (
                <div className="mt-6 bg-black/40 p-4 rounded-lg text-center animate-fade-in border border-slate-700">
                    <h3 className="mb-4 text-green-400 font-bold">GIF Pronto!</h3>
                    <img src={gifUrl} alt="GIF Gerado" className="mx-auto rounded shadow-2xl max-h-[400px]" />
                    <a 
                        href={gifUrl} 
                        download={`gif-${width}px-${fps}fps.gif`} 
                        className="inline-block mt-4 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full font-medium transition"
                    >
                        ⬇️ Baixar GIF
                    </a>
                </div>
            )}
        </div>
      )}
    </div>
  );
}