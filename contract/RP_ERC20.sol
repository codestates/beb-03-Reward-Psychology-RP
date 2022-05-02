// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// for import
contract RPNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("RPNFT", "RPNFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        onlyOwner
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}



abstract contract OwnerHelper {
  	address internal _owner;


  	event OwnershipTransferred(address indexed preOwner, address indexed nextOwner);

  	modifier onlyOwner {
		require(msg.sender == _owner, "OwnerHelper: caller is not owner");
		_;
  	}

  	constructor() {
            _owner = msg.sender;
  	}

    function owner() public view virtual returns (address) {
        return _owner;
    }

  	function transferOwnership(address newOwner) onlyOwner public {
            require(newOwner != _owner);
            require(newOwner != address(0x0));
            address preOwner = _owner;
    	    _owner = newOwner;
    	    emit OwnershipTransferred(preOwner, newOwner);
  	}
}

/**
 * RPToken v 2.1
 */
contract RPToken is ERC20, OwnerHelper {
    
    struct Product {
        uint256 price;
        string tokenURI;
    }

    mapping(uint => Product) products;
    uint productCount = 0;
    address private _nftAddress;

    constructor() public ERC20("RP Token", "RPT") {
        _mint(msg.sender, 1000000000000e18);

        products[0] = Product({
            price: 10e18,
            tokenURI: "https://gateway.pinata.cloud/ipfs/QmPLbNWD63A9ADPHu5zr2sHFqUGXbLy6AAW7rjMYTpTW9Q"
        });
        products[1] = Product({
            price: 200e18,
            tokenURI: "https://gateway.pinata.cloud/ipfs/QmNuqsikNYbdodvGRfqRW4xv4T13Y9qfVsjaXV5keezZCC"
        });
        products[2] = Product({
            price: 1000e18,
            tokenURI: "https://gateway.pinata.cloud/ipfs/QmTnRuLa1hg2VGz7LwP2BEFwEXnuDe2KpFP84pN1Wnj6Dx"
        });
        productCount = 3;

    }

    function mintToken(address to, uint256 amount) public onlyOwner returns (bool){
        require(to != address(0x0));
        require(amount > 0);
        _mint(to, amount);
        _approve(to, msg.sender, allowance(to, msg.sender) + amount);

        return true;
    }

    /**
     * 여러개 민팅
     */
    function multiMintToken(address[] calldata toArr, uint256[] calldata amountArr) public onlyOwner returns (bool){
        require(toArr.length == amountArr.length);
        for(uint256 i = 0; i < toArr.length; i++) {
            require(toArr[i] != address(0x0));
            require(amountArr[i] > 0);
            _mint(toArr[i], amountArr[i]);
            _approve(toArr[i], msg.sender, allowance(toArr[i], msg.sender) + amountArr[i]);
        }
	    return true;
    }

    /**
     * setNFTAddress 권한 얻은 후 실행
     */
    function setNFTAddress(address nftAddress) public {
        _nftAddress = nftAddress;
    }

    /**
     * NFTAddress 확인
     */
    function getNFTAddress() view public returns (address) {
        return _nftAddress;
    }

    /**
     * productNum 에 해당하는 NFT 구매(민팅)
     */
    function buyNFT(uint productNum) public returns(bool) {
        // 토큰 송금
        require(_nftAddress != address(0x0), "rpToken: please set NFT contract address");
        require(productNum < productCount, "rpToken: product is not exist");
        require(balanceOf(msg.sender) >= products[productNum].price, "rpToken: not enough RP Token");
        transfer(_owner, products[productNum].price);

        // NFT 민팅
        RPNFT(_nftAddress).mintNFT(msg.sender, products[productNum].tokenURI);
        return true;
    }

    function productInfo(uint productNum) view public returns(uint256, string memory) {
        return (products[productNum].price, products[productNum].tokenURI );
    }
}


