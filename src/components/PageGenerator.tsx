import { PageQuery } from "@/gql/generated/graphql";
import React from "react";
import HeroWithImage from "./sections/hero-with-image/HeroWithImage";
import Header from "./header/Header";
import HeaderLogo from "./header/HeaderLogo";
import AudioPreview from "./sections/audio-preview/AudioPreview";

export default function PageGenerator({
  page,
  menu,
  logo,
  audiorecords,
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
            console.log(section);

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
              }
              case "Stati": {
              }
            }
          }
        }
      })}
    </>
  );
}
