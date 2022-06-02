/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
const { PRIVATE_KEY,URL_API,ETHERSCAN_APIKEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
     PolygonMumbai: {
      url: URL_API,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_APIKEY
  }
}