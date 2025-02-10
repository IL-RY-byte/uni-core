const FirstScreen = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center md:min-h-[30vh] lg:min-h-[100vh]">
      <h1 className="text-2xl font-bold text-center">
        Welcome to UniCore - Your <br /> Comprehensive University <br />{" "}
        Management Platform
      </h1>
      <p className="mt-4 text-center">
        Empowering students, teachers, and administration for a seamless <br />{" "}
        educational experience
      </p>

      <div className="mt-6 flex md:space-x-4 md:flex-row flex-col md:space-y-0 space-y-4">
        <button className="w-64 px-6 py-3 border border-black font-medium rounded-md hover:bg-gray-100 transition">
          Register
        </button>
        <button className="w-64 px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition">
          Login
        </button>
      </div>
    </section>
  );
};

export default FirstScreen;
