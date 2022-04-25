// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract OwnerHelper {
  	address private _owner;

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
 * rpToken v 1.1
 */
contract rpToken is ERC20, OwnerHelper {
    constructor() ERC20("RP Token", "RPT") {
        _mint(msg.sender, 1000000000000e18);
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
}

