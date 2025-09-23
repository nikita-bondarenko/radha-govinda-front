import { MetadataPropsType } from "@/app/[[...slug]]/page";
import {
  PlaylistDocument,
  PlaylistQuery,
  PlaylistQueryVariables,
} from "@/gql/generated/graphql";
import { initializeApollo } from "@/lib/apollo/client";
import { parseParams } from "@/utils/parseParams";
import { RenderPage } from "next/dist/shared/lib/utils";
import React from "react";
import { RenderPageProps } from "../RenderPage";
import PlaylistAudios from "./PlaylistAudios";
import PlaylistControls from "./PlaylistControls";
import PlaylistHeader from "./PlaylistHeader";

async function Playlist(props: RenderPageProps) {
  const apolloClient = initializeApollo();
  const {
    slug,
    postType,
    locale,
    postsPagination,
    moviesPagination,
    audiosPagination,
  } = await parseParams(props.params);

  const audioCategoryId = (await props.params).id;

  const { data } = await apolloClient.query<
    PlaylistQuery,
    PlaylistQueryVariables
  >({
    query: PlaylistDocument,
    variables: {
      sort: ["Date:DESC"],
      locale: locale,
      pagination: {
        start: 0,
        limit: 99999,
      },
      documentId: audioCategoryId,
    },
  });

  const audios = data.audiorecords.filter(
    (audio) => audio?.AudioCategory?.documentId === audioCategoryId
  );

  return (
    <>
      <main className="main">
        <PlaylistHeader menu={data?.menu} locale={locale}></PlaylistHeader>
        <PlaylistControls></PlaylistControls>
        <PlaylistAudios></PlaylistAudios>
      </main>
    </>
  );
}

export default Playlist;
