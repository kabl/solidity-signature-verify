//configure your endpoint
var RPC_ENDPOINT = 'https://rinkeby.infura.io/v3/1c21b6765c9e4935b7d34170e5d8f1aa';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(RPC_ENDPOINT));
var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');

async function signAndVerify() {

  //https://rinkeby.etherscan.io/address/0x15f65f6372e3f5a5c3a68b0812d81b19b860299c
  var contractAbi = [{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"signature","type":"bytes"},{"name":"signer","type":"address"}],"name":"verifySignature","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"}],"name":"recoverSigner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"h","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"recoverSigner2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
  var contract = new web3.eth.Contract(contractAbi, "0x15f65f6372e3f5a5c3a68b0812d81b19b860299c");

  const privateKey = '0x61ce8b95ca5fd6f55cd97ac60817777bdf64f1670e903758ce53efc32c3dffeb';
  const privateKeyBuffer = EthUtil.toBuffer(privateKey);
  const wallet = Wallet.fromPrivateKey(privateKeyBuffer);
  const publicKey = wallet.getPublicKeyString();
  const address = wallet.getAddressString();

  console.log("Private Key:     " +privateKey);
  console.log("Public key:      " + publicKey);
  console.log("Address:         " + address);


  var message = 'Hello World';
  var hash = web3.eth.accounts.hashMessage(message);
  var sig = await web3.eth.accounts.sign(hash, privateKey);

  console.log("Message:         " + message);
  console.log("Hash:            " + hash);
  console.log("Signature:       " + sig.signature);
  
  var result = await contract.methods.verifySignature(hash, sig.signature, address).call();
  console.log("VerifySignature: " + result);

  result = await contract.methods.recoverSigner(hash, sig.signature).call();
  console.log("RecoverSigner:   " + result);

  var hash2 = web3.eth.accounts.hashMessage("sdf");
  console.log("Hash (changed):  " + hash2);
  result = await contract.methods.verifySignature(hash2, sig.signature, address).call();
  console.log("VerifySignature (changed hash): " + result);
}

signAndVerify();
node rinkeby/RinkebyExecution.js