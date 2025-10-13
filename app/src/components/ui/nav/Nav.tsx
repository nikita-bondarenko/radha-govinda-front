import React from "react";
import styles from "./Nav.module.css";
import NavItem from "@/components/header/NavItem";
import clsx from "clsx";

export type MenuItem = {
  __typename?: "ComponentMenuElementMenyu";
  Text?: string | null;
  id: string;
  PageLink?: {
    __typename?: "Page";
    Slug: string;
    locale?: string | null;
  } | null;
} | null;

export type Menu =
  | {
      __typename?: "Menu";
      Menu?: Array<MenuItem> | null;
    }
  | null
  | undefined;

type Props = {
  menu: Menu;
  handleButtonClick?: () => void;
  footer?: boolean;
  black?: boolean;
  className?: string;
};
export default function Nav({
  menu,
  handleButtonClick,
  footer,
  black,
  className,
}: Props) {
  return (
    <nav className={clsx(styles["nav"], footer && styles.footer)}>
      <ul
        className={clsx(
          className,
          "flex   ",
          footer ? "flex-col items-start gap-[20px] md:gap-[10px]" : "items-center gap-[40px] md:flex-col md:gap-[14px] md:items-end"
        )}
      >
        {menu?.Menu?.map((menuItem) => (
          <NavItem
            onClick={handleButtonClick}
            className={clsx(styles["nav-item"], !black && styles.white)}
            data={menuItem}
            key={menuItem?.id}
          ></NavItem>
        ))}
      </ul>
    </nav>
  );
}
