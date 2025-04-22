import React, { memo, ReactNode } from "react";

import Header from "@/components/header/Header";
import Picture from "@/components/utils/Picture";
import TextEditorInterpreter from "@/components/utils/TextEditorInterpreter";

export type HeroWithImageProps = {
  menu?: {
    __typename?: "Menu";
    Menu?: Array<{
      __typename?: "ComponentMenuElementMenyu";
      Text?: string | null;
      id: string;
      PageLink?: { __typename?: "Page"; Slug: string } | null;
    } | null> | null;
  } | null;
  section: {
    __typename?: "ComponentHeaderWithImagePervyjBlokSIzobrazheniem";
    Title?: string | null;
    Subtitle?: string | null;
    IsLanguageButtonVisible?: boolean | null;
    IsBigButtonVisible?: boolean | null;
    BigButton?: {
      __typename?: "ComponentBigButtonBolshayaKnopka";
      ButtonText?: string | null;
      page?: { __typename?: "Page"; Slug: string } | null;
    } | null;
    Image?: {
      __typename?: "UploadFile";
      url: string;
      formats?: any | null;
      alternativeText?: string | null;
    } | null;
  };
  header: ReactNode;
};
export default memo(function HeroWithImage({
  menu,
  section,
  header,
}: HeroWithImageProps) {
  return (
    <section className="hero-with-image">
      <div className="container">
        {header}
        <Picture
          className="hero-with-image__picture"
          {...section.Image}
        ></Picture>
        <div className="hero-with-image__content">
          <p className="hero-with-image__subtitle">
            <TextEditorInterpreter>{section.Subtitle}</TextEditorInterpreter>
          </p>
          <h1 className="hero-with-image__title">{section.Title}</h1>
        </div>
      </div>
    </section>
  );
});
