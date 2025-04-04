"use client";

import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

interface makeClient {
    uri?: string;
}

// have a function to create a client for you
function makeClient({uri}:makeClient) {
    const env = process.env.NODE_ENV
    const httpLink = new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: uri && uri.includes('https') && env === 'production' ? uri+"/cms/graphql" : "http://localhost:1337/graphql",
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        fetchOptions: { cache: "no-store",   },
        headers: {
            'Authorization': 'Bearer dop_v1_3c3e9c4dccd671bc95847c26ea1ef5488682800cc9d360db5941c58d027f9ac6',
        }
        // you can override the default `fetchOptions` on a per query basis
        // via the `context` property on the options passed as a second argument
        // to an Apollo Client data fetching hook, e.g.:
        // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
    });

    // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
    return new ApolloClient({
        // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={() => makeClient({uri: 'https://yoga-fusion-w3cqn.ondigitalocean.app'})}>
            {children}
        </ApolloNextAppProvider>
    );
}