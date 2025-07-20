import React from "react";
import PauseIcon from "../svg/PauseIcon";
import PlayIcon from "../svg/PlayIcon";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  onClick: React.MouseEventHandler;
  isPlaying: boolean;
};

const PlayerPlayPauseButton = ({ onClick, isPlaying }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(style["playing-button"], style["player-icon-button"])}
    >
      <PlayIcon
        className={clsx(style.play, !isPlaying && style.active)}
      />
      <PauseIcon
        className={clsx(style.pause, isPlaying && style.active)}
      />
    </button>
  );
};

export default PlayerPlayPauseButton; 