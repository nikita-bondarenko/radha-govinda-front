import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
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
  selectPlaylist,
  setPlaylistAudioPositions,
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
import { shuffleAudioList } from "@/utils/shuffleAudioList";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {};

const PlayerControls = (props: Props) => {
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const isLoading = useAppSelector(selectAudioIsLoading);
  const audio = useAppSelector(selectAudio);
  const playlist = useAppSelector(selectPlaylist);
  const volume = useAppSelector(selectAudioVolume);
  const flow = useAppSelector(selectAudioFlow);
  const isLooping = useAppSelector(selectAudioIsLooping);
  const currentLocale = useAppSelector((state) => state.locale.locale);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { innerWidth } = useWindowSize();


  const audioCatalogHref = useMemo(() => {
      const audioLocale = audio?.locale || currentLocale;

    return `${audioLocale === "ru" ? "" : "/en"}/${
      innerWidth > 1200 ? "lectures-and-kirtans?category=" : "playlist/"
    }${audio?.AudioCategory?.documentId}`;
  }, [innerWidth, audio, currentLocale]);

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

    let playlistAudioPositions = [];
    if (newFlow === "direct") {
      playlistAudioPositions = playlist.map((audio) => audio?.documentId || "");
    } else {
      playlistAudioPositions = shuffleAudioList(playlist);
    }
    dispatch(setPlaylistAudioPositions(playlistAudioPositions));
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
      audioElement.play({ audio }).then(() => {
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
