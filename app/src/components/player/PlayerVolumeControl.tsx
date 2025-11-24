import React, { useRef } from "react";
import VolumeIcon from "../../shared/ui/icons/VolumeIcon";
import style from "./Player.module.css";
import clsx from "clsx";

type Props = {
  volume: number;
  onChange: React.ChangeEventHandler;
};

const PlayerVolumeControl = ({ volume, onChange }: Props) => {
  const volumeBar = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx(style.volume)}>
      <VolumeIcon
        className={clsx(style.volume__icon, style["player-icon-button"])}
      />
      <input
        style={
          {
            "--percent": `${volume}%`,
          } as React.CSSProperties
        }
        min={0}
        max={100}
        onChange={onChange}
        ref={volumeBar}
        className={clsx(style.volume__input, "progress-bar")}
        type="range"
      />
    </div>
  );
};

export default PlayerVolumeControl; 