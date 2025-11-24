import clsx from "clsx";
import React from "react";
import PauseIcon from "../../shared/ui/icons/PauseIcon";
import PlaylistButton from "./PlaylistButton";

type PlaylistStopButtonProps = {
  text?: string;
  onClick: () => void;
  isVisible: boolean;
};

export default function PlaylistStopButton({
  text,
  onClick,
  isVisible,
}: PlaylistStopButtonProps) {
  return (
    <PlaylistButton
      text={text}
      onClick={onClick}
      icon={
        <PauseIcon
          fill={"white"}
          className={clsx("pause-icon icon-visible scale-75")}
        ></PauseIcon>
      }
      isVisible={isVisible}
      className="bg-[#7A66D5] text-white absolute top-0 left-0 [&_.icon-wrapper]:translate-y-[1px] z-10"
    ></PlaylistButton>
  );
}
