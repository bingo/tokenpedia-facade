var axios = require('axios')

const END_POINT = "http://localhost:1337/" //TODO: config dynamically

const cms = {
  getHotTokens: () => {
    var url = END_POINT + 'hottokens'
    return new Promise(function (resolve, reject) {
      var hotTokens = []
      axios.get(url)
        .then(function (response) {
          hotTokens = response.data.map(token => {
            return {
              'id': token.tokenid,
              'name': token.name,
            }
          })
          resolve(hotTokens)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
}

module.exports.cms = cms
