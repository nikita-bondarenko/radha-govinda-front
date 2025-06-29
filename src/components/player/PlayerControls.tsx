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
  setFlow,
  setVolume,
  toggleIsPlaying,
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
  const dispatch = useAppDispatch();
  const handlePrevButtonClick = () => {
    dispatch(playPrevAudio());
  };
  const handleNextButtonClick = () => {
    dispatch(playNextAudio());
  };
  const handleShuffleButtonClick = () => {
    dispatch(setFlow("random"));
  };
  const handleCircleButtonClick = () => {
    dispatch(setFlow("direct"));
  };
  const volumeInputHandler: React.ChangeEventHandler = (e) => {
    dispatch(setVolume(getRangePercent(e.target as HTMLInputElement)));
  };
  
  const playingButtonClickHandler: React.MouseEventHandler = () => {
    dispatch(toggleIsPlaying());
  };

  const flow = useAppSelector(selectAudioFlow)

  const [forceRender, setForceRender] = useState(0)
useEffect(() => {
    setForceRender(prev=>prev+1)
}, [flow])
  return (
    <div className={clsx(style.controls)}>
      <div className={clsx(style.controls__left)}>
        <PlayerCircleButton selected={flow ==='direct'} onClick={handleCircleButtonClick} />
        <PlayerPrevButton onClick={handlePrevButtonClick} />
        <PlayerPlayPauseButton 
          onClick={playingButtonClickHandler}
          isPlaying={isPlaying}
        />
        <PlayerNextButton onClick={handleNextButtonClick} />
        <PlayerShuffleButton selected={flow ==='random'} onClick={handleShuffleButtonClick} />
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
