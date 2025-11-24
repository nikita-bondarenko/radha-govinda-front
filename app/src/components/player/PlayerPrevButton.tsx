import React from "react";
import DublePlayIcon from "../../shared/ui/icons/DublePlayIcon";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  onClick: React.MouseEventHandler;
};

const PlayerPrevButton = (props: Props) => {
  return (
    <button 
      onClick={props.onClick}
      className={clsx(style.prev, style["player-icon-button"])}
    >
      <DublePlayIcon />
    </button>
  );
};

export default PlayerPrevButton; 