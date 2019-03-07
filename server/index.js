require('./config');
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const http = require('http');
const { ApolloServer } = require('apollo-server-express');

const app = require('./app');
const db = require('./db');
const Models = require('./models');

const schema = require('./graphql/schema');

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const server = new ApolloServer({
  schema,
  context: ({req, connection }) => {
    // console.log(connection);
    if(connection){
      return {
        ...Models,
        ...connection.context
      }
    }else{
      return {
        ...Models,
        user: 'User'
      }  
    }
  },
  uploads: process.env.configUpload,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      // console.log(connectionParams);
      if (connectionParams.authorizationWS) {
        return {
          currentUser: "Funciona weeeee"
        }
      }

      // throw new Error('Missing auth token!');
    },
  },
});

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);
server.applyMiddleware({ app })

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  httpServer.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`)
  })
}

start()
