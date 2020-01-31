const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {db} = require('./db')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return {db}
  }
})

server.listen(1234).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
