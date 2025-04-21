import React from "react";
import Container from "../../styled/Container.styled";

type HeaderProps = {
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
};
export default function HeroWithImage({ menu, section }: HeaderProps) {
  return (
      <Container>
      </Container>
  );
}
