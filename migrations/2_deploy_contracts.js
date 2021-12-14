const PixelMatrix = artifacts.require("./PixelMatrix.sol");

module.exports = (deployer) => {
  deployer.deploy(PixelMatrix);
};
