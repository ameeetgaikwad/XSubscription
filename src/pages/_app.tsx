"use client";
import "@/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import type { AppProps } from "next/app";

import { MintbaseWalletContextProvider } from "@mintbase-js/react";

// to be deleted
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const MintbaseWalletSetup = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  network: process.env.NEXT_PUBLIC_NETWORK,
  callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
};

// to be deleted
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "BlockBox",
  projectId: "10fec66364df55afc3a6b97da9f69235",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
          <Component {...pageProps} />
        </MintbaseWalletContextProvider>{" "}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
