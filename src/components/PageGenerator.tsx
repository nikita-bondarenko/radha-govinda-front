import { PageQuery } from "@/gql/generated/graphql";
import React from "react";
import HeroWithImage from "./sections/hero-with-image/HeroWithImage";
import Header from "./header/Header";
import HeaderLogo from "./header/HeaderLogo";
import AudioPreview from "./sections/audio-preview/AudioPreview";
import Player from "./player/Player";
import BlogPreview from "./sections/blog-preview/BlogPreview";
import VideoPreview from "./sections/video-preview/VideoPreview";
import Leanage from "./sections/leanage/Leanage";
import Biography from "./sections/biography/Biography";

export default function PageGenerator({
  page,
  menu,
  logo,
  audiorecords,
  posts,
  movies,
}: PageQuery) {
  return (
    <>
      {page?.PageConstructor?.map((section, index) => {
        switch (section?.__typename) {
          case "ComponentHeaderWithImagePervyjBlokSIzobrazheniem": {
            return (
              <HeroWithImage
                key={index}
                section={section}
                menu={menu}
                logo={logo}
                pageSlug={page.Slug}
                locale={page.locale}
              ></HeroWithImage>
            );
          }
          case "ComponentHomePagePrevyuRazdelaSajta": {
            switch (section?.DivisionName) {
              case "Lekczii": {
                return (
                  <AudioPreview
                    key={index}
                    locale={page.locale}
                    title={section.Title}
                    audiorecords={audiorecords}
                  ></AudioPreview>
                );
              }
              case "Video": {
                return (
                  <VideoPreview
                    key={index}
                    locale={page.locale}
                    title={section.Title}
                    movies={movies}
                  ></VideoPreview>
                );
              }
              case "Stati": {
                return (
                  <BlogPreview
                    key={index}
                    locale={page.locale}
                    title={section.Title}
                    posts={posts}
                  ></BlogPreview>
                );
              }
            }
          }

          case "ComponentHomePageParampara": {
            return <Leanage section={section}  key={index}></Leanage>
          }
          case "ComponentHomePageBiografiya": {
            return <Biography section={section} key={index}></Biography>
          }
        }
      })}
    </>
  );
}
