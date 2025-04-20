import { initializeApollo } from "@/apollo/client";
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
import Head from "next/head";
import { notFound } from "next/navigation";

const documentId = "fr8l71tyb0idur0y2cl32xho";

export type MetadataPropsType = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: MetadataPropsType) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<
    PageSeoQuery,
    PageSeoQueryVariables
  >({
    query: PageSeoDocument,
    variables: {
      documentId,
    },
  });
  return getDynamicMetadata({
    title: data.page?.SEO?.Title,
    description: data.page?.SEO?.Description,
    bigImageUrl: data.page?.SEO?.Preview1200x630?.url,
    smallImageUrl: data.page?.SEO?.Preview510x230?.url,
    favicon: data?.logo?.logo?.url,
  });
}

export default async function Page({ params }: MetadataPropsType) {
  const apolloClient = initializeApollo();

  const { data: pageData } = await apolloClient.query<
    PageQuery,
    PageQueryVariables
  >({
    query: PageDocument,
    variables: {
      documentId,
    },
  });
  console.log(pageData);
  return (
   <PageGenerator {...pageData}></PageGenerator>
  );
}
