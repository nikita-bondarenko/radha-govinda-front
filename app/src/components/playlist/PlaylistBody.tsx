"use client";
import React, { useEffect, useRef, useState } from "react";
import PlaylistAudioList from "./PlaylistAudioList";
import PlaylistControls from "./PlaylistControls";
import { Audio } from "../sections/audio-preview/AudioPreview";
import { AudioCategory } from "@/gql/generated/graphql";
import { Image } from "../utils/Picture";
import { parseStringTime } from "@/utils/parseStringTime";
import { useAppDispatch } from "@/lib/store/hooks";
import { setFlow } from "@/lib/store/audioSlice";
import { shuffleAudioList } from "@/utils/shuffleAudioList";

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

  const [sortedAudios, setSortedAudios] = useState(audios);

  const dispatch = useAppDispatch();
  const shuffle = () => {
    dispatch(setFlow("random"));

    const newAudioList = shuffleAudioList(audios);

    setSortedAudios(newAudioList);
  };

  const sort = () => {
    dispatch(setFlow("direct"));

    setSortedAudios(audios);
  };

  useEffect(() => {
    console.log(sortedAudios.map((audio) => audio?.Name));
  }, [sortedAudios]);

  const play = () => {};

  const pause = () => {};

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
      <PlaylistAudioList audios={sortedAudios}></PlaylistAudioList>
    </>
  );
}
