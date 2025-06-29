import React, { useRef } from "react";
import style from "./Player.module.css";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectAudioProgress, setProgress } from "@/lib/store/audioSlice";
import { getRangePercent } from "@/utils/getRangePersent";

type Props = {};

const PlayerProgressBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const progress = useAppSelector(selectAudioProgress);
  const progressBar = useRef<HTMLInputElement>(null);

  const progressInputHandler: React.ChangeEventHandler = (e) => {
    dispatch(setProgress(getRangePercent(e.target as HTMLInputElement)));
  };

  return (
    <div className={style.duration}>
      <input
        ref={progressBar}
        className={clsx(style.duration__input, "progress-bar with-thumb")}
        style={{ "--percent": `${progress}%` } as React.CSSProperties}
        onChange={progressInputHandler}
        type="range"
        max={300}
        min={0}
      />
      <div className={style.duration__bottom}>
        <span className={clsx(style.duration__passed, "small-text grey")}>
          00:55
        </span>
        <span className={clsx(style.duration__left, "small-text grey")}>
          00:13
        </span>
      </div>
    </div>
  );
};

export default PlayerProgressBar;
