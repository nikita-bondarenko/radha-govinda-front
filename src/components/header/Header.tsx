"use client";
import React, { memo, ReactNode, useEffect, useState } from "react";
import HeaderNavItem from "./NavItem";
import HeaderLectureBar, { HeaderButton } from "./HeaderLectureBar";
import HeaderLangButton from "./HeaderLangButton";
import { Maybe } from "@/gql/generated/graphql";
import Modal from "../utils/module/Modal";
import styles from "./Header.module.css";
import clsx from "clsx";
import Burger from "../svg/Burger";
import CloseIcon from "../svg/CloseIcon";

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

export type HeaderProps = {
  menu:
    | {
        __typename?: "Menu";
        Menu?: Array<MenuItem> | null;
      }
    | null
    | undefined;
  light?: boolean;
  dark?: boolean;
  IsLanguageButtonVisible?: boolean | null;
  IsBigButtonVisible?: boolean | null;
  logo: ReactNode;
  BigButton?: HeaderButton;
  pageSlug: string;
  locale?: string | null;
};

export default memo(function Header({
  menu,
  light,
  dark,
  logo,
  IsBigButtonVisible,
  IsLanguageButtonVisible,
  BigButton,
  pageSlug,
  locale,
}: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const burgerHandler = () => {
    setIsModalOpen(true);
  };

  const closeMobileMenuButtonHandler = () => {
    setIsModalOpen(false);
  };

  const nav = (
    <nav className={styles["header__nav"]}>
      <ul className={styles["header__nav-list"]}>
        {menu?.Menu?.map((menuItem) => (
          <HeaderNavItem
            onClick={closeMobileMenuButtonHandler}
            className={clsx(styles["header__nav-item"], styles.white)}
            data={menuItem}
            key={menuItem?.id}
          ></HeaderNavItem>
        ))}
      </ul>
    </nav>
  );
  return (
    <header className={styles["header"]}>
      <div className={styles["header__left"]}>
        {logo}
        <div className="desktop-only">{nav}</div>
      </div>
      <div className={clsx(styles["header__right"])}>
        {IsBigButtonVisible && (
          <HeaderLectureBar className="non-mobile" button={BigButton}></HeaderLectureBar>
        )}
        {IsLanguageButtonVisible && (
          <HeaderLangButton
            className={clsx(styles.white, "desktop-only")}
            pageSlug={pageSlug}
            locale={locale}
          ></HeaderLangButton>
        )}
        <button onClick={burgerHandler} className={styles["header__burger"]}>
        <Burger></Burger>
      </button>
      </div>
      

      <Modal isOpen={isModalOpen}>
        <div className={styles["mobile-menu"]}>
          <div className={styles["mobile-menu__body"]}>
            <button
              onClick={closeMobileMenuButtonHandler}
              className={styles["mobule-menu__close-button"]}
            >
              <CloseIcon></CloseIcon>
            </button>
            {nav}
          </div>
        </div>
      </Modal>
    </header>
  );
});
