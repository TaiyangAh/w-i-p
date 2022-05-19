import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect, createContext } from "react";

export const WalletContext = createContext();

const Wallet = function ({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [web3, setWeb3] = useState(new Web3(Web3.givenProvider));

  useEffect(() => {
    if (accounts.length > 0) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [accounts]);

  useEffect(() => {
    web3.eth.getAccounts().then(setAccounts);
    web3.currentProvider.on("accountsChanged", setAccounts);
    web3.currentProvider.on("disconnected", () => setAccounts([]));
  }, [web3]);

  const connect = async function () {
    if (window) {
      const web3Modal = new Web3Modal({
        network: "ropsten",
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: "eb8ed0c993e5475f8c1b228bfb224e47", // required
            },
          },
        },
      });
      const provider = await web3Modal.connect();
      setWeb3(new Web3(provider));
    }
  };

  const exp = {
    accounts,
    connect,
    isConnected,
  };

  return (
    <WalletContext.Provider value={exp}>{children}</WalletContext.Provider>
  );
};

export default Wallet;
