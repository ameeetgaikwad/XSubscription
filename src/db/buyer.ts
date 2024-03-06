import mongoose from "mongoose";
mongoose.connect(process.env.NEXT_PUBLIC_MONGODB as string);

const buyerSchema = new mongoose.Schema({
  BuyerAddress: { type: String, required: true, unique: true },
  purchasedSubscriptions: [
    { type: mongoose.Types.ObjectId, ref: "Subscription" },
  ],
});

export default mongoose.models.Buyer || mongoose.model("Buyer", buyerSchema);
