"use client";

import { Audiorecord } from "@/gql/generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import React, { memo, useEffect, useState } from "react";
import { Audio } from "../../sections/audio-preview/AudioPreview";
import styles from "./AudioItem.module.css";
import Background from "@/components/utils/Background";
import PauseIcon from "@/components/svg/PauseIcon";
import PlayIcon from "@/components/svg/PlayIcon";
import DotsIcon from "@/components/svg/DotsIcon";
import clsx from "clsx";
import { parseDate } from "@/utils/parseDate";
import ShareIcon from "@/components/svg/ShareIcon";
export type AudioPreviewItemProps = {
  audio: Maybe<Audio>;
  locale: Maybe<string>;
};

export default memo(function AudioPreviewItem({
  audio,
  locale,
}: AudioPreviewItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const controlsClickHandler = () => {
    setIsPlaying((prev) => !prev);
  };

  const [areOptionsOpen, setAreOptionsOpen] = useState(false)

  const optionsClickHandler: React.MouseEventHandler= (e) => {
    e.stopPropagation()
    setAreOptionsOpen(prev => !prev)
  }

  useEffect(() => {

    const documentClickHandler = (e: Event) => {
      e.preventDefault()
      setAreOptionsOpen(false)
    }

    if (areOptionsOpen) {
      document.addEventListener('click', documentClickHandler)
      return () => {
        document.removeEventListener('click', documentClickHandler)
      }
    }
  }, [areOptionsOpen])
  return (
    <button onClick={controlsClickHandler} className={clsx(styles.audio)}>
      <div className={styles.controls}>
        <Background
          className={styles.controls__background}
          image={audio?.Image}
        ></Background>
        <div className={styles.controls__button}>
          <PauseIcon
            fill={"white"}
            className={clsx(
              styles["pause-icon"],
              isPlaying && styles["icon-visible"]
            )}
          ></PauseIcon>
          <PlayIcon
            fill={"white"}
            className={clsx(
              styles["play-icon"],
              !isPlaying && styles["icon-visible"]
            )}
          ></PlayIcon>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.info__top}>
          <h4 className={clsx("small-text", styles.info__name)}>
            {audio?.Name}
          </h4>
          <div className={styles.options}>
            <button onClick={optionsClickHandler}  className={clsx(styles["options__share-button"],areOptionsOpen && styles.open )}>
              <ShareIcon fill={"var(--black)"} className={styles["options__share-icon"]}></ShareIcon>
              <span className={clsx(styles.options__text, "small-text")}>
                {locale === "ru" ? "поделиться" : "share"}
              </span>
            </button>
            <button  onClick={optionsClickHandler} className={styles["options__open-button"]}>
              <DotsIcon fill="var(--grey-2)"></DotsIcon>
            </button>
          </div>
        </div>
        <div className={styles.info__bottom}>
          <span
            className={clsx(styles["info__date-place"], "small-text grey")}
          >{`${parseDate(audio?.Date)} ${
            audio?.Place ? `, ${audio?.Place}` : ""
          }`}</span>
          <span className={clsx(styles["info__duration"], "small-text grey")}>
            {audio?.Duration}
          </span>
        </div>
      </div>
    </button>
  );
});
