import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  I18NLocaleCode: { input: any; output: any };
  JSON: { input: any; output: any };
  PagePageConstructorDynamicZoneInput: { input: any; output: any };
};

export type AudioCategory = {
  __typename?: "AudioCategory";
  Name: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<AudioCategory>>;
  localizations_connection?: Maybe<AudioCategoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AudioCategoryLocalizationsArgs = {
  filters?: InputMaybe<AudioCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AudioCategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<AudioCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AudioCategoryEntityResponseCollection = {
  __typename?: "AudioCategoryEntityResponseCollection";
  nodes: Array<AudioCategory>;
  pageInfo: Pagination;
};

export type AudioCategoryFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<AudioCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<AudioCategoryFiltersInput>;
  not?: InputMaybe<AudioCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AudioCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AudioCategoryInput = {
  Name?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type AudioCategoryRelationResponseCollection = {
  __typename?: "AudioCategoryRelationResponseCollection";
  nodes: Array<AudioCategory>;
};

export type Audiorecord = {
  __typename?: "Audiorecord";
  Audio: UploadFile;
  AudioCategory?: Maybe<AudioCategory>;
  Date?: Maybe<Scalars["Date"]["output"]>;
  Duration: Scalars["String"]["output"];
  Image: UploadFile;
  Name: Scalars["String"]["output"];
  Place?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<Audiorecord>>;
  localizations_connection?: Maybe<AudiorecordRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AudiorecordLocalizationsArgs = {
  filters?: InputMaybe<AudiorecordFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AudiorecordLocalizations_ConnectionArgs = {
  filters?: InputMaybe<AudiorecordFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AudiorecordEntityResponseCollection = {
  __typename?: "AudiorecordEntityResponseCollection";
  nodes: Array<Audiorecord>;
  pageInfo: Pagination;
};

export type AudiorecordFiltersInput = {
  AudioCategory?: InputMaybe<AudioCategoryFiltersInput>;
  Date?: InputMaybe<DateFilterInput>;
  Duration?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  Place?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<AudiorecordFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<AudiorecordFiltersInput>;
  not?: InputMaybe<AudiorecordFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AudiorecordFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AudiorecordInput = {
  Audio?: InputMaybe<Scalars["ID"]["input"]>;
  AudioCategory?: InputMaybe<Scalars["ID"]["input"]>;
  Date?: InputMaybe<Scalars["Date"]["input"]>;
  Duration?: InputMaybe<Scalars["String"]["input"]>;
  Image?: InputMaybe<Scalars["ID"]["input"]>;
  Name?: InputMaybe<Scalars["String"]["input"]>;
  Place?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type AudiorecordRelationResponseCollection = {
  __typename?: "AudiorecordRelationResponseCollection";
  nodes: Array<Audiorecord>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]["input"]>;
  containsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  eqi?: InputMaybe<Scalars["Boolean"]["input"]>;
  gt?: InputMaybe<Scalars["Boolean"]["input"]>;
  gte?: InputMaybe<Scalars["Boolean"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]["input"]>;
  lte?: InputMaybe<Scalars["Boolean"]["input"]>;
  ne?: InputMaybe<Scalars["Boolean"]["input"]>;
  nei?: InputMaybe<Scalars["Boolean"]["input"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ComponentAudioKatalogAudiozopisej = {
  __typename?: "ComponentAudioKatalogAudiozopisej";
  id: Scalars["ID"]["output"];
};

export type ComponentBigButtonBolshayaKnopka = {
  __typename?: "ComponentBigButtonBolshayaKnopka";
  ButtonText?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  page?: Maybe<Page>;
};

export type ComponentCategoriesSpisokKategorij = {
  __typename?: "ComponentCategoriesSpisokKategorij";
  Categories?: Maybe<Enum_Componentcategoriesspisokkategorij_Categories>;
  id: Scalars["ID"]["output"];
};

export type ComponentCommonSectionIzobrazhenie = {
  __typename?: "ComponentCommonSectionIzobrazhenie";
  id: Scalars["ID"]["output"];
  image?: Maybe<UploadFile>;
};

export type ComponentCommonSectionRaspisanie = {
  __typename?: "ComponentCommonSectionRaspisanie";
  ScheduleItem?: Maybe<Array<Maybe<ComponentHomePageSobytie>>>;
  SectionTitle?: Maybe<Scalars["String"]["output"]>;
  TextBelow?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentCommonSectionRaspisanieScheduleItemArgs = {
  filters?: InputMaybe<ComponentHomePageSobytieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentDocsLinkSsylkaNaDokument = {
  __typename?: "ComponentDocsLinkSsylkaNaDokument";
  Document?: Maybe<UploadFile>;
  Text?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentDocsLinkSsylkaNaDokumentFiltersInput = {
  Text?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentDocsLinkSsylkaNaDokumentFiltersInput>>
  >;
  not?: InputMaybe<ComponentDocsLinkSsylkaNaDokumentFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentDocsLinkSsylkaNaDokumentFiltersInput>>
  >;
};

export type ComponentDocsLinkSsylkaNaDokumentInput = {
  Document?: InputMaybe<Scalars["ID"]["input"]>;
  Text?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentHeaderWithImagePervyjBlokSIzobrazheniem = {
  __typename?: "ComponentHeaderWithImagePervyjBlokSIzobrazheniem";
  BigButton?: Maybe<ComponentBigButtonBolshayaKnopka>;
  Image?: Maybe<UploadFile>;
  IsBigButtonVisible?: Maybe<Scalars["Boolean"]["output"]>;
  IsLanguageButtonVisible?: Maybe<Scalars["Boolean"]["output"]>;
  Subtitle?: Maybe<Scalars["String"]["output"]>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHeaderWithTextPervyjBlokSTekstom = {
  __typename?: "ComponentHeaderWithTextPervyjBlokSTekstom";
  BigButton?: Maybe<ComponentBigButtonBolshayaKnopka>;
  IsBigButtonVisible?: Maybe<Scalars["Boolean"]["output"]>;
  IsLanguageButtonVisible?: Maybe<Scalars["Boolean"]["output"]>;
  Subtitle?: Maybe<Scalars["String"]["output"]>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomePageBiografiya = {
  __typename?: "ComponentHomePageBiografiya";
  BioigrafyPeriods?: Maybe<Array<Maybe<ComponentHomePageBiografy>>>;
  Image?: Maybe<UploadFile>;
  SectionTitle?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomePageBiografiyaBioigrafyPeriodsArgs = {
  filters?: InputMaybe<ComponentHomePageBiografyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentHomePageBiografy = {
  __typename?: "ComponentHomePageBiografy";
  PeriodDescription?: Maybe<Scalars["String"]["output"]>;
  PeriodName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomePageBiografyFiltersInput = {
  PeriodDescription?: InputMaybe<StringFilterInput>;
  PeriodName?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentHomePageBiografyFiltersInput>>>;
  not?: InputMaybe<ComponentHomePageBiografyFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomePageBiografyFiltersInput>>>;
};

export type ComponentHomePageChlenParampary = {
  __typename?: "ComponentHomePageChlenParampary";
  Description?: Maybe<Scalars["String"]["output"]>;
  Image?: Maybe<UploadFile>;
  Name?: Maybe<Scalars["String"]["output"]>;
  Role?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomePageChlenParamparyFiltersInput = {
  Description?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  Role?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentHomePageChlenParamparyFiltersInput>>
  >;
  not?: InputMaybe<ComponentHomePageChlenParamparyFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentHomePageChlenParamparyFiltersInput>>
  >;
};

export type ComponentHomePageParampara = {
  __typename?: "ComponentHomePageParampara";
  LineageMember?: Maybe<Array<Maybe<ComponentHomePageChlenParampary>>>;
  SectionTitle?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomePageParamparaLineageMemberArgs = {
  filters?: InputMaybe<ComponentHomePageChlenParamparyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentHomePagePrevyuRazdelaSajta = {
  __typename?: "ComponentHomePagePrevyuRazdelaSajta";
  DivisionName?: Maybe<Enum_Componenthomepageprevyurazdelasajta_Divisionname>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomePageSobytie = {
  __typename?: "ComponentHomePageSobytie";
  EventDescription?: Maybe<Scalars["String"]["output"]>;
  MoreButtonHref?: Maybe<Scalars["String"]["output"]>;
  Name?: Maybe<Scalars["String"]["output"]>;
  Period?: Maybe<Scalars["String"]["output"]>;
  Place?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomePageSobytieFiltersInput = {
  EventDescription?: InputMaybe<StringFilterInput>;
  MoreButtonHref?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  Period?: InputMaybe<StringFilterInput>;
  Place?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentHomePageSobytieFiltersInput>>>;
  not?: InputMaybe<ComponentHomePageSobytieFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomePageSobytieFiltersInput>>>;
};

export type ComponentInputPoleVvoda = {
  __typename?: "ComponentInputPoleVvoda";
  InputType?: Maybe<Enum_Componentinputpolevvoda_Inputtype>;
  Placeholder?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentInputPoleVvodaFiltersInput = {
  InputType?: InputMaybe<StringFilterInput>;
  Placeholder?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentInputPoleVvodaFiltersInput>>>;
  not?: InputMaybe<ComponentInputPoleVvodaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentInputPoleVvodaFiltersInput>>>;
};

export type ComponentInputPoleVvodaInput = {
  InputType?: InputMaybe<Enum_Componentinputpolevvoda_Inputtype>;
  Placeholder?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentMenuElementMenyu = {
  __typename?: "ComponentMenuElementMenyu";
  PageLink?: Maybe<Page>;
  Text?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentMenuElementMenyuFiltersInput = {
  PageLink?: InputMaybe<PageFiltersInput>;
  Text?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentMenuElementMenyuFiltersInput>>>;
  not?: InputMaybe<ComponentMenuElementMenyuFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentMenuElementMenyuFiltersInput>>>;
};

export type ComponentMenuElementMenyuInput = {
  PageLink?: InputMaybe<Scalars["ID"]["input"]>;
  Text?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentMetaSeo = {
  __typename?: "ComponentMetaSeo";
  Description?: Maybe<Scalars["String"]["output"]>;
  Preview510x230?: Maybe<UploadFile>;
  Preview1200x630?: Maybe<UploadFile>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentMetaSeoFiltersInput = {
  Description?: InputMaybe<StringFilterInput>;
  Title?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentMetaSeoFiltersInput>>>;
  not?: InputMaybe<ComponentMetaSeoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentMetaSeoFiltersInput>>>;
};

export type ComponentMetaSeoInput = {
  Description?: InputMaybe<Scalars["String"]["input"]>;
  Preview510x230?: InputMaybe<Scalars["ID"]["input"]>;
  Preview1200x630?: InputMaybe<Scalars["ID"]["input"]>;
  Title?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentPostAkczentirovannyjTekst = {
  __typename?: "ComponentPostAkczentirovannyjTekst";
  Text?: Maybe<Scalars["JSON"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentPostCzitata = {
  __typename?: "ComponentPostCzitata";
  QuoteSource?: Maybe<Scalars["String"]["output"]>;
  QuoteText?: Maybe<Scalars["JSON"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentPostIllyustracziya = {
  __typename?: "ComponentPostIllyustracziya";
  Image?: Maybe<UploadFile>;
  id: Scalars["ID"]["output"];
};

export type ComponentPostInteresnoe = {
  __typename?: "ComponentPostInteresnoe";
  Posts: Array<Maybe<Post>>;
  Posts_connection?: Maybe<PostRelationResponseCollection>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentPostInteresnoePostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentPostInteresnoePosts_ConnectionArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentPostKatalogStatej = {
  __typename?: "ComponentPostKatalogStatej";
  id: Scalars["ID"]["output"];
};

export type ComponentPostTekst = {
  __typename?: "ComponentPostTekst";
  Text?: Maybe<Scalars["JSON"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentSocialMediaSsylkaNaSoczset = {
  __typename?: "ComponentSocialMediaSsylkaNaSoczset";
  Href?: Maybe<Scalars["String"]["output"]>;
  Icon?: Maybe<UploadFile>;
  Name?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentSocialMediaSsylkaNaSoczsetFiltersInput = {
  Href?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentSocialMediaSsylkaNaSoczsetFiltersInput>>
  >;
  not?: InputMaybe<ComponentSocialMediaSsylkaNaSoczsetFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentSocialMediaSsylkaNaSoczsetFiltersInput>>
  >;
};

export type ComponentSocialMediaSsylkaNaSoczsetInput = {
  Href?: InputMaybe<Scalars["String"]["input"]>;
  Icon?: InputMaybe<Scalars["ID"]["input"]>;
  Name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentSupportPozhertvovaniya = {
  __typename?: "ComponentSupportPozhertvovaniya";
  Inputs?: Maybe<Array<Maybe<ComponentInputPoleVvoda>>>;
  TextWithDocument?: Maybe<ComponentTextWithDocumentTekstSPrikreplennymDokumentom>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentSupportPozhertvovaniyaInputsArgs = {
  filters?: InputMaybe<ComponentInputPoleVvodaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSupportPozhertvovaniyaInput = {
  Inputs?: InputMaybe<Array<InputMaybe<ComponentInputPoleVvodaInput>>>;
  TextWithDocument?: InputMaybe<ComponentTextWithDocumentTekstSPrikreplennymDokumentomInput>;
  Title?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentTextWithDocumentTekstSPrikreplennymDokumentom = {
  __typename?: "ComponentTextWithDocumentTekstSPrikreplennymDokumentom";
  Document?: Maybe<UploadFile>;
  LinkText?: Maybe<Scalars["String"]["output"]>;
  Text?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentTextWithDocumentTekstSPrikreplennymDokumentomInput = {
  Document?: InputMaybe<Scalars["ID"]["input"]>;
  LinkText?: InputMaybe<Scalars["String"]["input"]>;
  Text?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentVideoKatalogVideo = {
  __typename?: "ComponentVideoKatalogVideo";
  id: Scalars["ID"]["output"];
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  contains?: InputMaybe<Scalars["Date"]["input"]>;
  containsi?: InputMaybe<Scalars["Date"]["input"]>;
  endsWith?: InputMaybe<Scalars["Date"]["input"]>;
  eq?: InputMaybe<Scalars["Date"]["input"]>;
  eqi?: InputMaybe<Scalars["Date"]["input"]>;
  gt?: InputMaybe<Scalars["Date"]["input"]>;
  gte?: InputMaybe<Scalars["Date"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  lt?: InputMaybe<Scalars["Date"]["input"]>;
  lte?: InputMaybe<Scalars["Date"]["input"]>;
  ne?: InputMaybe<Scalars["Date"]["input"]>;
  nei?: InputMaybe<Scalars["Date"]["input"]>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars["Date"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Date"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Date"]["input"]>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]["input"]>;
  containsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  eqi?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  ne?: InputMaybe<Scalars["DateTime"]["input"]>;
  nei?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]["input"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type DeleteMutationResponse = {
  __typename?: "DeleteMutationResponse";
  documentId: Scalars["ID"]["output"];
};

export enum Enum_Componentcategoriesspisokkategorij_Categories {
  Kirtany = "Kirtany",
  OtvetyNaVoprosy = "Otvety_na_voprosy",
  Seminary = "Seminary",
  SvyatyeMesta = "Svyatye_mesta",
}

export enum Enum_Componenthomepageprevyurazdelasajta_Divisionname {
  Lekczii = "Lekczii",
  Stati = "Stati",
  Video = "Video",
}

export enum Enum_Componentinputpolevvoda_Inputtype {
  Email = "Email",
  Summa = "Summa",
}

export type Error = {
  __typename?: "Error";
  code: Scalars["String"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]["input"]>;
  caption?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  contains?: InputMaybe<Scalars["Float"]["input"]>;
  containsi?: InputMaybe<Scalars["Float"]["input"]>;
  endsWith?: InputMaybe<Scalars["Float"]["input"]>;
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  eqi?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  ne?: InputMaybe<Scalars["Float"]["input"]>;
  nei?: InputMaybe<Scalars["Float"]["input"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Float"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]["input"]>;
};

export type Footer = {
  __typename?: "Footer";
  Documents?: Maybe<Array<Maybe<ComponentDocsLinkSsylkaNaDokument>>>;
  SIteName?: Maybe<Scalars["String"]["output"]>;
  SocialMedia?: Maybe<Array<Maybe<ComponentSocialMediaSsylkaNaSoczset>>>;
  SupportForm?: Maybe<ComponentSupportPozhertvovaniya>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<Footer>>;
  localizations_connection?: Maybe<FooterRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type FooterDocumentsArgs = {
  filters?: InputMaybe<ComponentDocsLinkSsylkaNaDokumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type FooterSocialMediaArgs = {
  filters?: InputMaybe<ComponentSocialMediaSsylkaNaSoczsetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type FooterInput = {
  Documents?: InputMaybe<
    Array<InputMaybe<ComponentDocsLinkSsylkaNaDokumentInput>>
  >;
  SIteName?: InputMaybe<Scalars["String"]["input"]>;
  SocialMedia?: InputMaybe<
    Array<InputMaybe<ComponentSocialMediaSsylkaNaSoczsetInput>>
  >;
  SupportForm?: InputMaybe<ComponentSupportPozhertvovaniyaInput>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type FooterRelationResponseCollection = {
  __typename?: "FooterRelationResponseCollection";
  nodes: Array<Footer>;
};

export type GenericMorph =
  | AudioCategory
  | Audiorecord
  | ComponentAudioKatalogAudiozopisej
  | ComponentBigButtonBolshayaKnopka
  | ComponentCategoriesSpisokKategorij
  | ComponentCommonSectionIzobrazhenie
  | ComponentCommonSectionRaspisanie
  | ComponentDocsLinkSsylkaNaDokument
  | ComponentHeaderWithImagePervyjBlokSIzobrazheniem
  | ComponentHeaderWithTextPervyjBlokSTekstom
  | ComponentHomePageBiografiya
  | ComponentHomePageBiografy
  | ComponentHomePageChlenParampary
  | ComponentHomePageParampara
  | ComponentHomePagePrevyuRazdelaSajta
  | ComponentHomePageSobytie
  | ComponentInputPoleVvoda
  | ComponentMenuElementMenyu
  | ComponentMetaSeo
  | ComponentPostAkczentirovannyjTekst
  | ComponentPostCzitata
  | ComponentPostIllyustracziya
  | ComponentPostInteresnoe
  | ComponentPostKatalogStatej
  | ComponentPostTekst
  | ComponentSocialMediaSsylkaNaSoczset
  | ComponentSupportPozhertvovaniya
  | ComponentTextWithDocumentTekstSPrikreplennymDokumentom
  | ComponentVideoKatalogVideo
  | Footer
  | I18NLocale
  | Logo
  | Menu
  | Movie
  | Page
  | Post
  | PostCategory
  | ReviewWorkflowsWorkflow
  | ReviewWorkflowsWorkflowStage
  | UploadFile
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser
  | VideoCategory;

export type I18NLocale = {
  __typename?: "I18NLocale";
  code?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: "I18NLocaleEntityResponseCollection";
  nodes: Array<I18NLocale>;
  pageInfo: Pagination;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<I18NLocaleFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  contains?: InputMaybe<Scalars["ID"]["input"]>;
  containsi?: InputMaybe<Scalars["ID"]["input"]>;
  endsWith?: InputMaybe<Scalars["ID"]["input"]>;
  eq?: InputMaybe<Scalars["ID"]["input"]>;
  eqi?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  ne?: InputMaybe<Scalars["ID"]["input"]>;
  nei?: InputMaybe<Scalars["ID"]["input"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]["input"]>;
  notContainsi?: InputMaybe<Scalars["ID"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  contains?: InputMaybe<Scalars["Int"]["input"]>;
  containsi?: InputMaybe<Scalars["Int"]["input"]>;
  endsWith?: InputMaybe<Scalars["Int"]["input"]>;
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  eqi?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  ne?: InputMaybe<Scalars["Int"]["input"]>;
  nei?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Int"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]["input"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  contains?: InputMaybe<Scalars["JSON"]["input"]>;
  containsi?: InputMaybe<Scalars["JSON"]["input"]>;
  endsWith?: InputMaybe<Scalars["JSON"]["input"]>;
  eq?: InputMaybe<Scalars["JSON"]["input"]>;
  eqi?: InputMaybe<Scalars["JSON"]["input"]>;
  gt?: InputMaybe<Scalars["JSON"]["input"]>;
  gte?: InputMaybe<Scalars["JSON"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  lt?: InputMaybe<Scalars["JSON"]["input"]>;
  lte?: InputMaybe<Scalars["JSON"]["input"]>;
  ne?: InputMaybe<Scalars["JSON"]["input"]>;
  nei?: InputMaybe<Scalars["JSON"]["input"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]["input"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type Logo = {
  __typename?: "Logo";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  logo: UploadFile;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type LogoInput = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  logo?: InputMaybe<Scalars["ID"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type Menu = {
  __typename?: "Menu";
  Menu?: Maybe<Array<Maybe<ComponentMenuElementMenyu>>>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<Menu>>;
  localizations_connection?: Maybe<MenuRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type MenuMenuArgs = {
  filters?: InputMaybe<ComponentMenuElementMenyuFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MenuInput = {
  Menu?: InputMaybe<Array<InputMaybe<ComponentMenuElementMenyuInput>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type MenuRelationResponseCollection = {
  __typename?: "MenuRelationResponseCollection";
  nodes: Array<Menu>;
};

export type Movie = {
  __typename?: "Movie";
  MovieName: Scalars["String"]["output"];
  VideoCategory?: Maybe<VideoCategory>;
  YoutubeLink: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<Movie>>;
  localizations_connection?: Maybe<MovieRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type MovieLocalizationsArgs = {
  filters?: InputMaybe<MovieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MovieLocalizations_ConnectionArgs = {
  filters?: InputMaybe<MovieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MovieEntityResponseCollection = {
  __typename?: "MovieEntityResponseCollection";
  nodes: Array<Movie>;
  pageInfo: Pagination;
};

export type MovieFiltersInput = {
  MovieName?: InputMaybe<StringFilterInput>;
  VideoCategory?: InputMaybe<VideoCategoryFiltersInput>;
  YoutubeLink?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<MovieFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<MovieFiltersInput>;
  not?: InputMaybe<MovieFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MovieFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MovieInput = {
  MovieName?: InputMaybe<Scalars["String"]["input"]>;
  VideoCategory?: InputMaybe<Scalars["ID"]["input"]>;
  YoutubeLink?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type MovieRelationResponseCollection = {
  __typename?: "MovieRelationResponseCollection";
  nodes: Array<Movie>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAudioCategory?: Maybe<AudioCategory>;
  createAudiorecord?: Maybe<Audiorecord>;
  createMovie?: Maybe<Movie>;
  createPage?: Maybe<Page>;
  createPost?: Maybe<Post>;
  createPostCategory?: Maybe<PostCategory>;
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVideoCategory?: Maybe<VideoCategory>;
  deleteAudioCategory?: Maybe<DeleteMutationResponse>;
  deleteAudiorecord?: Maybe<DeleteMutationResponse>;
  deleteFooter?: Maybe<DeleteMutationResponse>;
  deleteLogo?: Maybe<DeleteMutationResponse>;
  deleteMenu?: Maybe<DeleteMutationResponse>;
  deleteMovie?: Maybe<DeleteMutationResponse>;
  deletePage?: Maybe<DeleteMutationResponse>;
  deletePost?: Maybe<DeleteMutationResponse>;
  deletePostCategory?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>;
  deleteUploadFile?: Maybe<UploadFile>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVideoCategory?: Maybe<DeleteMutationResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAudioCategory?: Maybe<AudioCategory>;
  updateAudiorecord?: Maybe<Audiorecord>;
  updateFooter?: Maybe<Footer>;
  updateLogo?: Maybe<Logo>;
  updateMenu?: Maybe<Menu>;
  updateMovie?: Maybe<Movie>;
  updatePage?: Maybe<Page>;
  updatePost?: Maybe<Post>;
  updatePostCategory?: Maybe<PostCategory>;
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  updateUploadFile: UploadFile;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVideoCategory?: Maybe<VideoCategory>;
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  passwordConfirmation: Scalars["String"]["input"];
};

export type MutationCreateAudioCategoryArgs = {
  data: AudioCategoryInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateAudiorecordArgs = {
  data: AudiorecordInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateMovieArgs = {
  data: MovieInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreatePageArgs = {
  data: PageInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreatePostArgs = {
  data: PostInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreatePostCategoryArgs = {
  data: PostCategoryInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationCreateVideoCategoryArgs = {
  data: VideoCategoryInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationDeleteAudioCategoryArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationDeleteAudiorecordArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationDeleteFooterArgs = {
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationDeleteMenuArgs = {
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationDeleteMovieArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationDeletePageArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationDeletePostArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationDeletePostCategoryArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteVideoCategoryArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"]["input"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationResetPasswordArgs = {
  code: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  passwordConfirmation: Scalars["String"]["input"];
};

export type MutationUpdateAudioCategoryArgs = {
  data: AudioCategoryInput;
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateAudiorecordArgs = {
  data: AudiorecordInput;
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateFooterArgs = {
  data: FooterInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateLogoArgs = {
  data: LogoInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateMenuArgs = {
  data: MenuInput;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateMovieArgs = {
  data: MovieInput;
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdatePageArgs = {
  data: PageInput;
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdatePostArgs = {
  data: PostInput;
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdatePostCategoryArgs = {
  data: PostCategoryInput;
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateUploadFileArgs = {
  id: Scalars["ID"]["input"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateVideoCategoryArgs = {
  data: VideoCategoryInput;
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type Page = {
  __typename?: "Page";
  PageConstructor?: Maybe<Array<Maybe<PagePageConstructorDynamicZone>>>;
  PageName: Scalars["String"]["output"];
  SEO?: Maybe<ComponentMetaSeo>;
  Slug: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<Page>>;
  localizations_connection?: Maybe<PageRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PageLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PageEntityResponseCollection = {
  __typename?: "PageEntityResponseCollection";
  nodes: Array<Page>;
  pageInfo: Pagination;
};

export type PageFiltersInput = {
  PageName?: InputMaybe<StringFilterInput>;
  SEO?: InputMaybe<ComponentMetaSeoFiltersInput>;
  Slug?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PageFiltersInput>;
  not?: InputMaybe<PageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  PageConstructor?: InputMaybe<
    Array<Scalars["PagePageConstructorDynamicZoneInput"]["input"]>
  >;
  PageName?: InputMaybe<Scalars["String"]["input"]>;
  SEO?: InputMaybe<ComponentMetaSeoInput>;
  Slug?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type PagePageConstructorDynamicZone =
  | ComponentAudioKatalogAudiozopisej
  | ComponentCommonSectionIzobrazhenie
  | ComponentCommonSectionRaspisanie
  | ComponentHeaderWithImagePervyjBlokSIzobrazheniem
  | ComponentHeaderWithTextPervyjBlokSTekstom
  | ComponentHomePageBiografiya
  | ComponentHomePageParampara
  | ComponentHomePagePrevyuRazdelaSajta
  | ComponentPostKatalogStatej
  | ComponentVideoKatalogVideo
  | Error;

export type PageRelationResponseCollection = {
  __typename?: "PageRelationResponseCollection";
  nodes: Array<Page>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"]["output"];
  pageCount: Scalars["Int"]["output"];
  pageSize: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Post = {
  __typename?: "Post";
  Date?: Maybe<Scalars["Date"]["output"]>;
  PostCategory?: Maybe<PostCategory>;
  PostContent?: Maybe<Scalars["String"]["output"]>;
  PostPreviewContent?: Maybe<Scalars["String"]["output"]>;
  PostTitle: Scalars["String"]["output"];
  SEO?: Maybe<ComponentMetaSeo>;
  Slug: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<Post>>;
  localizations_connection?: Maybe<PostRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PostLocalizationsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PostLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PostCategory = {
  __typename?: "PostCategory";
  Name: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<PostCategory>>;
  localizations_connection?: Maybe<PostCategoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PostCategoryLocalizationsArgs = {
  filters?: InputMaybe<PostCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PostCategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PostCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PostCategoryEntityResponseCollection = {
  __typename?: "PostCategoryEntityResponseCollection";
  nodes: Array<PostCategory>;
  pageInfo: Pagination;
};

export type PostCategoryFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PostCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PostCategoryFiltersInput>;
  not?: InputMaybe<PostCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PostCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PostCategoryInput = {
  Name?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type PostCategoryRelationResponseCollection = {
  __typename?: "PostCategoryRelationResponseCollection";
  nodes: Array<PostCategory>;
};

export type PostEntityResponseCollection = {
  __typename?: "PostEntityResponseCollection";
  nodes: Array<Post>;
  pageInfo: Pagination;
};

export type PostFiltersInput = {
  Date?: InputMaybe<DateFilterInput>;
  PostCategory?: InputMaybe<PostCategoryFiltersInput>;
  PostContent?: InputMaybe<StringFilterInput>;
  PostPreviewContent?: InputMaybe<StringFilterInput>;
  PostTitle?: InputMaybe<StringFilterInput>;
  SEO?: InputMaybe<ComponentMetaSeoFiltersInput>;
  Slug?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PostFiltersInput>;
  not?: InputMaybe<PostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PostInput = {
  Date?: InputMaybe<Scalars["Date"]["input"]>;
  PostCategory?: InputMaybe<Scalars["ID"]["input"]>;
  PostContent?: InputMaybe<Scalars["String"]["input"]>;
  PostPreviewContent?: InputMaybe<Scalars["String"]["input"]>;
  PostTitle?: InputMaybe<Scalars["String"]["input"]>;
  SEO?: InputMaybe<ComponentMetaSeoInput>;
  Slug?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type PostRelationResponseCollection = {
  __typename?: "PostRelationResponseCollection";
  nodes: Array<Post>;
};

export enum PublicationStatus {
  Draft = "DRAFT",
  Published = "PUBLISHED",
}

export type Query = {
  __typename?: "Query";
  audioCategories: Array<Maybe<AudioCategory>>;
  audioCategories_connection?: Maybe<AudioCategoryEntityResponseCollection>;
  audioCategory?: Maybe<AudioCategory>;
  audiorecord?: Maybe<Audiorecord>;
  audiorecords: Array<Maybe<Audiorecord>>;
  audiorecords_connection?: Maybe<AudiorecordEntityResponseCollection>;
  footer?: Maybe<Footer>;
  i18NLocale?: Maybe<I18NLocale>;
  i18NLocales: Array<Maybe<I18NLocale>>;
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>;
  logo?: Maybe<Logo>;
  me?: Maybe<UsersPermissionsMe>;
  menu?: Maybe<Menu>;
  movie?: Maybe<Movie>;
  movies: Array<Maybe<Movie>>;
  movies_connection?: Maybe<MovieEntityResponseCollection>;
  page?: Maybe<Page>;
  pages: Array<Maybe<Page>>;
  pages_connection?: Maybe<PageEntityResponseCollection>;
  post?: Maybe<Post>;
  postCategories: Array<Maybe<PostCategory>>;
  postCategories_connection?: Maybe<PostCategoryEntityResponseCollection>;
  postCategory?: Maybe<PostCategory>;
  posts: Array<Maybe<Post>>;
  posts_connection?: Maybe<PostEntityResponseCollection>;
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>;
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>;
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>;
  uploadFile?: Maybe<UploadFile>;
  uploadFiles: Array<Maybe<UploadFile>>;
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRole>;
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>;
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUser>;
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>;
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  videoCategories: Array<Maybe<VideoCategory>>;
  videoCategories_connection?: Maybe<VideoCategoryEntityResponseCollection>;
  videoCategory?: Maybe<VideoCategory>;
};

export type QueryAudioCategoriesArgs = {
  filters?: InputMaybe<AudioCategoryFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryAudioCategories_ConnectionArgs = {
  filters?: InputMaybe<AudioCategoryFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryAudioCategoryArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryAudiorecordArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryAudiorecordsArgs = {
  filters?: InputMaybe<AudiorecordFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryAudiorecords_ConnectionArgs = {
  filters?: InputMaybe<AudiorecordFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryFooterArgs = {
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryI18NLocaleArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryLogoArgs = {
  status?: InputMaybe<PublicationStatus>;
};

export type QueryMenuArgs = {
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryMovieArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryMoviesArgs = {
  filters?: InputMaybe<MovieFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryMovies_ConnectionArgs = {
  filters?: InputMaybe<MovieFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPageArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPostArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPostCategoriesArgs = {
  filters?: InputMaybe<PostCategoryFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPostCategories_ConnectionArgs = {
  filters?: InputMaybe<PostCategoryFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPostCategoryArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPosts_ConnectionArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUploadFileArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryVideoCategoriesArgs = {
  filters?: InputMaybe<VideoCategoryFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryVideoCategories_ConnectionArgs = {
  filters?: InputMaybe<VideoCategoryFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryVideoCategoryArgs = {
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  status?: InputMaybe<PublicationStatus>;
};

export type ReviewWorkflowsWorkflow = {
  __typename?: "ReviewWorkflowsWorkflow";
  contentTypes: Scalars["JSON"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  stageRequiredToPublish?: Maybe<ReviewWorkflowsWorkflowStage>;
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  __typename?: "ReviewWorkflowsWorkflowEntityResponseCollection";
  nodes: Array<ReviewWorkflowsWorkflow>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  contentTypes?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars["JSON"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  stageRequiredToPublish?: InputMaybe<Scalars["ID"]["input"]>;
  stages?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ReviewWorkflowsWorkflowStage = {
  __typename?: "ReviewWorkflowsWorkflowStage";
  color?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  workflow?: Maybe<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  __typename?: "ReviewWorkflowsWorkflowStageEntityResponseCollection";
  nodes: Array<ReviewWorkflowsWorkflowStage>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
};

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars["String"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  workflow?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  __typename?: "ReviewWorkflowsWorkflowStageRelationResponseCollection";
  nodes: Array<ReviewWorkflowsWorkflowStage>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  containsi?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  eqi?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  nei?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]["input"]>;
  notContainsi?: InputMaybe<Scalars["String"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  alternativeText?: Maybe<Scalars["String"]["output"]>;
  caption?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  ext?: Maybe<Scalars["String"]["output"]>;
  formats?: Maybe<Scalars["JSON"]["output"]>;
  hash: Scalars["String"]["output"];
  height?: Maybe<Scalars["Int"]["output"]>;
  mime: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  previewUrl?: Maybe<Scalars["String"]["output"]>;
  provider: Scalars["String"]["output"];
  provider_metadata?: Maybe<Scalars["JSON"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars["Float"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  url: Scalars["String"]["output"];
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: "UploadFileEntityResponseCollection";
  nodes: Array<UploadFile>;
  pageInfo: Pagination;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UploadFileFiltersInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: "UsersPermissionsCreateRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: "UsersPermissionsDeleteRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  provider?: Scalars["String"]["input"];
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]["output"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  blocked?: Maybe<Scalars["Boolean"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars["String"]["output"];
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  type?: Maybe<Scalars["String"]["output"]>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: "UsersPermissionsPasswordPayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  action: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: "UsersPermissionsPermissionRelationResponseCollection";
  nodes: Array<UsersPermissionsPermission>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  documentId: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  permissions: Array<Maybe<UsersPermissionsPermission>>;
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  users: Array<Maybe<UsersPermissionsUser>>;
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: "UsersPermissionsRoleEntityResponseCollection";
  nodes: Array<UsersPermissionsRole>;
  pageInfo: Pagination;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: "UsersPermissionsUpdateRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  blocked?: Maybe<Scalars["Boolean"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  email: Scalars["String"]["output"];
  provider?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  username: Scalars["String"]["output"];
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: "UsersPermissionsUserEntityResponse";
  data?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: "UsersPermissionsUserEntityResponseCollection";
  nodes: Array<UsersPermissionsUser>;
  pageInfo: Pagination;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UsersPermissionsUserFiltersInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]["input"]>;
  confirmationToken?: InputMaybe<Scalars["String"]["input"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["ID"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: "UsersPermissionsUserRelationResponseCollection";
  nodes: Array<UsersPermissionsUser>;
};

export type VideoCategory = {
  __typename?: "VideoCategory";
  Name: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  locale?: Maybe<Scalars["String"]["output"]>;
  localizations: Array<Maybe<VideoCategory>>;
  localizations_connection?: Maybe<VideoCategoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type VideoCategoryLocalizationsArgs = {
  filters?: InputMaybe<VideoCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VideoCategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<VideoCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VideoCategoryEntityResponseCollection = {
  __typename?: "VideoCategoryEntityResponseCollection";
  nodes: Array<VideoCategory>;
  pageInfo: Pagination;
};

export type VideoCategoryFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<VideoCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<VideoCategoryFiltersInput>;
  not?: InputMaybe<VideoCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VideoCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type VideoCategoryInput = {
  Name?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type VideoCategoryRelationResponseCollection = {
  __typename?: "VideoCategoryRelationResponseCollection";
  nodes: Array<VideoCategory>;
};

export type AudiorecordsPaginationQueryVariables = Exact<{
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars["String"]["input"]>>
    | InputMaybe<Scalars["String"]["input"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
  filters?: InputMaybe<AudiorecordFiltersInput>;
}>;

export type AudiorecordsPaginationQuery = {
  __typename?: "Query";
  audiorecords: Array<{
    __typename?: "Audiorecord";
    Date?: any | null;
    Duration: string;
    Name: string;
    Place?: string | null;
    Image: {
      __typename?: "UploadFile";
      url: string;
      formats?: any | null;
      alternativeText?: string | null;
    };
    Audio: { __typename?: "UploadFile"; url: string };
  } | null>;
};

export type MoviesPaginationQueryVariables = Exact<{
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars["String"]["input"]>>
    | InputMaybe<Scalars["String"]["input"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
  filters?: InputMaybe<MovieFiltersInput>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
}>;

export type MoviesPaginationQuery = {
  __typename?: "Query";
  movies: Array<{
    __typename?: "Movie";
    YoutubeLink: string;
    createdAt?: any | null;
    documentId: string;
  } | null>;
};

export type PageQueryVariables = Exact<{
  documentId: Scalars["ID"]["input"];
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars["String"]["input"]>>
    | InputMaybe<Scalars["String"]["input"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
  postsPagination2?: InputMaybe<PaginationArg>;
  postsSort2?: InputMaybe<
    | Array<InputMaybe<Scalars["String"]["input"]>>
    | InputMaybe<Scalars["String"]["input"]>
  >;
  moviesSort2?: InputMaybe<
    | Array<InputMaybe<Scalars["String"]["input"]>>
    | InputMaybe<Scalars["String"]["input"]>
  >;
  moviesPagination2?: InputMaybe<PaginationArg>;
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  audiorecordsLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  audioCategoriesLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  postCategoriesLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  postsLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  moviesLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  menuLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  footerLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
}>;

export type PageQuery = {
  __typename?: "Query";
  page?: {
    __typename?: "Page";
    Slug: string;
    PageName: string;
    PageConstructor?: Array<
      | { __typename?: "ComponentAudioKatalogAudiozopisej"; id: string }
      | {
          __typename?: "ComponentCommonSectionIzobrazhenie";
          image?: {
            __typename?: "UploadFile";
            alternativeText?: string | null;
            url: string;
            formats?: any | null;
          } | null;
        }
      | {
          __typename?: "ComponentCommonSectionRaspisanie";
          TextBelow?: string | null;
          SectionTitle?: string | null;
          ScheduleItem?: Array<{
            __typename?: "ComponentHomePageSobytie";
            Place?: string | null;
            Period?: string | null;
            Name?: string | null;
            MoreButtonHref?: string | null;
            EventDescription?: string | null;
            id: string;
          } | null> | null;
        }
      | {
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
        }
      | {
          __typename?: "ComponentHeaderWithTextPervyjBlokSTekstom";
          Title?: string | null;
          Subtitle?: string | null;
          IsLanguageButtonVisible?: boolean | null;
          IsBigButtonVisible?: boolean | null;
          BigButton?: {
            __typename?: "ComponentBigButtonBolshayaKnopka";
            ButtonText?: string | null;
            page?: { __typename?: "Page"; Slug: string } | null;
          } | null;
        }
      | {
          __typename?: "ComponentHomePageBiografiya";
          SectionTitle?: string | null;
          BioigrafyPeriods?: Array<{
            __typename?: "ComponentHomePageBiografy";
            PeriodName?: string | null;
            PeriodDescription?: string | null;
            id: string;
          } | null> | null;
          Image?: {
            __typename?: "UploadFile";
            url: string;
            formats?: any | null;
            alternativeText?: string | null;
          } | null;
        }
      | {
          __typename?: "ComponentHomePageParampara";
          SectionTitle?: string | null;
          LineageMember?: Array<{
            __typename?: "ComponentHomePageChlenParampary";
            Description?: string | null;
            Name?: string | null;
            Role?: string | null;
            id: string;
            Image?: {
              __typename?: "UploadFile";
              url: string;
              formats?: any | null;
              alternativeText?: string | null;
            } | null;
          } | null> | null;
        }
      | {
          __typename?: "ComponentHomePagePrevyuRazdelaSajta";
          Title?: string | null;
          DivisionName?: Enum_Componenthomepageprevyurazdelasajta_Divisionname | null;
        }
      | { __typename?: "ComponentPostKatalogStatej"; id: string }
      | { __typename?: "ComponentVideoKatalogVideo"; id: string }
      | { __typename?: "Error" }
      | null
    > | null;
  } | null;
  audiorecords: Array<{
    __typename?: "Audiorecord";
    createdAt?: any | null;
    Place?: string | null;
    Name: string;
    Duration: string;
    Date?: any | null;
    AudioCategory?: {
      __typename?: "AudioCategory";
      Name: string;
      documentId: string;
    } | null;
    Audio: { __typename?: "UploadFile"; url: string; size: number };
    Image: {
      __typename?: "UploadFile";
      url: string;
      formats?: any | null;
      alternativeText?: string | null;
    };
  } | null>;
  posts: Array<{
    __typename?: "Post";
    documentId: string;
    Slug: string;
    PostTitle: string;
    PostPreviewContent?: string | null;
  } | null>;
  movies: Array<{
    __typename?: "Movie";
    createdAt?: any | null;
    YoutubeLink: string;
    documentId: string;
  } | null>;
  audioCategories: Array<{
    __typename?: "AudioCategory";
    Name: string;
    documentId: string;
  } | null>;
  postCategories: Array<{
    __typename?: "PostCategory";
    Name: string;
    documentId: string;
  } | null>;
  menu?: {
    __typename?: "Menu";
    Menu?: Array<{
      __typename?: "ComponentMenuElementMenyu";
      Text?: string | null;
      id: string;
      PageLink?: { __typename?: "Page"; Slug: string } | null;
    } | null> | null;
  } | null;
  logo?: {
    __typename?: "Logo";
    logo: {
      __typename?: "UploadFile";
      formats?: any | null;
      url: string;
      alternativeText?: string | null;
    };
  } | null;
  footer?: {
    __typename?: "Footer";
    SIteName?: string | null;
    Documents?: Array<{
      __typename?: "ComponentDocsLinkSsylkaNaDokument";
      Text?: string | null;
      id: string;
      Document?: { __typename?: "UploadFile"; url: string } | null;
    } | null> | null;
    SocialMedia?: Array<{
      __typename?: "ComponentSocialMediaSsylkaNaSoczset";
      Href?: string | null;
      Name?: string | null;
      id: string;
      Icon?: { __typename?: "UploadFile"; url: string } | null;
    } | null> | null;
    SupportForm?: {
      __typename?: "ComponentSupportPozhertvovaniya";
      id: string;
      Title?: string | null;
      TextWithDocument?: {
        __typename?: "ComponentTextWithDocumentTekstSPrikreplennymDokumentom";
        Text?: string | null;
        LinkText?: string | null;
        Document?: { __typename?: "UploadFile"; url: string } | null;
      } | null;
      Inputs?: Array<{
        __typename?: "ComponentInputPoleVvoda";
        Placeholder?: string | null;
        InputType?: Enum_Componentinputpolevvoda_Inputtype | null;
        id: string;
      } | null> | null;
    } | null;
  } | null;
};

export type PageSeoQueryVariables = Exact<{
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
}>;

export type PageSeoQuery = {
  __typename?: "Query";
  page?: {
    __typename?: "Page";
    SEO?: {
      __typename?: "ComponentMetaSeo";
      Title?: string | null;
      Description?: string | null;
      Preview510x230?: { __typename?: "UploadFile"; url: string } | null;
      Preview1200x630?: { __typename?: "UploadFile"; url: string } | null;
    } | null;
  } | null;
  logo?: {
    __typename?: "Logo";
    logo: { __typename?: "UploadFile"; url: string };
  } | null;
};

export type PagesConnectionsQueryVariables = Exact<{ [key: string]: never }>;

export type PagesConnectionsQuery = {
  __typename?: "Query";
  pages_connection?: {
    __typename?: "PageEntityResponseCollection";
    nodes: Array<{ __typename?: "Page"; Slug: string; documentId: string }>;
  } | null;
};

export type PostQueryVariables = Exact<{
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  menuLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  footerLocale2?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
}>;

export type PostQuery = {
  __typename?: "Query";
  post?: {
    __typename?: "Post";
    Date?: any | null;
    PostPreviewContent?: string | null;
    PostTitle: string;
    PostContent?: string | null;
    PostCategory?: { __typename?: "PostCategory"; Name: string } | null;
    SEO?: {
      __typename?: "ComponentMetaSeo";
      Title?: string | null;
      Description?: string | null;
      Preview510x230?: { __typename?: "UploadFile"; url: string } | null;
      Preview1200x630?: { __typename?: "UploadFile"; url: string } | null;
    } | null;
  } | null;
  menu?: {
    __typename?: "Menu";
    Menu?: Array<{
      __typename?: "ComponentMenuElementMenyu";
      Text?: string | null;
      id: string;
      PageLink?: { __typename?: "Page"; Slug: string } | null;
    } | null> | null;
  } | null;
  footer?: {
    __typename?: "Footer";
    SIteName?: string | null;
    Documents?: Array<{
      __typename?: "ComponentDocsLinkSsylkaNaDokument";
      Text?: string | null;
      id: string;
      Document?: { __typename?: "UploadFile"; url: string } | null;
    } | null> | null;
    SocialMedia?: Array<{
      __typename?: "ComponentSocialMediaSsylkaNaSoczset";
      Name?: string | null;
      id: string;
      Href?: string | null;
      Icon?: { __typename?: "UploadFile"; url: string } | null;
    } | null> | null;
    SupportForm?: {
      __typename?: "ComponentSupportPozhertvovaniya";
      Title?: string | null;
      TextWithDocument?: {
        __typename?: "ComponentTextWithDocumentTekstSPrikreplennymDokumentom";
        Text?: string | null;
        LinkText?: string | null;
        id: string;
        Document?: { __typename?: "UploadFile"; url: string } | null;
      } | null;
      Inputs?: Array<{
        __typename?: "ComponentInputPoleVvoda";
        id: string;
        Placeholder?: string | null;
        InputType?: Enum_Componentinputpolevvoda_Inputtype | null;
      } | null> | null;
    } | null;
  } | null;
  logo?: {
    __typename?: "Logo";
    logo: {
      __typename?: "UploadFile";
      url: string;
      formats?: any | null;
      alternativeText?: string | null;
    };
  } | null;
};

export type PostSeoQueryVariables = Exact<{
  documentId: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
}>;

export type PostSeoQuery = {
  __typename?: "Query";
  post?: {
    __typename?: "Post";
    SEO?: {
      __typename?: "ComponentMetaSeo";
      Title?: string | null;
      Description?: string | null;
      Preview1200x630?: { __typename?: "UploadFile"; url: string } | null;
      Preview510x230?: { __typename?: "UploadFile"; url: string } | null;
    } | null;
  } | null;
  logo?: {
    __typename?: "Logo";
    logo: { __typename?: "UploadFile"; url: string };
  } | null;
};

export type PostsConnectionsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsConnectionsQuery = {
  __typename?: "Query";
  posts_connection?: {
    __typename?: "PostEntityResponseCollection";
    nodes: Array<{ __typename?: "Post"; Slug: string; documentId: string }>;
  } | null;
};

export type PostsPaginationQueryVariables = Exact<{
  locale?: InputMaybe<Scalars["I18NLocaleCode"]["input"]>;
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars["String"]["input"]>>
    | InputMaybe<Scalars["String"]["input"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
  filters?: InputMaybe<PostFiltersInput>;
}>;

export type PostsPaginationQuery = {
  __typename?: "Query";
  posts: Array<{
    __typename?: "Post";
    Date?: any | null;
    PostPreviewContent?: string | null;
    PostTitle: string;
    Slug: string;
    documentId: string;
  } | null>;
};

export const AudiorecordsPaginationDocument = gql`
  query AudiorecordsPagination(
    $locale: I18NLocaleCode
    $sort: [String]
    $pagination: PaginationArg
    $filters: AudiorecordFiltersInput
  ) {
    audiorecords(
      locale: $locale
      sort: $sort
      pagination: $pagination
      filters: $filters
    ) {
      Date
      Duration
      Name
      Place
      Image {
        url
        formats
        alternativeText
      }
      Audio {
        url
      }
    }
  }
`;

/**
 * __useAudiorecordsPaginationQuery__
 *
 * To run a query within a React component, call `useAudiorecordsPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useAudiorecordsPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAudiorecordsPaginationQuery({
 *   variables: {
 *      locale: // value for 'locale'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useAudiorecordsPaginationQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AudiorecordsPaginationQuery,
    AudiorecordsPaginationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AudiorecordsPaginationQuery,
    AudiorecordsPaginationQueryVariables
  >(AudiorecordsPaginationDocument, options);
}
export function useAudiorecordsPaginationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AudiorecordsPaginationQuery,
    AudiorecordsPaginationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AudiorecordsPaginationQuery,
    AudiorecordsPaginationQueryVariables
  >(AudiorecordsPaginationDocument, options);
}
export function useAudiorecordsPaginationSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AudiorecordsPaginationQuery,
        AudiorecordsPaginationQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AudiorecordsPaginationQuery,
    AudiorecordsPaginationQueryVariables
  >(AudiorecordsPaginationDocument, options);
}
export type AudiorecordsPaginationQueryHookResult = ReturnType<
  typeof useAudiorecordsPaginationQuery
>;
export type AudiorecordsPaginationLazyQueryHookResult = ReturnType<
  typeof useAudiorecordsPaginationLazyQuery
>;
export type AudiorecordsPaginationSuspenseQueryHookResult = ReturnType<
  typeof useAudiorecordsPaginationSuspenseQuery
>;
export type AudiorecordsPaginationQueryResult = Apollo.QueryResult<
  AudiorecordsPaginationQuery,
  AudiorecordsPaginationQueryVariables
>;
export const MoviesPaginationDocument = gql`
  query MoviesPagination(
    $sort: [String]
    $pagination: PaginationArg
    $filters: MovieFiltersInput
    $locale: I18NLocaleCode
  ) {
    movies(
      sort: $sort
      pagination: $pagination
      filters: $filters
      locale: $locale
    ) {
      YoutubeLink
      createdAt
      documentId
    }
  }
`;

/**
 * __useMoviesPaginationQuery__
 *
 * To run a query within a React component, call `useMoviesPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoviesPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoviesPaginationQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useMoviesPaginationQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MoviesPaginationQuery,
    MoviesPaginationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MoviesPaginationQuery, MoviesPaginationQueryVariables>(
    MoviesPaginationDocument,
    options
  );
}
export function useMoviesPaginationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MoviesPaginationQuery,
    MoviesPaginationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MoviesPaginationQuery,
    MoviesPaginationQueryVariables
  >(MoviesPaginationDocument, options);
}
export function useMoviesPaginationSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        MoviesPaginationQuery,
        MoviesPaginationQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    MoviesPaginationQuery,
    MoviesPaginationQueryVariables
  >(MoviesPaginationDocument, options);
}
export type MoviesPaginationQueryHookResult = ReturnType<
  typeof useMoviesPaginationQuery
>;
export type MoviesPaginationLazyQueryHookResult = ReturnType<
  typeof useMoviesPaginationLazyQuery
>;
export type MoviesPaginationSuspenseQueryHookResult = ReturnType<
  typeof useMoviesPaginationSuspenseQuery
>;
export type MoviesPaginationQueryResult = Apollo.QueryResult<
  MoviesPaginationQuery,
  MoviesPaginationQueryVariables
>;
export const PageDocument = gql`
  query Page(
    $documentId: ID!
    $sort: [String]
    $pagination: PaginationArg
    $postsPagination2: PaginationArg
    $postsSort2: [String]
    $moviesSort2: [String]
    $moviesPagination2: PaginationArg
    $locale: I18NLocaleCode
    $audiorecordsLocale2: I18NLocaleCode
    $audioCategoriesLocale2: I18NLocaleCode
    $postCategoriesLocale2: I18NLocaleCode
    $postsLocale2: I18NLocaleCode
    $moviesLocale2: I18NLocaleCode
    $menuLocale2: I18NLocaleCode
    $footerLocale2: I18NLocaleCode
  ) {
    page(documentId: $documentId, locale: $locale) {
      Slug
      PageName
      PageConstructor {
        ... on ComponentHeaderWithImagePervyjBlokSIzobrazheniem {
          Title
          Subtitle
          IsLanguageButtonVisible
          IsBigButtonVisible
          BigButton {
            ButtonText
            page {
              Slug
            }
          }
          Image {
            url
            formats
            alternativeText
          }
        }
        ... on ComponentHeaderWithTextPervyjBlokSTekstom {
          Title
          Subtitle
          IsLanguageButtonVisible
          IsBigButtonVisible
          BigButton {
            page {
              Slug
            }
            ButtonText
          }
        }
        ... on ComponentHomePageParampara {
          SectionTitle
          LineageMember {
            Description
            Name
            Role
            id
            Image {
              url
              formats
              alternativeText
            }
          }
        }
        ... on ComponentHomePageBiografiya {
          SectionTitle
          BioigrafyPeriods {
            PeriodName
            PeriodDescription
            id
          }
          Image {
            url
            formats
            alternativeText
          }
        }
        ... on ComponentCommonSectionRaspisanie {
          TextBelow
          SectionTitle
          ScheduleItem {
            Place
            Period
            Name
            MoreButtonHref
            EventDescription
            id
          }
        }
        ... on ComponentHomePagePrevyuRazdelaSajta {
          Title
          DivisionName
        }
        ... on ComponentCommonSectionIzobrazhenie {
          image {
            alternativeText
            url
            formats
          }
        }
        ... on ComponentVideoKatalogVideo {
          id
        }
        ... on ComponentPostKatalogStatej {
          id
        }
        ... on ComponentAudioKatalogAudiozopisej {
          id
        }
      }
    }
    audiorecords(
      sort: $sort
      pagination: $pagination
      locale: $audiorecordsLocale2
    ) {
      createdAt
      Place
      Name
      Duration
      Date
      AudioCategory {
        Name
        documentId
      }
      Audio {
        url
        size
      }
      Image {
        url
        formats
        alternativeText
      }
    }
    posts(
      pagination: $postsPagination2
      sort: $postsSort2
      locale: $postsLocale2
    ) {
      documentId
      Slug
      PostTitle
      PostPreviewContent
    }
    movies(
      sort: $moviesSort2
      pagination: $moviesPagination2
      locale: $moviesLocale2
    ) {
      createdAt
      YoutubeLink
      documentId
    }
    audioCategories(locale: $audioCategoriesLocale2) {
      Name
      documentId
    }
    postCategories(locale: $postCategoriesLocale2) {
      Name
      documentId
    }
    menu(locale: $menuLocale2) {
      Menu {
        PageLink {
          Slug
        }
        Text
        id
      }
    }
    logo {
      logo {
        formats
        url
        alternativeText
      }
    }
    footer(locale: $footerLocale2) {
      SIteName
      Documents {
        Text
        id
        Document {
          url
        }
      }
      SocialMedia {
        Href
        Icon {
          url
        }
        Name
        id
      }
      SupportForm {
        id
        Title
        TextWithDocument {
          Text
          LinkText
          Document {
            url
          }
        }
        Inputs {
          Placeholder
          InputType
          id
        }
      }
    }
  }
`;

/**
 * __usePageQuery__
 *
 * To run a query within a React component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageQuery({
 *   variables: {
 *      documentId: // value for 'documentId'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      postsPagination2: // value for 'postsPagination2'
 *      postsSort2: // value for 'postsSort2'
 *      moviesSort2: // value for 'moviesSort2'
 *      moviesPagination2: // value for 'moviesPagination2'
 *      locale: // value for 'locale'
 *      audiorecordsLocale2: // value for 'audiorecordsLocale2'
 *      audioCategoriesLocale2: // value for 'audioCategoriesLocale2'
 *      postCategoriesLocale2: // value for 'postCategoriesLocale2'
 *      postsLocale2: // value for 'postsLocale2'
 *      moviesLocale2: // value for 'moviesLocale2'
 *      menuLocale2: // value for 'menuLocale2'
 *      footerLocale2: // value for 'footerLocale2'
 *   },
 * });
 */
export function usePageQuery(
  baseOptions: Apollo.QueryHookOptions<PageQuery, PageQueryVariables> &
    ({ variables: PageQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PageQuery, PageQueryVariables>(PageDocument, options);
}
export function usePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PageQuery, PageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PageQuery, PageQueryVariables>(
    PageDocument,
    options
  );
}
export function usePageSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<PageQuery, PageQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PageQuery, PageQueryVariables>(
    PageDocument,
    options
  );
}
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageSuspenseQueryHookResult = ReturnType<
  typeof usePageSuspenseQuery
>;
export type PageQueryResult = Apollo.QueryResult<PageQuery, PageQueryVariables>;
export const PageSeoDocument = gql`
  query PageSeo($documentId: ID!, $locale: I18NLocaleCode) {
    page(documentId: $documentId, locale: $locale) {
      SEO {
        Title
        Description
        Preview510x230 {
          url
        }
        Preview1200x630 {
          url
        }
      }
    }
    logo {
      logo {
        url
      }
    }
  }
`;

/**
 * __usePageSeoQuery__
 *
 * To run a query within a React component, call `usePageSeoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageSeoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageSeoQuery({
 *   variables: {
 *      documentId: // value for 'documentId'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function usePageSeoQuery(
  baseOptions: Apollo.QueryHookOptions<PageSeoQuery, PageSeoQueryVariables> &
    ({ variables: PageSeoQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PageSeoQuery, PageSeoQueryVariables>(
    PageSeoDocument,
    options
  );
}
export function usePageSeoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PageSeoQuery, PageSeoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PageSeoQuery, PageSeoQueryVariables>(
    PageSeoDocument,
    options
  );
}
export function usePageSeoSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<PageSeoQuery, PageSeoQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PageSeoQuery, PageSeoQueryVariables>(
    PageSeoDocument,
    options
  );
}
export type PageSeoQueryHookResult = ReturnType<typeof usePageSeoQuery>;
export type PageSeoLazyQueryHookResult = ReturnType<typeof usePageSeoLazyQuery>;
export type PageSeoSuspenseQueryHookResult = ReturnType<
  typeof usePageSeoSuspenseQuery
>;
export type PageSeoQueryResult = Apollo.QueryResult<
  PageSeoQuery,
  PageSeoQueryVariables
>;
export const PagesConnectionsDocument = gql`
  query PagesConnections {
    pages_connection {
      nodes {
        Slug
        documentId
      }
    }
  }
`;

/**
 * __usePagesConnectionsQuery__
 *
 * To run a query within a React component, call `usePagesConnectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagesConnectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagesConnectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePagesConnectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PagesConnectionsQuery,
    PagesConnectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PagesConnectionsQuery, PagesConnectionsQueryVariables>(
    PagesConnectionsDocument,
    options
  );
}
export function usePagesConnectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PagesConnectionsQuery,
    PagesConnectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PagesConnectionsQuery,
    PagesConnectionsQueryVariables
  >(PagesConnectionsDocument, options);
}
export function usePagesConnectionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        PagesConnectionsQuery,
        PagesConnectionsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    PagesConnectionsQuery,
    PagesConnectionsQueryVariables
  >(PagesConnectionsDocument, options);
}
export type PagesConnectionsQueryHookResult = ReturnType<
  typeof usePagesConnectionsQuery
>;
export type PagesConnectionsLazyQueryHookResult = ReturnType<
  typeof usePagesConnectionsLazyQuery
>;
export type PagesConnectionsSuspenseQueryHookResult = ReturnType<
  typeof usePagesConnectionsSuspenseQuery
>;
export type PagesConnectionsQueryResult = Apollo.QueryResult<
  PagesConnectionsQuery,
  PagesConnectionsQueryVariables
>;
export const PostDocument = gql`
  query Post(
    $documentId: ID!
    $locale: I18NLocaleCode
    $menuLocale2: I18NLocaleCode
    $footerLocale2: I18NLocaleCode
  ) {
    post(documentId: $documentId, locale: $locale) {
      Date
      PostCategory {
        Name
      }
      PostPreviewContent
      PostTitle
      PostContent
      SEO {
        Title
        Description
        Preview510x230 {
          url
        }
        Preview1200x630 {
          url
        }
      }
    }
    menu(locale: $menuLocale2) {
      Menu {
        Text
        PageLink {
          Slug
        }
        id
      }
    }
    footer(locale: $footerLocale2) {
      SIteName
      Documents {
        Text
        id
        Document {
          url
        }
      }
      SocialMedia {
        Name
        Icon {
          url
        }
        id
        Href
      }
      SupportForm {
        Title
        TextWithDocument {
          Text
          LinkText
          id
          Document {
            url
          }
        }
        Inputs {
          id
          Placeholder
          InputType
        }
      }
    }
    logo {
      logo {
        url
        formats
        alternativeText
      }
    }
  }
`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      documentId: // value for 'documentId'
 *      locale: // value for 'locale'
 *      menuLocale2: // value for 'menuLocale2'
 *      footerLocale2: // value for 'footerLocale2'
 *   },
 * });
 */
export function usePostQuery(
  baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables> &
    ({ variables: PostQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    options
  );
}
export function usePostSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    options
  );
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostSuspenseQueryHookResult = ReturnType<
  typeof usePostSuspenseQuery
>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostSeoDocument = gql`
  query PostSeo($documentId: ID!, $locale: I18NLocaleCode) {
    post(documentId: $documentId, locale: $locale) {
      SEO {
        Title
        Description
        Preview1200x630 {
          url
        }
        Preview510x230 {
          url
        }
      }
    }
    logo {
      logo {
        url
      }
    }
  }
`;

/**
 * __usePostSeoQuery__
 *
 * To run a query within a React component, call `usePostSeoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostSeoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostSeoQuery({
 *   variables: {
 *      documentId: // value for 'documentId'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function usePostSeoQuery(
  baseOptions: Apollo.QueryHookOptions<PostSeoQuery, PostSeoQueryVariables> &
    ({ variables: PostSeoQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostSeoQuery, PostSeoQueryVariables>(
    PostSeoDocument,
    options
  );
}
export function usePostSeoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostSeoQuery, PostSeoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostSeoQuery, PostSeoQueryVariables>(
    PostSeoDocument,
    options
  );
}
export function usePostSeoSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<PostSeoQuery, PostSeoQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PostSeoQuery, PostSeoQueryVariables>(
    PostSeoDocument,
    options
  );
}
export type PostSeoQueryHookResult = ReturnType<typeof usePostSeoQuery>;
export type PostSeoLazyQueryHookResult = ReturnType<typeof usePostSeoLazyQuery>;
export type PostSeoSuspenseQueryHookResult = ReturnType<
  typeof usePostSeoSuspenseQuery
>;
export type PostSeoQueryResult = Apollo.QueryResult<
  PostSeoQuery,
  PostSeoQueryVariables
>;
export const PostsConnectionsDocument = gql`
  query PostsConnections {
    posts_connection {
      nodes {
        Slug
        documentId
      }
    }
  }
`;

/**
 * __usePostsConnectionsQuery__
 *
 * To run a query within a React component, call `usePostsConnectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsConnectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsConnectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsConnectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PostsConnectionsQuery,
    PostsConnectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostsConnectionsQuery, PostsConnectionsQueryVariables>(
    PostsConnectionsDocument,
    options
  );
}
export function usePostsConnectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PostsConnectionsQuery,
    PostsConnectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PostsConnectionsQuery,
    PostsConnectionsQueryVariables
  >(PostsConnectionsDocument, options);
}
export function usePostsConnectionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        PostsConnectionsQuery,
        PostsConnectionsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    PostsConnectionsQuery,
    PostsConnectionsQueryVariables
  >(PostsConnectionsDocument, options);
}
export type PostsConnectionsQueryHookResult = ReturnType<
  typeof usePostsConnectionsQuery
>;
export type PostsConnectionsLazyQueryHookResult = ReturnType<
  typeof usePostsConnectionsLazyQuery
>;
export type PostsConnectionsSuspenseQueryHookResult = ReturnType<
  typeof usePostsConnectionsSuspenseQuery
>;
export type PostsConnectionsQueryResult = Apollo.QueryResult<
  PostsConnectionsQuery,
  PostsConnectionsQueryVariables
>;
export const PostsPaginationDocument = gql`
  query PostsPagination(
    $locale: I18NLocaleCode
    $sort: [String]
    $pagination: PaginationArg
    $filters: PostFiltersInput
  ) {
    posts(
      locale: $locale
      sort: $sort
      pagination: $pagination
      filters: $filters
    ) {
      Date
      PostPreviewContent
      PostTitle
      Slug
      documentId
    }
  }
`;

/**
 * __usePostsPaginationQuery__
 *
 * To run a query within a React component, call `usePostsPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsPaginationQuery({
 *   variables: {
 *      locale: // value for 'locale'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function usePostsPaginationQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PostsPaginationQuery,
    PostsPaginationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostsPaginationQuery, PostsPaginationQueryVariables>(
    PostsPaginationDocument,
    options
  );
}
export function usePostsPaginationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PostsPaginationQuery,
    PostsPaginationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PostsPaginationQuery,
    PostsPaginationQueryVariables
  >(PostsPaginationDocument, options);
}
export function usePostsPaginationSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        PostsPaginationQuery,
        PostsPaginationQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    PostsPaginationQuery,
    PostsPaginationQueryVariables
  >(PostsPaginationDocument, options);
}
export type PostsPaginationQueryHookResult = ReturnType<
  typeof usePostsPaginationQuery
>;
export type PostsPaginationLazyQueryHookResult = ReturnType<
  typeof usePostsPaginationLazyQuery
>;
export type PostsPaginationSuspenseQueryHookResult = ReturnType<
  typeof usePostsPaginationSuspenseQuery
>;
export type PostsPaginationQueryResult = Apollo.QueryResult<
  PostsPaginationQuery,
  PostsPaginationQueryVariables
>;
