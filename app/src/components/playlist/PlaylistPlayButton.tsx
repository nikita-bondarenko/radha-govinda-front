import clsx from "clsx";
import React from "react";
import PlayIcon from "../../shared/ui/icons/PlayIcon";
import PlaylistButton from "./PlaylistButton";

type PlaylistPlayButtonProps = {
  text?: string;
  isLoading: boolean;
  onClick: () => void;
};

export default function PlaylistPlayButton({
  text,
  isLoading,
  onClick,
}: PlaylistPlayButtonProps) {
  return (
    <PlaylistButton
      text={text}
      onClick={onClick}
      icon={
        <PlayIcon
          fill={"#fff"}
          className={clsx("play-icon icon-visible", {
            "play-button-loading": isLoading,
          })}
        ></PlayIcon>
      }
      isVisible={true}
      className="bg-[#7A66D5] text-white [&_.icon-wrapper]:scale-75 [&_.icon-wrapper]:translate-y-[1px]"
    ></PlaylistButton>
  );
}
