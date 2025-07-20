"use client";
import React, { useState, useEffect } from "react";
import { Audio } from "../audio-preview/AudioPreview";
import { Category } from "../video-catalog/VideoCatalog";
import Filter from "@/components/ui/filter/Filter";
import InfiniteVirtualGrid from "@/components/ui/infiniteVirtualGrid/InfiniteVirtualGrid";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import { searchFilteringCondition } from "@/utils/searchFilteringCondition";
import AudioItem from "@/components/ui/audioItem/AudioItem";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPlaylist, setSelectedCategoryId, selectAudioSelectedCategoryId } from "@/lib/store/audioSlice";
import { useSearchParams } from "next/navigation";

type Props = {
  audios: Audio[];
  audioCategories: Category[];
};

const audioItemHeight ={
  sm: 62,
  md: 80,
  lg: 120,
}

const audioCatalogGap = {
  sm: 10,
  md: 10,
  lg: 20,
}

const AudioCatalog = ({ audioCategories, audios }: Props) => {
  const [filteredItems, setFilteredItems] = useState<Audio[]>(audios);
  const [initialCategoryId, setInitialCategoryId] = useState<string | null>(null);
  const [highlightedAudioId, setHighlightedAudioId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const localizedData = useLocalizedStaticData();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 740
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

const scrollToAudio = (audioId: string) => {
  console.log('AudioCatalog: Setting highlighted audio ID:', audioId);
  setHighlightedAudioId(audioId);
  
  // Сбрасываем highlightedAudioId через 4 секунды (после подсветки)
  setTimeout(() => {
    console.log('AudioCatalog: Clearing highlighted audio ID');
    setHighlightedAudioId(null);
  }, 4000);
}
  // Получаем категорию из URL при загрузке компонента
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const audioFromUrl = searchParams.get('audio');
    console.log('AudioCatalog: searchParams.get("category") =', categoryFromUrl);
    console.log('AudioCatalog: available categories =', audioCategories.filter(c => c).map(c => ({ id: c!.documentId, name: c!.Name })));
    
    if (categoryFromUrl) {
      console.log('Category from URL:', categoryFromUrl);
      setInitialCategoryId(categoryFromUrl);
      dispatch(setSelectedCategoryId(categoryFromUrl));
    
    }

    if (audioFromUrl) {
      console.log('AudioCatalog: Found audioFromUrl:', audioFromUrl);
      console.log('AudioCatalog: filteredItems length:', filteredItems.length);
      
      // Мгновенный скролл при открытии страницы
      console.log('AudioCatalog: Executing immediate scrollToAudio');
      scrollToAudio(audioFromUrl);
      setIsInitialLoad(false);
    } else {
      setIsInitialLoad(false);
    }
  }, [searchParams, dispatch, audioCategories]);

  const handleControlButtonClick = () => {
    dispatch(setPlaylist(filteredItems))
  }

  return (
    <section>
      <Filter
        allCategoriesOptionText={
          localizedData?.section.filter.allCategoriesOption.audios
        }
        items={audios}
        categories={audioCategories}
        filterConditionBySearchInput={(item, searchInput) =>
          searchFilteringCondition(item?.Name, searchInput)
        }
        filterConditionByCategoryId={(item, categoryId) => {
          const matches = item?.AudioCategory?.documentId === categoryId;
          console.log('Filter condition check:', {
            itemName: item?.Name,
            itemCategoryId: item?.AudioCategory?.documentId,
            filterCategoryId: categoryId,
            matches
          });
          return matches;
        }}
        handleFilteredItemsSelection={setFilteredItems}
        initialCategoryId={initialCategoryId}
      />

      <InfiniteVirtualGrid
        items={filteredItems}
        renderItem={(audio, index, isHighlighted) => (
          <AudioItem 
            handleControlButtonClick={handleControlButtonClick} 
            className={`w-full h-full`} 
            audio={audio} 
          />
        )}
        getItemKey={(audio) => audio?.documentId || ""}
        itemsPerPage={12}
        gap={audioCatalogGap}
        itemHeight={audioItemHeight}
        className="container"
        loadThreshold={200}
        viewportBuffer={12}
        highlightedAudioId={highlightedAudioId || undefined}
        smoothScroll={!isInitialLoad}
        columns={{
          sm: 1,
          md: 1,
          lg: 1,
        }}
      />
    </section>
  );
};

export default AudioCatalog;
