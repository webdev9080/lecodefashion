import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";
import { admin } from "@/lib/firebase-admin";

// Modèle Token
const Token =
  mongoose.models.Token ||
  mongoose.model("Token", new mongoose.Schema({ token: String }));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    await connectMongo();

    const { title, body } = req.body;

    // 🔹 Récupérer les tokens
    const tokensFromDB = await Token.find();
    const tokens = tokensFromDB.map((t: any) => t.token);

    if (!tokens.length) {
      return res.status(400).json({ message: "Aucun token disponible" });
    }

    // 🔥 Envoi notifications (méthode FIX)
    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title, body },
    });

    // 🔥 Supprimer tokens invalides
    const invalidTokens: string[] = [];

    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        const errorCode = resp.error?.code;

        if (
          errorCode === "messaging/invalid-registration-token" ||
          errorCode === "messaging/registration-token-not-registered"
        ) {
          invalidTokens.push(tokens[idx]);
        }
      }
    });

    if (invalidTokens.length > 0) {
      await Token.deleteMany({ token: { $in: invalidTokens } });
      console.log("Tokens supprimés :", invalidTokens.length);
    }

    console.log(
      "Notifications envoyées:",
      response.successCount,
      "succès,",
      response.failureCount,
      "échecs"
    );

    return res.status(200).json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
    });
  } catch (error: any) {
    console.error("Erreur envoi notifications :", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}