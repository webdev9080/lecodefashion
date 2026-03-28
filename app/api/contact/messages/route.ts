// app/api/contact/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function GET(req: NextRequest) {
  await connectMongo();

  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }); // les plus récents en premier
    return NextResponse.json({ messages });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}