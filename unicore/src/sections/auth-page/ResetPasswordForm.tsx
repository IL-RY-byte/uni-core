"use client";

import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [visiblePassword, { toggle: togglePassword }] = useDisclosure(false);
  const [visibleConfirmPassword, { toggle: toggleConfirmPassword }] =
    useDisclosure(false);

  // Регулярний вираз для перевірки пароля
  const passwordValidationRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

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
    const newErrors = { password: "", confirmPassword: "" };

    // Перевірка пароля
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters long";
    } else if (!passwordValidationRegex.test(formData.password)) {
      newErrors.password =
        "Shoud have at least one letter and number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (!newErrors.password && !newErrors.confirmPassword) {
      console.log("Password reset:", formData);
      router.push("/auth");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-[28px] lg:text-[36px]">Reset Password</p>
      <p className="text-center mt-[16px] text-[16px]">
        Please enter new password
      </p>
      <form onSubmit={handleSubmit} className="w-[240px] md:w-[320px]">
        <div className="w-full relative mt-[20px]">
          <input
            type={visiblePassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-black rounded-[15px]"
          />
          <div
            className="absolute right-4 top-[10px] transform -translate-y-1/2 cursor-pointer"
            onClick={() => togglePassword()}
          >
            <VisibilityToggleIcon reveal={visiblePassword} />
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-[12px]">{errors.password}</p>
        )}

        <div className="w-full relative mt-[20px]">
          <input
            type={visibleConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm new Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-black rounded-[15px]"
          />
          <div
            className="absolute right-4 top-[10px] transform -translate-y-1/2 cursor-pointer"
            onClick={() => toggleConfirmPassword()}
          >
            <VisibilityToggleIcon reveal={visibleConfirmPassword} />
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-[12px]">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="w-full mt-[32px] bg-black text-white px-6 py-3 border border-black font-medium rounded-[15px] hover:bg-gray-900 transition"
        >
          RESET PASSWORD
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
