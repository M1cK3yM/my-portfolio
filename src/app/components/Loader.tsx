'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState == "complete") {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);

      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-white'>
      <div className='animate-spin w-10 h-10 border-4 border-blue-300 border-t-transparent rounded-full'></div>
    </div>
  )
}
