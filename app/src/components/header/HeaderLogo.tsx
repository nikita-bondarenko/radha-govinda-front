"use client";
import Link from "next/link";
import React, { memo, useEffect } from "react";
import { Image } from "../utils/Picture";
import styles from "./Header.module.css"
import { setLogoUrl } from "@/lib/store/audioSlice";
import { useDispatch } from "react-redux";
import clsx from "clsx";



export type HeaderLogoProps = {
  __typename?: string;
  logo?: Image;
  locale?: string | null;
};

export default memo(function HeaderLogo({ logo, locale }: HeaderLogoProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLogoUrl(logo?.url || null));  
  }, [logo, dispatch]);

  return (
   <Link
  href={locale === "ru" ? "/" : "/en/"}
  className={clsx(
    styles["header__logo"],
    // Только это добавляем:
    "group transition-all duration-500 ease-out",
    "hover:scale-[1.03] hover:brightness-110",
    "active:scale-95"
  )}
  style={{ "--header-logo-url": `url(${logo?.url})` } as React.CSSProperties}
>
  {/* Очень тонкое свечение — почти незаметно, но делает логотип "живым" */}
  <span className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-white/20 blur-xl transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-100" />
  
  {/* Основной логотип — без изменений */}
  <span className="relative block w-full h-full" />
</Link>
  );
});
