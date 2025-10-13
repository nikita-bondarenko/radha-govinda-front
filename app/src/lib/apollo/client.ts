// lib/apolloClient.ts

import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context'; // <-- ИМПОРТ setContext

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const authLink = setContext((_, { headers }) => {
  // Здесь можно получить токен из localStorage, Cookies или откуда вам нужно
  // Для примера возьмём из process.env, но обычно токен берут из cookies или Redux
  const token = process.env.NEXT_PUBLIC_API_TOKEN || '64e21ffad4cb720508302c22bca95b58a84d5212a274ff354820c715b247c3ed9bcd977816351ae186636ca9e0ce3f38253dcd5e85550f4849b54032a80ad7b8d93a9d9446bc65850eb21215ff38b1f8d902e565fdc74817cecf2bd90c701264b7285197483303e379c2e5446f879090cd5dc9619b8102e93af5a1a6228e7bd0';

  // Возвращаем объект с заголовками
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_STRAPI_API_URL, 
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
