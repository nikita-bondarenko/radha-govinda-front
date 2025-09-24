import clsx from "clsx";
import React, { ReactNode } from "react";
import PauseIcon from "../svg/PauseIcon";

export type PlaylistButtonProps = {
  isVisible?: boolean;
  text?: string | null;
  icon: ReactNode;
  className: string;
  onClick: () => void;
};

export default function PlaylistButton({
  isVisible = true,
  text,
  icon,
  className,
  onClick,
}: PlaylistButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        ` rounded-full w-full flex justify-center items-start py-[15px] gap-[10px] font-bold text-[14px] leading-[110%] tracking-[0.5px] uppercase transition-opacity duration-500 opacity-0 pointer-events-none `,
        {
          "[&]:opacity-100 [&]:pointer-events-auto": isVisible,
        }
      )}
    >
      <span>{text}</span>
      <div className="relative w-[13px] h-[13px] icon-wrapper">
        {icon}
      </div>
    </button>
  );
}
