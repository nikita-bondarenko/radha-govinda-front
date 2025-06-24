import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
};

const ArrowRight = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
  
      viewBox="0 0 12 22"
      fill="none"
      className={clsx("w-full h-full", className)}
    >
      <path
        d="M1 1L11 11L1 21"
        stroke="#121212"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
