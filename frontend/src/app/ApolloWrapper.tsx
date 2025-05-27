'use client';
import {ApolloLink, HttpLink} from '@apollo/client';
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import {setContext} from "@apollo/client/link/context";
import React from "react";

function makeClient(uri: string) {
    const httpLink = new HttpLink({
        uri: uri,
        fetchOptions: { cache: 'force-cache' }
    });

    const authLink = setContext((_, { headers }) => {
        let jwt = null;
        if (typeof window !== 'undefined') {
            jwt = localStorage.getItem('jwt');
        }

        return {
            headers: {
                ...headers,
                authorization: jwt ? `Bearer ${jwt}` : '',
            },
        };
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([authLink, httpLink]),
    });
}

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
    const appUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_URL+'/cms/graphql' : process.env.NODE_ENV === 'development' ? 'http://localhost:1337/graphql' : 'http://localhost:1337/graphql';

    return (
        <ApolloNextAppProvider makeClient={() => makeClient(appUrl)}>
            {children}
        </ApolloNextAppProvider>
    );
}