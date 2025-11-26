"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudioProgress,
  selectAudioIsPlaying,
  selectAudioPassedTime,
  selectAudioLeftTime,
  selectAudio,
  setProgress,
  setPassedTime,
  setLeftTime,
} from "@/lib/store/audioSlice";
import { parseDurationToSeconds } from "@/utils/parseDate";
import { AudioElement } from "@/utils/audioModel";
import clsx from "clsx";

type Props = {
  timeDisplayPosition?: "sides" | "bottom";
  className?: string;
};

export const ProgressBar: React.FC<Props> = ({
  timeDisplayPosition,
  className,
}) => {
  const dispatch = useAppDispatch();
  const progress = useAppSelector(selectAudioProgress); // только для стартовой позиции
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const passedTime = useAppSelector(selectAudioPassedTime);
  const leftTime = useAppSelector(selectAudioLeftTime);
  const audio = useAppSelector(selectAudio);

  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [liveProgress, setLiveProgress] = useState(progress); // живое значение при драге

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getDisplayLeftTime = (): number => {
    const audioEl = new AudioElement();
    const realDuration = audioEl.getDuration();
    if (
      realDuration &&
      realDuration > 0 &&
      isFinite(realDuration) &&
      leftTime > 0
    ) {
      return leftTime;
    }
    if (audio?.Duration) {
      const total = parseDurationToSeconds(audio.Duration);
      if (total && total > 0) return Math.max(0, total - passedTime);
    }
    return 0;
  };

  // Обновление при воспроизведении (только если не драгаем)
  useEffect(() => {
    if (!isPlaying || isDragging) return;

    const audioEl = new AudioElement();
    const interval = setInterval(() => {
      const current = audioEl.getCurrentTime();
      const duration =
        audioEl.getDuration() ||
        parseDurationToSeconds(audio?.Duration || "0:00");

      if (current && duration && duration > 0) {
        const percent = (current / duration) * 100;
        setLiveProgress(percent);
        dispatch(setProgress(percent));
        dispatch(setPassedTime(current));
        dispatch(setLeftTime(duration - current));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, isDragging, dispatch, audio?.Duration]);

  // Синхронизация liveProgress с прогрессом из стора (когда не драгаем)
  useEffect(() => {
    if (!isDragging) {
      setLiveProgress(progress);
    }
  }, [progress, isDragging]);

  // Основная функция — мгновенно рисует прогресс по координате
  const updateProgress = (clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percent = Math.max(0, Math.min(100, (x / width) * 100));

    setLiveProgress(percent); // мгновенно рисуем

    // Обновляем аудио сразу
    const audioEl = new AudioElement();
    const duration =
      audioEl.getDuration() ||
      parseDurationToSeconds(audio?.Duration || "0:00");
    if (duration && duration > 0) {
      const newTime = (percent / 100) * duration;
      audioEl.setCurrentTime(newTime);
    }
  };

  // Drag handlers
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    updateProgress(clientX);
  };

  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    updateProgress(clientX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Только в конце — пишем в Redux
    const audioEl = new AudioElement();
    const duration =
      audioEl.getDuration() ||
      parseDurationToSeconds(audio?.Duration || "0:00");
    if (duration && duration > 0) {
      const newTime = (liveProgress / 100) * duration;
      dispatch(setProgress(liveProgress));
      dispatch(setPassedTime(newTime));
      dispatch(setLeftTime(duration - newTime));
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handlePointerMove);
      document.addEventListener("mouseup", handlePointerUp);
      document.addEventListener("touchmove", handlePointerMove, {
        passive: false,
      });
      document.addEventListener("touchend", handlePointerUp);
    }

    return () => {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", handlePointerUp);
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, liveProgress]);

  const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleTouch}
      onTouchStart={handleTouch}
      className={clsx("", className)}
    >
      <div
        className={clsx("small-text grey body", {
          "grid grid-cols-[32px_auto_32px] gap-[20px]":
            timeDisplayPosition === "sides",
          "grid grid-cols-[1fr_1fr] gap-0": timeDisplayPosition === "bottom",
        })}
      >
        <div
          ref={trackRef}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className={clsx(
            "relative h-[16px] flex items-center shrink-0 cursor-pointer",
            {
              "col-span-2": timeDisplayPosition === "bottom",
            }
          )}
        >
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[4px] bg-white rounded-full  select-none track"
            style={{ touchAction: "none" }}
          >
            {/* Заполнение — мгновенно следует за мышью */}
            <div
              className={clsx("h-full bg-[var(--main-purple)] rounded-l-full", {"transition-all duration-300": !isDragging})}
              style={{ width: `${liveProgress}%` }}
            />

            {/* Thumb — мгновенно следует за мышью + увеличение */}
            <div
              className={clsx(
                "absolute top-1/2 bg-[var(--main-purple)] rounded-full shadow-md",
                isDragging
                  ? "w-[16px] h-[16px] shadow-lg"
                  : "w-[10px] h-[10px] transition-all duration-300"
              )}
              style={{
                left: `${liveProgress}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>

        {timeDisplayPosition && (
          <span
            className={clsx("text-[12px] select-none", {
              "-order-1": timeDisplayPosition === "sides",
            })}
          >
            {formatTime(passedTime)}
          </span>
        )}
        {timeDisplayPosition && (
          <span className="justify-self-end text-[12px] select-none">
            {formatTime(getDisplayLeftTime())}
          </span>
        )}
      </div>
    </div>
  );
};
