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
import Pagination from "@/components/ui/pagination/Pagination";
import clsx from "clsx";

type Props = {
  audios: Audio[];
  audioCategories: Category[];
};

const itemsPerPage = { lg: 8, md: 8, sm: 6 };

const AudioCatalog = ({ audioCategories, audios }: Props) => {
  const [filteredItems, setFilteredItems] = useState<Audio[]>(audios);

  const localizedData = useLocalizedStaticData();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectAudioFlow);
  const audio = useAppSelector(selectAudio);
  const { highlightedAudioId, isInitialLoad, initialCategoryId, initPage } =
    useScrollToAudio({ items: filteredItems, itemsPerPage });
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
      <Pagination<Audio>
        className="flex flex-col gap-[20px] md:gap-[10px] sm:gap-[10px]"
        items={filteredItems}
        itemsPerPage={itemsPerPage}
        initPage={initPage}
        renderItem={(audio) => (
          <div className={clsx('transition-all duration-500',{"scale-[1.02] shadow-xl": audio?.documentId === highlightedAudioId})}>
            <AudioItem
            handleControlButtonClick={handleControlButtonClick}
            className={clsx(`w-full h-full`, {'[&]:bg-[#B6A9F1]':audio?.documentId === highlightedAudioId})}
            audio={audio}
          />
          </div>
        )}
      />
    </section>
  );
};

export default AudioCatalog;
