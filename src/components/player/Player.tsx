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

type Position = {
  clientX: number;
  clientY: number;
};

export default function Player() {
  const audio = useAppSelector(selectAudio);
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [volumePersent, setVolumePercent] = useState(50);
  const [progressPersent, setProgressPercent] = useState(50);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    setModalRoot(modalRoot);
  }, []);
  const playingButtonClickHandler: React.MouseEventHandler = () => {
    dispatch(toggleIsPlaying());
  };

  const progressBar = useRef<HTMLInputElement>(null);
  const volumeBar = useRef<HTMLInputElement>(null);
  function getRangePercent(element: HTMLInputElement) {
    const percent =
      ((Number(element.value) - Number(element.min)) /
        (Number(element.max) - Number(element.min))) *
      100;
    console.log(percent);
    return percent;
  }

  const volumeInputHandler: React.ChangeEventHandler = (e) => {
    setVolumePercent(getRangePercent(e.target as HTMLInputElement));
  };

  const progressInputHandler: React.ChangeEventHandler = (e) => {
    setProgressPercent(getRangePercent(e.target as HTMLInputElement));
  };

  const playerRef = useRef<HTMLDivElement>(null);
  const maxTranslateX = useRef(0);
  const maxTranslateY = useRef(0);
  const minTranslateX = useRef(0);
  const minTranslateY = useRef(0);
  const initTranslateX = useRef(0);
  const initTranslateY = useRef(0);
  const initClientX = useRef(0);
  const initClientY = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchStarted, setIsTouchStarted] = useState(false);

  useEffect(() => {
    if (audio) {
      if (playerRef.current) {
        maxTranslateX.current =
          innerWidth -
          (playerRef.current.clientWidth +
            playerRef.current.getBoundingClientRect().x);
        maxTranslateY.current =
          innerHeight -
          playerRef.current.clientHeight -
          playerRef.current.getBoundingClientRect().y;
        minTranslateX.current = -playerRef.current.getBoundingClientRect().x;
        minTranslateY.current = -playerRef.current.getBoundingClientRect().y;
      }
    }
  }, [audio]);

  const computePlayerPosition = ({ clientX, clientY }: Position) => {
    const computedTranslateX =
      initTranslateX.current + (clientX - initClientX.current);
    const computedTranslateY =
      initTranslateY.current + (clientY - initClientY.current);
    const translateX =
      computedTranslateX < minTranslateX.current
        ? minTranslateX.current
        : computedTranslateX > maxTranslateX.current
        ? maxTranslateX.current
        : computedTranslateX;
    const translateY =
      computedTranslateY < minTranslateY.current
        ? minTranslateY.current
        : computedTranslateY > maxTranslateY.current
        ? maxTranslateY.current
        : computedTranslateY;

    setTranslateX(translateX);
    setTranslateY(translateY);
  };

  const setInitPositionProperties = ({ clientX, clientY }: Position) => {
    initClientX.current = clientX;
    initClientY.current = clientY;
    initTranslateX.current = translateX;
    initTranslateY.current = translateY;
  };

  const onMouseMoveHandler = (e: unknown) => {
    const event = e as React.MouseEvent<HTMLDivElement>;
    computePlayerPosition({ clientX: event.clientX, clientY: event.clientY });
  };

  const onMouseDownHandler: React.MouseEventHandler = (e) => {
    setInitPositionProperties({ clientX: e.clientX, clientY: e.clientY });
    setIsMouseDown(true);
  };

  const onMouseUpHandler: React.MouseEventHandler = (e) => {
    setIsMouseDown(false);
  };

  const onMouseLeaveHandler: React.MouseEventHandler = (e) => {
    setIsMouseDown(false);
  };

  const onTouchMoveHandler = (e: unknown) => {
    const event = e as React.TouchEvent;
    computePlayerPosition({
      clientX: event.touches[0].clientX,
      clientY: event.touches[0].clientY,
    });
  };

  const onTouchStartHandler: React.TouchEventHandler = (e) => {
    setInitPositionProperties({
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
    });
    setIsTouchStarted(true);
  };

  const onTouchEndHandler: React.TouchEventHandler = (e) => {
    setIsTouchStarted(false);
  };

  useEffect(() => {
    if (isMouseDown) {
      playerRef.current?.addEventListener("mousemove", onMouseMoveHandler);
      return () => {
        playerRef.current?.removeEventListener("mousemove", onMouseMoveHandler);
      };
    }
  }, [isMouseDown]);

  useEffect(() => {
    if (isTouchStarted) {
      playerRef.current?.addEventListener('touchmove', onTouchMoveHandler);
      document.body.style.overflowY = 'hidden'
      return () => {
        playerRef.current?.removeEventListener("touchmove", onTouchMoveHandler);
        document.body.style.overflowY = 'auto'

      };
    }
  }, [isTouchStarted]);

  const player = (
    <div className={clsx(style.modal)}>
      <div className={style.wrapper}>
        <div
          style={{ transform: `translate(${translateX}px,${translateY}px)` }}
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          onMouseLeave={onMouseLeaveHandler}
          onTouchStart={onTouchStartHandler}
          onTouchEnd={onTouchEndHandler}
          ref={playerRef}
          className={clsx(style.body)}
        >
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
                    style={
                      {
                        "--percent": `${volumePersent}%`,
                      } as React.CSSProperties
                    }
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
                style={
                  { "--percent": `${progressPersent}%` } as React.CSSProperties
                }
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
