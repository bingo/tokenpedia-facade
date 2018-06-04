const { GraphQLServer } = require('graphql-yoga')

// 1 mock data preparation
const EOS = {
  name: 'EOS',
  abbrev: 'EOS',
  chineseName: '柚子',
  icon: 'EOS Icon URL',
  description: 'This is EOS description',
  category: 'Infrastructure',
  totalSupply: 21000000,
  circulateSupply: 21000000,
  isListed: true,

}

// 2
const resolvers = {
  Query: {
    eosToken: () => EOS,
  },
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
