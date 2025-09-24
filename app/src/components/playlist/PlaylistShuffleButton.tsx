import React from "react";
import Shuffle from "../svg/Shuffle";
import PlaylistButton from "./PlaylistButton";

type PlaylistShuffleButtonProps = {
  text?: string;
  onClick: () => void;
};

export default function PlaylistShuffleButton({
  text,
  onClick,
}: PlaylistShuffleButtonProps) {
  return (
    <PlaylistButton
      text={text}
      onClick={onClick}
      icon={<Shuffle fill="#7A66D5" className=""></Shuffle>}
      className="bg-[#EDEDED] text-[#7A66D5]"
    ></PlaylistButton>
  );
}
