import clsx from "clsx";
import React, { useEffect, useState } from "react";
import style from "./Player.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudioFlow,
  selectAudioIsPlaying,
  selectAudioVolume,
  selectAudioIsLooping,
  selectAudioSelectedCategoryId,
  setFlow,
  setVolume,
  toggleIsPlaying,
  toggleIsLooping,
  setAudio,
  setIsPlaying,
  selectAudio,
  selectAudioIsLoading,
  selectAudioProgress,
} from "@/lib/store/audioSlice";
import { getRangePercent } from "@/utils/getRangePersent";
import PlayerCircleButton from "./PlayerCircleButton";
import PlayerPrevButton from "./PlayerPrevButton";
import PlayerPlayPauseButton from "./PlayerPlayPauseButton";
import PlayerNextButton from "./PlayerNextButton";
import PlayerShuffleButton from "./PlayerShuffleButton";
import PlayerPlaylistButton from "./PlayerPlaylistButton";
import PlayerVolumeControl from "./PlayerVolumeControl";
import useLocalizedHref from "@/hooks/useLocalizedHref";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store/store";
import { AudioElement } from "../../utils/audioModel";

type Props = {};

const PlayerControls = (props: Props) => {
  const isPlaying = useAppSelector(selectAudioIsPlaying);

  const isLoading = useAppSelector(selectAudioIsLoading);
  const audio = useAppSelector(selectAudio);
  const volume = useAppSelector(selectAudioVolume);
  const flow = useAppSelector(selectAudioFlow);
  const isLooping = useAppSelector(selectAudioIsLooping);
  const selectedCategoryId = useAppSelector(selectAudioSelectedCategoryId);
  const currentAudio = useAppSelector((state) => state.audio.audio);
  const currentLocale = useAppSelector((state) => state.locale.locale);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Используем локаль текущей аудиозаписи, если она есть, иначе используем локаль страницы
  const audioLocale = currentAudio?.locale || currentLocale;

  // Генерируем ссылку на основе локали аудиозаписи
  const audioCatalogHref =
    audioLocale === "ru"
      ? `/lectures-and-kirtans${
          selectedCategoryId ? `?category=${selectedCategoryId}` : ""
        }`
      : `/en/lectures-and-kirtans${
          selectedCategoryId ? `?category=${selectedCategoryId}` : ""
        }`;

  const handlePrevButtonClick = () => {
    const audioElement = new AudioElement();
    audioElement.playPrevAudio();
  };
  const handleNextButtonClick = () => {
    const audioElement = new AudioElement();
    audioElement.playNextAudio();
  };
  const handleShuffleButtonClick = () => {
    const newFlow = flow === "random" ? "direct" : "random";
    dispatch(setFlow(newFlow));
  };
  const handleCircleButtonClick = () => {
    dispatch(toggleIsLooping());
  };
  const volumeInputHandler: React.ChangeEventHandler = (e) => {
    const volume = getRangePercent(e.target as HTMLInputElement);
    dispatch(setVolume(volume));
    const audioElement = new AudioElement();
    audioElement.setVolume(volume);
  };

  const playingButtonClickHandler: React.MouseEventHandler = () => {
    const audioElement = new AudioElement();
    if (isPlaying) {
      dispatch(setIsPlaying(false));
      audioElement.pause();
    } else {
      audioElement.play({ audio, volume }).then(() => {
        dispatch(setIsPlaying(true));
      });
    }
  };

  const handlePlaylistButtonClick = () => {
    router.push(audioCatalogHref);
  };

  const [forceRender, setForceRender] = useState(0);
  useEffect(() => {
    setForceRender((prev) => prev + 1);
  }, [flow, isLooping]);

  useEffect(() => {
    dispatch(setIsPlaying(false));
  }, []);

  return (
    <div className={clsx(style.controls)}>
      <div className={clsx(style.controls__left)}>
        <PlayerCircleButton
          key={`circle-${isLooping}-${forceRender}`}
          selected={isLooping}
          onClick={handleCircleButtonClick}
        />
        <PlayerPrevButton onClick={handlePrevButtonClick} />
        <PlayerPlayPauseButton
          onClick={playingButtonClickHandler}
          isPlaying={isPlaying}
          isLoading={isLoading}
        />
        <PlayerNextButton onClick={handleNextButtonClick} />
        <PlayerShuffleButton
          key={`shuffle-${flow}-${forceRender}`}
          selected={flow === "random"}
          onClick={handleShuffleButtonClick}
        />
      </div>
      <div className={clsx(style.controls__right)}>
        <PlayerPlaylistButton onClick={handlePlaylistButtonClick} />
        <PlayerVolumeControl volume={volume} onChange={volumeInputHandler} />
      </div>
    </div>
  );
};

export default PlayerControls;
