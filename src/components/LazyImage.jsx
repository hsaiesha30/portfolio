import { useState, useRef, useEffect, forwardRef } from 'react';

const LazyImage = forwardRef(({ 
  src, 
  alt, 
  className = '', 
  onError,
  loading = 'lazy',
  ...props 
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Use IntersectionObserver for better control
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  // For above-the-fold images (like hero), load immediately
  const shouldLoad = loading === 'eager' || isInView;

  // Combine refs
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(imgRef.current);
      } else {
        ref.current = imgRef.current;
      }
    }
  }, [ref, isLoaded]);

  return (
    <img
      ref={imgRef}
      src={shouldLoad ? src : undefined}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        willChange: 'opacity',
        ...props.style,
      }}
      {...props}
    />
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;

