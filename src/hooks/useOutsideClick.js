import { useEffect, useRef } from 'react';

export function useOutsideClick(close) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        console.log('CLose MOdel', modalRef.current);
        close();
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, [close]);

  return modalRef;
}
