import { useAppSelector } from "@/lib/store/hooks";
import { PostType } from "@/utils/parseParams";
import React, { useMemo } from "react";

type Props = {
  pageSlug: string | null | undefined;
  postType?: PostType;
};

export default function useLocalizedHref({ pageSlug, postType = "page" }: Props) {
  const pageLocale = useAppSelector((state) => state.locale.locale);
  const href = `${pageLocale === "ru" ? `` : "/" + pageLocale}${
    postType === 'post' ? "/articles" : postType === 'doc' ? "/documents" : ""
  }/${pageSlug === "home" ? "" : pageSlug}`
  return href;
}
