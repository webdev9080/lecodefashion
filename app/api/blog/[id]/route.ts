// app/api/blog/[id]/route.ts
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  type: String,
  category: String,
  videoUrl: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Blog =
  mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }>}
) {
  await connectMongo();
  
  const { id } = await context.params;

  try {
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ message: "Supprimé avec succès" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur suppression" },
      { status: 500 }
    );
  }
}