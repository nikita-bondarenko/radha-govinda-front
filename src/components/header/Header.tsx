"use client";
import React, { memo, ReactNode, useEffect, useState } from "react";
import HeaderNavItem from "./NavItem";
import HeaderLectureBar, { HeaderButton } from "./HeaderLectureBar";
import HeaderLangButton from "./HeaderLangButton";
import { Maybe } from "@/gql/generated/graphql";
import Modal from "../utils/modal/Modal";
import styles from "./Header.module.css";
import clsx from "clsx";
import Burger from "../svg/Burger";
import CloseIcon from "../svg/CloseIcon";
import CloseButton from "../ui/closeButton/CloseButton";
import Nav, { Menu } from "../ui/nav/Nav";
import SiteName from "./SiteName";
import { useAppDispatch } from "@/lib/store/hooks";
import { setIsHeaderButtonVisible } from "@/lib/store/audioSlice";

export type HeaderProps = {
  menu: Menu;
  light?: boolean;
  dark?: boolean;
  IsLanguageButtonVisible?: boolean | null;
  IsBigButtonVisible?: boolean | null;
  logo: ReactNode;
  BigButton?: HeaderButton;
  pageSlug: string;
  locale?: string | null;
  lectureBarClassName?: string;
  isSiteName?: boolean;
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
  lectureBarClassName,
  isSiteName,
}: HeaderProps) {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Устанавливаем состояние кнопки в Redux
  useEffect(() => {
    console.log('Header setting button visibility:', IsBigButtonVisible);
    dispatch(setIsHeaderButtonVisible(!!IsBigButtonVisible));
  }, [IsBigButtonVisible, dispatch]);
  
  const burgerHandler = () => {
    setIsModalOpen(true);
  };

  const closeMobileMenuButtonHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["header__left"]}>
        {logo}
        <div className="desktop-only">
          <Nav black={dark} menu={menu}></Nav>
        </div>
      </div>
      <div className="pr-[70px] justify-self-end flex-grow flex justify-end lgs:pr-[20px] translate-y-[-1px] md:justify-center md:pr-0 sm:hidden">
      {isSiteName && <SiteName></SiteName>}
      </div>
      <div className={clsx(styles["header__right"])}>
        {IsBigButtonVisible && (
          <HeaderLectureBar
            className={clsx("non-mobile", lectureBarClassName)}
            button={BigButton}
          ></HeaderLectureBar>
        )}
        {IsLanguageButtonVisible && (
          <HeaderLangButton
            className={clsx(dark && styles.black, "desktop-only")}
            pageSlug={pageSlug}
            locale={locale}
          ></HeaderLangButton>
        )}
        <button onClick={burgerHandler} className={styles["header__burger"]}>
          <Burger fill={dark ? "black" : "white"}></Burger>
        </button>
      </div>

      <Modal isOpen={isModalOpen}>
        <div className={styles["mobile-menu"]}>
          <div className={styles["mobile-menu__body"]}>
            <CloseButton
              className="mr-[-8px]"
              onClick={closeMobileMenuButtonHandler}
            ></CloseButton>

            <Nav
              menu={menu}
              handleButtonClick={closeMobileMenuButtonHandler}
            ></Nav>
          </div>
        </div>
      </Modal>
    </header>
  );
});
