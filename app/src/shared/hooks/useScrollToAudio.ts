import { Audio } from "@/components/sections/audio-preview/AudioPreview";
import { ItemsPerPage } from "@/components/ui/pagination/Pagination";
import { setSelectedCategoryId } from "@/lib/store/audioSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const breakpoints = {
  md: 1200,
  sm: 740,
};

type Props = {
  itemsPerPage: ItemsPerPage;
  items: Audio[];
};

export const useScrollToAudio = ({ itemsPerPage, items }: Props) => {
  const [highlightedAudioId, setHighlightedAudioId] = useState<string | null>(
    null
  );

  const [audioId, setAudioId] = useState<string | null>(null);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const searchParams = useSearchParams();

  const [initPage, setInitPage] = useState<number>();

  const [initialCategoryId, setInitialCategoryId] = useState<string | null>(
    null
  );

  const dispatch = useAppDispatch();

  const scrollToAudio = (audioId: string) => {
    setTimeout(() => {
      setHighlightedAudioId(audioId);

      setTimeout(() => {
        setHighlightedAudioId(null);
      }, 4000);
    }, 500);

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
      }, 200);
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
      setAudioId(audioFromUrl);
    }
    setIsInitialLoad(false);
  }, [searchParams, dispatch]);

  useEffect(() => {
    const innerWidth = window.innerWidth;
    console.log(itemsPerPage);
    let itemsPerPageActual: number | undefined = undefined;
    itemsPerPageActual = itemsPerPage.lg;
    if (innerWidth <= breakpoints.sm) itemsPerPageActual = itemsPerPage.sm;
    if (innerWidth <= breakpoints.md) itemsPerPageActual = itemsPerPage.md;

    if (itemsPerPageActual && audioId) {
      const itemIndex = items.findIndex(
        (items) => items?.documentId === audioId
      );
      const initPage = Math.floor(itemIndex / itemsPerPageActual) + 1;
      console.log(initPage);
      setInitPage(initPage);
      setTimeout(() => {
        scrollToAudio(audioId);
      }, 300);
    }
  }, [audioId]);

  return {
    initPage,
    highlightedAudioId,
    isInitialLoad,
    initialCategoryId,
  };
};
