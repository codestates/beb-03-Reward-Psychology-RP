// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

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

contract rpToken is ERC20, OwnerHelper {
    constructor() ERC20("RP Token", "RPT") {
        _mint(msg.sender, 1000000000000e18);
    }
}

