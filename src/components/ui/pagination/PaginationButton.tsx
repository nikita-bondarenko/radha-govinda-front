import ArrowLeft from "@/components/svg/ArrowLeft";
import React from "react";

type Props = {
  children:  React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const PaginationButton = (props: Props) => {
  return (
    <button
      className={"w-[30px] h-[30px] flex items-center justify-center"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className="w-[12px] h-[22px]">{props.children}</div>
    </button>
  );
};

export default PaginationButton;
