if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const { GraphQLServer } = require('graphql-yoga')
const { resolvers } = require('./resolvers')

// Launch GraphQL Server
const server = new GraphQLServer({
  typeDefs: './src/schemas/schema.graphql',
  resolvers,
})
var port = process.env.TOKENPEDIA_FACADE_PORT
console.log(process.env.TOKENPEDIA_FACADE_PORT)
server.start({port:port},() => console.log(`Server is running on http://localhost:` + port))
