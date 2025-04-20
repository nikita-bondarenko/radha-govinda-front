import { PageQuery } from "@/gql/generated/graphql";
import React from "react";
import HeaderImage from "./HeaderWithImage";

export default function PageGenerator({ page, menu }: PageQuery) {
  return (
    <>
      {page?.PageConstructor?.map((section, index) => {
        switch (section?.__typename) {
          case "ComponentHeaderWithImagePervyjBlokSIzobrazheniem": {
            return <HeaderImage section={section} menu={menu}></HeaderImage>
          }
        }
      })}
    </>
  );
}
