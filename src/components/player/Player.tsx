"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import Modal from "../utils/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudio,
  selectAudioIsPlaying,
  setIsPlaying,
  toggleIsPlaying,
} from "@/lib/store/audioSlice";
import Background from "../utils/Background";
import style from "./Player.module.css";
import clsx from "clsx";
import CircleArrowsIcon from "../svg/CircleArrowsIcon";
import DifferentDirectionArrows from "../svg/DifferentDirectionArrows";
import DublePlayIcon from "../svg/DublePlayIcon";
import PauseIcon from "../svg/PauseIcon";
import PlayIcon from "../svg/PlayIcon";
import VolumeIcon from "../svg/VolumeIcon";
import { parseDate } from "@/utils/parseDate";
import ListIcon from "../svg/ListIcon";
import { createPortal } from "react-dom";

export default function Player() {
  const audio = useAppSelector(selectAudio);
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [volumePersent, setVolumePercent] = useState(50)
  const [progressPersent, setProgressPercent] = useState(50)

  const dispatch = useAppDispatch();
  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    setModalRoot(modalRoot);
  }, []);
  const playingButtonClickHandler: React.MouseEventHandler = () => {
    dispatch(toggleIsPlaying());
  };

  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);

  const progressBar = useRef<HTMLInputElement>(null);
  const volumeBar = useRef<HTMLInputElement>(null);
   function getRangePercent(element: HTMLInputElement) {
        const percent =
          ((Number(element.value) - Number(element.min)) /
            (Number(element.max) - Number(element.min))) *
          100;
          console.log(percent)
        return percent
    }
  useEffect(() => {
   

    
  }, []);

  const volumeInputHandler: React.ChangeEventHandler = (e) => {
    setVolumePercent(getRangePercent(e.target as HTMLInputElement))
  }

  const progressInputHandler: React.ChangeEventHandler = (e) => {
    setProgressPercent(getRangePercent(e.target as HTMLInputElement))
  }

  const player = (
    <div className={clsx(style.modal)}>
      <div className={style.wrapper}>
        <div className={clsx(style.body)}>
          <div className={clsx(style.left)}>
            <div className={clsx(style.image)}>
              <Background image={audio?.Image}></Background>
            </div>
            <div className={clsx(style.info)}>
              <h4 className={clsx(style.name, "small-text")}>{audio?.Name}</h4>
              <p
                className={clsx(style.description, "small-text grey")}
              >{`${parseDate(audio?.Date)} ${
                audio?.Place ? `, ${audio?.Place}` : ""
              }`}</p>
            </div>
          </div>
          <div className={clsx(style.right)}>
            <div className={clsx(style.controls)}>
              <div className={clsx(style.controls__left)}>
                <button
                  className={clsx(
                    style.flow__circle,
                    style["player-icon-button"]
                  )}
                >
                  <CircleArrowsIcon></CircleArrowsIcon>
                </button>
                <button
                  className={clsx(style.prev, style["player-icon-button"])}
                >
                  <DublePlayIcon></DublePlayIcon>
                </button>
                <button
                  onClick={playingButtonClickHandler}
                  className={clsx(
                    style["playing-button"],
                    style["player-icon-button"]
                  )}
                >
                  <PlayIcon
                    className={clsx(style.play, !isPlaying && style.active)}
                  ></PlayIcon>
                  <PauseIcon
                    className={clsx(style.pause, isPlaying && style.active)}
                  ></PauseIcon>
                </button>
                <button
                  className={clsx(style.next, style["player-icon-button"])}
                >
                  <DublePlayIcon></DublePlayIcon>
                </button>
                <button
                  className={clsx(
                    style.flow__circle,
                    style["player-icon-button"]
                  )}
                >
                  <DifferentDirectionArrows></DifferentDirectionArrows>
                </button>
              </div>
              <div className={clsx(style.controls__right)}>
                <button
                  className={clsx(style.playlist, style["player-icon-button"])}
                >
                  <ListIcon></ListIcon>
                </button>
                <div className={clsx(style.volume)}>
                  <VolumeIcon
                    className={clsx(
                      style.volume__icon,
                      style["player-icon-button"]
                    )}
                  ></VolumeIcon>
                  <input
                  style={{'--percent': `${volumePersent}%`} as React.CSSProperties}
                  min={0}
                  max={100}
                  onChange={volumeInputHandler}
                  ref={volumeBar}
                    className={clsx(style.volume__input, "progress-bar")}
                    type="range"
                  />
                </div>
              </div>
            </div>
            <div className={style.duration}>
              <input
              ref={progressBar}
                className={clsx(
                  style.duration__input,
                  "progress-bar with-thumb"
                )}
                style={{'--percent': `${progressPersent}%`} as React.CSSProperties}

                onChange={progressInputHandler}
                type="range"
                max={300}
                min={0}
              />
              <div className={style.duration__bottom}>
                <span
                  className={clsx(style.duration__passed, "small-text grey")}
                >
                  00:55
                </span>
                <span className={clsx(style.duration__left, "small-text grey")}>
                  00:13
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return modalRoot ? createPortal(player, modalRoot) : null;
}
