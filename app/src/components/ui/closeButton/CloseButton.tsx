import CloseIcon from "@/shared/ui/icons/CloseIcon";
import clsx from "clsx";
import React, { memo } from "react";

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
};

export default memo(function CloseButton({
  onClick,
  className,
}: CloseButtonProps) {
  return (
    <button onClick={onClick} className={clsx("close-button", className)}>
      <CloseIcon></CloseIcon>
    </button>
  );
});
