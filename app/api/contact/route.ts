
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req: NextRequest) {
  await connectMongo();

  try {
    const body = await req.json();
    const { name, email, phone, message, subject } = body;

    // Validation simple
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Création du message dans la DB
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || "",
      subject: subject || "",
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (err) {
    console.error("Erreur POST contact:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}