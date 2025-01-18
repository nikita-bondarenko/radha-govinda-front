// lib/apolloClient.ts

import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context'; // <-- ИМПОРТ setContext

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const authLink = setContext((_, { headers }) => {
  // Здесь можно получить токен из localStorage, Cookies или откуда вам нужно
  // Для примера возьмём из process.env, но обычно токен берут из cookies или Redux
  const token = process.env.NEXT_PUBLIC_API_TOKEN || '109cb6258627be26a0000792590539ef68dde6be14e0f014fb2a3aa29b6c6a8e0971343b69dc018a74bf6ff1ae3f91cda58cacbc7a92bfa71a3c53873414c91407a75f4606164a72f1216f518a8ef1d4eb2341644bf2dfc63a9a84021d7b0973ea976da1e3d7cdff1756222572b067318cfce592f1ad7a8cddfb19cdb501b003';

  // Возвращаем объект с заголовками
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://localhost:1338/graphql", // Используйте 127.0.0.1 вместо strapi
    fetch,
  });

  const link = authLink.concat(httpLink);


  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Включает режим серверного рендеринга
    link,
    cache: new InMemoryCache(),
  });
}



export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Если есть начальное состояние, восстановите кэш Apollo Client
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // Если мы на клиенте, сохраняем Apollo Client в глобальной переменной
  if (typeof window !== 'undefined') {
    if (!apolloClient) apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
