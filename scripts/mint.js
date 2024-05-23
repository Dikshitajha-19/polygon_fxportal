const hre = require("hardhat");
const nftContractJSON = require("../artifacts/contracts/NFT.sol/NFT.json");
const {nftAddress} = require("../contractAddress.js");
require('dotenv').config();

const nftABI = nftContractJSON.abi;

async function main() {

  const nft = await hre.ethers.getContractAt(nftABI, nftAddress);

  const tx = await nft.mint(5);
  await tx.wait();

  console.log("Minted 5 NFTs");
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});