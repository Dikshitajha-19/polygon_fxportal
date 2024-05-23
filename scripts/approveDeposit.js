const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../FXRootContractAbi.js");
require('dotenv').config();
const {nftAddress} = require("../contractAddress.js");
const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
const networkAddress = 'https://eth-sepolia.g.alchemy.com/v2/Z4lhJgtAqbTSLA3fVe6Anw8SZbX-gOF8';
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(networkAddress);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {

  const nftContract = await ethers.getContractFactory("NFT");
  const nft = nftContract.attach(nftAddress);
  const fxContract = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  // Get the signer instance
  const [signer] = await ethers.getSigners();

  const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();

  console.log('Approval confirmed');

  const nftIds = [1, 2, 3, 4, 5];

  for (let i = 0; i < nftIds; i++) {
    const depositTx = await fxContract.connect(signer).deposit(
      nft.address,
      wallet.address,
      nftIds[i],
      '0x6566'
    );

    await depositTx.wait();
  }

  console.log("NFTs deposited");

}
 
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});