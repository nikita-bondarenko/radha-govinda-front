import Link from "next/link";
import React, { memo } from "react";

export type HeaderLogo = {
  __typename?: "Logo";
  logo?: {
    __typename?: "UploadFile";
    formats?: any | null;
    url: string;
    alternativeText?: string | null;
  } | null;
  locale?: string | null;
};

export default memo(function HeaderLogo({ logo, locale }: HeaderLogo) {
  return (
    <Link
      style={{ "--header-logo-url": logo?.url } as React.CSSProperties}
      className="header__logo"
      href={locale === "ru" ? "/" : "/en/"}
    ></Link>
  );
});
