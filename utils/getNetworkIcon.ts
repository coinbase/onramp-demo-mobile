/**
 * Returns a URL to the network icon for the given chain ID
 * Uses well-known chain icons from trusted CDNs
 * @param chainId The chain ID (e.g., "base", "ethereum", "polygon")
 * @returns URL to the network icon
 */
export const getNetworkIcon = (chainId: string): string => {
  const NETWORK_ICONS: Record<string, string> = {
    ethereum:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    polygon:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    arbitrum:
      "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
    optimism:
      "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
    avalanche:
      "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
    binance:
      "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    solana: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    fantom:
      "https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png",
    gnosis:
      "https://assets.coingecko.com/coins/images/662/small/logo_square_simple_300px.png",
    celo: "https://assets.coingecko.com/coins/images/11090/small/InjXBNx9_400x400.jpg",
    moonbeam: "https://assets.coingecko.com/coins/images/22459/small/glmr.png",
    moonriver: "https://assets.coingecko.com/coins/images/17984/small/9285.png",
    aurora: "https://assets.coingecko.com/coins/images/20582/small/aurora.jpg",
    cronos:
      "https://assets.coingecko.com/coins/images/7310/small/cro_token_logo.png",
    harmony: "https://assets.coingecko.com/coins/images/4344/small/Y88JAze.png",
    metis: "https://assets.coingecko.com/coins/images/15595/small/metis.jpeg",
    klaytn: "https://assets.coingecko.com/coins/images/9672/small/klaytn.jpeg",
    bitcoin: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    bitcoincash:
      "https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png",
    unichain: "https://assets.coingecko.com/coins/images/1831/small/chain.png",
    cardano: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    dogecoin: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
    polkadot:
      "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    litecoin: "https://assets.coingecko.com/coins/images/2/small/litecoin.png",
    chainlink:
      "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    stellar:
      "https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png",
    vechain: "https://assets.coingecko.com/coins/images/206/small/VEN.png",
    tron: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png",
    eos: "https://assets.coingecko.com/coins/images/738/small/eos-eos-logo.png",
    tezos: "https://assets.coingecko.com/coins/images/976/small/Tezos-logo.png",
    iota: "https://assets.coingecko.com/coins/images/692/small/IOTA_Swirl.png",
    neo: "https://assets.coingecko.com/coins/images/1376/small/NEO_512_512.png",
    dash: "https://assets.coingecko.com/coins/images/19/small/dash-logo.png",
    zcash:
      "https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png",
    maker:
      "https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png",
    compound: "https://assets.coingecko.com/coins/images/10775/small/COMP.png",
    aave: "https://assets.coingecko.com/coins/images/12645/small/AAVE.png",
    sushi:
      "https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_NoBackground.png",
    yearn:
      "https://assets.coingecko.com/coins/images/11849/small/yearn-finance-yfi.png",
    synthetix: "https://assets.coingecko.com/coins/images/3406/small/SNX.png",
    balancer:
      "https://assets.coingecko.com/coins/images/11683/small/Balancer.png",
    curve: "https://assets.coingecko.com/coins/images/12124/small/Curve.png",
    ren: "https://assets.coingecko.com/coins/images/3139/small/REN.png",
    loopring: "https://assets.coingecko.com/coins/images/913/small/LRC.png",
    kyber: "https://assets.coingecko.com/coins/images/947/small/kyber-logo.png",
    ocean:
      "https://assets.coingecko.com/coins/images/3687/small/ocean-protocol-logo.png",
    band: "https://assets.coingecko.com/coins/images/9545/small/Band_token_blue_violet_token.png",
    ampleforth:
      "https://assets.coingecko.com/coins/images/4708/small/Ampleforth.png",
    thorchain: "https://assets.coingecko.com/coins/images/6595/small/RUNE.png",
    elrond: "https://assets.coingecko.com/coins/images/12335/small/elrond.png",
    algorand:
      "https://assets.coingecko.com/coins/images/4380/small/Algorand.png",
    cosmos:
      "https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png",
    kava: "https://assets.coingecko.com/coins/images/9761/small/kava.png",
    near: "https://assets.coingecko.com/coins/images/10365/small/near.png",
    hedera: "https://assets.coingecko.com/coins/images/3688/small/hbar.png",
    filecoin:
      "https://assets.coingecko.com/coins/images/12817/small/filecoin.png",
    theta:
      "https://assets.coingecko.com/coins/images/2538/small/theta-token-logo.png",
    chiliz: "https://assets.coingecko.com/coins/images/8834/small/Chiliz.png",
    enjin:
      "https://assets.coingecko.com/coins/images/1104/small/enjin-coin-logo.png",
    decentraland:
      "https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png",
    sandbox:
      "https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg",
    axie: "https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png",
    flow: "https://assets.coingecko.com/coins/images/13446/small/flow_logo.png",
    gala: "https://assets.coingecko.com/coins/images/12493/small/GALA.png",
    immutablex:
      "https://assets.coingecko.com/coins/images/17233/small/immutableX.png",
    wax: "https://assets.coingecko.com/coins/images/1372/small/WAX_Coin_Token.png",
    engine:
      "https://assets.coingecko.com/coins/images/1104/small/enjin-coin-logo.png",
    kovan: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    rinkeby: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    ropsten: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    goerli: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    matic:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    bsc: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    heco: "https://assets.coingecko.com/coins/images/12704/small/heco.png",
    okexchain: "https://assets.coingecko.com/coins/images/11062/small/okex.png",
    fuse: "https://assets.coingecko.com/coins/images/10347/small/fuse.png",
    telos: "https://assets.coingecko.com/coins/images/7588/small/Telos.png",
    boba: "https://assets.coingecko.com/coins/images/20285/small/boba.png",
    evmos: "https://assets.coingecko.com/coins/images/24023/small/evmos.png",
    canto: "https://assets.coingecko.com/coins/images/26959/small/canto.png",
    zkSync: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    starknet:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    kusama: "https://assets.coingecko.com/coins/images/12235/small/kusama.png",
  };

  const networkId = chainId.toLowerCase();
  if (networkId === "base") {
    return "https://assets.coingecko.com/coins/images/32319/small/base.jpg";
  }

  return (
    NETWORK_ICONS[networkId] ||
    "https://assets.coingecko.com/coins/images/279/small/ethereum.png" // Default to ETH icon
  );
};
