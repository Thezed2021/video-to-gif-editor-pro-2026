'use client';
import { useState, useRef, useEffect } from 'react';

export default function ImageEditor() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    grayscale: 0,
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) setImageSrc(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Essa função desenha a imagem com filtros sempre que algo muda
  useEffect(() => {
    if (!canvasRef.current || !imageSrc) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Aplica os filtros
        const filterString = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) grayscale(${filters.grayscale}%)`;
        ctx!.filter = filterString;
        
        ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [imageSrc, filters]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if(canvas){
        const link = document.createElement('a');
        link.download = 'imagem-editada-editorpro.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
           📸 Editor de Fotos
        </h2>
        {imageSrc && (
             <button onClick={() => setImageSrc(null)} className="text-xs text-red-400 hover:text-red-300">Remover</button>
        )}
      </div>

      {!imageSrc ? (
        <div className="border-2 border-dashed border-slate-700 rounded-lg p-10 text-center hover:bg-slate-800/50 transition cursor-pointer relative">
            <input type="file" onChange={handleImageUpload} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
            <p className="text-slate-400">Clique ou arraste uma foto aqui</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
            {/* Controles */}
            <div className="space-y-4 text-sm col-span-1">
                <div>
                    <label className="block text-slate-400 mb-1">Brilho ({filters.brightness}%)</label>
                    <input type="range" min="0" max="200" value={filters.brightness} onChange={(e) => setFilters({...filters, brightness: Number(e.target.value)})} className="w-full accent-blue-500"/>
                </div>
                <div>
                    <label className="block text-slate-400 mb-1">Contraste ({filters.contrast}%)</label>
                    <input type="range" min="0" max="200" value={filters.contrast} onChange={(e) => setFilters({...filters, contrast: Number(e.target.value)})} className="w-full accent-purple-500"/>
                </div>
                <div>
                    <label className="block text-slate-400 mb-1">Saturação ({filters.saturate}%)</label>
                    <input type="range" min="0" max="200" value={filters.saturate} onChange={(e) => setFilters({...filters, saturate: Number(e.target.value)})} className="w-full accent-pink-500"/>
                </div>
                <div>
                    <label className="block text-slate-400 mb-1">Preto e Branco ({filters.grayscale}%)</label>
                    <input type="range" min="0" max="100" value={filters.grayscale} onChange={(e) => setFilters({...filters, grayscale: Number(e.target.value)})} className="w-full accent-gray-500"/>
                </div>
                
                <button onClick={downloadImage} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-blue-900/20 mt-4">
                    Baixar Imagem Pronta
                </button>
            </div>
            
            {/* Preview */}
            <div className="col-span-2 bg-black/50 rounded-lg p-2 flex items-center justify-center border border-slate-800">
                <canvas ref={canvasRef} className="max-w-full max-h-[400px] h-auto object-contain"></canvas>
            </div>
        </div>
      )}
    </div>
  );
}