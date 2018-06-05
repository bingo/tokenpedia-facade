"use strict"

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

//fixed hot token list
const hotTokens = [
    { id: "EOS", name: "EOS" },
    { id: "NEO", name: "NEO" },
    { id: "ONT", name: "ONT" },
    { id: "TRX", name: "TRX" },
]

function tokensTopN(byField, order, limit) {
    return null;
}

function tokenList(byField, order, limit) {
    return null;
}

function token(id) {
    return null;
}

//mock token list to market
const tokensToMarket = [
    { id: "AAA", name: "AAA", icon: "aaa_icon_url", estToMarket: "12345678"},
]

const _resolvers = {
    Query: {
        hotTokens: () => hotTokens,
        tokensTopN: tokensTopN,
        tokensToMarket: () => tokensToMarket,
        tokenList: tokenList,
        token: (id) => TOKEN,
    },
}

exports.resolvers = _resolvers;