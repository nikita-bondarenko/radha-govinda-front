"use client";
import React, { useState } from "react";
import Modal from "../utils/modal/Modal";
import MobileMenu, { MobileMenuProps } from "../ui/mobileMenu/MobileMenu";
import Nav, { Menu } from "../ui/nav/Nav";
import Burger from "../ui/burger/Burger";
import BoldArrow from "../svg/BoldArrow";
import { useRouter } from "next/navigation";
type Props = {
  menu?: Menu | null;
  locale?: string | null | undefined;
};

export default function PlaylistHeader({ menu, locale }: Props) {
  const router = useRouter();

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
    <header>
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
