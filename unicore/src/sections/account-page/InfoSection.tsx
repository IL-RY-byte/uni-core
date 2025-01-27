"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MochAvatar from "../../../images/auth/unipic.png";
import { IconCamera } from "@tabler/icons-react";
import LoaderComponent from "@/components/LoaderComponent";

const InfoSection = () => {
  const [user, setUser] = useState<{
    status: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    avatar: any;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Симуляція завантаження з бека
      setUser({
        status: "Guest",
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        phone: "+38034567899",
        avatar: MochAvatar,
      });
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <LoaderComponent />;
  }

  return (
    <section className="container bg-silver p-8 rounded-lg">
      <div className="container flex items-center gap-5 mb-8 md:mt-[30px] justify-center md:justify-start">
        <div className="relative">
          <Image
            src={MochAvatar}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full object-cover w-[100px] h-[100px] min-w-[100px] min-h-[100px] relative"
          />
          <button className=" cursor-pointer absolute bottom-0 right-0 bg-black/50 p-2 rounded-full">
            <IconCamera size={20} color="white" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">
            {user.name} {user.surname}
          </h2>
          <span className="text-xs bg-gray-200 rounded px-1 inline-block w-fit">
            {user.status}
          </span>
          <p className="text-gray-500 text-sm">
            Welcome back! Here’s what’s new.
          </p>
        </div>
      </div>

      <h3 className="text-[28px] md:text-[36px] font-semibold text-center mb-6">
        Account Details
      </h3>
      <form className="flex w-full flex-col items-center">
        <div className="md:grid flex flex-col items-center md:grid-cols-2 gap-6 w-full max-w-3xl">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={user.name}
              className="w-64 md:w-full h-[30px] p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Surname</label>
            <input
              type="text"
              value={user.surname}
              className="w-64 md:w-full h-[30px] p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              className="w-64 md:w-full h-[30px] p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={user.phone}
              placeholder="Enter your phone number"
              className="w-64 md:w-full h-[30px] p-3 border border-gray-300 rounded-md"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
        </div>

        <button className="w-64 mt-[50px] bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
          Update
        </button>
      </form>
    </section>
  );
};

export default InfoSection;
