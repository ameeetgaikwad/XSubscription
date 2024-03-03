import { NextApiRequest, NextApiResponse } from "next";
import Subscription from "@/db/subscription";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { reg } = req.query;
    if (reg) {
      const subscription = await Subscription.find({
        $or: [
          {
            title: { $regex: new RegExp(reg.toString(), "i") },
          },
          {
            benifits: { $regex: new RegExp(reg.toString(), "i") },
          },
          {
            symbol: { $regex: new RegExp(reg.toString(), "i") },
          },
        ],
      });
      if (!subscription) {
        res.status(200).json({ subscriptions: [] });
      } else {
        res.status(200).json({ subscriptions: subscription });
      }
    } else {
      res.status(200).json({ subscriptions: [] });
    }
  }
}
