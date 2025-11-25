import React from "react";
import { SvgIconProps } from "./BurgerIcon";
import clsx from "clsx";

export default function CloseIcon({  className, fill = 'black' }: SvgIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className, "image [&_*]:transition-all [&_*]:duration-300")}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M1.05131 1.08376L17 17M1 17L16.9998 1"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
