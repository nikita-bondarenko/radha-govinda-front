import React from "react";
import ListIcon from "../svg/ListIcon";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  onClick: React.MouseEventHandler;
};

const PlayerPlaylistButton = (props: Props) => {
  return (
    <button 
      onClick={props.onClick}
      className={clsx(style.playlist, style["player-icon-button"])}
    >
      <ListIcon />
    </button>
  );
};

export default PlayerPlaylistButton; 