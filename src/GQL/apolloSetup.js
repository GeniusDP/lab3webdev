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
                // eslint-disable-next-line no-undef
                'x-hasura-admin-secret': process.env["REACT_APP_X_HASURA_ADMIN_SECRET"]
            },
        },
    },
});

const httpLink = new HttpLink({
    // eslint-disable-next-line no-undef
    uri: process.env.REACT_APP_SRC,
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
