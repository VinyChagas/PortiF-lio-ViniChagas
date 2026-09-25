import { useEffect, useState } from 'react';

export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');

    const update = () => {
      setFine(media.matches && window.innerWidth >= 1024);
    };

    update();
    media.addEventListener('change', update);
    window.addEventListener('resize', update);

    return () => {
      media.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return fine;
}
