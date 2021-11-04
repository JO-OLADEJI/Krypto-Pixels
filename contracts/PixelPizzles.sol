// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PixelPizzles is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
  address owner;
  bool private paused = false;
  uint256 private solved = 0;
  uint256 private price = 0.01 ether;
  uint256 private maxMintAmount = 10;
  uint256 private puzzleMaxSupply = 9999;
  uint256 private totalMaxSupply = 11110;
  string private puzzleBaseURI = "";
  string private solvedBaseURI = "";
  mapping (address => uint256[]) private addrToSolved;


  constructor() ERC721("Pixel Pizzles", "PPZ") {
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function mint(address recipient, uint256 mintAmount)
    public 
    payable
    returns(uint256)
  {
    require(!paused, "Contract is paused!");
    require(mintAmount > 0);
    require(mintAmount <= maxMintAmount, "Max-mint per time is 10");
    require(msg.value >= price * mintAmount, "Not enough ETH sent; check price!");
    require(_tokenIds.current() + mintAmount <= puzzleMaxSupply, "Not enough tokens left!");

    uint256 newItemId;
    
    for (uint256 i = 1; i <= mintAmount; i++) {
      _tokenIds.increment();
      newItemId = _tokenIds.current();
      _mint(recipient, newItemId);
      _setTokenURI(newItemId, puzzleBaseURI);
    }

    return newItemId;
  }
  
  function transferToken(address to, uint256 tokenID)
    public
  {
    require(!paused, "Contract is paused!");
    safeTransferFrom(msg.sender, to, tokenID);
  }
  
  function burnTokens(uint256[] memory tokenIDs)
    public
  {
    require(!paused, "Contract is paused!");
    require(tokenIDs.length > 0, "No token id specified!");
    require(tokenIDs.length == 9, "Can only burn 9 tokens at once!");
    
    for (uint256 i = 0; i < 9; i++) {
      require(ownerOf(tokenIDs[i]) == msg.sender, "You don't own all tokens");
    }
    
    // create a mechanism to check that all the tokens are for a particular piece
    // --
    
    uint256 onePiece = tokenIDs[1];
    
    for (uint256 i = 0; i < 9; i++) {
      _burn(tokenIDs[i]);
    }
    
    solved++;
    uint256 newSolvedID = puzzleMaxSupply + solved;
    _mint(msg.sender, newSolvedID);
    _setTokenURI(newSolvedID, solvedBaseURI);
    addrToSolved[msg.sender].push(onePiece);
  }

  function updateTokens(uint256[] memory tokenIDs, string[] memory tokenURIs)
    public
    onlyOwner
  {
    require(!paused, "Contract is paused!");
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
  
  function getPaused()
    public
    view
    returns(bool)
  {
    return paused;
  }
  
  function setPaused(bool value)
    public
    onlyOwner
  {
    require(value != paused);
    paused = value;
  }
  
  function getPrice()
    public
    view
    returns(uint256)
  {
    return price;
  }
  
  function setPrice(uint256 _price)
    public
    onlyOwner
  {
    price = _price;
  }
  
  function getPuzzleBaseUri()
    public
    view
    returns(string memory)
  {
    return puzzleBaseURI;
  }
  
  function setPuzzleBaseUri(string memory uri)
    public
    onlyOwner
  {
    puzzleBaseURI = uri;
  }
  
  function getSolvedBaseUri()
    public
    view
    returns(string memory)
  {
    return solvedBaseURI;
  }
  
  function setSolvedBaseUri(string memory uri)
    public
    onlyOwner
  {
    solvedBaseURI = uri;
  }
}