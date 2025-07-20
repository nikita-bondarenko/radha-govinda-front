import { useAppSelector } from "@/lib/store/hooks";
import { PostType } from "@/utils/parseParams";
import React, { useMemo } from "react";

type Props = {
  pageSlug: string | null | undefined;
  postType?: PostType;
  categoryId?: string | null;
};

export default function useLocalizedHref({ pageSlug, postType = "page", categoryId }: Props) {
  const pageLocale = useAppSelector((state) => state.locale.locale);
  
  console.log('useLocalizedHref: input params =', { pageSlug, postType, categoryId });
  console.log('useLocalizedHref: pageLocale from store =', pageLocale);
  
  const baseHref = `${pageLocale === "ru" ? `` : "/" + pageLocale}${
    postType === 'post' ? "/articles" : postType === 'doc' ? "/documents" : ""
  }/${pageSlug === "home" ? "" : pageSlug}`;
  
  console.log('useLocalizedHref: baseHref =', baseHref);
  
  // Если указана категория, добавляем её как query параметр
  const href = categoryId ? `${baseHref}?category=${categoryId}` : baseHref;
  
  // Отладочная информация
  console.log('useLocalizedHref: final href =', href);
  
  return href;
}
