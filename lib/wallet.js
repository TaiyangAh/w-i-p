import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect, createContext } from "react";

export const WalletContext = createContext();

const Wallet = function ({ children }) {
  const exp = {
    accounts: [],
    isConnected: false,
  };

  return (
    <WalletContext.Provider value={exp}>{children}</WalletContext.Provider>
  );
};

export default Wallet;
