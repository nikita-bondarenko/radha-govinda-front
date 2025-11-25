"use client";

import { Maybe } from "graphql/jsutils/Maybe";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Audio } from "../../sections/audio-preview/AudioPreview";
import styles from "./AudioItem.module.css";
import Background from "@/components/utils/Background";
import PauseIcon from "@/shared/ui/icons/PauseIcon";
import PlayIcon from "@/shared/ui/icons/PlayIcon";
import clsx from "clsx";
import { parseDate } from "@/utils/parseDate";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudioId,
  selectAudioIsLoading,
  selectAudioIsPlaying,
  setAudio,
  setIsPlaying,
} from "@/lib/store/audioSlice";
import { AudioElement } from "@/utils/audioModel";
import { OptionsButton } from "@/shared/ui";
export type AudioPreviewItemProps = {
  audio: Maybe<Audio>;
  className?: string;
  isPreviewSection?: boolean;
  handleControlButtonClick: () => void;
  
};

export default memo(function AudioPreviewItem({
  audio,
  className,
  isPreviewSection,
  handleControlButtonClick,
}: AudioPreviewItemProps) {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const isLoading = useAppSelector(selectAudioIsLoading);
  const selectedAudioId = useAppSelector(selectAudioId);

  const isThisAudioPlaying = useMemo(() => {
    return isPlaying && selectedAudioId === audio?.documentId;
  }, [isPlaying, selectedAudioId]);
  const controlsClickHandler = () => {
    handleControlButtonClick();
    const audioElement = new AudioElement();
    if (isThisAudioPlaying) {
      dispatch(setIsPlaying(false));
      audioElement.pause();
    } else  {
      dispatch(setAudio(audio || null));
      audioElement.play({ audio })?.then(() => {
        dispatch(setIsPlaying(true));
      });
    }
  };

  return (
    <div
      id={audio?.documentId}
      className={clsx(
        styles.audio,
        className,
        isPreviewSection && styles.preview
      )}
    >
      <button onClick={controlsClickHandler} className={clsx(styles.controls, {"pointer-event-none": isLoading})}>
        <Background
          className={styles.controls__background}
          imageUrl={audio?.AudioCategory?.Image?.formats?.thumbnail.url}
        ></Background>
        <div className={styles.controls__button}>
          <PauseIcon
            fill={"white"}
            className={clsx(
              styles["pause-icon"],
              isThisAudioPlaying && !isLoading && styles["icon-visible"]
            )}
          ></PauseIcon>
          <PlayIcon
            fill={"white"}
            className={clsx(
              styles["play-icon"],
              (!isThisAudioPlaying || isLoading) && styles["icon-visible"],
              {
                "play-button-loading":
                  isLoading && selectedAudioId === audio?.documentId,
              }
            )}
          ></PlayIcon>
        </div>
      </button>
      <div className={styles.info}>
        <div className={styles.info__top}>
          <h4 className={clsx("small-text", styles.info__name)}>
            {audio?.Name}
          </h4>
          <div className={clsx(styles["desktop__duration-options"])}>
            <span className={clsx(styles["info__duration"], "small-text grey")}>
              {audio?.Duration}
            </span>
            <OptionsButton audio={audio}></OptionsButton>
          </div>
        </div>
        <div className={styles.info__bottom}>
          <span
            className={clsx(styles["info__date-place"], "small-text grey")}
          >{`${parseDate(audio?.Date)} ${
            audio?.Place ? `, ${audio?.Place}` : ""
          }`}</span>
          <div className={styles["duration-box"]}>
            <span className={clsx(styles["info__duration"], "small-text grey")}>
              {audio?.Duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
