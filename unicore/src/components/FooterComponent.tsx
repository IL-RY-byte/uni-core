"use client";
import { useRouter } from "next/navigation";
import InstaIcon from "../../images/icon-instagram.svg";
import LnIcon from "../../images/icon-linkedin.svg";
import TikTokIcon from "../../images/icon-tiktok.svg";
import Image from "next/image";

const navLinks = [
  { name: "About Us", path: "/" },
  { name: "Privacy Policy", path: "/" },
  { name: "Support", path: "/" },
  { name: "Contact", path: "/" },
];

// https://www.linkedin.com/company/uni-core

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="w-full h-[140px] lg:h-[220px] border-t-[2px] border-gray-200 flex items-center text-[14px] md:text-[20px]">
      <div className="container flex flex-col gap-[10px] lg:gap-[40px]">
        <nav className="flex flex-row justify-center gap-[10px] sm:gap-[40px] lg:gap-[60px]">
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

        <div className="flex justify-center gap-[20px] lg:gap-[60px]">
          <a
            href="https://www.linkedin.com/company/uni-core"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={LnIcon}
              alt="LinkedIn"
              width={24}
              height={24}
              className="md:w-[32px]"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={InstaIcon}
              alt="Instagram"
              width={24}
              height={24}
              className="md:w-[32px]"
            />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={TikTokIcon}
              alt="TikTok"
              width={24}
              height={24}
              className="md:w-[32px]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
