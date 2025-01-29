"use client";

import LoginSection from "./LoginSection";

const AuthLayout = () => {
    return (
      <section className="container flex flex-col-reverse lg:flex-row lg:max-h-[655px] my-[40px] lg:my-[100px] my-[30px]">

        <div className="w-full lg:w-1/3 rounded-b-[20px] lg:rounded-r-[0px] lg:rounded-l-[30px] bg-black text-white flex flex-col items-center justify-center p-8">
          <h1 className="text-[48px] lg:text-[64px] mb-[30px] mt-[30px] lg:mb-[130px]">Unicore</h1>
          <p className="mt-4 text-[14px] mb-[32px] text-center">New to our platform? Take a look now.</p>
          <button className="w-[200px] px-6 py-3 border border-black font-medium border-white rounded-[15px] hover:bg-gray-900 transition mb-[30px]">
          Guest Mode
          </button>
        </div>

        <div className="w-full lg:w-2/3 bg-gray-200 flex items-center justify-center p-8 relative rounded-t-[30px] lg:rounded-t-[0px]">
          <LoginSection />
        </div>
      </section>
    );
  };
  

export default AuthLayout;