"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgetPassword from "./ForgetPasswordForm";
import ConfirmEmail from "./EmailForm";
import ResetPassword from "./ResetPasswordForm";

const PasswordSection = () => {
  const [currentStep, setCurrentStep] = useState<
    "forget" | "confirm" | "reset"
  >("forget");
  const router = useRouter();

  const goToStep = (step: "forget" | "confirm" | "reset") => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case "forget":
        return <ForgetPassword goToStep={goToStep} />;
      case "confirm":
        return <ConfirmEmail goToStep={goToStep} />;
      case "reset":
        return <ResetPassword/>;
      default:
        return null;
    }
  };

  return (
    <section className="container flex flex-col-reverse lg:flex-row lg:h-[655px] my-[40px] lg:my-[100px]">
      <div className="w-full lg:w-1/3 rounded-b-[20px] lg:rounded-r-[0px] lg:rounded-l-[30px] bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-[48px] lg:text-[64px] mb-[30px] mt-[30px] lg:mb-[130px]">
          Unicore
        </h1>
        <p className="mt-4 text-[14px] mb-[32px] text-center">
          New to our platform? Take a look now.
        </p>
        <button className="w-[200px] px-6 py-3 border border-black font-medium border-white rounded-[15px] hover:bg-gray-900 transition mb-[30px]">
          Guest Mode
        </button>
      </div>

      <div className="w-full lg:w-2/3 bg-gray-200 flex items-center justify-center p-8 relative rounded-t-[30px] lg:rounded-t-[0px] min-h-[655px]">
        <button
          onClick={() => {
            if (currentStep === "forget") {
              router.back();
            } else if (currentStep === "confirm") {
              setCurrentStep("forget");
            } else if (currentStep === "reset") {
              setCurrentStep("confirm");
            }
          }}
          className="lg:w-[120px] h-[44px] text-center absolute top-0 right-0 bg-black text-white pr-[20px] pl-[30px] py-2 text-lg font-medium
             hover:bg-gray-800 transition-all 
             [clip-path:polygon(20px_0%,100%_0%,100%_100%,20px_100%,0_50%)]"
        >
          Back
        </button>

        {renderStep()}
      </div>
    </section>
  );
};

export default PasswordSection;
