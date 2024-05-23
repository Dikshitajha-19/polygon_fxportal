
const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.deployed();

  console.log("NFT address:", nft.address);
 
  // export the addresses
  fs.writeFileSync('contractAddress.js', `
    module.exports = {
      nftAddress : "${nft.address}"
    }
  `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*

npm i
npm install dotenv --save
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
node scripts/mint.js
node .\scripts\approveDeposit.js

*/