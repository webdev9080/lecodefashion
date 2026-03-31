import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import connectMongo from "@/lib/mongodb";
import Product from "@/models/Products";
import User from "@/models/User"; // 🔥 importer le modèle User

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: NextRequest) {
  await connectMongo();

  try {
    const { message, userId } = await req.json();

    // 🔥 récupérer l'utilisateur
    const user = await User.findById(userId);
    const userName = user?.username || "Client";

    // 🔥 récupérer produits
    const products = await Product.find().limit(10);
    const context = products
      .map((p) => `${p.name} - ${p.price} FCFA - ${p.category}`)
      .join("\n");

    // 🧠 prompt intelligent
    const systemPrompt = `
Tu es un assistant de vente pour Lecodefashion (boutique de prêt-à-porter à Lomé).

Objectifs :
- Aider ${userName} à choisir un produit
- Répondre de manière courte, persuasive et naturelle
- Proposer des produits adaptés
- Rediriger vers WhatsApp : https://wa.me/22890805252

Produits disponibles :
${context}
`;

    const completion = await openai.chat.completions.create({
      model: "qwen/qwen3.6-plus-preview:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Une erreur est survenue.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("OPENROUTER ERROR:", error);
    return NextResponse.json({ reply: "Erreur serveur" }, { status: 500 });
  }
}