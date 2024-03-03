import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://ameeetgaikwad:rRqiBCBHlqI1LAde@cryptopayindia.wsredxt.mongodb.net/BlockBox"
);
const creatorSchema = new mongoose.Schema({
  creatorAddress: { type: String, required: true, unique: true },
  createdSubscriptions: [
    { type: mongoose.Types.ObjectId, ref: "Subscription" },
  ],
});

export default mongoose.models.Creator ||
  mongoose.model("Creator", creatorSchema);
