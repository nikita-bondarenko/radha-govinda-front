import { PageQuery } from "@/gql/generated/graphql";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "./header/Header";
import HeaderLogo from "./header/HeaderLogo";
import Player from "./player/Player";
import { Locale } from "@/utils/getLocalizedData";
import Footer from "./sections/footer/Footer";

// Динамические импорты компонентов с поддержкой SSR
const HeroWithImage = dynamic(() => import("./sections/hero-with-image/HeroWithImage"), { ssr: true });
const AudioPreview = dynamic(() => import("./sections/audio-preview/AudioPreview"), { ssr: true });
const BlogPreview = dynamic(() => import("./sections/blog-preview/BlogPreview"), { ssr: true });
const VideoPreview = dynamic(() => import("./sections/video-preview/VideoPreview"), { ssr: true });
const Leanage = dynamic(() => import("./sections/leanage/Leanage"), { ssr: true });
const Biography = dynamic(() => import("./sections/biography/Biography"), { ssr: true });
const Schedule = dynamic(() => import("./sections/schedule/Schedule"), { ssr: true });
const HeroWithText = dynamic(() => import("./sections/hero-with-text/HeroWithText"), { ssr: true });
const VideoCatalog = dynamic(() => import("./sections/video-catalog/VideoCatalog"), { ssr: true });
const BlogCatalog = dynamic(() => import("./sections/blog-catalog/BlogCatalog"), { ssr: true });
const SectionImage = dynamic(() => import("./sections/section-image/SectionImage"), { ssr: true });

// Константы для типов компонентов
const COMPONENT_TYPES = {
  HERO_WITH_IMAGE: "ComponentHeaderWithImagePervyjBlokSIzobrazheniem",
  HERO_WITH_TEXT: "ComponentHeaderWithTextPervyjBlokSTekstom",
  PREVIEW_SECTION: "ComponentHomePagePrevyuRazdelaSajta",
  PARAMPARA: "ComponentHomePageParampara",
  BIOGRAPHY: "ComponentHomePageBiografiya",
  SCHEDULE: "ComponentCommonSectionRaspisanie",
  VIDEO_CATALOG: "ComponentVideoKatalogVideo",
  POST_CATALOG: "ComponentPostKatalogStatej",
  SECTION_IMAGE: "ComponentCommonSectionIzobrazhenie"
} as const;

// Константы для разделов сайта
const DIVISION_NAMES = {
  LECTURES: "Lekczii",
  VIDEO: "Video",
  ARTICLES: "Stati"
} as const;

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
  const renderSection = (section: any, index: number) => {
    console.log(section?.__typename);
    
    if (!page) return null;
    
    switch (section?.__typename) {
      case COMPONENT_TYPES.HERO_WITH_IMAGE: {
        return (
          <HeroWithImage
            key={index}
            section={section}
            menu={menu}
            logo={logo}
            pageSlug={page.Slug}
            locale={page.locale}
          />
        );
      }
      
      case COMPONENT_TYPES.HERO_WITH_TEXT: {
        return (
          <HeroWithText
            key={index}
            section={section}
            menu={menu}
            logo={logo}
            pageSlug={page.Slug}
            locale={page.locale}
          />
        );
      }
      
      case COMPONENT_TYPES.PREVIEW_SECTION: {
        switch (section?.DivisionName) {
          case DIVISION_NAMES.LECTURES: {
            return (
              <AudioPreview
                key={index}
                locale={page.locale}
                title={section.Title}
                audiorecords={audiorecords}
              />
            );
          }
          case DIVISION_NAMES.VIDEO: {
            return (
              <VideoPreview
                key={index}
                locale={page.locale}
                title={section.Title}
                movies={movies}
              />
            );
          }
          case DIVISION_NAMES.ARTICLES: {
            return (
              <BlogPreview
                key={index}
                locale={page.locale}
                title={section.Title}
                posts={posts}
              />
            );
          }
        }
        break;
      }

      case COMPONENT_TYPES.PARAMPARA: {
        return <Leanage key={index} section={section} />;
      }
      
      case COMPONENT_TYPES.BIOGRAPHY: {
        return <Biography key={index} section={section} />;
      }
      
      case COMPONENT_TYPES.SCHEDULE: {
        return <Schedule key={index} section={section} locale={page.locale as Locale} />;
      }

      case COMPONENT_TYPES.VIDEO_CATALOG: {
        return <VideoCatalog key={index} movies={movies} videoCategories={videoCategories} />;
      }

      case COMPONENT_TYPES.POST_CATALOG: {
        return <BlogCatalog key={index} posts={posts} postsCategories={postCategories} />;
      }

      case COMPONENT_TYPES.SECTION_IMAGE: {
        return <SectionImage key={index} section={section} />;
      }
    }
  };

  if (!page) return null;

  return (
    <>
      <main className="main">
        {page.PageConstructor?.map(renderSection)}
        <Footer menu={menu} footer={footer} />
      </main>
    </>
  );
}
