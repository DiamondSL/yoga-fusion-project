'use client';
import { HttpLink } from '@apollo/client';
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

function makeClient(uri: string) {
    const env = process.env.NODE_ENV;
    const httpLink = new HttpLink({
        uri:
            uri && uri.includes('https') && env === 'production'
                ? `${uri}/cms/graphql`
                : 'http://localhost:1337/graphql',
        fetchOptions: { cache: 'force-cache' },
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
    const appUrl = process.env.NEXT_PUBLIC_URL ?? 'https://yoga-fusion-w3cqn.ondigitalocean.app';

    return (
        <ApolloNextAppProvider makeClient={() => makeClient(appUrl)}>
            {children}
        </ApolloNextAppProvider>
    );
}