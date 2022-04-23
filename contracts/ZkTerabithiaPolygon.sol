//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ZkTerabithiaPolygon {
  

    constructor() {}

    function deposit(
  address to,
  address asset,
  uint32 originDomain,
  uint32 destinationDomain,
  uint256 amount
) external payable {
  ERC20 token = ERC20(asset);
  token.transferFrom(msg.sender, address(this), amount);
  token.approve(address(connext), amount);

  bytes4 selector = bytes4(keccak256("deposit(address,uint256,address)"));

  bytes memory callData = abi.encodeWithSelector(
    selector,
    asset,
    amount,
    msg.sender
  );
}
