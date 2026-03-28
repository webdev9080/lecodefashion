// app/api/contact/messages/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 🔥 important
) {
  await connectMongo();

  try {
    const { id } = await context.params; // ✅ FIX ICI

    await ContactMessage.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Erreur suppression" },
      { status: 500 }
    );
  }
}