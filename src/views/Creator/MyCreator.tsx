import Layout from "@/components/Layout/Layout";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import NearWallet from "@/components/NearWallet/NearWallet";
import { useEffect, useRef, useState } from "react";
// import { useAccount } from "wagmi";
import { useMbWallet } from "@mintbase-js/react";
import CreatorNFTList from "./components/CreatorNFTList";
import axios from "axios";
import { execute, deployContract } from "@mintbase-js/sdk";
import { ethers } from "ethers";
interface DeployContractArgs {
  name: string;
  owner: string;
  symbol: string;
}
function MyCreator() {
  const { activeAccountId: account, isConnected, selector } = useMbWallet();
  const [display, setDisplay] = useState(false);
  const modalRef = useRef(null);
  // const { writeAsync: deployContract } = useFactoryContractWrite({});

  const [title, setTitle] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [benifits, setBenifits] = useState<string[]>([]);
  const [currentBenifit, setCurrentBenifit] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [subscriptions, setSubscriptions] = useState();
  useEffect(() => {
    if (isConnected) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [isConnected, account]);

  async function fetchCreatorSubscription() {
    try {
      const res = await axios.get("/api/creator/subscription", {
        params: {
          address: account,
        },
      });
      console.log("in fetchCreatorSubscription", res);
      setSubscriptions(res.data.subscriptions);
    } catch (e) {
      console.log("Error at MyCreator.tsx", e);
    }
  }

  useEffect(() => {
    fetchCreatorSubscription();
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

  function handleBenifitChange() {
    setBenifits([...benifits, currentBenifit]);
    setCurrentBenifit("");
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      (modalRef.current as any)?.close();
      const wallet = await selector.wallet();
      console.log("wallet", wallet);
      const contractInstance = await execute(
        { wallet },
        deployContract({
          factoryContractId: "mintspace2.testnet",
          name: title,
          ownerId: account as string,
          metadata: {
            symbol: symbol,
          },
        })
      );
      await axios.post("/api/creator/createSubscription", {
        address: account,
        title,
        symbol,
        image,
        price,
        benifits,
      });
      setLoading(false);
      setSuccess(true);
      // ---
      // // @ts-ignore
      // modalRef?.current?.close();

      //   const res = await deployContract({
      //     args: [account, title, symbol, ethers.parseEther(price)],
      //   });
      //   setTimeout(async () => {
      //     console.log("entered");
      //     await axios.post("/api/creator/createSubscription", {
      //       address: account,
      //       title,
      //       symbol,
      //       image,
      //       price,
      //       benifits,
      //     });
      //     setLoading(false);
      //     setSuccess(true);
      //   }, 35000);
    } catch (e) {
      console.log("error at mycreator.tsx", e);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <Layout>
      {display ? (
        <div className="">
          <button
            className="btn btn-outline absolute right-6 mt-8"
            onClick={() => {
              // @ts-ignore
              modalRef?.current?.showModal();
            }}
          >
            Create Subscription
          </button>
          <dialog id="my_modal_2" className="modal" ref={modalRef}>
            <div className="modal-box mt-8">
              <p className="flex flex-row justify-center mb-5 text-lg font-bold">
                Enter NFT Subscription details
              </p>
              <div className="flex flex-row justify-center">
                <div className="flex flex-col gap-y-4 text-white">
                  <label>
                    Title*
                    <input
                      className="input input-bordered  w-full max-w-xs"
                      placeholder="BoredApeYachtClub"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>

                  <label>
                    Symbol*
                    <input
                      className="input input-bordered  w-full max-w-xs"
                      placeholder="BAYC"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                    />
                  </label>
                  <label>
                    Image
                    <input
                      className="input input-bordered  w-full max-w-xs"
                      placeholder="https://example.com/image.png"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </label>

                  <label>
                    Price*
                    <input
                      className="input input-bordered  w-full max-w-xs decoration-transparent"
                      placeholder="0.001 (price in ethers)"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </label>
                  <div className="flex flex-col">
                    <label>Benifits</label>
                    <input
                      className="input input-bordered  w-full max-w-xs decoration-transparent"
                      placeholder="Exclusive access to discord server"
                      value={currentBenifit}
                      onChange={(e) => setCurrentBenifit(e.target.value)}
                    />
                    <div className="flex flex-row justify-end mr-4 mt-2">
                      <button
                        onClick={handleBenifitChange}
                        className="btn w-1/2 bg-gray-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <input
                    className="input input-bordered  w-full max-w-xs cursor-pointer"
                    type="submit"
                    value="Create Subscription"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {loading && (
            <div className="flex flex-row justify-center z-10">
              <div
                role="alert"
                className="alert alert-warning absolute top-5 w-[40%] "
              >
                <span className="loading loading-ring loading-lg"></span>
                <span>Your Subscription is getting ready!</span>
              </div>
            </div>
          )}
          {success && (
            <div className="flex flex-row justify-center z-10">
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
                <span>Your Subscription has been created</span>
              </div>
            </div>
          )}
          {error && (
            <div className="flex flex-row justify-center z-10">
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
                <span>
                  Need unique <b>Title</b> for each NFT. Try: BoredMonkey
                  {Math.random() * 1000 + 1}
                </span>
              </div>
            </div>
          )}
          <CreatorNFTList subscriptions={subscriptions} />
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center pt-8">
          <NearWallet />
        </div>
      )}
    </Layout>
  );
}

export default MyCreator;
