import { split } from 'apollo-link';
import { HttpLink, ApolloClient, InMemoryCache } from 'apollo-boost';

import { getMainDefinition } from 'apollo-utilities';

import { WebSocketLink } from 'apollo-link-ws';

const wsLink = new WebSocketLink({
    uri: `wss://hasura-tutorial-zaranik.herokuapp.com/v1/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                'content-type': 'application/json',
                'x-hasura-admin-secret': 'mySecret',
            },
        },
    },
});

const httpLink = new HttpLink({
    uri: 'https://hasura-tutorial-zaranik.herokuapp.com/v1/graphql',
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

export default new ApolloClient({
    cache: new InMemoryCache(),
    link,
});
