import { Category } from "@/components/sections/video-catalog/VideoCatalog";
import Search from "@/components/svg/Search";
import { Movie } from "@/gql/generated/graphql";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import { getLocalizedData } from "@/utils/getLocalizedData";
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import SelectOption from "./SelectOption";

type Props<T> = {
  categories: Category[];
  items: T[];
  filterConditionBySearchInput: (item: T, searchInput: string) => boolean;
  filterConditionByCategoryId: (item: T, selectedCategoryId: string) => boolean;
  handleFilteredItemsSelection: (items: T[]) => void;
  allCategoriesOptionText: string | undefined;
  initialCategoryId?: string | null;
};

const Filter = <T,>({
  categories,
  items,
  filterConditionByCategoryId,
  filterConditionBySearchInput,
  handleFilteredItemsSelection,
  allCategoriesOptionText,
  initialCategoryId,
}: Props<T>) => {
  const [searchInputValue, setSearchInputValue] = useState<string>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(initialCategoryId || undefined);
  const [filteredItemsAmount, setFilteredItemsAmount] = useState<number>(0);

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategoryId(initialCategoryId);
    }
  }, [initialCategoryId]);

 useEffect(() => {
  const url = new URL(window.location.href);

  if (selectedCategoryId) {
    url.searchParams.set('category', selectedCategoryId);
  } else {
    url.searchParams.delete('category');
  }
  window.history.pushState({}, '', url.toString());
}, [selectedCategoryId]);

  useEffect(() => {
    let filteredItems: T[] = items;

    if (selectedCategoryId) {
      filteredItems = filteredItems.filter((item: T) =>
        filterConditionByCategoryId(item, selectedCategoryId)
      );
    }

    if (!!searchInputValue && searchInputValue.trim().length > 0) {
      filteredItems = filteredItems.filter((item) =>
        filterConditionBySearchInput(item, searchInputValue)
      );
    }

    handleFilteredItemsSelection(filteredItems);
    setFilteredItemsAmount(filteredItems.length);
  }, [searchInputValue, selectedCategoryId, items]);

  const localizedData = useLocalizedStaticData();

  return (
    <>
      <div className="flex items-start justify-between md:flex-col md:gap-[20px] container mb-[42px] md:mb-[40px] sm:mb-[23px]">
        <div className="flex max-w-[716px] gap-x-[14px] gap-y-[8px] flex-wrap md:gap-x-[20px] sm:max-w-full sm:flex-nowrap sm:overflow-x-auto sm:scrollbar-hide sm:overscroll-x-contain sm:touch-pan-x sm:select-none">
          <SelectOption
            children={allCategoriesOptionText}
            isSelected={!selectedCategoryId}
            onClick={() => setSelectedCategoryId(undefined)}
          />
          {categories.map((category) => (
            <SelectOption
              key={category?.documentId}
              children={category?.Name}
              isSelected={selectedCategoryId === category?.documentId}
              onClick={() => setSelectedCategoryId(category?.documentId)}
            />
          ))}
        </div>
        <div className="relative">
          <input
            className="rounded-full border-[#818181] border p-[12px] pl-[46px] text-[14px] leading-[110%] w-[280px] md:w-[320px] sm:w-full"
            placeholder={localizedData?.section.filter.input.placeholder || ""}
            type="text"
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <Search className="w-[24px] h-[24px] absolute top-1/2 -translate-y-1/2 left-[19px]" />
        </div>
      </div>

      {filteredItemsAmount === 0 && (
        <div
          className={`text-center py-10 section-heading text-grey-middle mt-[50px]`}
        >
          <p>{localizedData?.section.catalog.emptyMessage}</p>
        </div>
      )}
    </>
  );
};

export default Filter;
