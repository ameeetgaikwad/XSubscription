import type { NextApiRequest, NextApiResponse } from "next";
import Subscription from "@/db/subscription";
import Buyer from "@/db/buyer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { address, id } = req.body;
    console.log(address, id);
    const buyer = await Buyer.findOne({ BuyerAddress: address });
    if (!buyer) {
      const newCreator = new Buyer({
        BuyerAddress: address,
        purchasedSubscriptions: [id],
      });
      await newCreator.save();
    } else {
      buyer.purchasedSubscriptions.push(id);
      await buyer.save();
    }

    res.status(200).json({ message: "Subscription bought successfully" });
  }
}
