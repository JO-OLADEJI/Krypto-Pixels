// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PixelMatrix is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
  // uint256 private solved = 0;
  uint256 private price = 0.03 ether;
  uint256 private maxMintAmount = 10;
  uint256 private puzzleMaxSupply = 17776;
  uint256 private totalMaxSupply = 22220;
  string private baseURI = "";
  mapping (address => uint256[]) private addrToSolved;


  constructor() ERC721("Pixel Matrix", "PMX") {}

  function mint(address recipient, uint256 mintAmount)
    public 
    payable
    returns(uint256)
  {
    require(mintAmount <= maxMintAmount, "Max-mint = 10");
    require(msg.value >= price * mintAmount, "Not enough ETH sent; check price!");
    require(_tokenIds.current() + mintAmount <= puzzleMaxSupply, "Not enough tokens left!");

    uint256 newItemId;
    
    for (uint256 i = 1; i <= mintAmount; i++) {
      _tokenIds.increment();
      newItemId = _tokenIds.current();
      _mint(recipient, newItemId);
      _setTokenURI(newItemId, baseURI);
    }

    return newItemId;
  }
  
  // function morphArt(uint256[] memory tokenIDs)
  //   public
  // {
  //   // require(!paused, "Contract is paused!");
  //   // require(tokenIDs.length > 0, "No token id specified!");
  //   require(tokenIDs.length == 4, "Can only burn 4 tokens at once!");
    
  //   for (uint256 i = 0; i < 9; i++) {
  //     require(ownerOf(tokenIDs[i]) == msg.sender, "You don't own all tokens");
  //   }
    
  //   // create a mechanism to check that all the tokens are for a particular piece
  //   // --
    
  //   uint256 onePiece = tokenIDs[1];
    
  //   for (uint256 i = 0; i < 9; i++) {
  //     _burn(tokenIDs[i]);
  //   }
    
  //   solved++;
  //   uint256 newSolvedID = puzzleMaxSupply + solved;
  //   _mint(msg.sender, newSolvedID);
  //   // _setTokenURI(newSolvedID, solvedBaseURI);
  //   // addrToSolved[msg.sender].push(onePiece);
  // }

  function updateTokens(uint256[] memory tokenIDs, string[] memory tokenURIs)
    public
    onlyOwner
  {
    // require(!paused, "Contract is paused!");
    require(tokenIDs.length == tokenURIs.length);

    for (uint256 i = 0; i < tokenIDs.length; i++) {
      _setTokenURI(tokenIDs[i], tokenURIs[i]);
    }
  }
  
  function withdraw()
    public
    onlyOwner
  {
    payable(msg.sender).transfer(address(this).balance);
  }
  
  function getPrice()
    public
    view
    returns(uint256)
  {
    return price;
  }

}