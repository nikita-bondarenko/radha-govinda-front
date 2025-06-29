"use client"
import { PostQuery } from "@/gql/generated/graphql";
import React from "react";
import Footer from "./sections/footer/Footer";
import HeaderSmall from "./sections/header-small/HeaderSmall";
import PageContent from "./sections/pageContent/PageContent";
import PostsRecomendations from "./sections/postsRecomendations/PostsRecomendations";
import { setLocale } from "@/lib/store/localeSlice";
import { useDispatch } from "react-redux";
import { Locale } from "@/utils/getLocalizedData";

export default function PostGenerator({ post, menu, footer, logo }: PostQuery) {
  const dispatch = useDispatch();
  dispatch(setLocale(post?.locale as Locale));
  return (
    <>
      <main className="main">
        <HeaderSmall
          pageSlug={post?.Slug}
          menu={menu}
          logo={logo}
          locale={post?.locale}
        ></HeaderSmall>
        <PageContent
          content={post?.PostContent}
          title={post?.PostTitle}
          date={post?.Date}
        ></PageContent>
        <PostsRecomendations section={post?.RecomendedPosts}></PostsRecomendations>
        <Footer menu={menu} footer={footer} />
      </main>
    </>
  );
}
