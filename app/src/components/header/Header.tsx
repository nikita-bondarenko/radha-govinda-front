"use client";
import React, {
  createRef,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import HeaderLectureBar, { HeaderButton } from "./HeaderLectureBar";
import HeaderLangButton from "./HeaderLangButton";
import styles from "./Header.module.css";
import clsx from "clsx";
import Nav, { Menu } from "../ui/nav/Nav";
import SiteName from "./SiteName";
import { useAppDispatch } from "@/lib/store/hooks";
import { setIsHeaderButtonVisible, setIsMobile } from "@/lib/store/audioSlice";
import MobileMenu from "../ui/mobileMenu/MobileMenu";
import Burger from "../ui/burger/Burger";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setIsHeaderButtonVisible(!!IsBigButtonVisible));
  }, [IsBigButtonVisible, dispatch]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768;
      dispatch(setIsMobile(isMobile));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [dispatch]);


  const burgerHandler = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

  };

  const closeMobileMenuButtonHandler = () => {
    setIsMobileMenuOpen(false);
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
        <Burger
          dark={dark}
          isMobileMenuOpen={isMobileMenuOpen}
          clickHandler={burgerHandler}
        ></Burger>
      </div>
      <MobileMenu
        locale={locale}
        isMobileMenuOpen={isMobileMenuOpen}
        menu={menu}
        closeMobileMenuButtonHandler={closeMobileMenuButtonHandler}
        IsLanguageButtonVisible={IsLanguageButtonVisible}
      ></MobileMenu>
    </header>
  );
});
