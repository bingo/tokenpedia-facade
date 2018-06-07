var axios = require('axios')

const END_POINT = process.env.ENDPOINT_CMS

const cms = {
  getHotTokens: async () => {
    var url = END_POINT + 'hottokens'

    var hotTokens = []
    hotTokens = await axios.get(url)
      .then(function (response) {
        hotTokens = response.data.map(token => {
          return {
            'id': token.tokenid,
            'name': token.name,
          }
        })
      })
      .catch(error => {
        console.log(error)
        throw error
      })
    return hotTokens
  },
}

module.exports.cms = cms
