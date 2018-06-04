# Tokenpedia Facade Server
Tokenpedia facade server, stands behind edge access servers (normally Nginx cluster), to provide various business logic services to clients for data rendering then. It exposes GraphQL interface which responses with JSON fromat of data. For detail of the API interface, please see **API doc** accompanioned within this repository.
# Development
## Launch Tokenpedia Facade Server

1. `npm install` #dependencies ready and build/install whole project

1. `node src/index.js` #launch the Graphql-yoga server

## Implementation Detail

1. Schema exists at *src/schema.graphql*

1. Resolver exists at *src/index.js*, to implement each field's resolver
