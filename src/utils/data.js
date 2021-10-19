const AVALANCHE_NETWORK_CHAIN_ID = "0xa86a";
const AVALANCHE_FUJI_NETWORK_CHAIN_ID = "0xa869";

export const handleChainIdChanged = chainId => {
    return !(String(chainId) !== AVALANCHE_FUJI_NETWORK_CHAIN_ID && String(chainId) !== AVALANCHE_NETWORK_CHAIN_ID);
}

export const handleAccountsChanged = address => {
    return !(address === undefined || address.length <= 0);
}