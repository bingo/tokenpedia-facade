var axios = require('axios')

const END_POINT = "http://47.98.164.206:3000/token?" //TODO: config dynamically
const SORT_PARAMS = [ //TODO: generate this dynamically
  "captial",
  "circulate",
  "volume",
  "price",
  "percent"
]

const ORDER_PARAMS = [
  "desc",
  "asc"
]

const price = {
  tokensTopN: (sort, order, limit) => {
    //sort default = 'price', order default = 'desc', limit default = 20
    //verify input && specify default value
    var s = (null == sort) ? 'price' : sort
    var o = (null == order) ? 'desc' : order
    var l = (null == limit) ? 20 : limit
    if (SORT_PARAMS.indexOf(sort) == -1) {
      console.log("wrong parameters, sort=" + sort + ' not acceptable!')
      return
    }
    if (ORDER_PARAMS.indexOf(order) == -1) {
      console.log("wrong parameters, order=" + order + ' not acceptable!')
      return
    }
    if (!Number.isInteger(limit)) {
      console.log("wrong parameters, limit=" + limit + ' not acceptable!')
      return
    }

    var url = END_POINT + 'sort=' + s + '&order=' + o + 'limit=' + l
    return new Promise(function (resolve, reject) {
      var tokens = []
      axios.get(url)
        .then(function (response) {
          tokens = response.data.map(token => {
            return {
              'id': token.id,
              'name': token.name,
              'marketCap': token.market_cap,
              'circulateSupply': 1000,
              'transactions': token.volume_24h,
              'currentPercentage': token.percent_change_24h
            }
          })
          resolve(tokens)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  tokenList: (sort, order, limit) => {
    //sort default = 'price', order default = 'desc', limit default = 20
    //verify input && specify default value
    var s = (null == sort) ? 'price' : sort
    var o = (null == order) ? 'desc' : order
    var l = (null == limit) ? 20 : limit
    if (SORT_PARAMS.indexOf(sort) == -1) {
      console.log("wrong parameters, sort=" + sort + ' not acceptable!')
      return
    }
    if (ORDER_PARAMS.indexOf(order) == -1) {
      console.log("wrong parameters, order=" + order + ' not acceptable!')
      return
    }
    if (!Number.isInteger(limit)) {
      console.log("wrong parameters, limit=" + limit + ' not acceptable!')
      return
    }

    var url = END_POINT + 'sort=' + s + '&order=' + o + 'limit=' + l
    return new Promise(function (resolve, reject) {
      var tokens = []
      axios.get(url)
        .then(function (response) {
          tokens = response.data.map(token => {
            return {
              'id': token.id,
              'name': token.name,
              'marketCap': token.market_cap,
              'transactions': token.volume_24h,
              'currentPrice': token.price,
              'currentPercentage': token.percent_change_24h
            }
          })
          resolve(tokens)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
}

module.exports.price = price

