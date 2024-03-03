import { NextApiRequest, NextApiResponse } from "next";
import Subscription from "@/db/subscription";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const subscription = await Subscription.find();
    if (!subscription) {
      res.status(200).json({ subscriptions: [] });
    } else {
      res.status(200).json({ subscriptions: subscription });
    }
  }
}
