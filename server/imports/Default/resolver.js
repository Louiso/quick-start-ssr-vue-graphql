const { GraphQLUpload } = require('graphql-upload');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const Default = {
  Query: {
    holaMundo: () => "Hola Mundo",
    fecha: () => new Date()
  },
  Mutation:{
    iniciarBaseDeDatos: async (parent, args , context , info ) => {
      return true;
    },
    addMessage: (parent, args, context , info) => {      
      pubsub.publish('ADDED_MESSAGE', {
        addedMessage: "Se agrego un mensaje"
      });
      return 'agregar mensaje se completo'
    }
  },
  Subscription: {
    addedMessage: {
      subscribe: (parent, args , context , info) => {
        return pubsub.asyncIterator(['ADDED_MESSAGE'])
      }
    }
  },
  Upload: GraphQLUpload,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
  Response: {
    __resolveType(obj, context , info) {
      return null;
    }
  }
}

module.exports = Default;