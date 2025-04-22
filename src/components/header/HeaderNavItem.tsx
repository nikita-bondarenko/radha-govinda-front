import Link from "next/link";
import React, { memo } from "react";
import { MenuItem } from "./Header";

export type HeaderNavItemProps = {
  data: MenuItem;
  className?: string;
};

export default memo(function HeaderNavItem({
  data,
  className,
}: HeaderNavItemProps) {
  return (
    <Link
      className={`${className}`}
      href={
        data?.PageLink?.locale === "ru" ? "/" : "/en/" +
        data?.PageLink?.Slug
      }
    >
      {data?.Text}
    </Link>
  );
});
