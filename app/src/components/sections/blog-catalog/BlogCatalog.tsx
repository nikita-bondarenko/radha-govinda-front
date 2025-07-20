"use client";
import React, { useState } from "react";
import { Category } from "../video-catalog/VideoCatalog";
import { Post } from "../blog-preview/BlogPreview";
import Filter from "@/components/ui/filter/Filter";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import { searchFilteringCondition } from "@/utils/searchFilteringCondition";
import PostPreview from "@/components/ui/postPreview/PostPreview";
import Pagination from "@/components/ui/pagination/Pagination";

type Props = {
  posts: Post[];
  postsCategories: Category[];
};

const BlogCatalog = ({ posts, postsCategories }: Props) => {
  const [filteredItems, setFilteredItems] = useState<Post[]>(posts);
  const localizedData = useLocalizedStaticData();
  return (
    <section>
      <Filter
        items={posts}
        allCategoriesOptionText={
          localizedData?.section.filter.allCategoriesOption.posts
        }
        categories={postsCategories}
        filterConditionBySearchInput={(item, searchInput) =>
          searchFilteringCondition(item?.PostTitle, searchInput)
        }
        filterConditionByCategoryId={(item, selectedCategoryId) =>
          item?.PostCategory?.documentId === selectedCategoryId
        }
        handleFilteredItemsSelection={setFilteredItems}
      />

      <Pagination
        className="flex flex-col gap-[20px] md:gap-[10px] sm:gap-[20px]"
        items={filteredItems}
        itemsPerPage={{ lg: 6, md: 5, sm: 4 }}
        renderItem={(item) => (
          <PostPreview key={item?.documentId} post={item} className="" />
        )}
      />
    </section>
  );
};

export default BlogCatalog;
