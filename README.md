# ZkMaia - ETH Amsterdam

Our cross-chain DApp enables secure and private crypto transactions from Polygon to 12 other chains. Privacy is due to the combination of zero-knowledge proofs with the idea of a cryptocurrency mixer (as tornado.cash does it). It has low fees as it is built on top of an L-2 solution (Polygon). To enable privacy, the user is supposed to wait before claiming his assets back from the destination chain. Therefore, we lend the asset of the user directly to a lending protocol and keep it in our pool as the yield-bearing token returned by the lending protocol. So, the user earns yield until he requests a withdrawal. We want only fixed amounts of assets to be deposited into our pool in order for our mixing to work properly. When the user wants to deposit to our application, he pays the amount of token that corresponds to a fixed amount of yield-bearing token. As an example, if the user wants to deposit 50 aETH (which will be returned by Aave protocol when we lend ETH that is deposited by the user), and the ratio of ETH/aETH is 0.5, he needs to pay 25 ETH. When the user wants to get his money back, we withdraw the ETH from the Aave protocol and send the ETH to the recipient account, on the destination chain, both specified by the user during the withdrawal request. So the user gets his money back without revealing any connection between his two accounts on different chains and earns yield during the process.


We use tornado.cash and add two more functionalities to the application which brings about novel solutions. First, we add the yielding function to our application. This incentifies users to keep their money longer in the application adn increases the privacy level. We lend all the ETH deposited by the users to Aave Protocol and create a pool consisting of aETH tokens in our contract. This allows users to earn while they wait for their money. We use Connext to send tokens from Polygon to all other chains that Connext supports. This eliminates the need to do multiple and costly transactions when the user wants to do a private-cross-chain transaction. Our application supports Coinbase and WalletConnect.

## Run the Frontend

To get this project running:

First cd into the frontend

```
cd client
```

first run

```
npm install

// or

yarn install
```

then to get the project running with

```
npm run dev

// or

yarn run
```


## Run the Frontend