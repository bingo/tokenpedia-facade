const { cms } = require('./connectors/cms')
const { quote } = require('./connectors/quote')

const END_POINTS = {
    CMS: 'http://localhost:1337/',
    QUOTE: 'http://localhost:1234/',
    GITHUB: 'http://localhost:4321/',
    HISTORY: 'http://bigdata:1234/',
}

// mock data preparation
const TOKEN = {
    name: 'EOS',
    abbrev: 'EOS',
    chineseName: '柚子',
    icon: 'EOS Icon URL',
    description: 'This is EOS description',
    category: 'Infrastructure',
    totalSupply: 21000000,
    circulateSupply: 21000000,
    isListed: true,
    currentPrice: 12.05,
}

async function getTokensTopN(_, {sort, order, limit}) {
    var tokensTopN
    await quote.tokensTopN(sort, order, limit)
        .then(result => {
            tokensTopN = result
        })
    return tokensTopN
}

async function getTokenList(_, { sort, order, limit, start }) {
    var tokenList
    await quote.tokenList(sort, order, limit, start)
        .then(result => {
            tokenList = result
        })
    return tokenList
}

function token(id) {
    return null;
}

//get hot tokens list
async function getHotTokens() {
    var tokens
    await cms.getHotTokens()
        .then(hotTokens => {
            tokens = hotTokens
        })
    return tokens;
}


//mock token list to market
const tokensToMarket = [
    { id: "AAA", name: "AAA", icon: "aaa_icon_url", estToMarket: "12345678" },
]

const resolverMap = {
    Query: {
        hotTokens: getHotTokens,
        tokensTopN: getTokensTopN,
        tokensToMarket: () => tokensToMarket,
        tokenList: getTokenList,
        token: (id) => TOKEN,
    },
}

module.exports.resolvers = resolverMap
