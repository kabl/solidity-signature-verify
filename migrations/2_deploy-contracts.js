var signatureVerifier = artifacts.require('./SignatureVerifier.sol')

module.exports = function (deployer) {
  deployer.deploy(signatureVerifier)
}