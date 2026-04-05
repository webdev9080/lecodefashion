import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: Date.now },
});

const Token =
  mongoose.models.Token || mongoose.model("Token", TokenSchema);

export async function POST(req: Request) {
  await connectMongo();

  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 400 });
  }

  await Token.create({ token });

  return NextResponse.json({ success: true });
}