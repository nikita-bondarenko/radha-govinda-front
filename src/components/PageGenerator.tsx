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
import Schedule from "./sections/schedule/Schedule";
import { Locale } from "@/utils/getLocalizedData";
import Footer from "./sections/footer/Footer";
import HeroWithText from "./sections/hero-with-text/HeroWithText";
import VideoCatalog from "./sections/video-catalog/VideoCatalog";
import BlogCatalog from "./sections/blog-catalog/BlogCatalog";
import SectionImage from "./sections/section-image/SectionImage";

export default function PageGenerator({
  page,
  menu,
  logo,
  audiorecords,
  posts,
  movies,
  footer,
  videoCategories,
  postCategories
}: PageQuery) {
  return (
    <>
    <main className="main">
      {page?.PageConstructor?.map((section, index) => {
              //  console.log(section?.__typename)
              console.log(section?.__typename)
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
          case "ComponentHeaderWithTextPervyjBlokSTekstom": {
            return (
              <HeroWithText
              key={index}
              section={section}
              menu={menu}
              logo={logo}
              pageSlug={page.Slug}
              locale={page.locale}
     
              ></HeroWithText>
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
          case "ComponentCommonSectionRaspisanie": {
            return <Schedule section={section} locale={page.locale as Locale} key={index}></Schedule>

          }
          case "ComponentVideoKatalogVideo": {
            return <VideoCatalog movies={movies} videoCategories={videoCategories} key={index}></VideoCatalog>
          }

          case "ComponentPostKatalogStatej": {
            return <BlogCatalog posts={posts} postsCategories={postCategories} key={index}></BlogCatalog>
          }

          case "ComponentCommonSectionIzobrazhenie": {
            return <SectionImage section={section} key={index}></SectionImage>
          }
        }
      })}

      <Footer menu={menu} footer={footer} ></Footer>
      </main>
    </>
  );
}
