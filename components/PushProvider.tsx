"use client";

import usePushNotifications from "@/hooks/usePushNotifications";

export default function PushProvider() {
  usePushNotifications();
  return null;
}