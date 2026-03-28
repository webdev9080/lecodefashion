"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import UserAvatar from "./UserAvatar";
import LogoutButton from "./LogoutButton";
import { useUser } from "@/context/UserProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const { user, loading } = useUser();

  // Détection scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Boutique", href: "/shop" },
    { name: "Contact", href: "/contact" },
    // Dashboard ajouté seulement si admin
    ...(user && user.role === "admin" ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">

          {/* MENU MOBILE */}
          <button
            className={`md:hidden text-2xl ${scrolled ? "text-black" : "text-white"}`}
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/images/logo2.png"
                alt="Lecodefashion logo"
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <span className={`text-lg font-bold ${scrolled ? "text-black" : "text-black"}`}>
              Lecodefashion
            </span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  pathname === link.href ? "font-semibold" : ""
                } ${scrolled ? "text-black" : "text-black"} hover:opacity-70`}
              >
                {link.name}
              </Link>
            ))}

            {!loading && (
              user ? (
                <>
                  <UserAvatar size={40} showName className="mx-auto" />
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`font-medium ${scrolled ? "text-black" : "text-white"}`}
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </nav>
        </div>
      </header>

      {/* SIDEBAR GLASSMORPHISM */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300
        backdrop-blur-xl bg-white/20 border-r border-white/30 shadow-xl
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER SIDEBAR */}
        <div className="p-4 flex justify-between items-center border-b border-white/30">
          <h2 className="font-bold text-black">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-black text-2xl">
            ✕
          </button>
        </div>

        {/* NAV MOBILE */}
        <nav className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`transition ${
                pathname === link.href
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white`}
            >
              {link.name}
            </Link>
          ))}

          {!loading && (
            user ? (
              <>
                <UserAvatar size={50} showName className="mx-auto" />
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="bg-white/20 text-white px-3 py-1 rounded backdrop-blur-md border border-white/30 hover:bg-white/30 transition font-medium text-center"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </nav>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}