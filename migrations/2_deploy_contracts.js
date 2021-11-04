const PixelPizzles = artifacts.require("./PixelPizzles.sol");

module.exports = (deployer) => {
  deployer.deploy(PixelPizzles);
};
