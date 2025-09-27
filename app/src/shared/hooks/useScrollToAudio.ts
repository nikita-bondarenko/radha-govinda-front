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
    console.log(element);
    if (element) {
      const scrollTop =
        window.scrollY + element.getBoundingClientRect().y - 100;
      console.log(window.scrollY, element.getBoundingClientRect().y, scrollTop);

      setTimeout(() => {
        try {
          document.body.scrollTo({ top: scrollTop, behavior: "smooth" });
          console.log(scrollTop);
        } catch (e) {
          console.log("scroll error message:", e);
        }
      }, 600);
    }
  };

  useEffect(() => {
    const categoryFromUrl = searchParams?.get("category");
    const audioFromUrl = searchParams?.get("audio");

    if (categoryFromUrl) {
      setInitialCategoryId(categoryFromUrl);
      dispatch(setSelectedCategoryId(categoryFromUrl));
    }

    if (audioFromUrl) {
      scrollToAudio(audioFromUrl);
    } 
    setIsInitialLoad(false);
  }, [searchParams, dispatch]);

  useEffect(() => {
    scrollTo({ top: 2000, left: 0, behavior: "smooth" });
  }, []);

  return {
    highlightedAudioId,
    isInitialLoad,
    initialCategoryId,
  };
};
