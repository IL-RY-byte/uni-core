"use client";

import { useState } from "react";

type EmailFormProps = {
  goToStep: (step: "reset") => void;
};

const EmailForm = ({ goToStep }: EmailFormProps) => {
  const [opt, setOpt] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opt.trim()) {
      setError("OPT is required");
    } else {
      setError(""); //запит в серівс на бек там обробка і потім тут обробка помилок
      goToStep("reset");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-[28px] lg:text-[36px]">Check your Mailbox</p>
      <p className="text-center mt-[16px] text-[16px]">
      Please enter OTP to proceed
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full w-[240px] md:w-[320px] mt-8"
      >
        <input
          type="text"
          placeholder="OPT"
          value={opt}
          onChange={(e) => setOpt(e.target.value)}
          className="w-full py-3 px-4 border border-black rounded-[15px]"
        />
        {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}

        <button
          type="submit"
          className="w-full mt-[32px] bg-black text-white px-6 py-3 border border-black font-medium rounded-[15px] hover:bg-gray-900 transition"
        >
          VERIFY
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
