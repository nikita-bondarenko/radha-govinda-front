import {
  PagesConnectionsDocument,
  PagesConnectionsQuery,
  PagesConnectionsQueryVariables,
  PageSeoDocument,
  PageSeoQuery,
  PageSeoQueryVariables,
  PostsConnectionsDocument,
  PostsConnectionsQuery,
  PostsConnectionsQueryVariables,
  PostSeoDocument,
  PostSeoQuery,
  PostSeoQueryVariables,
} from "@/gql/generated/graphql";
import { initializeApollo } from "@/lib/apollo/client";
import { Locale } from "./getLocalizedData";
import getDynamicMetadata from "./getDynamicMetadata";
import { getIdBySlug } from "./getIdBySlug";
import { getSeoDataById } from "./getSeoDataById";
import { MetadataPropsType } from "@/app/[[...slug]]/page";
import { parseParams } from "./parseParams";
type PageMetadataProps = {
  slug: string;
  locale: Locale;
  postType: "page" | "post";
};
export const getPageMetadata = async ({params}: MetadataPropsType) => {

  const {slug, postType, locale} = await parseParams(params)
  console.log(slug, postType, locale)
  const apolloClient = initializeApollo();
  if (postType === "page") {
    const documentId = await getIdBySlug(slug, postType, apolloClient);

    if (documentId) {
      const { page: data } = await getSeoDataById(documentId, postType, locale, apolloClient);

      return getDynamicMetadata({
        title: data?.page?.SEO?.Title,
        description: data?.page?.SEO?.Description,
        bigImageUrl: data?.page?.SEO?.Preview1200x630?.url,
        smallImageUrl: data?.page?.SEO?.Preview510x230?.url,
        favicon: data?.logo?.logo?.url,
      });
    }
  }

  if (postType === "post") {
    const documentId = await getIdBySlug(slug, postType, apolloClient);

    if (documentId) {
      const { post: data } = await getSeoDataById(documentId, postType, locale, apolloClient);

      return getDynamicMetadata({
        title: data?.post?.SEO?.Title,
        description: data?.post?.SEO?.Description,
        bigImageUrl: data?.post?.SEO?.Preview1200x630?.url,
        smallImageUrl: data?.post?.SEO?.Preview510x230?.url,
        favicon: data?.logo?.logo?.url,
      });
    }
  }

  if (postType === 'doc') {
    const documentId = await getIdBySlug(slug, postType, apolloClient);

    if (documentId) {
      const { doc: data } = await getSeoDataById(documentId, postType, locale, apolloClient);

      return getDynamicMetadata({
        title: data?.doc?.SEO?.Title,
        description: data?.doc?.SEO?.Description,
        bigImageUrl: data?.doc?.SEO?.Preview1200x630?.url,
        smallImageUrl: data?.doc?.SEO?.Preview510x230?.url,
        favicon: data?.logo?.logo?.url,
      });
    }
  }
};
