import React, { useRef, useEffect } from "react";
import style from "./Player.module.css";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectAudioProgress, selectAudioIsPlaying, selectAudioPassedTime, selectAudioLeftTime, selectAudio, setProgress, setPassedTime, setLeftTime } from "@/lib/store/audioSlice";
import { getRangePercent } from "@/utils/getRangePersent";
import { getCurrentTime, getDuration, setCurrentTime } from "@/lib/store/audioMiddleware";
import { parseDurationToSeconds } from "@/utils/parseDate";

type Props = {};

const PlayerProgressBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const progress = useAppSelector(selectAudioProgress);
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const passedTime = useAppSelector(selectAudioPassedTime);
  const leftTime = useAppSelector(selectAudioLeftTime);
  const audio = useAppSelector(selectAudio);
  const progressBar = useRef<HTMLInputElement>(null);

  // Отладка состояния
  useEffect(() => {
     // console.log('PlayerProgressBar state:', { progress, isPlaying, passedTime, leftTime });
  }, [progress, isPlaying, passedTime, leftTime]);

  // Функция для форматирования времени
  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Вычисляем оставшееся время из Duration если метаданные не загружены
  const getDisplayLeftTime = (): number => {
    // Приоритет 1: Если leftTime доступно из реальных метаданных, используем его
    const realDuration = getDuration();
    if (realDuration > 0 && isFinite(realDuration) && leftTime > 0) {
      return leftTime;
    }
    
    // Приоритет 2: Если метаданные не загружены, временно используем Duration из объекта audio
    if (audio?.Duration && (!realDuration || !isFinite(realDuration) || realDuration <= 0)) {
      const totalDurationSeconds = parseDurationToSeconds(audio.Duration);
      if (totalDurationSeconds && totalDurationSeconds > 0) {
        return Math.max(0, totalDurationSeconds - passedTime);
      }
    }
    
    return 0;
  };

  // Обновление прогресса и времени
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
       // console.log('Starting progress interval');
      interval = setInterval(() => {
        const currentTime = getCurrentTime();
        const realDuration = getDuration();
        let duration = realDuration;
        let usingFallbackDuration = false;
        
        // Используем Duration из объекта audio только если реальная длительность недоступна
        if ((!duration || !isFinite(duration) || duration <= 0) && audio?.Duration) {
          const parsedDuration = parseDurationToSeconds(audio.Duration);
          if (parsedDuration && parsedDuration > 0) {
            duration = parsedDuration;
            usingFallbackDuration = true;
          }
        }
        
         // console.log('Progress update:', { 
        //   currentTime, 
        //   duration, 
        //   realDuration,
        //   usingFallbackDuration,
        //   isPlaying, 
        //   audioDuration: audio?.Duration 
        // });
        
        if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
          const progressPercent = (currentTime / duration) * 100;
          const passed = currentTime;
          const left = duration - currentTime;
          
           // console.log('Dispatching progress:', { progressPercent, passed, left, usingFallbackDuration });
          
          dispatch(setProgress(progressPercent));
          dispatch(setPassedTime(passed));
          
          // Обновляем leftTime только если используем реальную длительность
          // При использовании fallback Duration не перезаписываем leftTime в Redux
          if (!usingFallbackDuration) {
            dispatch(setLeftTime(left));
          }
        } else {
           // console.log('Invalid duration, skipping progress update:', duration);
          // Все равно обновляем passedTime даже если duration недоступен
          dispatch(setPassedTime(currentTime));
        }
      }, 1000);
    } else {
       // console.log('Not playing, clearing interval');
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, dispatch, audio?.Duration]);

  // Обновляем leftTime когда становятся доступны реальные метаданные
  useEffect(() => {
    const realDuration = getDuration();
    if (realDuration > 0 && isFinite(realDuration)) {
      const currentTime = getCurrentTime();
      const left = realDuration - currentTime;
      if (left !== leftTime) {
        dispatch(setLeftTime(left));
         // console.log('Updated leftTime with real metadata:', { realDuration, currentTime, left });
      }
    }
  }, [leftTime, dispatch]);

  const progressInputHandler: React.ChangeEventHandler = (e) => {
    const input = e.target as HTMLInputElement;
    const percent = getRangePercent(input);
    const realDuration = getDuration();
    let duration = realDuration;
    let usingFallbackDuration = false;
    
    // Используем Duration из объекта audio только если реальная длительность недоступна
    if ((!duration || !isFinite(duration) || duration <= 0) && audio?.Duration) {
      const parsedDuration = parseDurationToSeconds(audio.Duration);
      if (parsedDuration && parsedDuration > 0) {
        duration = parsedDuration;
        usingFallbackDuration = true;
      }
    }
    
    if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
      const newTime = (percent / 100) * duration;
      setCurrentTime(newTime);
      dispatch(setProgress(percent));
      dispatch(setPassedTime(newTime));
      
      // Обновляем leftTime только если используем реальную длительность
      if (!usingFallbackDuration) {
        dispatch(setLeftTime(duration - newTime));
      }
    }
  };

  return (
    <div className={style.duration}>
      <input
        ref={progressBar}
        className={clsx(style.duration__input, "progress-bar with-thumb")}
        style={{ "--percent": `${progress}%` } as React.CSSProperties}
        onChange={progressInputHandler}
        type="range"
        max={100}
        min={0}
        value={progress}
      />
      <div className={style.duration__bottom}>
        <span className={clsx(style.duration__passed, "small-text grey")}>
          {formatTime(passedTime)}
        </span>
        <span className={clsx(style.duration__left, "small-text grey")}>
          {formatTime(getDisplayLeftTime())}
        </span>
      </div>
    </div>
  );
};

export default PlayerProgressBar;
