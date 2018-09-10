# Ethereum Signature Validation

Demonstration how to verify signature in an Ethereum Smart Contract. 

## Running Truffle tests
1.) Install truffle
2.) Install ganache-cli

```bash
# First time
npm install

# Tests
ganache-cli

truffle test
```

# Running explorative tests on Rinkeby
The smart contract is deployed at: https://rinkeby.etherscan.io/address/0x15f65f6372e3f5a5c3a68b0812d81b19b860299c
To interact with it you need a Rinkeby full node or Infura or whatever JSON RPC access you have. 

```bash
node rinkeby/RinkebyExecution.js 
```

## References
- https://ethereum.stackexchange.com/questions/15364/ecrecover-from-geth-and-web3-eth-sign
- https://ropsten.etherscan.io/address/0x1d0d66272025d7c59c40257813fc0d7ddf2c4826#code
- https://ethereum.stackexchange.com/questions/13652/how-do-you-sign-an-verify-a-message-in-javascript-proving-you-own-an-ethereum-ad