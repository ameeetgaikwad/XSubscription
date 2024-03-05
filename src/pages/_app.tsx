"use client";
import "@/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import type { AppProps } from "next/app";

import { MintbaseWalletContextProvider } from "@mintbase-js/react";

const MintbaseWalletSetup = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  network: process.env.NEXT_PUBLIC_NETWORK,
  callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
      <Component {...pageProps} />
    </MintbaseWalletContextProvider>
  );
}
