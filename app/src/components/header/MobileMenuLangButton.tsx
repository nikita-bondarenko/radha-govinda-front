"use client";
import { langButtons } from "@/utils/langButtons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  locale?: string | null;
  clickHandler: () => void;
};

export default function MobileMenuLangButton({ locale, clickHandler }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex  gap-[10px] font-bold text-[20px] leading-[100%] tracking-[2%] text-white">
      {langButtons.map((buttonData) => (
        <Link
          key={buttonData.label}
          onClick={clickHandler}
          className={clsx({
            "underline pointer-events-none underline-offset-[5px]":
              locale === buttonData.locale,
          })}
          href={buttonData.getHref(pathname)}
        >
          {buttonData.label}
        </Link>
      ))}
    </div>
  );
}
