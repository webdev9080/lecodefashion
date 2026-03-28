import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Product from "@/models/Products";
import { v2 as cloudinary } from "cloudinary";

// 🔑 Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ✅ GET tous les produits
export async function GET() {
  await connectMongo();

  const products = await Product.find().sort({ createdAt: -1 });

  return NextResponse.json(products);
}

// ✅ POST créer produit
export async function POST(req: Request) {
  await connectMongo();

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    if (!image || image.size === 0) {
      return NextResponse.json(
        { error: "Image obligatoire" },
        { status: 400 }
      );
    }

    // 🔥 Convertir image → buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🔥 Upload Cloudinary
    const uploaded = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "lecodefashion",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as any);
        }
      );

      stream.end(buffer);
    });

    // 💾 Sauvegarde MongoDB
    const product = await Product.create({
      name,
      price,
      category,
      image: uploaded.secure_url,
      cloudinary_id: uploaded.public_id, // 🔥 important pour delete
    });

    return NextResponse.json(product);

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}