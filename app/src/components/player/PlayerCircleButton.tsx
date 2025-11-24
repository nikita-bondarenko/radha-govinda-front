import React, { useEffect, useRef } from "react";
import CircleArrowsIcon from "../../shared/ui/icons/CircleArrowsIcon";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
    onClick: React.MouseEventHandler;
    selected: boolean
};

const PlayerCircleButton = (props: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
   // console.log('PlayerCircleButton selected:', props.selected)
  
  useEffect(() => {
    if (buttonRef.current) {
       // console.log('PlayerCircleButton DOM classes:', buttonRef.current.className);
       // console.log('PlayerCircleButton has selected class:', buttonRef.current.classList.contains(style.selected));
    }
  }, [props.selected]);
  
  return (
    <button
      ref={buttonRef}
      onClick={props.onClick}
      className={clsx(style.flow__circle, style["player-icon-button"], props.selected && style.selected)}
    >
      <CircleArrowsIcon></CircleArrowsIcon>
    </button>
  );
};

export default PlayerCircleButton;
