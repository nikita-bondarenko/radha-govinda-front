import { PageQuery } from "@/gql/generated/graphql";
import React from "react";
import HeroWithImage from "./sections/hero-with-image/HeroWithImage";
import Header from "./header/Header";
import HeaderLogo from "./header/HeaderLogo";

export default function PageGenerator({ page, menu, logo }: PageQuery) {
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
        }
      })}
    </>
  );
}
