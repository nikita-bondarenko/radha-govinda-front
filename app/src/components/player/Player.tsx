"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import Modal from "../utils/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudio,
  selectIsMainPlayerVisible,
  setIsBigPlayerVisible,
  setIsPlaying,
  toggleIsPlaying,
} from "@/lib/store/audioSlice";
import style from "./Player.module.css";
import clsx from "clsx";

import PlayerImage from "./PlayerImage";
import PlayerControls from "./PlayerControls";
import { ProgressBar } from "@/shared/ui/player/ProgressBar";
import { InView } from "react-intersection-observer";

type Position = {
  clientX: number;
  clientY: number;
};

export default function Player() {
  const audio = useAppSelector(selectAudio);
  const playerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const handleVisibilityChange = (value: boolean) => {
    dispatch(setIsBigPlayerVisible(value));
  };

  const player = (
    <div className={style.wrapper}>
      <InView onChange={handleVisibilityChange}>
        <div ref={playerRef} className={clsx(style.body)}>
          <PlayerImage audio={audio}></PlayerImage>
          <div className={clsx(style.right)}>
            <PlayerControls></PlayerControls>
            <ProgressBar className="w-[360px]" timeDisplayPosition="bottom" />
          </div>
        </div>
      </InView>
    </div>
  );
  return player;
}
