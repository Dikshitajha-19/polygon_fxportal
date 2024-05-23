/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    
    sepolia: {
      url:"https://eth-sepolia.g.alchemy.com/v2/Z4lhJgtAqbTSLA3fVe6Anw8SZbX-gOF8",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
