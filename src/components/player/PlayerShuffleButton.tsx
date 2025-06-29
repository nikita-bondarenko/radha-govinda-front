import React from "react";
import DifferentDirectionArrows from "../svg/DifferentDirectionArrows";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  onClick: React.MouseEventHandler;
  selected: boolean
};

const PlayerShuffleButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(style.flow__circle, style["player-icon-button"], props.selected && style.selected)}
    >
      <DifferentDirectionArrows />
    </button>
  );
};

export default PlayerShuffleButton; 