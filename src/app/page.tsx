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
      postsLocale2: "ru",
      sort: ["Date:DESC"],
      pagination: {
        start: 0,
        limit: 6,
      },
      postsPagination2: {
        start: 0,
        limit: 3,
      },
      moviesPagination2: {
        start: 0,
        limit: 10,
      },
    },
  });

  // Создаем Redux store на сервере и задаем locale
  const store = createLocaleStore();
  store.dispatch(setLocale("ru"));

  return (
    <LocaleStoreProvider initialState={store.getState()}>
      <PageGenerator {...pageData} />
    </LocaleStoreProvider>
  );
}
