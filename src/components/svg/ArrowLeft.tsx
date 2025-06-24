import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
};

const ArrowLeft = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
 
      viewBox="0 0 12 22"
      fill="none"
      className={clsx("w-full h-full", className)}
    >
      <path
        d="M11 21L0.999999 11L11 0.999999"
        stroke="#121212"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;
