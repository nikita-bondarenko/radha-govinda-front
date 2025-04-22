import { PageQuery } from "@/gql/generated/graphql";
import React from "react";
import HeaderImage from "./sections/hero-with-image/HeroWithImage";
import Header from "./header/Header";
import HeaderLogo from "./header/HeaderLogo";

export default function PageGenerator({ page, menu, logo }: PageQuery) {
  return (
    <>
      {page?.PageConstructor?.map((section, index) => {
        switch (section?.__typename) {
          case "ComponentHeaderWithImagePervyjBlokSIzobrazheniem": {
            return (
              <HeaderImage
                header={
                  <Header
                    {...section}
                    logo={
                      <HeaderLogo {...logo} locale={page.locale}></HeaderLogo>
                    }
                    menu={menu}
                    pageSlug={page.Slug}
                    locale={page.locale}
                  ></Header>
                }
                key={index}
                section={section}
                menu={menu}
              ></HeaderImage>
            );
          }
        }
      })}
    </>
  );
}
