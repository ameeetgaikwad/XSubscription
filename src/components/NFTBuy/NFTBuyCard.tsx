import { formatContent } from "@/utils/formatContent";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMbWallet } from "@mintbase-js/react";
// import { execute, mint, buy } from "@mintbase-js/sdk";
type Props = {
  subscription: {
    NFTAddress: string;
    title: string;
    symbol: string;
    image: string;
    price: string;
    benifits: string[];
    _id: string;
  };
};

function NFTBuyCard({ subscription }: Props) {
  useEffect(() => {}, []);
  const { activeAccountId: account, isConnected, selector } = useMbWallet();
  const { title, symbol, image, price, benifits, NFTAddress } = subscription;

  async function buySubscription() {
    setLoading(true);
    try {
      const wallet = await selector.wallet();
      // const mintNFT = await execute(
      //   { wallet },
      //   mint({
      //     contractAddress: "bclkj.mintspace2.testnet",
      //     metadata: { reference: subscription.image },
      //     ownerId: account as string,
      //   })
      // );
      setTimeout(async () => {
        await axios.post("/api/buyer/buySubscription", {
          address: account,
          id: subscription._id,
        });
        setLoading(false);
        setSuccess(true);
      }, 2000);
    } catch (e) {
      console.log("error at NFTBuyCard.tsx", e);
      setLoading(false);
      setError(true);
    }
  }
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [success, error, account]);
  return (
    <>
      <div className="card w-64 bg-base-100 shadow-xl">
        <figure>
          <Link href={`/creator/${subscription._id}`}>
            {image ? (
              <img src={image} alt="nft" width={300} height={200} />
            ) : (
              <img
                src="https://www.thestreet.com/.image/t_share/MTgyMDU5NDcwMTc4NzU1NzE1/boredape1.jpg"
                alt="nft"
                width={300}
                height={200}
              />
            )}
          </Link>
        </figure>
        <div className="card-body flex flex-col justify-between">
          <Link href={`/creator/${subscription._id}`}>
            <div>
              <h2 className="card-title text-gray-300 mb-1">{title}</h2>
              <div className="flex flex-row justify-between">
                <span className="badge badge-outline badge-accent">
                  {symbol}
                </span>
                <div className="flex flex-col gap-y-1">
                  <div className="badge badge-neutral">{price} Near</div>
                </div>
              </div>
            </div>

            <p>{formatContent(benifits[0])}</p>
          </Link>
          <div className="card-actions justify-end">
            <button onClick={buySubscription} className="btn btn-primary">
              Buy Subscription
            </button>
          </div>
        </div>
      </div>
      <div className=" top-5 w-full fixed">
        {loading && (
          <div className="flex flex-row justify-center">
            <div
              role="alert"
              className="alert alert-warning absolute top-5 w-[40%] "
            >
              <span className="loading loading-ring loading-lg"></span>
              <span>Buying your Subscription!</span>
            </div>
          </div>
        )}
        {success && (
          <div className="flex flex-row justify-center ">
            <div
              role="alert"
              className="alert alert-success absolute top-5 w-[40%]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Your Subscription has been purchased</span>
            </div>
          </div>
        )}
        {error && (
          <div className="flex flex-row justify-center ">
            <div
              role="alert"
              className="alert alert-error absolute top-5 w-[40%]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Oops! High network congestion.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NFTBuyCard;
