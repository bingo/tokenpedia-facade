#Facade Server API

## Architecutre Overview
Around all internal micro-service servers, there're **Nginx-cluster** deployed to serve client requests and dispatched to downstream **Facade Server(s)**.

**Facade Server(s)** are built based on GraphQL to congregate various domain services as demanded ,from client point of view. Leveraging GraphQL, we could just build up overall domain model and to query/mutate data using specific API interface composed/suited dynamically on the fly. **Facade Server(s)** reply with JSON format so that client can easily manipulate them to render.

Domain services include below:

* **CMS Server** - which stores static data/information about each token, exposed interface as RESTful API.

* **Real-time Quote Server** - which supports nealy real-time query of latest token information including price, volume and other periodically changing data. Running at background, the server will need to crawl & update data by interval.

* **Github Information Server** - to query public Github API to fetch token's development relavent information such as commit per 7 days, etc.

* **Transaction History Server** - this may or may not lives in the same run-time as Real-time Quote Server. It records historical data per each token of its price, volume, price change data etc.

## API Outlines

Facade Server exposes token domain data through GraphQL query interface, and below the detail per each individual interface ( for more detail of query interface + schema, please read `src/schema.graphql` as coding guidelines):

* `query hotTokens {} `
 
 -> `[ {id, name}, ...] `

 To get a list of hot tokens. Initial version of this service would return fixed records hardcoded in code. Evolutionary version of this service would query Big-Data Analysis service to retrieve back dynamically analysised data.

* `query tokensTopN($byField: String, $order: desc|asc, $limit: Int) {} `

 ->` [ {id,name,percentage},...]` 

  To get limited numbers of records, sorted by $byField in descend or ascend order. 

* `tokensToMarket() {}`

 ->`[ {id,name,icon,estToMarket},...]`

  To get list of tokens going to market in near future. The service will call **CMS** service to get manually managed token data.
   
* `tokenList($byField, $order: desc|asc, $limit: Int) {}`

  -> `[ {id,name,icon,capital,volume,currentPrice,percentage},...]`

  To get list of tokens, sort by $byField in desc|asc order, of $limit records in the result. For those static information of token, they will be retrieved from **CMS Server** and for the rest, the **Real-time Quote Server**.

* `token($id) {}`

  ->`{id, name, ...}`

  To get specifed $id token detail information data. Most fields of the return data is retrieved from **CMS Server** and the real-time price relavant would be retrieved from **Real-time Quote Server**.