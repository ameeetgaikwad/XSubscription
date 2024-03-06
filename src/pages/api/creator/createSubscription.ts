import type { NextApiRequest, NextApiResponse } from "next";
import Subscription from "@/db/subscription";
import Creator from "@/db/creator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { address, title, symbol, image, price, benifits } = req.body;
    const NFTAddress = title + ".mintspace2.testnet";
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
