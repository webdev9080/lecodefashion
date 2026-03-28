// app/api/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Notification from "@/models/Notification";


export async function POST(req: NextRequest) {
  await connectMongo();

  const body = await req.json();

  const notification = await Notification.create({
    title: body.title,
    message: body.message,
    type: body.type,
  });

  return NextResponse.json({ notification });
}

export async function GET() {
  await connectMongo();

  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(20);

  return NextResponse.json({ notifications });
}