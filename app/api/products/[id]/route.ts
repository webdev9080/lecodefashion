import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Product from "@/models/Products";
import fs from "fs";
import path from "path"; // ✅ AJOUT ICI

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectMongo();

  const { id } = await context.params; // ✅ IMPORTANT

  try {
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

//Partie Fonction DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectMongo();
  const { id } = await context.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // 🗑️ Supprimer image
    if (product.image) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        product.image.replace(/^\/+/, "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Produit supprimé" });
  } catch (error) {
    console.error("DELETE ERROR:", error); // 🔥 IMPORTANT
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}


//Partie Fonction PUT pour modifier

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ CORRIGÉ
) {
  await connectMongo();

  const { id } = await context.params; // ✅ CORRIGÉ

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const image = formData.get("image") as File | null;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // 🖼️ Upload nouvelle image
    if (image && image.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/images");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name}`;

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // 🗑️ Supprimer ancienne image
      if (product.image) {
        const oldPath = path.join(
          process.cwd(),
          "public",
          product.image.replace(/^\/+/, "")
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      product.image = `/images/${fileName}`;
    }

    product.name = name;
    product.price = price;
    product.category = category;

    await product.save();

    return NextResponse.json(product);

  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}