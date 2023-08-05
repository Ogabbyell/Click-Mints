// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BunnyNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // state variables

    uint256 public cost = 0.001 ether;
    uint256 public maxSupply = 30;
    uint256 public maxMintAmount = 1;


    constructor() ERC721("BunnyNFT", "BNY") {
        // Initialize the tokenIdCounter to start at 1
         _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmayQydPTKS6CuTCTRSgJBk8N5UvZEnpnUFdA4ff5bkjrk/";
    }

    function safeMint() public payable {
        uint256 supply = totalSupply();

        require(balanceOf(msg.sender) == 0, "Each address may only own one ClickMintsNFT");
	    require (msg.value >= cost, "Transaction value did not equal the mint price!");
        require(supply < maxSupply, "Max supply reached");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    //all this is coming from Ownable
    function withdrawPayments() public onlyOwner {
      	payable(owner()).transfer(address(this).balance);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_exists(tokenId), "Token doesn't exists");
        return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), '.json'));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}