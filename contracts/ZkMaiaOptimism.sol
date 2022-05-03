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

contract ZkMaiaOptimism is ERC20 {
    IPoolAddressesProvider provider;
    IPoolAddressesProviderRegistry IPAPRegistry;
    IWETHGateway WETHGateway;
    IPool lendingPool;
    address poolAddr = 0xD15d36975A0200D11B8a8964F4F267982D2a1cFe;
    address wethGatewayAddr = 0x698851Fc324Ff9572289Dd72dfC102DB778b52f1;

    address payable owner;

    mapping(address => uint256) balances;

    // Aave Tokens
    /// address =   WETH-AToken-Optimism
    // for other addresses: https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
    address ATokenAddress = 0xCb5Df0b49BCa05B2478a606074ec39e3fa181a6f;

    constructor() ERC20("ZKM", "ZKM") {
        // Retrieve Polygon Testnet LendingPool address
        // for other addresses: https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
        provider = IPoolAddressesProvider(poolAddr);

        // Get provider lending pool
        lendingPool = IPool(provider.getPool());

        IPAPRegistry = IPoolAddressesProviderRegistry(
            0x3179C833fF0035D3BD42654f3aCAE4B0908af7A7
        );
        WETHGateway = IWETHGateway(wethGatewayAddr);
    }

    function enterTerabithia() public payable {
        uint256 amount = msg.value;

        // compute share of pool in ETH
        uint256 totalABal = IAToken(ATokenAddress).balanceOf(address(this));
        uint256 localTotal = totalSupply();
        uint256 share = ((localTotal * (totalABal + amount)) / totalABal) -
            localTotal;

        // deposit ETH
        depositToLendingPool(amount);

        // mint SHARE
        _mint(msg.sender, share);
    }

    function exitTerabithia(address to) public {
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
        withdrawFromLendingPool(amount, address(this));
        transferFrom(address(this), to, amount);
        // to.transfer(amount);
    }

    function depositToLendingPool(uint256 amount) private {
        // After deposit msg.sender receives the aToken
        IWETHGateway(wethGatewayAddr).depositETH{value: amount}(
            poolAddr,
            address(this),
            0
        );
    }

    function withdrawFromLendingPool(uint256 amount, address to) private {
        // calling contract should have enough credit limit
        IAToken(ATokenAddress).approve(wethGatewayAddr, amount);

        // Withdrawn amount will be send to to address
        IWETHGateway(wethGatewayAddr).withdrawETH(poolAddr, amount, to);
    }
}
