var SignatureVerifier = artifacts.require('./SignatureVerifier.sol')

var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

contract('SignatureVerifier', (accounts) => {
  var address = accounts[0]

  it('verifySignature is true', async function() {
    var instance = await SignatureVerifier.deployed()
    var msg = 'Hello World'
    var hash = web3.utils.sha3(msg)

    var signature = (await web3.eth.sign(hash, address))
    
    var result = await instance.verifySignature(hash, signature, address);
    assert.equal(result, true)
  })

  it('verifySignature wrong address', async function() {
    var instance = await SignatureVerifier.deployed()
    var msg = 'Hello World'
    var hash = web3.utils.sha3(msg)

    var signature = (await web3.eth.sign(hash, address))
    
    var result = await instance.verifySignature(hash, signature, accounts[1]);
    assert.equal(result, false)
  })

  it('verifySignature wrong hash', async function() {
    var instance = await SignatureVerifier.deployed()
    var msg = 'Hello World'
    var hash = web3.utils.sha3(msg)

    var signature = (await web3.eth.sign(hash, address))
    
    var hashWrong = web3.utils.sha3("Other message")
    var result = await instance.verifySignature(hashWrong, signature, accounts[1]);
    assert.equal(result, false)
  })

  it('verifySignature wrong signature', async function() {
    var instance = await SignatureVerifier.deployed()
    var msg = 'Hello World'
    var hash = web3.utils.sha3(msg)

    var signature = (await web3.eth.sign(hash, accounts[1]))
    
    var result = await instance.verifySignature(hash, signature, address);
    assert.equal(result, false)
  })

  it('recoverSigner result matches address', async function() {
    var instance = await SignatureVerifier.deployed()
    var msg = 'Hello World'
    var hash = web3.utils.sha3(msg)

    var signature = (await web3.eth.sign(hash, address))

    result = await instance.recoverSigner.call(hash, signature)
    assert.equal(result, address)

    await instance.verifySignature(hash, signature, address);
  })

  it('recoverSigner2 result matches address', async function() {
    var instance = await SignatureVerifier.deployed()
    var msg = 'Hello World'
    var hash = web3.utils.sha3(msg)

    var sig = (await web3.eth.sign(hash, address)).slice(2);

    var v = web3.utils.toDecimal(sig.slice(128, 130)) + 27
    var r = `0x${sig.slice(0, 64)}`
    var s = `0x${sig.slice(64, 128)}`

    var result = await instance.recoverSigner2.call(hash, v, r, s)
    assert.equal(result, address)
  })
})