import { useLocaleSelector } from "@/lib/localeStore/hooks";
import React, { useMemo } from "react";

type Props = {
  pageSlug: string | null | undefined;
  category?: string;
};

export default function useLocalizedHref({ pageSlug, category }: Props) {
  const pageLocale = useLocaleSelector((state) => state.locale.locale);
  const href = `${pageLocale === "ru" ? `` : "/" + pageLocale}${
    category ? "/" + category : ""
  }/${pageSlug}`
  return href;
}
