"use client";
import React, { useEffect, useRef, useState } from "react";
import PlaylistAudioList from "./PlaylistAudioList";
import PlaylistControls from "./PlaylistControls";
import { Audio } from "../sections/audio-preview/AudioPreview";
import { AudioCategory } from "@/gql/generated/graphql";
import { Image } from "../utils/Picture";
import { parseStringTime } from "@/utils/parseStringTime";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudio,
  selectAudioFlow,
  setAudio,
  setFlow,
  setIsPlaying,
  setPassedTime,
  setPlaylist,
  setPlaylistAudioPositions,
  setProgress,
} from "@/lib/store/audioSlice";
import { shuffleAudioList } from "@/utils/shuffleAudioList";
import { AudioElement } from "@/utils/audioModel";
import { RootState } from "@/lib/store/types";
import { useScrollToAudio } from "@/shared/hooks/useScrollToAudio";

type PlaylistBodyProps = {
  audios: Audio[];
  audioCategory?:
    | {
        __typename?: string;
        Name: string;
        locale?: string | null;
        documentId: string;
        Image?: Image;
      }
    | null
    | undefined;
};

export default function PlaylistBody({
  audios,
  audioCategory,
}: PlaylistBodyProps) {
  const audioListlength = useRef(audios?.length);

  const audioListTotalHours = useRef(
    Math.round(
      audios.reduce(
        (sum, audio) => sum + parseStringTime(audio?.Duration).seconds,
        0
      ) / 3600
    )
  );

  const [audiosPositionList, setAudiosPositionList] = useState(
    audios.map((audio) => audio?.documentId || "")
  );
  const dispatch = useAppDispatch();
  const audio = useAppSelector(selectAudio);
  const flow = useAppSelector(selectAudioFlow);

  const shuffle = () => {
    dispatch(setFlow("random"));
    const newAudioList = shuffleAudioList(audios);
    setAudiosPositionList(newAudioList);

    dispatch(setPlaylistAudioPositions(newAudioList));
  };

  const sort = () => {
    dispatch(setFlow("direct"));
    setAudiosPositionList(audios.map((audio) => audio?.documentId || ""));
    const playlistAudioPositions = audios.map(
      (audio) => audio?.documentId || ""
    );
    dispatch(setPlaylistAudioPositions(playlistAudioPositions));
  };

  const play = () => {
    const audioElement = new AudioElement();
    let audioToBePlayed: Audio | undefined = audio;
    if (audio?.AudioCategory?.documentId !== audioCategory?.documentId) {
      audioToBePlayed = audios.find(
        (audio) => audio?.documentId === audiosPositionList[0]
      );
    }
    dispatch(setAudio(audioToBePlayed || null));
    audioElement.play({ audio: audioToBePlayed }).then(() => {
      dispatch(setIsPlaying(true));
    });

    dispatch(setPlaylist(audios));
    let playlistAudioPositions = [];
    if (flow === "direct") {
      playlistAudioPositions = audios.map((audio) => audio?.documentId || "");
    } else {
      playlistAudioPositions = shuffleAudioList(audios);
    }
    dispatch(setPlaylistAudioPositions(playlistAudioPositions));
  };

  const pause = () => {
    const audioElement = new AudioElement();
    dispatch(setIsPlaying(false));
    audioElement.pause();
  };

  useEffect(() => {
    let playlistAudioPositions = [];
    if (flow === "direct") {
      playlistAudioPositions = audios.map((audio) => audio?.documentId || "");
    } else {
      playlistAudioPositions = shuffleAudioList(audios);
    }
    setAudiosPositionList(playlistAudioPositions);
  }, [flow]);

  const { highlightedAudioId } = useScrollToAudio();
  
  useEffect(() => {
    if (highlightedAudioId) {
      const currentAudio = audios.find(
        (audio) => audio?.documentId === highlightedAudioId
      );

      if (currentAudio) {
        const audioElement = new AudioElement();

        dispatch(setPlaylist(audios));
        let playlistAudioPositions = [];
        if (flow === "direct") {
          playlistAudioPositions = audios.map(
            (audio) => audio?.documentId || ""
          );
        } else {
          playlistAudioPositions = shuffleAudioList(audios);
        }
        dispatch(setPlaylistAudioPositions(playlistAudioPositions));
        dispatch(setAudio(currentAudio));
        dispatch(setPassedTime(0));
        dispatch(setProgress(0));
      }
    }
  }, [highlightedAudioId]);

  return (
    <>
      <PlaylistControls
        audioListTotalHours={audioListTotalHours.current}
        audioListlength={audioListlength.current}
        audioCategory={audioCategory}
        sort={sort}
        shuffle={shuffle}
        pause={pause}
        play={play}
      ></PlaylistControls>
      <PlaylistAudioList
        audiosPositionList={audiosPositionList}
        audios={audios}
      ></PlaylistAudioList>
    </>
  );
}
