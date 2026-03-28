import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Product from "@/models/Products";
import { v2 as cloudinary } from "cloudinary";

// 🔑 Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET par ID
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectMongo();
  const { id } = await context.params;

  try {
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE par ID
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectMongo();
  const { id } = await context.params;

  try {
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });

    // Supprimer image sur Cloudinary
    if (product.image) {
      const publicId = product.image.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`lecodefashion/${publicId}`);
      }
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Produit supprimé" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT pour modifier un produit
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectMongo();
  const { id } = await context.params;

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const image = formData.get("image") as File | null;

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });

    if (image && image.size > 0) {
      // Convertir File → Buffer
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload sur Cloudinary
      const uploaded = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "lecodefashion" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as any);
          }
        );
        stream.end(buffer);
      });

      // Supprimer ancienne image sur Cloudinary
      if (product.image) {
        const oldPublicId = product.image.split("/").pop()?.split(".")[0];
        if (oldPublicId) await cloudinary.uploader.destroy(`lecodefashion/${oldPublicId}`);
      }

      product.image = uploaded.secure_url;
    }

    product.name = name;
    product.price = price;
    product.category = category;
    await product.save();

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}