import { NextApiRequest, NextApiResponse } from "next";
import Subscription from "@/db/subscription";
import Buyer from "@/db/buyer";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { address } = req.query;
    await Subscription.find({});
    const buyer = await Buyer.findOne({ BuyerAddress: address }).populate(
      "purchasedSubscriptions"
    );
    if (!buyer) {
      res.status(200).json({ subscriptions: [] });
    } else {
      res.status(200).json({ subscriptions: buyer.purchasedSubscriptions });
    }
  }
}
