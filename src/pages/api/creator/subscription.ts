import { NextApiRequest, NextApiResponse } from "next";
import Subscription from "@/db/subscription";
import Creator from "@/db/creator";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { address } = req.query;
    await Subscription.find({});
    const creator = await Creator.findOne({ creatorAddress: address }).populate(
      "createdSubscriptions"
    );
    if (!creator) {
      res.status(200).json({ subscriptions: [] });
    } else {
      res.status(200).json({ subscriptions: creator.createdSubscriptions });
    }
  }
}
