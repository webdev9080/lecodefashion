import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Product from "@/models/Products";
import fs from "fs";
import path from "path";

export async function GET() {
  await connectMongo();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectMongo();

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "Image manquante" }, { status: 400 });
    }

    // 📁 Dossier upload
    const uploadDir = path.join(process.cwd(), "public/images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 📸 Convertir File → Buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 📄 Nom fichier unique
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(uploadDir, fileName);

    // 💾 Sauvegarde fichier
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/images/${fileName}`;

    // 💾 Sauvegarde Mongo
    const product = new Product({
      name,
      price,
      category,
      image: imageUrl,
      link: "#",
    });

    await product.save();

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}