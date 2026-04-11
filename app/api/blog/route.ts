import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String, // 🔥 AJOUT
  type: String, // "video" ou "article"
  category: String,
  videoUrl: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Blog =
  mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

// GET
export async function GET() {
  await connectMongo();
  const posts = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

// POST
export async function POST(req: NextRequest) {
  await connectMongo();

  const body = await req.json();

  const post = await Blog.create(body);

  return NextResponse.json(post);
}