import mongoose from "mongoose";
mongoose.connect(process.env.NEXT_PUBLIC_MONGODB as string);
const creatorSchema = new mongoose.Schema({
  creatorAddress: { type: String, required: true, unique: true },
  createdSubscriptions: [
    { type: mongoose.Types.ObjectId, ref: "Subscription" },
  ],
});

export default mongoose.models.Creator ||
  mongoose.model("Creator", creatorSchema);
