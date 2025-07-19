import { useEffect, useState } from "react";

export const useVisibilityPersentage = (ref: React.RefObject<HTMLElement>) => {
  const [visibilityPercentage, setVisibilityPercentage] = useState(0);

  useEffect(() => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') return;
    
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const percentage = entry.intersectionRatio * 100;
        console.log('IntersectionObserver:', {
          intersectionRatio: entry.intersectionRatio,
          percentage,
          isIntersecting: entry.isIntersecting
        });
        setVisibilityPercentage(percentage);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref]);

  return visibilityPercentage;
};
