//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

// Aave Contracts Interfaces
import '@aave/core-v3/contracts/interfaces/IPool.sol';
import '@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol';
import '@aave/core-v3/contracts/interfaces/IPoolAddressesProviderRegistry.sol';
import '@aave/periphery-v3/contracts/misc/interfaces/IWETHGateway.sol';

// Token Interfaces
import '@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol';
import '@aave/periphery-v3/contracts/misc/interfaces/IWETH.sol';
import '@aave/core-v3/contracts/interfaces/IAToken.sol';

contract ZkTerabithiaPolygon is ERC20, ERC20Detailed {
    IPoolAddressesProvider provider;
    IPoolAddressesProviderRegistry IPAPRegistry;
    IWETHGateway WETHGateway;
    IPool lendingPool;
    address poolAddr;
    address wethGatewayAddr;

    address payable owner;

    // ERC20 Tokens
    address public constant matic = 0x0000000000000000000000000000000000001010;
    address public constant wMatic = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;
    address public constant usdc = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public constant wEth = 0x96f3f560e9ef26a3d71da27349d2ed68f066b295;

    // Aave Tokens
    /// address =   WETH-AToken-Polygon
    IAToken public constant aToken = IAToken(0x685bF4eab23993E94b4CFb9383599c926B66cF57); 

    event LogDeposit(address tokenAddress, address depositor, uint256 amount);
    event LogWithdraw(address tokenAddress, address caller, uint256 amount);

    constructor() ERC20Detailed("ZKT", "ZKT", 18) {
      poolAddr = 0x5343b5bA672Ae99d627A1C87866b8E53F47Db2E6;
      // Retrieve Polygon Testnet LendingPool address
      // for other addresses: https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
      IPoolAddressesProvider provider = LendingPoolAddressesProvider(
          poolAddr
      );

      IPoolAddressesProviderRegistry internal constant IPAPRegistry = IPoolAddressesProviderRegistry(0xE0987FC9EDfcdcA3CB9618510AaF1D565f4960A6);
      wethGatewayAddr = 0x2a58E9bbb5434FdA7FF78051a4B82cb0EF669C17;
      IWETHGateway internal constant WETHGateway = IWETHGateway(wethGatewayAddr);

      // Get provider lending pool
      IPool lendingPool = IPool(provider.getLendingPool());

    }

    function EnterTerabithia() payable {
      uint256 amount = msg.value;

      // compute share of pool in ETH
      uint256 totalABal = IAToken(ATokenAddress).balanceOf(address(this));
      localTotal = totalSupply();
      share = (localTotal * (totalABal + amount) / totalABal) - localTotal;

      // deposit ETH
      DepositToLendingPool(amount);

      // mint SHARE
      _mint(msg.sender, share);
    }

    function ExitTerabithia(address to) {
      // get original amount put in + interest earned
      uint256 share = balances[msg.sender];
      _burn(msg.sender, share);
      amount = share * poolBal / totalSupply();
      WithdrawFromLendingPool(amount, address(this));
      to.transfer(amount);
    }

    // function deposit() external payable {
    //         require(msg.value > 0);
    //         // sender = msg.sender;
    //         // deposited = msg.value;
    //         // receiver = owner;
    //         // balance[sender] += deposited;
    //         // receiver.transfer(deposited);
    //         _mint(msg.sender, msg);
    // }

    // function withdraw(uint256 amount, address to) {
    //   // withdraw to given address
    //   require(balance[msg.sender] >= amount);
    //   balance[msg.sender] -= amount;
    //   to.transfer(amount);
    // }

    function DepositToLendingPool(uint256 amount) {
        // After deposit msg.sender receives the aToken
        IWETHGateway(wethGatewayAddr).depositETH{value: amount}(
            lendingPool,
            address(this),
            0
        );
    }

    function WithdrawFromLendingPool(uint256 amount, address to) {
        // calling contract should have enough credit limit
        IAToken(ATokenAddress).approve(wethGatewayAddr, amount);

        // Withdrawn amount will be send to to address
        IWETHGateway(wethGatewayAddr).withdrawETH(lendingPool, amount, to);
    }
}
