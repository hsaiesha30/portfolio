import { useState, useEffect } from 'react';

const useIsInView = (element, options = {}) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options]);

  return inView;
};

export default useIsInView;
