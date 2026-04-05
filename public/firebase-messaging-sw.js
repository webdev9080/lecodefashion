importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDdwfAyDDebXQU5pFtNenOciQRVVEt5Y5k",
  authDomain: "lecodefashion.firebaseapp.com",
  projectId: "lecodefashion",
  messagingSenderId: "35584389378",
  appId: "1:35584389378:web:c3ab1922b960a27c30521b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/images/icon.png",
  });
});