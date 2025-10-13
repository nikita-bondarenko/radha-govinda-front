import {
  PageQuery,
  PageQueryVariables,
  PageDocument,
  PostQuery,
  PostQueryVariables,
  PostDocument,
  DocumentQueryVariables,
  DocumentDocument,
  DocumentQuery,
} from "@/gql/generated/graphql";
import { initializeApollo } from "@/lib/apollo/client";

import React from "react";
import PageGenerator from "./PageGenerator";
import StoreProvider from "./providers/StoreProvider";
import { getIdBySlug } from "@/utils/getIdBySlug";
import PostGenerator from "./PostGenerator";
import { MetadataPropsType } from "@/app/[[...slug]]/page";
import { parseParams } from "@/utils/parseParams";
import DocumentGenerator from "./DocumentGenerator";
import NotFoundPage from "./not-found/NotFoundPage";

export type Pagination = {
  start: number;
  limit: number;
};

export type RenderPageProps = MetadataPropsType;

async function RenderPage({ params }: RenderPageProps) {
  const apolloClient = initializeApollo();
  const {
    slug,
    postType,
    locale,
    postsPagination,
    moviesPagination,
    audiosPagination,
  } = await parseParams(params);

  const documentId = await getIdBySlug(slug, postType, apolloClient);

console.log('postType',postType)
  if (postType === "page") {
    const { data } = await apolloClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables: {
        documentId: documentId || '',
        audiorecordsPagination: audiosPagination,
        sort: ["Date:DESC"],
        postsPagination: postsPagination,
        moviesPagination: moviesPagination,
        locale: locale,
      },
    });

    if (!!data.page) {
      return <PageGenerator {...data} />;
    } else {
      return (
        <NotFoundPage
          locale={locale}
          footer={data.footer}
          logo={data.logo}
          menu={data.menu}
        ></NotFoundPage>
      );
    }
  } else if (postType === "post") {
    const { data } = await apolloClient.query<PostQuery, PostQueryVariables>({
      query: PostDocument,
      variables: {
        documentId: documentId || '',
        locale: locale,
        menuLocale2: locale,
        footerLocale2: locale,
      },
    });

    if (data.post) {
      return <PostGenerator {...data} />;
    } else {
      return (
        <NotFoundPage
          locale={locale}
          footer={data.footer}
          logo={data.logo}
          menu={data.menu}
        ></NotFoundPage>
      );
    }
  } else if (postType === "doc") {
    const { data } = await apolloClient.query<
      DocumentQuery,
      DocumentQueryVariables
    >({
      query: DocumentDocument,
      variables: {
        documentId: documentId || '',
        locale: locale,
        menuLocale2: locale,
        footerLocale2: locale,
      },
    });

    if (data.doc) {
      return <DocumentGenerator {...data} />;
    } else {
      return (
        <NotFoundPage
          locale={locale}
          footer={data.footer}
          logo={data.logo}
          menu={data.menu}
        ></NotFoundPage>
      );
    }
  }
}

export default RenderPage;
