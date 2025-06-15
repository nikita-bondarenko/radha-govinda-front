"use client"
import React from "react";
import { FooterDocument } from "./Footer";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import { useLocaleSelector } from "@/lib/localeStore/hooks";
import { localizeHref } from "@/utils/localizeHref";
import useLocalizedHref from "@/hooks/useLocalizedHref";

type Props = {
  document: FooterDocument;
};

export default function Document({ document }: Props) {
  const href = useLocalizedHref({pageSlug: document?.Page?.Slug,})
  return (
    <Link
      href={href}
    >
      {document?.Text}
    </Link>
  );
}
