import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect, createContext } from "react";

export const WalletContext = createContext();

const Wallet = function ({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (accounts.length > 0) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [accounts]);

  const connect = async function () {
    setAccounts(["0xWilliam"]);
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
