import Layout from "@/components/Layout/Layout";
import NFTBalanceCard from "@/components/NFTBalance/NFTBalanceCard";
import NFTBuyCard from "@/components/NFTBuy/NFTBuyCard";
import Search from "@/components/Search/Search";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type subscriptionType = {
  NFTAddress: string;
  title: string;
  symbol: string;
  image: string;
  price: string;
  benifits: string[];
  _id: string;
};

function MyBuyer() {
  const { address: account, isConnected } = useAccount();
  const [display, setDisplay] = useState(false);
  const [subscriptions, setSubscriptions] = useState<subscriptionType[]>();
  async function fetchAllSubscriptions() {
    try {
      const res = await axios.get("/api/subscription/subscription");
      setSubscriptions(res.data.subscriptions);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (isConnected) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
    fetchAllSubscriptions();
  }, [isConnected, account]);
  return (
    <Layout>
      {display ? (
        <div>
          <Link
            className="btn btn-outline absolute right-6 mt-8"
            onClick={() => {}}
            href={"/buyer/my-memberships"}
          >
            My Memberships
          </Link>
          <div className="mt-40 sm:mt-20">
            <div className="flex flex-row justify-center">
              <p className="text-xl font-bold">Explore Memberships</p>
            </div>
            <div className="mt-8 flex flex-row justify-center">
              <Search setSubscriptions={setSubscriptions} />
            </div>
            <div className="">
              <div className="my-24 flex flex-row gap-x-3 gap-y-3 flex-wrap justify-center pl-8">
                {subscriptions?.map((subscription, _id) => {
                  return <NFTBuyCard key={_id} subscription={subscription} />;
                })}
              </div>
            </div>
            {subscriptions === undefined ? (
              <span className="loading loading-ring loading-lg text-white flex flex-row justify-center mx-auto"></span>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center pt-8">
          <ConnectButton />
        </div>
      )}
    </Layout>
  );
}
export default MyBuyer;
