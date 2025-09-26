"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { memo, useRef, useEffect, useCallback, useState } from "react";
import style from "./Header.module.css";
import useLocalizedHref from "@/hooks/useLocalizedHref";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudio,
  selectAudioIsPlaying,
  selectAudioProgress,
  selectAudioLeftTime,
  selectAudioPassedTime,
  selectIsMiniPlayerVisible,
  selectIsMobile,
  toggleIsPlaying,
  setIsMiniPlayerVisible,
  setIsMobile,
  setIsPlaying,
  selectAudioVolume,
} from "@/lib/store/audioSlice";
import { useInView } from "react-intersection-observer";
import { formatRemainingTime, formatTime } from "@/utils/formatTime";
import { parseDurationToSeconds } from "@/utils/parseDate";
import PlayIcon from "../svg/PlayIcon";
import PauseIcon from "../svg/PauseIcon";
import { AudioElement } from "../../utils/audioModel";

export type HeaderButton = {
  __typename?: "ComponentBigButtonBolshayaKnopka";
  ButtonText?: string | null;
  page?: {
    __typename?: "Page";
    Slug: string;
  } | null;
} | null;

export type HeaderLectureBarProps = {
  button?: HeaderButton;
  className?: string;
  disableMiniPlayer?: boolean;
};

export default memo(function HeaderLectureBar({
  button,
  className,
  disableMiniPlayer = false,
}: HeaderLectureBarProps) {
  const [isClient, setIsClient] = useState(false);
  const audio = useAppSelector(selectAudio);
  const volume = useAppSelector(selectAudioVolume);
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const progress = useAppSelector(selectAudioProgress);
  const leftTime = useAppSelector(selectAudioLeftTime);
  const passedTime = useAppSelector(selectAudioPassedTime);
  const isMiniPlayerVisible = useAppSelector(selectIsMiniPlayerVisible);
  const isMobile = useAppSelector(selectIsMobile);
  const dispatch = useAppDispatch();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    rootMargin: "0px",
  });

  const href = useLocalizedHref({ pageSlug: button?.page?.Slug });

  // Проверяем, что мы на клиенте и определяем размер экрана
  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      dispatch(setIsMobile(window.innerWidth <= 768));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isClient) return;

    dispatch(setIsMiniPlayerVisible(inView));
  }, [inView, dispatch, isClient, audio]);

  const handlePlayPause = (e: React.MouseEvent) => {
    if (!isClient) return;
    e.preventDefault();

    const audioElement = new AudioElement();
    if (isPlaying) {
      dispatch(setIsPlaying(false));
      audioElement.pause();
    } else {
      audioElement.play({ audio }).then(() => {
        dispatch(setIsPlaying(true));
      });
    }
  };

  const handleMiniPlayerClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isClient) return;
      // Если клик был по кнопке play/pause, не обрабатываем
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }

      // Скрываем мини-плеер, чтобы показать основной
      dispatch(setIsMiniPlayerVisible(false));
    },
    [dispatch, isClient]
  );

  // Если есть аудиозапись И мы на клиенте И мини-плеер не отключен И не мобильное устройство, показываем мини-плеер
  if (audio && isClient && !disableMiniPlayer && !isMobile) {
    // Используем ту же логику, что и в основном плеере
    const getDisplayLeftTime = (): number => {
      const audioElement = new AudioElement()
      // Приоритет 1: Если leftTime доступно из реальных метаданных, используем его
      const realDuration = audioElement.getDuration();
      if (realDuration > 0 && isFinite(realDuration) && leftTime > 0) {
        return leftTime;
      }

      // Приоритет 2: Если метаданные не загружены, временно используем Duration из объекта audio
      if (
        audio?.Duration &&
        (!realDuration || !isFinite(realDuration) || realDuration <= 0)
      ) {
        const totalDurationSeconds = parseDurationToSeconds(audio.Duration);
        if (totalDurationSeconds && totalDurationSeconds > 0) {
          return Math.max(0, totalDurationSeconds - passedTime);
        }
      }

      return 0;
    };

    const displayLeftTime = getDisplayLeftTime();
    const remainingTime = formatTime(displayLeftTime);

    // Отладочные логи для проверки синхронизации
    // console.log('Mini player sync:', {
    //   progress,
    //   passedTime,
    //   leftTime,
    //   displayLeftTime,
    //   remainingTime,
    //   realDuration: getDuration(),
    //   audioDuration: audio?.Duration
    // });

    return (
      <div
        ref={inViewRef}
        className={clsx(
          className,
          style.header__button,
          style["header__button--mini-player"]
        )}
        data-hide-main-player={isClient && inView}
        onClick={handleMiniPlayerClick}
      >
        <button
          onClick={handlePlayPause}
          className={style["header__button__play-button"]}
        >
          {isPlaying ? (
            <PauseIcon fill="white" className="w-[20px] h-[20px]" />
          ) : (
            <PlayIcon fill="white" className="w-[20px] h-[20px]" />
          )}
        </button>

        <div className={style["header__button__progress-container"]}>
          <div
            className={style["header__button__progress-bar"]}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

        <span className={style["header__button__duration"]}>
          {remainingTime}
        </span>
      </div>
    );
  }

  // Если нет аудиозаписи или мы на сервере, показываем обычную кнопку
  return (
    <div ref={inViewRef}>
      <Link className={clsx(className, style.header__button)} href={href}>
        {button?.ButtonText}
      </Link>
    </div>
  );
});
