"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  message: string;
  color: "green" | "red" | "blue";
}

interface ToastContextType {
  showToast: (message: string, color?: Toast["color"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, color: Toast["color"] = "blue") => {
    setToast({ message, color });

    setTimeout(() => {
      setToast(null);
    }, 3000); // durée 3s
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* 🔥 UI du toast */}
      {toast && (
        <div
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-lg text-white z-50
            ${toast.color === "green" && "bg-green-500"}
            ${toast.color === "red" && "bg-red-500"}
            ${toast.color === "blue" && "bg-blue-500"}
          `}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast doit être utilisé dans ToastProvider");
  return context;
}