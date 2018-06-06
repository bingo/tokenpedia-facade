var axios = require('axios')

const END_POINT = "http://47.98.164.206:3000/token?" //TODO: config dynamically
const SORT_PARAMS = [ //TODO: generate this dynamically
  'market_cap',
  'volume_24h',
  'price',
  'percent_change_24h'
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
    if (SORT_PARAMS.indexOf(s) == -1) {
      console.log("wrong parameters, sort=" + s + ' not acceptable!')
      return
    }
    if (ORDER_PARAMS.indexOf(o) == -1) {
      console.log("wrong parameters, order=" + o + ' not acceptable!')
      return
    }
    if (!Number.isInteger(l)) {
      console.log("wrong parameters, limit=" + l + ' not acceptable!')
      return
    }

    var url = END_POINT + 'sort=' + s + '&order=' + o + '&limit=' + l
    return new Promise(function (resolve, reject) {
      var tokens = []
      axios.get(url)
        .then(function (response) {
          /* Response Data Structure
            data:
              [
                {id, name, ...}
                ...
              ]
            metadata:
              timestamp:
              num_cryptocurrencies:
              error:
          */
          tokens = response.data.data.map(token => {
            return {
              'id': token.id,
              'name': token.name,
              'marketCap': token.market_cap,
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
  tokenList: (sort, order, limit, start) => {
    //sort default = 'price', order default = 'desc', limit default = 20
    //verify input && specify default value
    var s = (null == sort) ? 'price' : sort
    var o = (null == order) ? 'desc' : order
    var l = (null == limit) ? 20 : limit
    var ss = (null == start) ? 0 : start
    if (SORT_PARAMS.indexOf(s) == -1) {
      console.log("wrong parameters, sort=" + s + ' not acceptable!')
      return
    }
    if (ORDER_PARAMS.indexOf(o) == -1) {
      console.log("wrong parameters, order=" + o + ' not acceptable!')
      return
    }
    if (!Number.isInteger(l)) {
      console.log("wrong parameters, limit=" + l + ' not acceptable!')
      return
    }
    if (!Number.isInteger(ss)) {
      console.log("wrong parameters, limit=" + ss + ' not acceptable!')
      return
    }

    var url = END_POINT + 'sort=' + s + '&order=' + o + '&limit=' + l + '&start=' + ss
    console.log("request:" + url)
    return new Promise(function (resolve, reject) {
      var tokens = []
      axios.get(url)
        .then(function (response) {
          /* Response Data Structure
            data:
              [
                {id, name, ...}
                ...
              ]
            metadata:
              timestamp:
              num_cryptocurrencies:
              error:
          */
          tokenPage = {
            tokens: response.data.data.map(token => {
              return {
                'id': token.id,
                'name': token.name,
                'marketCap': token.market_cap,
                'transactions': token.volume_24h,
                'currentPrice': token.price,
                'currentPercentage': token.percent_change_24h
              }
            }),
            total: response.data.metadata.num_cryptocurrencies
          }
          resolve(tokenPage)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
}

module.exports.price = price

