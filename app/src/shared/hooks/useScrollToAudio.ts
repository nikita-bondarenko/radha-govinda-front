import { setSelectedCategoryId } from "@/lib/store/audioSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const useScrollToAudio = () => {
  const [highlightedAudioId, setHighlightedAudioId] = useState<string | null>(
    null
  );

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const searchParams = useSearchParams();

  const [initialCategoryId, setInitialCategoryId] = useState<string | null>(
    null
  );

  const dispatch = useAppDispatch();

  const scrollToAudio = (audioId: string) => {
    setHighlightedAudioId(audioId);

    setTimeout(() => {
      setHighlightedAudioId(null);
    }, 4000);

    const element = document.getElementById(audioId);

    if (element) {
      console.log(window.scrollY, element.getBoundingClientRect().y);
      const scrollTop =
        window.scrollY + element.getBoundingClientRect().y - 100;
      scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const audioFromUrl = searchParams.get("audio");

    if (categoryFromUrl) {
      setInitialCategoryId(categoryFromUrl);
      dispatch(setSelectedCategoryId(categoryFromUrl));
    }

    if (audioFromUrl) {
      scrollToAudio(audioFromUrl);
      setIsInitialLoad(false);
    } else {
      setIsInitialLoad(false);
    }
  }, [searchParams, dispatch]);

  return {
    highlightedAudioId,
    isInitialLoad,
    initialCategoryId,
  };
};
