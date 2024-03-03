import Layout from "@/components/Layout/Layout";
import BuyerNFTList from "@/views/Buyer/components/BuyerNFTList";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function MyMembership() {
  const { address: account, isConnected } = useAccount();
  const [display, setDisplay] = useState(false);
  const [subscriptions, setSubscriptions] = useState();
  async function fetchBuyerSubscription() {
    try {
      const res = await axios.get("/api/buyer/subscription", {
        params: {
          address: account,
        },
      });
      setSubscriptions(res.data.subscriptions);
    } catch (e) {
      console.log("Error at MyCreator.tsx", e);
    }
  }

  useEffect(() => {
    fetchBuyerSubscription();
    if (isConnected) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [isConnected, account]);
  return (
    <>
      <Head>
        <title>My Memberships</title>
      </Head>
      <Layout>
        {display ? (
          <BuyerNFTList subscriptions={subscriptions} />
        ) : (
          <ConnectButton />
        )}
      </Layout>
    </>
  );
}

export default MyMembership;
