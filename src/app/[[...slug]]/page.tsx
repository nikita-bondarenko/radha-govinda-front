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

import { getPageMetadata } from "@/utils/pageMetadata";
import RenderPage from "@/components/RenderPage";

export type MetadataPropsType = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = getPageMetadata

export default async function Page(props: MetadataPropsType) {
    return  <RenderPage {...props} />
}
