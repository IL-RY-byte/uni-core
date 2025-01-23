"use client";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="w-full h-[60px] bg-royalBlue ">
      <button
        className="text-white cursor-pointer mr-[10px]"
        onClick={() => router.push("/")}
      >
        logo
      </button>
      <button
        className="text-white cursor-pointer"
        onClick={() => router.push("/auth")}
      >
        login
      </button>
    </header>
  );
};

export default Header;
