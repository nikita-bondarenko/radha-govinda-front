"use client";
import React, { useEffect, useState } from "react";
import Modal from "../utils/modal/Modal";
import MobileMenu, { MobileMenuProps } from "../ui/mobileMenu/MobileMenu";
import Nav, { Menu } from "../ui/nav/Nav";
import Burger from "../ui/burger/Burger";
import BoldArrow from "../svg/BoldArrow";
import { useRouter } from "next/navigation";
import { setLocale } from "@/lib/store/localeSlice";
import { Locale } from "@/utils/getLocalizedData";
import { useDispatch } from "react-redux";
type Props = {
  menu?: Menu | null;
  locale?: string | null | undefined;
};

export default function PlaylistHeader({ menu, locale }: Props) {
  const router = useRouter();
   const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(setLocale(locale as Locale));
    }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const burgerHandler = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenuButtonHandler = () => {
    setIsMobileMenuOpen(false);
  };

  const backButtonHandler = () => {
    router.back();
  };
  return (
    <header className="absolute top-0 left-0 w-full">
      <div className="container flex items-center py-[17px]">
        <button
          onClick={backButtonHandler}
          className=" h-[28px] w-[28px] p-[4px]"
        >
          <BoldArrow></BoldArrow>
        </button>
        <Burger
          dark={true}
          isMobileMenuOpen={isMobileMenuOpen}
          clickHandler={burgerHandler}
        ></Burger>
      </div>
      <MobileMenu
        menu={menu}
        locale={locale}
        closeMobileMenuButtonHandler={closeMobileMenuButtonHandler}
        isMobileMenuOpen={isMobileMenuOpen}
      ></MobileMenu>
    </header>
  );
}
