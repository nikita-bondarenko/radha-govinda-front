import { useInView } from "react-intersection-observer";

export default function useVisibilityPercentageHorizontal() {
  const { ref, entry } = useInView({
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    root: null,
    rootMargin: "0px",
    trackVisibility: true,
    delay: 100,
  });

  const visibilityPercentage = entry?.boundingClientRect && entry?.intersectionRect
    ? Math.round((entry.intersectionRect.width / entry.boundingClientRect.width) * 100)
    : 0;

  return { ref, percentInView: visibilityPercentage };
}
