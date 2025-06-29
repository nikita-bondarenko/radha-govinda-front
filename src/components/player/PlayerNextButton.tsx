import React from "react";
import DublePlayIcon from "../svg/DublePlayIcon";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  onClick: React.MouseEventHandler;
};

const PlayerNextButton = (props: Props) => {
  return (
    <button 
      onClick={props.onClick}
      className={clsx(style.next, style["player-icon-button"])}
    >
      <DublePlayIcon />
    </button>
  );
};

export default PlayerNextButton; 