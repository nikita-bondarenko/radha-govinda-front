import React from "react";
import CircleArrowsIcon from "../svg/CircleArrowsIcon";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
    onClick: React.MouseEventHandler;
    selected: boolean
};

const PlayerCircleButton = (props: Props) => {
console.log(props.selected)
  return (
    <button
      onClick={props.onClick}
      className={clsx(style.flow__circle, style["player-icon-button"], props.selected && style.selected)}
    >
      <CircleArrowsIcon></CircleArrowsIcon>
    </button>
  );
};

export default PlayerCircleButton;
