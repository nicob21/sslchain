var Sslchain = artifacts.require("./Sslchain.sol");

module.exports = function(deployer) {
    deployer.deploy(
        Sslchain,
        {gas: 233351}
    );
};
