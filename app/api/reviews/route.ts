import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Review from "@/models/Review";

// 🔥 GET (récupérer avis d’un produit)
export async function GET(req: Request) {
  await connectMongo();
  
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

  return NextResponse.json(reviews);
}

// 🔥 POST (ajouter avis)
export async function POST(req: Request) {
  await connectMongo();

  const body = await req.json();

  const review = await Review.create({
    ...body,
    createdAt: new Date(),
  });

  return NextResponse.json(review);
}