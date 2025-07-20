import Link from "next/link";
import React, { memo } from "react";
import useLocalizedHref from "@/hooks/useLocalizedHref";
import { MenuItem } from "../ui/nav/Nav";

export type NavItemProps = {
  data: MenuItem;
  className?: string;
  onClick?: () => void;
};

export default memo(function NavItem({
  data,
  className,
  onClick,
}: NavItemProps) {
  const href = useLocalizedHref({ pageSlug: data?.PageLink?.Slug });
  return (
    <Link onClick={onClick} className={`${className}`} href={href}>
      {data?.Text}
    </Link>
  );
});
