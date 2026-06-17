"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Modal from "./Modal";

const NAVIGATIONS = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Lokolm", link: "https://lokolm.larnova.co", external: true },
  { name: "LAIG", link: "https://laig.larnova.co", external: true },
  { name: "Contact", link: "/contact" },
];

const Navigation = () => {
  const currentPath = usePathname();

  const setActive = (href: string) => href === currentPath;
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <DesktopNav setActive={setActive} />
      <MobileNav />
    </div>
  );
};

export default Navigation;

const MobileNav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="lg:hidden w-full z-30">
      <div className="flex w-full items-center justify-between py-4">
        <Link href="/">
          <h3 className="flex items-end font-bold text-xl hover:text-black cursor-pointer pl-4">
            <span className="relative w-8 h-8 mr-1">
              <Image
                src="/logo-metadata.png"
                fill
                alt="logo"
                className="object-contain"
              />
            </span>
            Larnova
          </h3>
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setShowMobileMenu(true)}
          className="mr-6 cursor-pointer flex flex-col items-end"
        >
          <span className="w-5 h-0.5 bg-black rounded-full"></span>
          <span className="w-3 h-0.5 bg-gray-800 mt-1 rounded-full"></span>
          <span className="w-4 h-0.5 bg-gray-300 mt-1 rounded-full"></span>
        </button>
      </div>
      {showMobileMenu && (
        <Modal onClose={() => setShowMobileMenu(false)} />
      )}
    </div>
  );
};

const DesktopNav = ({
  setActive,
}: {
  setActive: (href: string) => boolean;
}) => (
  <div className={`hidden lg:block w-full`}>
    <div className="flex mx-auto backdrop-blur-xs bg-white text-center justify-between items-center px-4 py-3 lg:py-5 lg:px-8">
      <Link href="/">
        <h3 className="flex justify-center items-end font-bold text-xl lg:text-3xl hover:text-black cursor-pointer">
          <span className="relative w-8 h-8 lg:w-10 lg:h-10 mr-1">
            <Image
              src="/logo-metadata.png"
              fill
              alt="logo"
              objectFit="contain"
            />
          </span>
          Larnova
        </h3>
      </Link>
      <ul className="flex items-center gap-5 lg:text-xl">
        {NAVIGATIONS.map((navigation, index) => (
          <li key={index}>
            <Link
              href={navigation.link}
              target={navigation.external ? "_blank" : undefined}
              className={`${setActive(navigation.link) && "font-bold"}`}
            >
              {navigation.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
