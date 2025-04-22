import React, { memo, ReactNode, useState } from "react";
import HeaderNavItem from "./HeaderNavItem";
import HeaderLectureBar, { HeaderButton } from "./HeaderLectureBar";
import HeaderLangButton from "./HeaderLangButton";
import { Maybe } from "@/gql/generated/graphql";
import Modal from "../utils/Modal";

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
    <nav className="header__nav">
      <ul className="header__nav-list">
        {menu?.Menu?.map((menuItem) => (
          <HeaderNavItem
            className="header__nav-item"
            data={menuItem}
            key={menuItem?.id}
          ></HeaderNavItem>
        ))}
      </ul>
    </nav>
  );
  return (
    <header className="header">
      <div className="header__left">
        {logo}
        {nav}
      </div>
      <div className="header__right">
        {IsBigButtonVisible && (
          <HeaderLectureBar button={BigButton}></HeaderLectureBar>
        )}
        {IsLanguageButtonVisible && (
          <HeaderLangButton
            pageSlug={pageSlug}
            locale={locale}
          ></HeaderLangButton>
        )}
        <button onClick={burgerHandler} className="header__burger"></button>
      </div>
      <Modal isOpen={isModalOpen}>
        <div className="mobile-menu">
          <div className="mobile-menu__body">
            <button
              onClick={closeMobileMenuButtonHandler}
              className="mobule-menu__close-button"
            ></button>
            {nav}
          </div>
        </div>
      </Modal>
    </header>
  );
});
