"use client";

import { useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "@/lib/firebase";

export default function usePushNotifications() {
  useEffect(() => {
    const init = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          console.log("❌ Permission refusée");
          return;
        }

        const messaging = getMessaging(app);

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        });

        console.log("🔥 TOKEN:", token);

        // 🔥 ENVOI AU BACKEND
        await fetch("/api/save-token", {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: {
            "Content-Type": "application/json",
          },
        });

      } catch (error) {
        console.error("Erreur notification:", error);
      }
    };

    init();
  }, []);
}