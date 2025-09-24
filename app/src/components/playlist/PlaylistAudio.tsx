"use client"
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
import PauseIcon from "../svg/PauseIcon";
import PlayIcon from "../svg/PlayIcon";
import { parseDate } from "@/utils/parseDate";

import styles from "./PlaylistAudio.module.css";
import ShareIcon from "../svg/ShareIcon";
import DotsIcon from "../svg/DotsIcon";
import Sign from "@/components/svg/Sign";

type PlaylistAudioProps = {
  audio: Audio;
  className?: string;
  translateY: number;
};

export default function PlaylistAudio({
  audio,
  className,
  translateY,
}: PlaylistAudioProps) {

  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const isLoading = useAppSelector(selectAudioIsLoading);
  const volume = useAppSelector(selectAudioVolume);
  const selectedAudioId = useAppSelector(selectAudioId);
  const [isCurrentAudioSelected, setIsCurrentAudioSelected] = useState(false)

  const isThisAudioPlaying = useMemo(() => {
    return isPlaying && selectedAudioId === audio?.documentId;
  }, [isPlaying, selectedAudioId]);

  useEffect(() => {
    setIsCurrentAudioSelected(selectedAudioId === audio?.documentId)
  }, [selectedAudioId])

  const controlsClickHandler = () => {
    const audioElement = new AudioElement();
    if (isThisAudioPlaying) {
      dispatch(setIsPlaying(false));
      audioElement.pause();
    } else {
      dispatch(setAudio(audio || null));
      audioElement.play({ audio, volume }).then(() => {
        dispatch(setIsPlaying(true));
      });
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
      (locale === "ru" ? "" : "/en") +
      `/lectures-and-kirtans?category=${audio?.AudioCategory?.documentId}&audio=${audio?.documentId}`;

    // Use Clipboard API if available, otherwise fallback to async copy using execCommand (for better macOS support)
    const copyToClipboard = async (text: string) => {
      if (
        navigator &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        try {
          await navigator.clipboard.writeText(text);
        } catch (err) {
          // fallback if clipboard API fails (e.g. macOS Safari)
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand("copy");
          } catch (e) {
            // ignore
          }
          document.body.removeChild(textarea);
        }
      } else {
        // fallback for very old browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
        } catch (e) {
          // ignore
        }
        document.body.removeChild(textarea);
      }
    };

    copyToClipboard(link);
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
      // document.addEventListener("click", documentClickHandler)
      return () => {
        document.removeEventListener("click", documentClickHandler);
      };
    }
  }, [areOptionsOpen]);


  const localizedData = useLocalizedStaticData();

  return (
    <div
      style={{ "--translate-y": (translateY || 0) + "px" } as React.CSSProperties}
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
          <div className={styles.options}>
            <button
              onClick={shareButtonClickHandler}
              className={clsx(
                styles["options__share-button"],
                areOptionsOpen && styles["open"],
                successMessageVisible && styles.success
              )}
            >
              <div
                className={clsx(
                  styles["options__action-description"],
                  !successMessageVisible && styles["open"]
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
          <span className="text-black text-[7px] opacity-50">
            {audio?.Duration}
          </span>
        </div>
      </div>
    </div>
  );
}
