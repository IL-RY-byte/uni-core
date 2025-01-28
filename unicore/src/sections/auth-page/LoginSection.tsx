"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import ImageUni from "../../../images/auth/unipic.png";

const LoginSection = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEye size={16} className="relative left-[4px] top-[16px]" />
    ) : (
      <IconEyeOff size={16} className="relative left-[4px] top-[16px]" />
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", server: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log("Login data:", formData);
      newErrors.server = "Not a UniCore user yet";
    }
  };

  const handleGuestLogIn = () => {
    console.log("Enter as a guest");
  };

  return (
    <section className="container flex flex-col md:flex-row items-center justify-center md:min-h-screen md:gap-[20px] lg:gap-[130px] xl:gap-[220px]">
      <div className="flex mb-6 md:mb-0 order-2 md:order-1">
        <Image
          src={ImageUni}
          alt="Wallpaper Uni"
          width={400}
          height={300}
          className="px-[16px] h-auto w-[390px] lg:w-[440px] rounded-lg object-cover"
        />
      </div>
      <div className="w-full md:max-w-[400px] p-6 flex flex-col items-center order-1 md:order-2">
        <p className="max-w-[240px] lg:max-w-[300px] font-semibold lg:text-[30px] text-[24px] mb-4 text-center mb-[20px]">
          ARE YOU A MEMBER OF UNICORE?
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm gap-[20px] md:gap-[40px]"
        >
          <div className="w-full mb-[20px]">
            <label
              className="text-[16px] md:text-[19px] font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>
            )}
          </div>

          <div className="w-full relative mb-[30px]">
            <label
              className="text-[16px] md:text-[19px] font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={visible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-md"
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => toggle()}
            >
              <VisibilityToggleIcon reveal={visible} />
            </div>
            {errors.password && (
              <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>
            )}
          </div>

          {errors.server && (
            <p className="text-red-500 text-sm text-center">{errors.server}</p>
          )}

          <Button
            type="submit"
            className="w-full px-6 py-3 border border-black font-medium rounded-md hover:bg-gray-100 transition mb-[40px]"
          >
            Log in
          </Button>

          <p className="lg:text-[30px] text-[20px] font-semibold text-center mb-[20px]">
            OR JUST WANT TO TRY?
          </p>

          <Button
            type="button"
            className="w-full px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition mb-[30px] md:mb-0"
            onClick={handleGuestLogIn}
          >
            Log in as Guest
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginSection;
