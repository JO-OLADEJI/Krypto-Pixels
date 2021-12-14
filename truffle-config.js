const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();


const { API_URL, MNEMONIC } = process.env;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: 5777,
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, API_URL)
      },
      network_id: 4,
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
