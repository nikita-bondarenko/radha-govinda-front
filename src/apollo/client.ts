// lib/apolloClient.ts

import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context'; // <-- ИМПОРТ setContext

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const authLink = setContext((_, { headers }) => {
  // Здесь можно получить токен из localStorage, Cookies или откуда вам нужно
  // Для примера возьмём из process.env, но обычно токен берут из cookies или Redux
  const token = process.env.NEXT_PUBLIC_API_TOKEN || '40b924662fc782f87ee1d68407afe0e62bcd1a4199adc108891281ac7d105dae71295b5e7f35ce8fc1110bc55450b938cfa6c721946fe58facfcf7b8ff62ae270065360c29675d3973d07e7ece8c6eddeca2428da8864e8daa60a78eab298fd90663603af3ddd462fb6008664ccc1e22fc74bdae8a09de1f4f45f61527a0a789';

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
    uri: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1338/graphql", // Используйте 127.0.0.1 вместо strapi
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
