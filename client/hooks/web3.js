import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        137: "https://polygon-mainnet.g.alchemy.com/v2/xMPWnDnfTd0VRrjfe8FLZvXz-M_l5fnV",
        80001:
          "https://polygon-mumbai.g.alchemy.com/v2/nHLIrYl6PMIXygat2AA9bT0fO1B6atyN",
        10: "https://opt-mainnet.g.alchemy.com/v2/zNtU_t4oqqPUJ-X9hLYh_NVY6vL7YR88",
        69: "https://opt-kovan.g.alchemy.com/v2/hgwUXoiHCEtfEIoqpBg1WdQl9oRUngBS",
        344435: "https://amsterdam.skalenodes.com/v1/handsome-sadr",
      },
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "zk-maia", // Required
      rpc: "https://polygon-mumbai.g.alchemy.com/v2/nHLIrYl6PMIXygat2AA9bT0fO1B6atyN", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 80001, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
};

const web3Modal = new Web3Modal({
  network: "polygon-mumbai",
  cacheProvider: false,
  providerOptions,
});

export function useWeb3Modal() {
  const [provider, setProvider] = useState(undefined);
  const [error, setError] = useState(null);

  // Automatically connect if the provider is cashed but has not yet
  // been set (e.g. page refresh)
  if (web3Modal.cachedProvider && !provider) {
    connectWallet();
  }

  async function connectWallet() {
    try {
      const externalProvider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(
        externalProvider
      );

      console.log(externalProvider);
      console.log(ethersProvider);
      setProvider(ethersProvider);
    } catch (e) {
      setError("NO_WALLET_CONNECTED");
      console.log("NO_WALLET_CONNECTED", e);
    }
  }

  function disconnectWallet() {
    web3Modal.clearCachedProvider();
    setProvider(undefined);
  }

  return { connectWallet, disconnectWallet, provider, error };
}
