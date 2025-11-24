"use client";
import { Audiorecord } from "@/gql/generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import React, { memo, useEffect } from "react";
import AudioPreviewItem from "../../ui/audioItem/AudioItem";
import { localizeHref } from "@/utils/localizeHref";
import styles from "./AudioPreview.module.css";
import PreviewSection from "@/components/ui/previewSection/PreviewSection";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudio,
  selectAudioFlow,
  selectPlaylist,
  setAudio,
  setPlaylist,
  setPlaylistAudioPositions,
} from "@/lib/store/audioSlice";
import { Image } from "@/components/utils/Picture";
import { shuffleAudioList } from "@/utils/shuffleAudioList";

export type PreviewSectionProps = {
  title: Maybe<string>;
  locale: Maybe<string>;
};

export type Audio = {
  documentId: string;
  __typename?: "Audiorecord";
  createdAt?: any | null;
  Place?: string | null;
  Name: string;
  Duration: string;
  Date?: any | null;
  locale?: string | null; // Добавляем поле locale
  AudioCategory?: {
    __typename?: "AudioCategory";
    Name: string;
    documentId: string;
    Image?: Image;
  } | null;
  Audio: { __typename?: "UploadFile"; url: string; size: number };
} | null;

export type AudioPreviewProps = {
  audiorecords: Array<Audio>;
} & PreviewSectionProps;

export default memo(function AudioPreview({
  title,
  locale,
  audiorecords,
}: AudioPreviewProps) {
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectAudioFlow);
  const playlist = useAppSelector(selectPlaylist);
  const audio = useAppSelector(selectAudio);

  const handleControlButtonClick = () => {
    dispatch(setPlaylist(audiorecords));
    let playlistAudioPositions = [];
    if (flow === "direct") {
      playlistAudioPositions = audiorecords.map(
        (audio) => audio?.documentId || ""
      );
    } else {
      playlistAudioPositions = shuffleAudioList(audiorecords);
    }
    dispatch(setPlaylistAudioPositions(playlistAudioPositions));
  };

  useEffect(() => {
    if (!audio) dispatch(setPlaylist(audiorecords));
  }, []);

  return (
    <PreviewSection
      title={title}
      locale={locale}
      directedPageSlug="lectures-and-kirtans"
      linkText={{ en: "All lectures", ru: "Все лекции" }}
    >
      <div className={styles.body}>
        {audiorecords?.map((audio, index) => (
          <AudioPreviewItem
            handleControlButtonClick={handleControlButtonClick}
            isPreviewSection
            key={index}
            audio={audio}
          ></AudioPreviewItem>
        ))}
      </div>
    </PreviewSection>
  );
});
