import type { NextApiRequest, NextApiResponse } from "next";
import Subscription from "@/db/subscription";
import Creator from "@/db/creator";
import { ethers } from "ethers";
import factoryABI from "@/configs/abis/Factory.json";
const contract = new ethers.Contract(
  "0x466848Cc475fbb9b922a5c95E4306f79c1B00497",
  factoryABI,
  new ethers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/mk34Kxgy5MoQ9A8iNcVthFv85yvQRIex"
  )
);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { address, title, symbol, image, price, benifits } = req.body;
    const indexOfLatestToken = await contract.numberOfTokensOfAddress(address);
    const NFTAddress = await contract.addressToTokenAddress(
      address,
      Number(indexOfLatestToken) - 1
    );
    const newSubscription = new Subscription({
      NFTAddress,
      title,
      symbol,
      image,
      price,
      benifits,
    });
    await newSubscription.save();

    const creator = await Creator.findOne({ creatorAddress: address });
    if (!creator) {
      const newCreator = new Creator({
        creatorAddress: address,
        createdSubscriptions: [newSubscription._id],
      });
      await newCreator.save();
    } else {
      creator.createdSubscriptions.push(newSubscription._id);
      await creator.save();
    }

    res.status(200).json({ message: "Subscription created successfully" });
  }
}
