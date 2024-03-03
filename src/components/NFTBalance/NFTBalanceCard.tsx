import { formatContent } from "@/utils/formatContent";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
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

function NFTBalanceCard({ subscription }: Props) {
  const [priceInUSD, setPriceInUSD] = useState<Number>();
  async function getUSDConversion() {
    const res = await axios.get("https://api.coinbase.com/v2/exchange-rates");
    const price = 1 / res.data.data.rates.MATIC.slice(0, 3);

    setPriceInUSD(price);
  }
  useEffect(() => {
    getUSDConversion();
  }, []);
  const { title, symbol, image, price, benifits, NFTAddress } = subscription;
  return (
    <>
      <div className="card w-64 bg-base-100 shadow-xl">
        <figure>
          {image ? (
            <img src={image} alt="nft" width={300} height={200} />
          ) : (
            <img
              src="https://www.thestreet.com/.image/t_share/MTgyMDU5NDcwMTc4NzU1NzE1/boredape1.jpg"
              alt="nft"
              width={300}
              height={400}
            />
          )}
        </figure>
        <div className="card-body">
          <div>
            <h2 className="card-title text-gray-300 mb-1">{title}</h2>
            <div className="flex flex-row justify-between">
              <span className="badge badge-outline badge-accent">{symbol}</span>
              <div className="flex flex-col gap-y-1">
                <div className="badge badge-neutral">{price}matic</div>
                <div className="badge badge-neutral">
                  ${((priceInUSD as number) * Number(price))?.toFixed(5)}
                </div>
              </div>
            </div>
          </div>

          <p>{formatContent(benifits[0])}</p>
          <div className="card-actions justify-end">
            <Link
              href={`/creator/${subscription._id}`}
              className="btn btn-primary"
            >
              More details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NFTBalanceCard;
