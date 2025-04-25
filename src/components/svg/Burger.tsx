import clsx from "clsx";
import React from "react";

export type SvgIconProps = {
    className?: string;
    fill?: string
}

export default function Burger({className, fill = 'white'}:SvgIconProps) {
  return (
    <svg
    className={clsx(className, "image")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 17"
      fill="none"
    >
      <rect
        x="0.03125"
        y="0.152344"
        width="20"
        height="2"
        rx="1"
        fill={fill}
      />
      <rect x="0.03125" y="7.15234" width="20" height="2" rx="1" fill={fill} />
      <rect x="0.03125" y="14.1523" width="20" height="2" rx="1" fill={fill} />
    </svg>
  );
}
