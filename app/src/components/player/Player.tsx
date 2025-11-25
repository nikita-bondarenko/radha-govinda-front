"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import Modal from "../utils/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudio,
  selectAudioIsPlaying,
  selectIsMiniPlayerVisible,
  selectIsMainPlayerVisible,
  setIsPlaying,
  toggleIsPlaying,
} from "@/lib/store/audioSlice";
import Background from "../utils/Background";
import style from "./Player.module.css";
import clsx from "clsx";
import CircleArrowsIcon from "../../shared/ui/icons/CircleArrowsIcon";
import DifferentDirectionArrows from "../../shared/ui/icons/DifferentDirectionArrows";
import DublePlayIcon from "../../shared/ui/icons/DublePlayIcon";
import PauseIcon from "../../shared/ui/icons/PauseIcon";
import PlayIcon from "../../shared/ui/icons/PlayIcon";
import VolumeIcon from "../../shared/ui/icons/VolumeIcon";
import { parseDate } from "@/utils/parseDate";
import ListIcon from "../../shared/ui/icons/ListIcon";
import { createPortal } from "react-dom";
import PlayerImage from "./PlayerImage";
import PlayerControls from "./PlayerControls";
import PlayerProgressBar from "./PlayerProgressBar";
import { ProgressBar } from "@/shared/ui/player/ProgressBar";

type Position = {
  clientX: number;
  clientY: number;
};

export default function Player() {
  const audio = useAppSelector(selectAudio);
  const isMainPlayerVisible = useAppSelector(selectIsMainPlayerVisible);
  const playerRef = useRef<HTMLDivElement>(null);

  const player = (
      <div className={style.wrapper}>
        <div
          ref={playerRef}
          className={clsx(style.body, {
            "opacity-0": !isMainPlayerVisible
          })}
        >
         <PlayerImage audio={audio}></PlayerImage>
          <div className={clsx(style.right)}>
            <PlayerControls></PlayerControls>
            <ProgressBar className="w-[360px]" timeDisplayPosition="bottom"/>
          </div>
        </div>
      </div>
  );
  return player;
}
