var consensusChain_Exporter = artifacts.require("./consensusChain_Exporter.sol");
var consensusChain_Importer = artifacts.require("./consensusChain_Importer.sol");
var consensusChain_Bank = artifacts.require("./consensusChain_Bank.sol");
var consensusChain_PortAuthority = artifacts.require("./consensusChain_PortAuthority.sol");
var consensusChain_Custom = artifacts.require("./consensusChain_Custom.sol");
var consensusChain_Shipping = artifacts.require("./consensusChain_Shipping.sol");

module.exports = function(deployer) {
  deployer.deploy(consensusChain_Exporter);
  deployer.deploy(consensusChain_Importer);
  deployer.deploy(consensusChain_Bank);
  deployer.deploy(consensusChain_PortAuthority);
  deployer.deploy(consensusChain_Custom);
  deployer.deploy(consensusChain_Shipping);
  
};
