"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Lokolm", href: "https://lokolm.larnova.co", external: true },
  { name: "LAIG", href: "https://laig.larnova.co", external: true },
  { name: "Contact", href: "/contact" },
];

export default function Modal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Play the exit animation, then unmount.
  function handleClose() {
    if (closing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onClose();
      return;
    }
    setClosing(true);
    window.setTimeout(onClose, 260); // matches .menu-out duration
  }

  if (!mounted) return null;
  const target = document.getElementById("modal");
  if (!target) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 bg-white ${closing ? "menu-out" : "menu-in"}`}
    >
      <div className="flex justify-end p-5">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close menu"
          className="relative h-7 w-7 cursor-pointer"
        >
          <span className="absolute left-1.5 top-1/2 block h-0.5 w-4 -translate-y-1/2 rotate-45 rounded-full bg-black" />
          <span className="absolute left-1.5 top-1/2 block h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded-full bg-black" />
        </button>
      </div>
      <ul className="ml-10 mt-6 flex flex-col gap-4 text-2xl font-bold">
        {LINKS.map((l, i) => (
          <li
            key={l.name}
            className="menu-item"
            style={{ animationDelay: `${120 + i * 60}ms` }}
          >
            <Link
              href={l.href}
              target={l.external ? "_blank" : undefined}
              onClick={handleClose}
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>,
    target
  );
}
