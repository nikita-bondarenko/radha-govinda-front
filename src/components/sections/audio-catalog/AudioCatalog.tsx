"use client";
import React, { useState } from "react";
import { Audio } from "../audio-preview/AudioPreview";
import { Category } from "../video-catalog/VideoCatalog";
import Filter from "@/components/ui/filter/Filter";
import InfiniteVirtualGrid from "@/components/ui/infiniteVirtualGrid/InfiniteVirtualGrid";
import MovieItem from "@/components/ui/movieItem/MovieItem";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import { searchFilteringCondition } from "@/utils/searchFilteringCondition";
import AudioItem from "@/components/ui/audioItem/AudioItem";
import { useAppDispatch } from "@/lib/store/hooks";
import { setPlaylist } from "@/lib/store/audioSlice";

type Props = {
  audios: Audio[];
  audioCategories: Category[];
};

const AudioCatalog = ({ audioCategories, audios }: Props) => {
  const [filteredItems, setFilteredItems] = useState<Audio[]>(audios);
  const localizedData = useLocalizedStaticData();
  const dispatch = useAppDispatch();

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
        filterConditionByCategoryId={(item, categoryId) =>
          item?.AudioCategory?.documentId === categoryId
        }
        handleFilteredItemsSelection={setFilteredItems}
      />

      <InfiniteVirtualGrid
        items={filteredItems}
        renderItem={(audio) => (
          <AudioItem handleControlButtonClick={handleControlButtonClick} className="w-full h-full" audio={audio} />
        )}
        getItemKey={(audio) => audio?.documentId || ""}
        itemsPerPage={12}
        gap={{
          sm: 10,
          md: 10,
          lg: 20,
        }}
        itemHeight={{
          sm: 62,
          md: 80,
          lg: 120,
        }}
        className="container"
        loadThreshold={200}
        viewportBuffer={12}
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
