import React from "react";
import PauseIcon from "../svg/PauseIcon";
import PlayIcon from "../svg/PlayIcon";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  onClick: React.MouseEventHandler;
  isPlaying: boolean;
  isLoading: boolean
};

const PlayerPlayPauseButton = ({ onClick, isPlaying, isLoading }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(style["playing-button"], style["player-icon-button"], isLoading && 'pointer-events-none')}
    >
      <PlayIcon
        className={clsx(style.play, (!isPlaying || isLoading) && style.active, {"play-button-loading": isLoading})}
      />
      <PauseIcon
        className={clsx(style.pause, (isPlaying && !isLoading) && style.active)}
      />
    </button>
  );
};

export default PlayerPlayPauseButton; 