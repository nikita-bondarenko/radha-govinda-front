// components/nav/NavItem.tsx
import Link from "next/link";
import React, { memo } from "react";
import useLocalizedHref from "@/hooks/useLocalizedHref";
import { MenuItem } from "../ui/nav/Nav";
import clsx from "clsx";
import { TextSlideUp } from "@/shared/ui/button/TextSlideUp";

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
  const text = data?.Text || "";

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx("block", className)} // убрали всю анимацию отсюда
    >
      <TextSlideUp>{text}</TextSlideUp>
    </Link>
  );
});