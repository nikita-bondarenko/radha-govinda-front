import React, { useEffect, useRef } from "react";
import DifferentDirectionArrows from "../svg/DifferentDirectionArrows";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  onClick: React.MouseEventHandler;
  selected: boolean
};

const PlayerShuffleButton = (props: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  console.log('PlayerShuffleButton selected:', props.selected)
  
  useEffect(() => {
    if (buttonRef.current) {
      console.log('PlayerShuffleButton DOM classes:', buttonRef.current.className);
      console.log('PlayerShuffleButton has selected class:', buttonRef.current.classList.contains(style.selected));
    }
  }, [props.selected]);
  
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