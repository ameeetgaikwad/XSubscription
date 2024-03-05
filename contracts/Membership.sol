// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, Ownable {
    uint immutable public tokenPrice;
    uint256 private _nextTokenId;

    constructor(address initialOwner,string memory title,string memory symbol,uint price)
        ERC721(title, symbol)
        Ownable(initialOwner)
        
    {tokenPrice=price;}

    function safeMint(address to) public payable{
        require(msg.value>=tokenPrice,'sufficient amount not provided');
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}