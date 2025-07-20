import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Locale } from "./getLocalizedData";
import {
  DocumentSeoDocument,
  DocumentSeoQuery,
  DocumentSeoQueryVariables,
  PageSeoDocument,
  PageSeoQuery,
  PageSeoQueryVariables,
  PostSeoDocument,
  PostSeoQuery,
  PostSeoQueryVariables,
} from "@/gql/generated/graphql";
import { PostType } from "./parseParams";

export const getSeoDataById = async (
  documentId: string,
  postType: PostType,
  locale: Locale,
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {

    const res = {page: null, post: null, doc: null} as {page: PageSeoQuery | null, post: PostSeoQuery | null, doc: DocumentSeoQuery | null}
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

      case "doc":
        const { data: docData } = await apolloClient.query<
        DocumentSeoQuery,
        DocumentSeoQueryVariables
      >({
        query: DocumentSeoDocument,
        variables: {
          documentId: documentId,
          locale: locale,
        },
      });

      res.doc = docData;
  }

  return res;
};
