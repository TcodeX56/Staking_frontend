import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo, type FC, type ReactNode } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";

export const SolanaProvider : FC<{ children: ReactNode }>= ({ children }) => {
   const network = WalletAdapterNetwork.Devnet;

  const endpoint = clusterApiUrl(network);

  // const endpoint = "http://localhost:8899";
  // console.log("http://localhost:8899");

  const endpoints = useMemo(() => endpoint, [endpoint]);

  return (
    <>
      <ConnectionProvider endpoint={endpoints}>
        <WalletProvider wallets={[]}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};
