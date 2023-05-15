// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";




contract GameItem is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // set contract name and ticker. 
    constructor() ERC721("Contract Name", "TIC") {}

    //get the current supply of tokens
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // for opensea collection 
    function contractURI() public pure returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmfXYjFgEbRj182BKMcKuQKwn3icpyYVBXoGaL6A1MvRBr?_gl=1*1wbk4vh*rs_ga*NjM2NDI5MTg4LjE2ODQxNzA5MDk.*rs_ga_5RMPXG14TE*MTY4NDE3MDkxMC4xLjEuMTY4NDE3MzYyMi40Mi4wLjA.";
    }

    
    function mintItem(address player, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

}
