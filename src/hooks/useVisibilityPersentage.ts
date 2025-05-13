import { useInView } from "react-intersection-observer";

export default function useVisibilityPersentage() {
  const { ref, entry } = useInView({
    threshold: Array.from({ length: 101 }, (_, i) => i / 100), 
  });

  const visibilityPercentage = entry?.intersectionRatio
    ? Math.round(entry.intersectionRatio * 100)
    : 0;

  return { ref, percentInView: visibilityPercentage };
}
