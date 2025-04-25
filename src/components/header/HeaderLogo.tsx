import Link from "next/link";
import React, { memo } from "react";
import { Image } from "../utils/Picture";
import styles from "./Header.module.css"



export type HeaderLogoProps = {
  __typename?: string;
  logo?: Image;
  locale?: string | null;
};

export default memo(function HeaderLogo({ logo, locale }: HeaderLogoProps) {
  return (
    <Link
      style={{ "--header-logo-url": `url(${logo?.url})` } as React.CSSProperties}
      className={styles["header__logo"]}
      href={locale === "ru" ? "/" : "/en/"}
    ></Link>
  );
});
