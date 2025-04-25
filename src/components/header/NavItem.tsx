import Link from "next/link";
import React, { memo } from "react";
import { MenuItem } from "./Header";

export type NavItemProps = {
  data: MenuItem;
  className?: string;
  onClick?: () => void
};

export default memo(function NavItem({
  data,
  className,
  onClick
}: NavItemProps) {
  return (
    <Link
    onClick={onClick}
      className={`${className}`}
      href={
        (data?.PageLink?.locale === "ru" ? "/" : "/en/") +
        (data?.PageLink?.Slug === "home" ? '' : data?.PageLink?.Slug )
      }
    >
      {data?.Text}
    </Link>
  );
});
