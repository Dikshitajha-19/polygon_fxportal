# polygon_fxportal

This project outlines the steps to generate a 5-item NFT collection using AI-generated art, deploy the NFTs on the Ethereum Sepolia testnet, and then transfer them to the Polygon Mumbai network. Below are the detailed instructions and scripts required to accomplish these tasks.

### Steps Overview

1. **Generate a 5-item collection using DALLE 2 or Midjourney**
2. **Store items on IPFS using pinata.cloud**
3. **Deploy an ERC721 or ERC1155 to the Sepoia Ethereum Testnet**
4. **Create a `promptDescription` function on the contract**
5. **Map your NFT Collection using Polygon network token mapper**
6. **Write a Hardhat script to batch mint all NFTs**
7. **Write a Hardhat script to batch transfer all NFTs from Ethereum to Polygon Mumbai using the FxPortal Bridge**
8. **Approve the NFTs to be transferred**
9. **Deposit the NFTs to the Bridge**
10. **Test `balanceOf` on Mumbai**

### Prerequisites

- Node.js
- Hardhat
- MetaMask
- Sepolia and Mumbai Testnet ETH/MATIC for gas fees
- Pinata.cloud account
- AI image generation access (DALLE 2 or Midjourney)

### Instructions

#### 1. Generate a 5-item collection using DALLE 2 or Midjourney
Generate five unique images using DALLE 2 or Midjourney. Save the prompt used for each image as it will be used in the smart contract.

#### 2. Store items on IPFS using pinata.cloud
1. Create an account on [pinata.cloud](https://pinata.cloud/).
2. Upload the five images to Pinata and note the IPFS hashes.

#### 3. Deploy an ERC721 or ERC1155 to the Goerli Ethereum Testnet
Create and deploy an ERC721 or ERC1155 smart contract on the Goerli Testnet using Hardhat.

```shell
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```

Sample `deploy.js` script:

```javascript
const { ethers } = require("hardhat");

async function main() {
  const NFT = await ethers.getContractFactory("YourNFTContract");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

#### 4. Create a `promptDescription` function on the contract
Ensure your NFT contract has a `promptDescription` function that returns the prompt used to generate the images.

```solidity
function promptDescription(uint256 tokenId) public view returns (string memory) {
    return prompts[tokenId];
}
```

#### 5. Map your NFT Collection using Polygon network token mapper
Although optional, mapping your NFT collection can help with visualization on the Polygon network. Follow the guide on the Polygon website to map tokens.

#### 6. Write a Hardhat script to batch mint all NFTs
Use the following script to batch mint the NFTs.

```javascript
const { ethers } = require("hardhat");

async function main() {
  const nftAddress = "YOUR_NFT_CONTRACT_ADDRESS";
  const NFT = await ethers.getContractAt("YourNFTContract", nftAddress);

  const recipients = ["0xRecipient1", "0xRecipient2", "0xRecipient3", "0xRecipient4", "0xRecipient5"];
  const tokenURIs = [
    "ipfs://hash1",
    "ipfs://hash2",
    "ipfs://hash3",
    "ipfs://hash4",
    "ipfs://hash5"
  ];

  for (let i = 0; i < recipients.length; i++) {
    const tx = await NFT.mint(recipients[i], tokenURIs[i]);
    await tx.wait();
    console.log(`Minted token to ${recipients[i]} with URI ${tokenURIs[i]}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

#### 7. Write a Hardhat script to batch transfer all NFTs from Ethereum to Polygon Mumbai using the FxPortal Bridge
Use the following script to batch transfer the NFTs.

```javascript
const { ethers } = require("hardhat");

async function main() {
  const nftAddress = "YOUR_NFT_CONTRACT_ADDRESS";
  const NFT = await ethers.getContractAt("YourNFTContract", nftAddress);

  const fxRootAddress = "FX_PORTAL_ROOT_ADDRESS";
  const FxRoot = await ethers.getContractAt("FxRoot", fxRootAddress);

  const tokenIds = [1, 2, 3, 4, 5];
  const recipient = "YOUR_MUMBAI_ADDRESS";

  for (let i = 0; i < tokenIds.length; i++) {
    await NFT.approve(fxRootAddress, tokenIds[i]);
    const tx = await FxRoot.depositNFT(nftAddress, recipient, tokenIds[i], "0x");
    await tx.wait();
    console.log(`Transferred token ${tokenIds[i]} to ${recipient} on Mumbai`);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

#### 8. Approve the NFTs to be transferred
Ensure the NFTs are approved for transfer in the above script.

#### 9. Deposit the NFTs to the Bridge
The script above also handles the deposit of NFTs to the FxPortal Bridge.

#### 10. Test `balanceOf` on Mumbai
After transferring the NFTs, check the balance on the Mumbai network.

```javascript
const { ethers } = require("hardhat");

async function main() {
  const mumbaiNFTAddress = "YOUR_MUMBAI_NFT_CONTRACT_ADDRESS";
  const recipient = "YOUR_MUMBAI_ADDRESS";
  
  const NFT = await ethers.getContractAt("YourNFTContract", mumbaiNFTAddress);
  const balance = await NFT.balanceOf(recipient);
  console.log(`Balance of ${recipient} on Mumbai:`, balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

### Conclusion
Follow these steps and scripts to successfully create, deploy, and transfer your NFT collection from Ethereum Goerli Testnet to Polygon Mumbai. For detailed customization, ensure you adjust contract addresses, account addresses, and other parameters specific to your project.
