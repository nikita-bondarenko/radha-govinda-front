"use client";
import Link from "next/link";
import React, { memo, useEffect } from "react";
import { Image } from "../utils/Picture";
import styles from "./Header.module.css"
import { setLogoUrl } from "@/lib/store/audioSlice";
import { useDispatch } from "react-redux";



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
      style={{ "--header-logo-url": `url(${logo?.url})` } as React.CSSProperties}
      className={styles["header__logo"]}
      href={locale === "ru" ? "/" : "/en/"}
    ></Link>
  );
});
