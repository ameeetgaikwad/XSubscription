import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const headers = req.headers["x-api-key"];
    const result = await axios.post(
      "https://rag-chat-ml-backend-dev.flock.io/chat/conversational_rag_chat",
      body,
      { headers: { "x-api-key": headers } }
    );
    res.status(200).json({ answer: result.data.answer });
  }
}
