"use client";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-800"></div>
    </div>
  );
};

export default Loader;
