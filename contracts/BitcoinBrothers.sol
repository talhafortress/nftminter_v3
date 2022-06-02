// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// ############                      ################                             ###########                      #####################
// ############                           ###########                             ###########                           ################
// ############         ##########        ###########                             ###########         ##########        ################
// ############         ##########        ###########                             ###########         ##########        ################
// ############         ##########        ###########                             ###########         ##########        ################
// ############         ##########        ###########         ############        ###########         ##########        ################
// ############         ##########        ###########         ############        ###########         ##########        ################
// ############         ##########        ###########         ############        ###########         ##########        ################
// ############                           ###########         ###############################                           ################
// ############                           ###########         ###############################                           ################
// ############                     #################         ###############################                      #####################
// ############               #######################         ###############################                 ##########################
// ############         #############################         ###############################           ################################
// ############               #######################         ###############################                 ##########################
// ############                     #################         ###############################                      #####################
// ############                           ###########         ###############################                           ################
// ############                           ###########         ############        ###########                           ################
// ############         ##########        ###########         ############        ###########         ###########       ################
// ############         ##########        ###########         ############        ###########         ###########       ################
// ############         ##########        ###########                             ###########         ###########       ################
// ############         ##########        ###########                             ###########         ###########       ################
// ############         ##########        ###########                             ###########         ###########       ################
// ############                           ###########                             ###########                           ################
// ############                      ################                             ###########                      #####################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################

// BitcoinBrothers (https://twitter.com/PlebSquat) 



// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BitcoinBrothers is ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bool public isAllowListActive = false;
    
    uint256 public constant PRICE_PER_TOKEN = 0.0001 ether;

    constructor() ERC721("BitcoinBrothers", "BCB") {}

    uint256 public constant maxSupply = 10000;

    //white list
    mapping(address => uint8) private _allowList;


    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        require(totalSupply() < maxSupply);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
    }

    function setIsAllowListActive(bool _isAllowListActive) external onlyOwner {
        isAllowListActive = _isAllowListActive;
    }

    function setAllowList(address[] calldata addresses, uint8 numAllowedToMint) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            _allowList[addresses[i]] = numAllowedToMint;
        }
    }

    function numAvailableToMint(address addr) external view returns (uint8) {
        return _allowList[addr];
    }

    function mintAllowList(uint8 numberOfTokens) external payable {
        uint256 ts = totalSupply();
        require(isAllowListActive, "Allow list is not active");
        require(numberOfTokens <= _allowList[msg.sender], "Exceeded max available to purchase");
        require(ts + numberOfTokens <= maxSupply, "Purchase would exceed max tokens");
        require(PRICE_PER_TOKEN * numberOfTokens <= msg.value, "Ether value sent is not correct");

        _allowList[msg.sender] -= numberOfTokens;
        for (uint256 i = 0; i < numberOfTokens; i++) {
            _safeMint(msg.sender, ts + i);
        }
    }
    function renounceOwnership() public override onlyOwner {
        revert("can't renounceOwnership here"); //not possible with this smart contract
    }
}