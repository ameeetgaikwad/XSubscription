import Layout from "@/components/Layout/Layout";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import NearWallet from "@/components/NearWallet/NearWallet";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
import { useMbWallet } from "@mintbase-js/react";
type subscriptionType = {
  NFTAddress: string;
  title: string;
  symbol: string;
  image: string;
  price: string;
  benifits: string[];
  _id: string;
};
function SubscriptionDetail() {
  const { activeAccountId: account, isConnected, selector } = useMbWallet();
  const router = useRouter();
  const { _id } = router.query;
  const [subscriptions, setSubscriptions] = useState<subscriptionType>();

  const [display, setDisplay] = useState(false);
  async function fetchSubscription() {
    try {
      const res = await axios.get("/api/creator/getSpecificSubscription", {
        params: {
          id: _id,
        },
      });
      console.log("in id", res);
      setSubscriptions(res.data.subscriptions);
    } catch (e) {
      console.log("Error at MyCreator.tsx", e);
    }
  }
  useEffect(() => {
    fetchSubscription();
  }, [router.query]);

  useEffect(() => {
    if (isConnected) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [isConnected, account]);
  return (
    <>
      <Head>
        <title>Membership details</title>
      </Head>
      <Layout>
        {display ? (
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-8 px-6 ">
              <div className="max-w-5xl mx-auto space-y-12">
                {subscriptions ? (
                  <div className="grid gap-8 lg:grid-cols-2">
                    {subscriptions?.image ? (
                      <img
                        src={subscriptions?.image}
                        alt="nft"
                        width={300}
                        height={200}
                      />
                    ) : (
                      <img
                        src="https://www.thestreet.com/.image/t_share/MTgyMDU5NDcwMTc4NzU1NzE1/boredape1.jpg"
                        alt="nft"
                        width={300}
                        height={400}
                      />
                    )}
                    <div className="space-y-4">
                      <h1 className="text-3xl font-bold">
                        {subscriptions?.title}
                      </h1>
                      <div className="flex flex-row justify-between">
                        <span className="badge badge-outline badge-accent">
                          {subscriptions?.symbol}
                        </span>
                        <span className="badge badge-neutral">
                          {subscriptions?.price}ether
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">
                        {subscriptions?.benifits?.map((benifit, _id) => {
                          return <p key={_id}>{benifit}</p>;
                        })}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {subscriptions === undefined ? (
                  <span className="loading loading-ring loading-lg text-white flex flex-row justify-center mx-auto"></span>
                ) : (
                  ""
                )}
              </div>
            </main>
          </div>
        ) : (
          <NearWallet />
        )}
      </Layout>
    </>
  );
}

export default SubscriptionDetail;
