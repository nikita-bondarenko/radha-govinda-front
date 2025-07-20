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
  black?: boolean
};
export default function Nav({ menu, handleButtonClick,footer,black }: Props) {
  return (
    <nav className={clsx(styles["nav"],footer && styles.footer )}>
      <ul className={styles["nav-list"]}>
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
