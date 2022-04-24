//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "hardhat/console.sol";

import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/ERC20.sol";

// Aave Contracts Interfaces
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolDataProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProviderRegistry.sol";
import "@aave/periphery-v3/contracts/misc/interfaces/IWETHGateway.sol";
import "@aave/core-v3/contracts/misc/AaveProtocolDataProvider.sol";

// Token Interfaces
import "@aave/periphery-v3/contracts/misc/interfaces/IWETH.sol";
import "@aave/core-v3/contracts/interfaces/IAToken.sol";

contract ZkMaiaPolygon is ERC20 {
    IPoolAddressesProvider provider;
    IPoolAddressesProviderRegistry IPAPRegistry;
    IWETHGateway WETHGateway;
    IPool lendingPool;
    address poolAddr = 0x5343b5bA672Ae99d627A1C87866b8E53F47Db2E6;
    address wethGatewayAddr = 0x2a58E9bbb5434FdA7FF78051a4B82cb0EF669C17;

    address payable owner;

    mapping(address => uint256) balances;

    // Aave Tokens
    /// address =   WETH-AToken-Polygon
    address ATokenAddress = 0x685bF4eab23993E94b4CFb9383599c926B66cF57;

    constructor() ERC20("ZKM", "ZKM") {
        // Retrieve Polygon Testnet LendingPool address
        // for other addresses: https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
        provider = IPoolAddressesProvider(poolAddr);

        // Get provider lending pool
        lendingPool = IPool(provider.getPool());

        IPAPRegistry = IPoolAddressesProviderRegistry(
            0xE0987FC9EDfcdcA3CB9618510AaF1D565f4960A6
        );
        WETHGateway = IWETHGateway(wethGatewayAddr);
    }

    function EnterTerabithia() public payable {
        uint256 amount = msg.value;

        // compute share of pool in ETH
        uint256 totalABal = IAToken(ATokenAddress).balanceOf(address(this));
        uint256 localTotal = totalSupply();
        uint256 share = ((localTotal * (totalABal + amount)) / totalABal) -
            localTotal;

        // deposit ETH
        DepositToLendingPool(amount);

        // mint SHARE
        _mint(msg.sender, share);
    }

    function ExitTerabithia(address to) public {
        // get original amount put in + interest earned
        uint256 share = balances[msg.sender];
        _burn(msg.sender, share);

        AaveProtocolDataProvider dataProvider = AaveProtocolDataProvider(
            provider.getPoolDataProvider()
        );
        (uint256 poolBal, , , , , , , , ) = dataProvider.getUserReserveData(
            ATokenAddress,
            address(this)
        );
        uint256 amount = (share * poolBal) / totalSupply();
        WithdrawFromLendingPool(amount, address(this));
        transferFrom(address(this), to, amount);
        // to.transfer(amount);
    }

    function DepositToLendingPool(uint256 amount) private {
        // After deposit msg.sender receives the aToken
        IWETHGateway(wethGatewayAddr).depositETH{value: amount}(
            poolAddr,
            address(this),
            0
        );
    }

    function WithdrawFromLendingPool(uint256 amount, address to) private {
        // calling contract should have enough credit limit
        IAToken(ATokenAddress).approve(wethGatewayAddr, amount);

        // Withdrawn amount will be send to to address
        IWETHGateway(wethGatewayAddr).withdrawETH(poolAddr, amount, to);
    }
}
