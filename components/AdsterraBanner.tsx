'use client';
import { useEffect, useRef } from 'react';

export default function AdsterraBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica se o bannerRef existe e se o script já não foi adicionado antes
    if (bannerRef.current && !bannerRef.current.querySelector('script')) {
      
      const script = document.createElement('script');
      script.src = "https://pl28418503.effectivegatecpm.com/21d85891a8220deb47dda38e2f698234/invoke.js";
      script.async = true;
      script.setAttribute('data-cfasync', 'false'); // Exigência do Adsterra
      
      // Adiciona o script dentro da div do nosso componente
      bannerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div 
        ref={bannerRef} 
        className="flex justify-center items-center my-6 min-h-[90px] w-full overflow-hidden"
    >
        {/* A DIV ESPECÍFICA QUE O CÓDIGO DA ADSTERRA PROCURA */}
        <div id="container-21d85891a8220deb47dda38e2f698234"></div>
    </div>
  );
}