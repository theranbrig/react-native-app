import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Pages from './pages';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const AppProvider = () => (
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>
);

export default AppProvider;
