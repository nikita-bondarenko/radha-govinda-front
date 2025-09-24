import {
  PlaylistDocument,
  PlaylistQuery,
  PlaylistQueryVariables,
} from "@/gql/generated/graphql";
import { initializeApollo } from "@/lib/apollo/client";

import React from "react";
import { RenderPageProps } from "../RenderPage";
import PlaylistHeader from "./PlaylistHeader";
import Footer from "../sections/footer/Footer";
import PlaylistBody from "./PlaylistBody";

type PlaylistProps = RenderPageProps & {
  locale: string;
};

async function Playlist(props: PlaylistProps) {
  const apolloClient = initializeApollo();
  const audioCategoryId = (await props.params).id;

  const { data } = await apolloClient.query<
    PlaylistQuery,
    PlaylistQueryVariables
  >({
    query: PlaylistDocument,
    variables: {
      sort: ["Date:DESC"],
      locale: props.locale,
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
        <PlaylistHeader
          menu={data?.menu}
          locale={props.locale}
        ></PlaylistHeader>
        <PlaylistBody audioCategory={data.audioCategory} audios={audios}></PlaylistBody>
        <Footer menu={data?.menu} footer={data?.footer} />
      </main>
    </>
  );
}

export default Playlist;
