"use client";
import PreviewSection from "@/components/ui/previewSection/PreviewSection";
import React, { memo, useEffect, useReducer, useRef, useState } from "react";
import { PreviewSectionProps } from "../audio-preview/AudioPreview";
import MovieItem from "@/components/ui/movieItem/MovieItem";
import clsx from "clsx";
import { Category } from "../video-catalog/VideoCatalog";
import HorizontalCarusel from "@/components/ui/horisontalCarusel/HorizontalCarusel";
export type Movie = {
  __typename?: "Movie";
  createdAt?: any | null;
  YoutubeLink: string;
  documentId: string;
  MovieName: string;
  VideoCategory?: Category | null | undefined;
} | null;

export type VideoPreviewProps = {
  movies: Movie[];
} & PreviewSectionProps;

export default function VideoPreview({
  title,
  locale,
  movies,
}: VideoPreviewProps) {
  return (
    <PreviewSection
      directedPageSlug="videos"
      title={title}
      locale={locale}
      linkText={{ en: "All movies", ru: "Все видео" }}
    >
      <HorizontalCarusel listClassNames="gap-[20px] md:gap-[10px]">
        {movies.map((movie) => (
          <MovieItem key={movie?.documentId} movie={movie}></MovieItem>
        ))}
      </HorizontalCarusel>
    </PreviewSection>
  );
}
