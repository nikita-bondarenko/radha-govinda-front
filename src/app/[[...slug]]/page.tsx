import { initializeApollo } from "@/lib/apollo/client";
import PageGenerator from "@/components/PageGenerator";
import {
  PagesConnectionsQuery,
  PagesConnectionsDocument,
  PageSeoDocument,
  PageSeoQuery,
  PageSeoQueryVariables,
  PageDocument,
  PageQuery,
  PageQueryVariables,
} from "@/gql/generated/graphql";
import getDynamicMetadata from "@/utils/getDynamicMetadata";
import { setLocale } from "@/lib/localeStore/localeSlice";
import { createStore } from "@/lib/store/store";
import StoreProvider from "@/components/providers/StoreProvider";
import { createLocaleStore } from "@/lib/localeStore/localeStore";
import LocaleStoreProvider from "@/components/providers/LocaleStoreProvider";
import { getPageMetadata } from "@/utils/pageMetadata";
import RenderPage from "@/components/RenderPage";

export type MetadataPropsType = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = getPageMetadata

export default async function Page(props: MetadataPropsType) {
    return <RenderPage {...props} />
}
