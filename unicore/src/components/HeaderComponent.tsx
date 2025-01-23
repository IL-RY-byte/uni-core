"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoImage from "../../images/logo.png";

const navLinks = [
  { name: "Features", path: "/auth" },
  { name: "News", path: "/auth" },
  { name: "Testimonials", path: "/auth" },
  { name: "Get Started", path: "/auth" },
  { name: "Log In", path: "/auth" },
];

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full lg:h-[80px] md:h-[60px] h-[50px] bg-white border-b-[2px] border-gray-100 flex items-center">
      <div className="container flex justify-between items-center">
        <button
          className="flex items-center gap-[10px]"
          onClick={() => router.push("/")}
        >
          <Image
            src={LogoImage}
            alt="Logo"
            width={24}
            height={24}
            className="rounded-full object-cover md:w-[32px] md:h-[32px]"
          />
          <span className="text-black font-medium text-[24px] md:text-[28px]">
            UniCore
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-[40px] ">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className="text-black hover:text-gray-400"
              onClick={() => router.push(link.path)}
            >
              {link.name}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰ 
        </button> 
        {/* тут потім заміним на іконку */}

        {isOpen && (
          <div className="absolute top-[60px] left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden transition-all duration-300 ease-in-out">
            {navLinks.map((link) => (
              <button
                key={link.path}
                className="text-black hover:text-gray-600 transition duration-200"
                onClick={() => {
                  setIsOpen(false);
                  router.push(link.path);
                }}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
