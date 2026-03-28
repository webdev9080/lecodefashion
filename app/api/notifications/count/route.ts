// app/api/notifications/count/route.ts
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET() {
  await connectMongo();
  const count = await Notification.countDocuments();
  return NextResponse.json({ count });
}