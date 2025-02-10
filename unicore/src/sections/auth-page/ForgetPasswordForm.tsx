"use client";

import { useState } from "react";

type ForgetPasswordFormProps = {
  goToStep: (step: "confirm") => void;
};

const ForgetPasswordForm = ({ goToStep }: ForgetPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
    } else if (!validateEmail(email)) {
      setError("Invalid email format");
    } else {
      setError(""); //запит в серівс на бек там обробка і потім тут обробка помилок
      goToStep("confirm");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-[28px] lg:text-[36px]">Forget Password</p>
      <p className="text-center mt-[16px] text-[16px]">
        Please enter your email
      </p>
      <form onSubmit={handleSubmit} className="w-[240px] md:w-[320px] mt-8">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-3 px-4 border border-black rounded-md"
        />
        {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}

        <button
          type="submit"
          className="w-full mt-[32px] bg-black text-white px-6 py-3 border border-black font-medium rounded-md hover:bg-gray-900 transition"
        >
          RESET PASSWORD
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
