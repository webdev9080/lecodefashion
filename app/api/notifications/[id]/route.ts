// app/api/notifications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectMongo();

  const { id } = await context.params;

  await Notification.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}