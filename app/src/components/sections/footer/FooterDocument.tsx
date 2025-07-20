"use client"
import React from "react";
import { FooterDocument } from "./Footer";
import Link from "next/link";
import useLocalizedHref from "@/hooks/useLocalizedHref";

type Props = {
  document: FooterDocument;
};

export default function Document({ document }: Props) {
  const href = useLocalizedHref({pageSlug: document?.Page?.Slug, postType: 'doc'})
  return (
    <Link
      href={href}
    >
      {document?.Text}
    </Link>
  );
}
