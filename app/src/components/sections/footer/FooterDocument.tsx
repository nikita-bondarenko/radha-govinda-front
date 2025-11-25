"use client";
import React from "react";
import { FooterDocument } from "./Footer";
import Link from "next/link";
import useLocalizedHref from "@/hooks/useLocalizedHref";

type Props = {
  document: FooterDocument;
};

export default function Document({ document }: Props) {
  const href = useLocalizedHref({
    pageSlug: document?.Page?.Slug,
    postType: "doc",
  });
  return (
    <Link href={href} className="group inline-block">
      <span className="text-[16px] leading-[110%] tracking-[0.32px] text-white opacity-50 group-hover:opacity-100 font-normal md:text-[14px] transition-opacity duration-300">
        {document?.Text}
      </span>
    </Link>
  );
}
