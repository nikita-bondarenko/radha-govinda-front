"use client";

import { Audiorecord } from "@/gql/generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Audio } from "../../sections/audio-preview/AudioPreview";
import styles from "./AudioItem.module.css";
import Background from "@/components/utils/Background";
import PauseIcon from "@/components/svg/PauseIcon";
import PlayIcon from "@/components/svg/PlayIcon";
import DotsIcon from "@/components/svg/DotsIcon";
import clsx from "clsx";
import { parseDate } from "@/utils/parseDate";
import ShareIcon from "@/components/svg/ShareIcon";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import Sign from "@/components/svg/Sign";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudioId,
  selectAudioIsPlaying,
  setAudio,
  setIsPlaying,
} from "@/lib/store/audioSlice";
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
  const selectedAudioId = useAppSelector(selectAudioId);

  const isThisAudioPlaying = useMemo(() => {
    return isPlaying && selectedAudioId === audio?.documentId;
  }, [isPlaying, selectedAudioId]);
  const controlsClickHandler = () => {
    handleControlButtonClick();

    if (selectedAudioId === audio?.documentId) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      console.log('AudioItem: Setting audio:', audio);
      console.log('AudioItem: Audio locale:', audio?.locale);
      dispatch(setAudio(audio || null));
      dispatch(setIsPlaying(true));
    }
  };

  const [areOptionsOpen, setAreOptionsOpen] = useState(false);

  const optionsClickHandler: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setAreOptionsOpen((prev) => !prev);
  };

  const [successMessageVisible, setSeccessMessageVisible] = useState(false);

  const locale = useAppSelector((state) => state.locale.locale);

  const shareButtonClickHandler: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setSeccessMessageVisible(true);
    const link =
      location.protocol +
      "//" +
      location.host +
      "/" +
      (locale === "ru" ? "" : "en/") +
      "lectures-and-kirtans" +
      "?audioId=" +
      audio?.documentId;
    setTimeout(() => {
      setSeccessMessageVisible(false);
      setAreOptionsOpen(false);
    }, 1000);
  };

  useEffect(() => {
    const documentClickHandler = (e: Event) => {
      e.preventDefault();
      setAreOptionsOpen(false);
    };

    if (areOptionsOpen) {
      document.addEventListener("click", documentClickHandler);
      return () => {
        document.removeEventListener("click", documentClickHandler);
      };
    }
  }, [areOptionsOpen]);

  const localizedData = useLocalizedStaticData();
  return (
    <div
      className={clsx(
        styles.audio,
        className,
        isPreviewSection && styles.preview
      )}
    >
      <button onClick={controlsClickHandler} className={styles.controls}>
        <Background
          className={styles.controls__background}
          imageUrl={audio?.Image.url}
        ></Background>
        <div className={styles.controls__button}>
          <PauseIcon
            fill={"white"}
            className={clsx(
              styles["pause-icon"],
              isThisAudioPlaying && styles["icon-visible"]
            )}
          ></PauseIcon>
          <PlayIcon
            fill={"white"}
            className={clsx(
              styles["play-icon"],
              !isThisAudioPlaying && styles["icon-visible"]
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
            <div className={styles.options}>
              <button
                onClick={shareButtonClickHandler}
                className={clsx(
                  styles["options__share-button"],
                  areOptionsOpen && styles.open,
                  successMessageVisible && styles.success
                )}
              >
                <div
                  className={clsx(
                    styles["options__action-description"],
                    !successMessageVisible && styles.open
                  )}
                >
                  <ShareIcon
                    fill={"var(--black)"}
                    className={styles["options__share-icon"]}
                  ></ShareIcon>
                  <span className={clsx(styles.options__text, "small-text")}>
                    {localizedData?.audioPreview.shareButton}
                  </span>
                </div>
                <div
                  className={clsx(
                    styles["options__success-message"],
                    successMessageVisible && styles.open
                  )}
                >
                  <Sign className={"w-[16px] h-[16px]"}></Sign>
                  <span className={clsx(styles.options__text, "small-text")}>
                    {localizedData?.audioPreview.succesMessage}
                  </span>
                </div>
              </button>
              <button
                onClick={optionsClickHandler}
                className={styles["options__open-button"]}
              >
                <DotsIcon fill="var(--grey-2)"></DotsIcon>
              </button>
            </div>
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
