"use client"
import BurgerIcon from "@/shared/ui/icons/BurgerIcon";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  isMobileMenuOpen: boolean;
  clickHandler: () => void;
  dark: boolean | undefined;
};

export default function Burger({
  isMobileMenuOpen,
  clickHandler,
  dark,
}: Props) {
  const [burgerRootElement, setBurgerRootElement] = useState<HTMLElement>();
  const [isMenuBeingAnimated, setIsMenuBeingAnimated] = useState(false);

  useEffect(() => {
    const rootElement = document.body;
    if (rootElement) setBurgerRootElement(rootElement);
  }, []);

  const burgerHandler = () => {
    setIsMenuBeingAnimated(true);
    setTimeout(() => {
      setIsMenuBeingAnimated(false);
    }, 500);
    clickHandler();
  };
  return (
    burgerRootElement &&
    createPortal(
      <button
        onClick={burgerHandler}
        className={clsx(
          "hidden md:block h-[16px] w-[20px] z-[150] absolute top-[25px] right-[19px]",
          {
            "pointer-events-none": isMenuBeingAnimated,
          }
        )}
      >
        <BurgerIcon
          isCrossShape={isMobileMenuOpen}
          fill={dark ? "black" : "white"}
        ></BurgerIcon>
      </button>,
      burgerRootElement
    )
  );
}
