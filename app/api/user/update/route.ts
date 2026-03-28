import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import fs from "fs";
import path from "path";

connectMongo();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const avatarFile = formData.get("avatar") as File | null;

    if (name) user.username = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // ✅ Gestion de l’avatar
    if (avatarFile && avatarFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${avatarFile.name}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      user.avatar = `/uploads/${fileName}`;
    }

    await user.save();

    const userSafe = user.toObject();
    delete userSafe.password;

    return NextResponse.json(userSafe, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}