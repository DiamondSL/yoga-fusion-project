import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

const httpLink = new HttpLink({
    uri: process.env.NODE_ENV == 'production' ? process.env.NEXT_PUBLIC_URL+'/cms/graphql' : 'http://localhost:1337/graphql',
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

const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client;