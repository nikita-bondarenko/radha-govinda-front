"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Audio } from "../sections/audio-preview/AudioPreview";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import {
  selectAudioIsPlaying,
  selectAudioIsLoading,
  selectAudioVolume,
  selectAudioId,
  setIsPlaying,
  setAudio,
} from "@/lib/store/audioSlice";
import { AudioElement } from "@/utils/audioModel";
import PauseIcon from "../../shared/ui/icons/PauseIcon";
import PlayIcon from "../../shared/ui/icons/PlayIcon";
import { parseDate } from "@/utils/parseDate";

import styles from "./PlaylistAudio.module.css";
import ShareIcon from "../../shared/ui/icons/ShareIcon";
import DotsIcon from "../../shared/ui/icons/DotsIcon";
import Sign from "@/shared/ui/icons/Sign";
import { OptionsButton } from "@/shared/ui";

type PlaylistAudioProps = {
  audio: Audio;
  className?: string;
  translateY: number;
  controlsClickHandler: () => void;
};

export default function PlaylistAudio({
  audio,
  className,
  translateY,
  controlsClickHandler: controlsClickHandlerProp,
}: PlaylistAudioProps) {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const isLoading = useAppSelector(selectAudioIsLoading);
  const selectedAudioId = useAppSelector(selectAudioId);
  const [isCurrentAudioSelected, setIsCurrentAudioSelected] = useState(false);

  const isThisAudioPlaying = useMemo(() => {
    return isPlaying && selectedAudioId === audio?.documentId;
  }, [isPlaying, selectedAudioId]);

  useEffect(() => {
    setIsCurrentAudioSelected(selectedAudioId === audio?.documentId);
  }, [selectedAudioId]);

  const controlsClickHandler = () => {
    controlsClickHandlerProp();
    const audioElement = new AudioElement();
    if (isThisAudioPlaying) {
      dispatch(setIsPlaying(false));
      audioElement.pause();
    } else {
      dispatch(setAudio(audio || null));
      audioElement.play({ audio }).then(() => {
        dispatch(setIsPlaying(true));
      });
    }
  };

  return (
    <div
      id={audio?.documentId}
      style={
        { "--translate-y": (translateY || 0) + "px" } as React.CSSProperties
      }
      className={className}
    >
      <div
        className={clsx(
          "rounded-[5px] bg-[#EDEDED] transition-colors duration-500 p-[13px] flex gap-[12px]",
          { "[&]:bg-[#CACACA]": isCurrentAudioSelected }
        )}
      >
        <button
          onClick={controlsClickHandler}
          className={clsx(
            "w-[36px] h-[36px] rounded-full bg-[#818181] relative shrink-0",
            {
              "[&]:bg-[#7A66D5]": isCurrentAudioSelected,
            }
          )}
        >
          <PauseIcon
            fill={"white"}
            className={clsx(
              "pause-icon",
              isThisAudioPlaying && !isLoading && "icon-visible"
            )}
          ></PauseIcon>
          <PlayIcon
            fill={"white"}
            className={clsx(
              "play-icon",
              (!isThisAudioPlaying || isLoading) && "icon-visible",
              {
                "play-button-loading":
                  isLoading && selectedAudioId === audio?.documentId,
              }
            )}
          ></PlayIcon>
        </button>
        <div className="flex-grow shrink  flex flex-col justify-between">
          <h3 className="w-[calc(100vw-180px)] max-w-[430px] truncate text-nowrap  font-semibold text-[12px] text-black leading-[100%]">
            {audio?.Name}
          </h3>
          <span className="text-black opacity-50 text-[9px]">
            {parseDate(audio?.Date)}
          </span>
        </div>
        <div className="flex flex-col justify-between justify-self-end items-end shrink-0">
          <OptionsButton audio={audio}></OptionsButton>
          <span className="text-black text-[7px] opacity-50">
            {audio?.Duration}
          </span>
        </div>
      </div>
    </div>
  );
}
