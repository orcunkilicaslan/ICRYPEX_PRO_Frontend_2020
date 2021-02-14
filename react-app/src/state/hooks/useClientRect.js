import { useEffect, useState, useCallback } from "react";

const useClientRect = () => {
  const [rect, setRect] = useState({});
  const updateState = node => {
    setRect(prev => {
      const dimensions = node?.getBoundingClientRect?.();

      return dimensions ? dimensions : prev;
    });
  };
  const ref = useCallback(node => {
    if (node !== null) updateState(node);
  }, []);

  useEffect(() => {
    const onResize = () => updateState(ref.current);

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  return [rect, ref];
};

export default useClientRect;
