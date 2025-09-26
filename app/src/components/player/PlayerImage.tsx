import React from "react";
import style from "./Player.module.css";
import { parseDate } from "@/utils/parseDate";
import clsx from "clsx";
import Background from "../utils/Background";
import { Audio } from "../sections/audio-preview/AudioPreview";

type Props = {
    audio: Audio
};

const PlayerImage = ({audio}: Props) => {
  return (
    <div className={clsx(style.left)}>
      <div className={clsx(style.image)}>
        <Background image={audio?.AudioCategory?.Image}></Background>
      </div>
      <div className={clsx(style.info)}>
        <h4 className={clsx(style.name, "small-text")}>{audio?.Name}</h4>
        <p className={clsx(style.description, "small-text grey")}>{`${parseDate(
          audio?.Date
        )} ${audio?.Place ? `, ${audio?.Place}` : ""}`}</p>
      </div>
    </div>
  );
};

export default PlayerImage;
