import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Locale } from "./getLocalizedData";
import {
  PageSeoDocument,
  PageSeoQuery,
  PageSeoQueryVariables,
  PostSeoDocument,
  PostSeoQuery,
  PostSeoQueryVariables,
} from "@/gql/generated/graphql";

export const getSeoDataById = async (
  documentId: string,
  postType: "page" | "post",
  locale: Locale,
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {

    const res = {page: null, post: null} as {page: PageSeoQuery | null, post: PostSeoQuery | null}
  switch (postType) {
    case "page":
      const { data } = await apolloClient.query<
        PageSeoQuery,
        PageSeoQueryVariables
      >({
        query: PageSeoDocument,
        variables: {
          documentId: documentId,
          locale: locale,
        },
      });

      res.page = data;
    case "post":
      const { data: postData } = await apolloClient.query<
        PostSeoQuery,
        PostSeoQueryVariables
      >({
        query: PostSeoDocument,
        variables: {
          documentId: documentId,
          locale: locale,
        },
      });

      res.post = postData;
  }

  return res;
};
