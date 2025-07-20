// lib/apolloClient.ts

import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context'; // <-- ИМПОРТ setContext

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const authLink = setContext((_, { headers }) => {
  // Здесь можно получить токен из localStorage, Cookies или откуда вам нужно
  // Для примера возьмём из process.env, но обычно токен берут из cookies или Redux
  const token = process.env.NEXT_PUBLIC_API_TOKEN || '6eec5aa3198bca325795a3361ba118a5c48de4f0c86bb744d8e0349c9c54655f7f0c0725962c2620b8c8c03f0b28f7438ca285a06bc76f7cd0b04aa8320d35fe9bed7ae4246809d708d87b6874bf0474c2260b4fd868456f96dc5f383fda30de67ab423bc13d4005452afda315e2517235e5694bf00df1986063fc88c3415bea';

  // Возвращаем объект с заголовками
  return {
    headers: {
      ...headers,
      Authorization: 'Bearer 6eec5aa3198bca325795a3361ba118a5c48de4f0c86bb744d8e0349c9c54655f7f0c0725962c2620b8c8c03f0b28f7438ca285a06bc76f7cd0b04aa8320d35fe9bed7ae4246809d708d87b6874bf0474c2260b4fd868456f96dc5f383fda30de67ab423bc13d4005452afda315e2517235e5694bf00df1986063fc88c3415bea',
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
