'use client';

export default function AdsterraBanner() {
  return (
    <div className="flex justify-center items-center my-6 w-full overflow-hidden">
        {/* Carrega o arquivo HTML estático que criamos na pasta public */}
        <iframe 
            src="/ads/banner-native.html" 
            width="728" 
            height="90" 
            scrolling="no" 
            frameBorder="0"
            className="max-w-full"
            style={{ border: 'none' }}
        />
    </div>
  );
}