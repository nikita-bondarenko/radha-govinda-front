import React from "react";
import { FooterDocument } from "./Footer";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import { useLocaleSelector } from "@/lib/localeStore/hooks";
import { localizeHref } from "@/utils/localizeHref";

type Props = {
  document: FooterDocument;
};

export default function Document({ document }: Props) {
  const locale = useLocaleSelector((state) => state.locale);
  return (
    <Link
      href={localizeHref({
        pageLocale: locale,
        pageSlug: document?.Page?.Slug,
      })}
    >
      {document?.Text}
    </Link>
  );
}
