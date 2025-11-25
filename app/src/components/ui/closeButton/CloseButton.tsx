import CloseIcon from "@/shared/ui/icons/CloseIcon";
import clsx from "clsx";
import React, { memo, useMemo, useState } from "react";

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
};

export default memo(function CloseButton({
  onClick,
  className,
}: CloseButtonProps) {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const fill = useMemo(() => isHover ? '#7A66D5' : "black", [isHover])
  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={clsx("close-button", className)}
    >
      <CloseIcon fill={fill}></CloseIcon>
    </button>
  );
});
