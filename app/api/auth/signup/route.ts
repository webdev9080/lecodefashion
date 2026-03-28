import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  await connectMongo();

  try {
    const { username, email, password, role, imageUrl } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return NextResponse.json(
        { error: "Email déjà utilisé" },
        { status: 400 }
      );
    }

    // ✅ Création user (password hashé via model)
    const user = await User.create({
      username,
      email,
      password,
      role: role || "user",
      imageUrl,
    });

    // 🔐 JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔒 Clean user
    const userSafe = user.toObject();
    delete userSafe.password;

    return NextResponse.json(
      {
        user: userSafe,
        token, // 🔥 IMPORTANT
      },
      { status: 201 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}