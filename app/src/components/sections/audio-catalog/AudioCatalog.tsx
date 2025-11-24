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
import {
  setPlaylist,
  setSelectedCategoryId,
  selectAudioSelectedCategoryId,
  selectAudioFlow,
  setPlaylistAudioPositions,
  selectAudio,
} from "@/lib/store/audioSlice";
import { useSearchParams } from "next/navigation";
import { shuffleAudioList } from "@/utils/shuffleAudioList";
import { useScrollToAudio } from "@/shared/hooks/useScrollToAudio";

type Props = {
  audios: Audio[];
  audioCategories: Category[];
};

const audioItemHeight = {
  sm: 62,
  md: 80,
  lg: 120,
};

const audioCatalogGap = {
  sm: 10,
  md: 10,
  lg: 20,
};

const AudioCatalog = ({ audioCategories, audios }: Props) => {
  const [filteredItems, setFilteredItems] = useState<Audio[]>(audios);

  const localizedData = useLocalizedStaticData();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectAudioFlow);
  const audio = useAppSelector(selectAudio);
  const { highlightedAudioId, isInitialLoad, initialCategoryId } =
    useScrollToAudio();
  const handleControlButtonClick = () => {
    dispatch(setPlaylist(filteredItems));
    let playlistAudioPositions = [];
    if (flow === "direct") {
      playlistAudioPositions = filteredItems.map(
        (audio) => audio?.documentId || ""
      );
    } else {
      playlistAudioPositions = shuffleAudioList(filteredItems);
    }
    dispatch(setPlaylistAudioPositions(playlistAudioPositions));
  };

  useEffect(() => {
    if (!audio) dispatch(setPlaylist(filteredItems));
  }, []);

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
