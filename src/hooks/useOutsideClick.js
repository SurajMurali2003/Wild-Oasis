import { useEffect, useRef } from "react";

export function useOutsideClick(close, listenCapturing = true) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        console.log("CLose MOdel", modalRef.current);
        close();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [close, listenCapturing]);

  return modalRef;
}
