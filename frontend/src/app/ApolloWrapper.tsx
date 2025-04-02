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
    const httpLink = new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: uri && uri.includes('http') ? uri+"/admin/graphql" : "http://localhost:1337/graphql",
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        fetchOptions: { cache: "no-store",   },
        headers: {
            'Authorization': `Bearer 70b74aed9be1c30a2e57759c81c748751aa4c157baec404ed0c1e864620ea7f7124fbe23b020d9ec74988e029ec2a14a4d1c9c7040c4a6fa9c479ea6f0b425b1a499d2fa91f85fd93073c84fd2abebf7e4f6b667dbebe51419a605944f331b263335e485b36ce12133726a0219060af4e4448c422d23a4f294436aaf278c3297`,
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