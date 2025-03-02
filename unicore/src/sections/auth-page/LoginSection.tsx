"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { login as loginService } from "@services/authService";

const LoginSection = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEye size={16} className="relative left-[4px] top-[16px]" />
    ) : (
      <IconEyeOff size={16} className="relative left-[4px] top-[16px]" />
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", server: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setLoading(true);
      try {
        // API handles setting cookie via Set-Cookie header in response
        await loginService({
          login: formData.email,
          password: formData.password,
        });
        // console.log("Login successful:", loginResponse);
        router.push("/dash");
      } catch (error) {
        setErrors((prev) => ({ ...prev, server: (error as Error).message }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-[32px] lg:text-[40px]">Welcome Back!</p>
      <p className="text-center mt-[32px] text-[16px]">
        Please enter your credentials to log in
      </p>
      <form onSubmit={handleSubmit} className="w-[240px] md:w-[320px]">
        <div className="w-full mb-[20px] mt-[32px]">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-black rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>
          )}
        </div>

        <div className="w-full relative">
          <input
            type={visible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-black rounded-md"
          />
          <div
            className="absolute right-4 top-[10px] transform -translate-y-1/2 cursor-pointer"
            onClick={() => toggle()}
          >
            <VisibilityToggleIcon reveal={visible} />
          </div>
        </div>

        {errors.password && (
          <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>
        )}

        <p
          className="mt-[22px] cursor-pointer hover:text-gray-500 mb-[20px]"
          onClick={() => router.push("/auth/forgot-password")}
        >
          Forgot password?
        </p>

        {errors.server && (
          <p className="text-red-500 text-sm text-center">{errors.server}</p>
        )}

        <button
          type="submit"
          className="w-full mt-[18px] bg-black text-white px-6 py-3 border border-black font-medium rounded-md hover:bg-gray-900 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOG IN"}
        </button>
      </form>
    </div>
  );
};

export default LoginSection;
