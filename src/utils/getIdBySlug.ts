import {
  PagesConnectionsQuery,
  PagesConnectionsQueryVariables,
  PagesConnectionsDocument,
  PostsConnectionsDocument,
  PostsConnectionsQueryVariables,
  PostsConnectionsQuery,
} from "@/gql/generated/graphql";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { PostType } from "./parseParams";

export const getIdBySlug = async (
  slug: string,
  postType: PostType,
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  switch (postType) {
    case "page":
      const { data } = await apolloClient.query<
        PagesConnectionsQuery,
        PagesConnectionsQueryVariables
      >({
        query: PagesConnectionsDocument,
      });

      const page = data?.pages_connection?.nodes.find(
        (page) => page.Slug === slug
      );
      return page?.documentId;
    case "post":
      const { data: postData } = await apolloClient.query<
        PostsConnectionsQuery,
        PostsConnectionsQueryVariables
      >({
        query: PostsConnectionsDocument,
      });
      const post = postData?.posts_connection?.nodes.find(
        (post) => post.Slug === slug
      );
      return post?.documentId;
    default:
      return null;
  }
};
