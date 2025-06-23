import {
  PageQuery,
  PageQueryVariables,
  PageDocument,
  PostQuery,
  PostQueryVariables,
  PostDocument,
} from "@/gql/generated/graphql";
import { initializeApollo } from "@/lib/apollo/client";
import { setLocale } from "@/lib/localeStore/localeSlice";
import { createLocaleStore } from "@/lib/localeStore/localeStore";
import { Locale } from "@/utils/getLocalizedData";
import React from "react";
import PageGenerator from "./PageGenerator";
import LocaleStoreProvider from "./providers/LocaleStoreProvider";
import { getIdBySlug } from "@/utils/getIdBySlug";
import PostGenerator from "./PostGenerator";
import { MetadataPropsType } from "@/app/[[...slug]]/page";
import { parseParams } from "@/utils/parseParams";

export type Pagination = {
  start: number;
  limit: number;
};

export type RenderPageProps = MetadataPropsType;

async function RenderPage({
  params
}: RenderPageProps) {
  const apolloClient = initializeApollo();
  const {slug, postType, locale, postsPagination, moviesPagination, audiosPagination} = await parseParams(params)

  const documentId = await getIdBySlug(slug, postType, apolloClient);
  if (!documentId) return;

  if (postType === "page") {
    const { data: pageData } = await apolloClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables: {
        documentId,
        pagination: audiosPagination,
        sort: ["Date:DESC"],
        postsPagination2: postsPagination,
        moviesPagination2: moviesPagination,
        locale: locale,
        audiorecordsLocale2: locale,
        audioCategoriesLocale2: locale,
        postCategoriesLocale2: locale,
        postsLocale2: locale,
        moviesLocale2: locale,
        menuLocale2: locale,
        footerLocale2: locale,
      },
    });

    // Создаем Redux store на сервере и задаем locale
    const store = createLocaleStore();
    store.dispatch(setLocale(locale));

    return (
      <LocaleStoreProvider initialState={store.getState()}>
        <PageGenerator {...pageData} />
      </LocaleStoreProvider>
    );
  } else if (postType === 'post') {
    const { data: postData } = await apolloClient.query<
      PostQuery,
      PostQueryVariables
    >({
      query: PostDocument,
      variables: {
        documentId,
        locale: locale,
        menuLocale2: locale,
        footerLocale2: locale,
      },
    });

    // Создаем Redux store на сервере и задаем locale
    const store = createLocaleStore();
    store.dispatch(setLocale(locale));

    return (
      <LocaleStoreProvider initialState={store.getState()}>
        <PostGenerator />
      </LocaleStoreProvider>
    );
  }
}

export default RenderPage;
