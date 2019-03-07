const { gql } = require('apollo-server');

const Default = gql`
  scalar Date
  scalar Upload
  type Query {
    holaMundo : String
    fecha: Date
  }
  type Mutation {
    iniciarBaseDeDatos: Boolean,
    addMessage: String
  }
  type Subscription {
    addedMessage: String
  }
  
  type Error {
    path: String
    message: String
  }
  interface Response {
    ok: Boolean!
  }
  type FailResponse implements Response{
    ok: Boolean!
    errors: [Error]
  }
`

module.exports = Default;