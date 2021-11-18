import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import apolloClient from './GQL/apolloSetup';
import { ApolloProvider } from '@apollo/client';

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
