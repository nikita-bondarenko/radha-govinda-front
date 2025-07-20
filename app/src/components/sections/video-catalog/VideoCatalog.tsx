"use client";
import Filter from "@/components/ui/filter/Filter";
import { Movie } from "@/components/sections/video-preview/VideoPreview";
import React, { useState } from "react";
import MovieItem from "@/components/ui/movieItem/MovieItem";
import InfiniteVirtualGrid from "@/components/ui/infiniteVirtualGrid/InfiniteVirtualGrid";
import { searchFilteringCondition } from "@/utils/searchFilteringCondition";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";

export type Category = {
  __typename?: string;
  Name: string;
  documentId: string;
} | null;

type Props = {
  movies: Movie[];
  videoCategories: Category[];
};

const VideoCatalog = ({ movies, videoCategories }: Props) => {
  const [filteredItems, setFilteredItems] = useState<Movie[]>(movies);
  const localizedData = useLocalizedStaticData();

  return (
    <section>
      <Filter
        allCategoriesOptionText={
          localizedData?.section.filter.allCategoriesOption.movies
        }
        items={movies}
        categories={videoCategories}
        filterConditionBySearchInput={(item, searchInput) =>
          searchFilteringCondition(item?.MovieName, searchInput)
        }
        filterConditionByCategoryId={(item, categoryId) =>
          item?.VideoCategory?.documentId === categoryId
        }
        handleFilteredItemsSelection={setFilteredItems}
      />

      <InfiniteVirtualGrid
        items={filteredItems}
        renderItem={(movie) => (
          <MovieItem
            className="aspect-[16/9] [&_iframe]:w-full [&_iframe]:h-full w-full h-full"
            movie={movie}
          />
        )}
        getItemKey={(movie) => movie?.documentId || ""}
        itemsPerPage={12}
        aspectRatio={{
          sm: 16 / 9,
          md: 16 / 9,
          lg: 16 / 9,
        }}
        gap={{
          sm: 20,
          md: 10,
          lg: 20,
        }}
        className="container"
        loadThreshold={800}
        viewportBuffer={12}
        columns={{
          sm: 1,
          md: 2,
          lg: 2,
        }}
      />
    </section>
  );
};

export default VideoCatalog;
