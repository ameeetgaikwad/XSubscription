import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://ameeetgaikwad:rRqiBCBHlqI1LAde@cryptopayindia.wsredxt.mongodb.net/BlockBox"
);

const buyerSchema = new mongoose.Schema({
  BuyerAddress: { type: String, required: true, unique: true },
  purchasedSubscriptions: [
    { type: mongoose.Types.ObjectId, ref: "Subscription" },
  ],
});

export default mongoose.models.Buyer || mongoose.model("Buyer", buyerSchema);
