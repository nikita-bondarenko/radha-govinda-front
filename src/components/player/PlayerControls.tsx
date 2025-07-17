import clsx from "clsx";
import React, { useEffect, useState } from "react";
import style from "./Player.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    playNextAudio,
    playPrevAudio,
  selectAudioFlow,
  selectAudioIsPlaying,
  selectAudioVolume,
  selectAudioIsLooping,
  setFlow,
  setVolume,
  toggleIsPlaying,
  toggleIsLooping,
} from "@/lib/store/audioSlice";
import { getRangePercent } from "@/utils/getRangePersent";
import PlayerCircleButton from "./PlayerCircleButton";
import PlayerPrevButton from "./PlayerPrevButton";
import PlayerPlayPauseButton from "./PlayerPlayPauseButton";
import PlayerNextButton from "./PlayerNextButton";
import PlayerShuffleButton from "./PlayerShuffleButton";
import PlayerPlaylistButton from "./PlayerPlaylistButton";
import PlayerVolumeControl from "./PlayerVolumeControl";
type Props = {};

const PlayerControls = (props: Props) => {
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const volume = useAppSelector(selectAudioVolume);
  const flow = useAppSelector(selectAudioFlow);
  const isLooping = useAppSelector(selectAudioIsLooping);
  const dispatch = useAppDispatch();
  
  // Отладочная информация
  console.log('PlayerControls state:', { flow, isLooping, isPlaying });
  
  const handlePrevButtonClick = () => {
    dispatch(playPrevAudio());
  };
  const handleNextButtonClick = () => {
    dispatch(playNextAudio());
  };
  const handleShuffleButtonClick = () => {
    console.log('Shuffle button clicked, current flow:', flow);
    const newFlow = flow === 'random' ? 'direct' : 'random';
    dispatch(setFlow(newFlow));
  };
  const handleCircleButtonClick = () => {
    console.log('Circle button clicked, current isLooping:', isLooping);
    dispatch(toggleIsLooping());
  };
  const volumeInputHandler: React.ChangeEventHandler = (e) => {
    dispatch(setVolume(getRangePercent(e.target as HTMLInputElement)));
  };
  
  const playingButtonClickHandler: React.MouseEventHandler = () => {
    dispatch(toggleIsPlaying());
  };

  const [forceRender, setForceRender] = useState(0)
useEffect(() => {
    console.log('PlayerControls useEffect triggered, flow:', flow, 'isLooping:', isLooping);
    setForceRender(prev=>prev+1)
}, [flow, isLooping])

// Принудительное обновление при изменении состояний
useEffect(() => {
  console.log('States changed - flow:', flow, 'isLooping:', isLooping);
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
        />
        <PlayerNextButton onClick={handleNextButtonClick} />
        <PlayerShuffleButton 
          key={`shuffle-${flow}-${forceRender}`}
          selected={flow ==='random'} 
          onClick={handleShuffleButtonClick} 
        />
      </div>
      <div className={clsx(style.controls__right)}>
        <PlayerPlaylistButton onClick={() => {}} />
        <PlayerVolumeControl 
          volume={volume}
          onChange={volumeInputHandler}
        />
      </div>
    </div>
  );
};

export default PlayerControls;
