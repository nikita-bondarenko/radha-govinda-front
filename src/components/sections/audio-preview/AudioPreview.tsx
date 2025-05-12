"use client"
import { Audiorecord } from "@/gql/generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import React, { memo, useEffect } from "react";
import AudioPreviewItem from "../../ui/audioItem/AudioItem";
import { localizeHref } from "@/utils/localizeHref";
import styles from "./AudioPreview.module.css";
import PreviewSection from "@/components/ui/previewSection/PreviewSection";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAudio } from "@/lib/store/audioSlice";

export type PreviewSectionProps = {
  title: Maybe<string>;
  locale: Maybe<string>;
};

export type Audio = {
  __typename?: "Audiorecord";
  createdAt?: any | null;
  Place?: string | null;
  Name: string;
  Duration: string;
  Date?: any | null;
  AudioCategory?: {
    __typename?: "AudioCategory";
    Name: string;
    documentId: string;
  } | null;
  Audio: { __typename?: "UploadFile"; url: string; size: number };
  Image: {
    __typename?: "UploadFile";
    url: string;
    formats?: any | null;
    alternativeText?: string | null;
  };
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
  // useEffect(() => {
  //   dispatch(setAudio(audiorecords[0]));
  // }, []);
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
            locale={locale}
            key={index}
            audio={audio}
          ></AudioPreviewItem>
        ))}
      </div>
    </PreviewSection>
  );
});
