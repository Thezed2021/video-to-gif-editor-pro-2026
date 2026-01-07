'use client';
import { useEffect, useRef } from 'react';

export default function AdsterraBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    // 1. Limpa qualquer conteúdo anterior (evita duplicação ao navegar)
    const containerId = "container-21d85891a8220deb47dda38e2f698234";
    const container = bannerRef.current.querySelector(`#${containerId}`);
    
    // Se o script já rodou aqui, não roda de novo
    if (container && container.childNodes.length > 0) return;

    // 2. Cria o script do zero
    const script = document.createElement('script');
    script.src = "https://pl28418503.effectivegatecpm.com/21d85891a8220deb47dda38e2f698234/invoke.js";
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    // 3. Adiciona o script DENTRO do container do banner
    if (bannerRef.current) {
        bannerRef.current.appendChild(script);
    }

    // Limpeza (opcional)
    return () => {
        // Se quiser que o banner suma ao mudar de página, descomente abaixo:
        // if (bannerRef.current) bannerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div ref={bannerRef} className="flex justify-center items-center my-6 min-h-[90px] w-full bg-slate-900/20 overflow-hidden">
        {/* Mantivemos o ID que a Adsterra exige */}
        <div id="container-21d85891a8220deb47dda38e2f698234"></div>
    </div>
  );
}