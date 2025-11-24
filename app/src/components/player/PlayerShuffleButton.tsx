import React, { useEffect, useRef } from "react";
import DifferentDirectionArrows from "../../shared/ui/icons/DifferentDirectionArrows";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  onClick: React.MouseEventHandler;
  selected: boolean
};

const PlayerShuffleButton = (props: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  return (
    <button
      ref={buttonRef}
      onClick={props.onClick}
      className={clsx(style.flow__circle, style["player-icon-button"], props.selected && style.selected)}
    >
      <DifferentDirectionArrows />
    </button>
  );
};

export default PlayerShuffleButton; 