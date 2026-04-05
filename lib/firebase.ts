import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdwfAyDDebXQU5pFtNenOciQRVVEt5Y5k",
  authDomain: "lecodefashion.firebaseapp.com",
  projectId: "lecodefashion",
  storageBucket: "lecodefashion.firebasestorage.app",
  messagingSenderId: "35584389378",
  appId: "1:35584389378:web:c3ab1922b960a27c30521b",
  measurementId: "G-90ME3L053B",
};

export const app = initializeApp(firebaseConfig);