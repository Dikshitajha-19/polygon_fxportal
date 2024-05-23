// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "erc721a/contracts/ERC721A.sol";

contract NFT is ERC721A {

    // Maximum number of tokens that can be minted
    uint256 public maxQuantity = 5;

    constructor() ERC721A("NFT", "NFT") {}

    // this is the function to mint the nfts atmax 5 NFTs can get minted
    function mint(uint256 quantity) external payable {
        require(totalSupply() + quantity <= maxQuantity ,"You can not mint more than 5");
        _mint(msg.sender, quantity);
    }

    //this will get the image from pinata where we have our image usind cid 

    function _baseURI() internal pure override returns (string memory){
        return "https://gateway.pinata.cloud/ipfs/QmbF1QDkC8TTgECK6zjaeckvF8CvH6uqpXMiSZto339T1F/";
    }

    // this is the prompt description 

    function promptDescription() external pure returns (string memory) { 
        return "Image has genrated";
    }
}
