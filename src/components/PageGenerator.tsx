import { PageQuery } from "@/gql/generated/graphql";
import React from "react";
import HeaderImage from "./sections/hero/HeroWithImage";

export default function PageGenerator({ page, menu }: PageQuery) {
  return (
    <>
      {page?.PageConstructor?.map((section, index) => {
        switch (section?.__typename) {
          case "ComponentHeaderWithImagePervyjBlokSIzobrazheniem": {
            return <HeaderImage key={index} section={section} menu={menu}></HeaderImage>
          }
        }
      })}
    </>
  );
}
