import Layout from "@/components/Layout/Layout";
import BuyerNFTList from "@/views/Buyer/components/BuyerNFTList";
import NearWallet from "@/components/NearWallet/NearWallet";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useMbWallet } from "@mintbase-js/react";

function MyMembership() {
  const { activeAccountId: account, isConnected, selector } = useMbWallet();
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
        <title>My Subscriptions</title>
      </Head>
      <Layout>
        {display ? (
          <BuyerNFTList subscriptions={subscriptions} />
        ) : (
          <NearWallet />
        )}
      </Layout>
    </>
  );
}

export default MyMembership;
