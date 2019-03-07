const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql/schema');
const { configUpload , configContext , configOnConnectSubscription } = require('./config/configServerApollo');

const server = new ApolloServer({
  schema,
  context: configContext,
  uploads: configUpload,
  subscriptions: {
    onConnect: configOnConnectSubscription,
  },
});
