"use client";
import Filter from "@/components/ui/filter/Filter";
import { Movie } from "@/components/sections/video-preview/VideoPreview";
import React, { useState } from "react";
import MovieItem from "@/components/ui/movieItem/MovieItem";
import VirtualizedGrid from "@/components/ui/virtualizedGrid/VirtualizedGrid";
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
    <div>
      <Filter
        allCategoriesOptionText={localizedData?.section.filter.allCategoriesOption.movies}
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
      
   <ul className="container grid grid-cols-2 gap-[20px] md:gap-[10px] sm:grid-cols-1 sm:gap-[20px]">
    {filteredItems.map((movie) => (
      <MovieItem 
        className="aspect-[16/9] [&_iframe]:w-full [&_iframe]:h-full w-full h-full" 
        movie={movie}
      />
    ))}
   </ul>
    </div>
  );
};

export default VideoCatalog;
