"use client";

import LoginSection from "./LoginSection";

const AuthLayout = () => {
  return (
    <section className="container w-full flex flex-col-reverse lg:flex-row lg:h-[600px] my-[40px] lg:my-[50px] lg:max-w-[1460px]">
      <div className="w-full lg:w-1/3 rounded-b-md lg:rounded-r-[0px] lg:rounded-l-md bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-[48px] lg:text-[64px] mb-[30px] mt-[30px] lg:mb-[130px]">
          Unicore
        </h1>
        <p className="mt-4 text-[14px] mb-[32px] text-center">
          New to our platform? Take a look now.
        </p>
        <button className="w-[200px] px-6 py-3 border border-black font-medium border-white rounded-md hover:bg-gray-900 transition mb-[30px]">
          Guest Mode
        </button>
      </div>

      <div className="w-full lg:w-2/3 bg-gray-200 flex items-center justify-center p-8 relative rounded-t-md lg:rounded-t-[0px] min-h-[655px] lg:min-h-[600px]">
        <LoginSection />
      </div>
    </section>
  );
};

export default AuthLayout;
