import React, { memo, ReactNode } from "react";
import ReactMarkdown from "react-markdown";

import Header from "@/components/header/Header";
import Picture, { Image } from "@/components/utils/Picture";
import TextEditorInterpreter from "@/components/utils/TextEditorInterpreter";
import HeaderLogo, { HeaderLogoProps } from "@/components/header/HeaderLogo";
import HeaderLectureBar from "@/components/header/HeaderLectureBar";
import styles from "./HeroWithImage.module.css";
import clsx from "clsx";
import Background from "@/components/utils/Background";

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
  logo?: Image;
  locale?: string | null;
  pageSlug: string;
};
export default memo(function HeroWithImage({
  menu,
  section,
  logo,
  locale,
  pageSlug,
}: HeroWithImageProps) {
  return (
    <section className={styles["hero-with-image"]}>
      <div className={styles['hero-with-image__gradient']} ></div>
      <Background
        className={styles["hero-with-image__background"]}
        image={section.Image}
        mdImageUrl={section.Image?.url}
        smImageUrl={section.Image?.url}
      ></Background>

      <div className={clsx("container", styles.container)}>
        <Header
          {...section}
          logo={<HeaderLogo {...logo} locale={locale} />}
          menu={menu}
          pageSlug={pageSlug}
          locale={locale}
        ></Header>

        <div className={styles["hero-with-image__body"]}>
          <div className={styles["hero-with-image__content"]}>
            <div className={styles["hero-with-image__subtitle"]}>
              <ReactMarkdown>{section.Subtitle}</ReactMarkdown>
            </div>
            <h1 className={styles["hero-with-image__title"]}>
              {section.Title}
            </h1>
            {section.IsBigButtonVisible && (
              <HeaderLectureBar
                button={section.BigButton}
                className={styles["hero-with-image__big-button"]}
              ></HeaderLectureBar>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
