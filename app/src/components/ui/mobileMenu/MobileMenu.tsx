import MobileMenuLangButton from "@/components/header/MobileMenuLangButton";
import Modal from "@/components/utils/modal/Modal";
import React from "react";
import Nav, { Menu } from "../nav/Nav";

export type MobileMenuProps = {
  isMobileMenuOpen: boolean;
  menu: Menu;
  locale?: string | null | undefined;
  closeMobileMenuButtonHandler: () => void;
};

export default function MobileMenu({
  isMobileMenuOpen,
  menu,
  closeMobileMenuButtonHandler,
  locale,
}: MobileMenuProps) {
  return (
    <Modal isOpen={isMobileMenuOpen}>
      <div className="mobile-menu">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        <div className="mobile-menu__body">
          <Nav
            className="md:[&]:gap-[10px] md:[&_a]:text-[20px] md:[&_a]:leading-[100%] md:[&_a]:tracking-[2%]"
            menu={menu}
            handleButtonClick={closeMobileMenuButtonHandler}
          ></Nav>
          <MobileMenuLangButton
            locale={locale}
            clickHandler={closeMobileMenuButtonHandler}
          ></MobileMenuLangButton>
        </div>
      </div>
    </Modal>
  );
}
