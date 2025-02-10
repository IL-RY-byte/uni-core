const features = [
  {
    title: "Digital Integration",
    description:
      "Simplify your university life with document signing, booking, and more",
    iconText: "📄",
  },
  {
    title: "Effortless Communication",
    description: "Chat with peers, faculty, and support staff",
    iconText: "💬",
  },
  {
    title: "Streamlined Schedules",
    description: "Access your classes and deadlines in one place",
    iconText: "📅",
  },
];

const KeyFeatures = () => {
  return (
    <section className="container flex flex-col items-center justify-center w-full py-12 ld:py-0 md:min-h-[30vh] lg:max-h-[800px]">
      <h2 className="text-[28px] font-bold sm:text-2xl">
        Key Features Overview
      </h2>
      <p className="mt-2 mb-4">Discover the benefits of using UniCore</p>

      <div className="flex flex-col gap-[14px] mt-8 lg:flex-row lg:gap-[40px] lg:justify-between">
        <div className="flex flex-col w-full max-w-[520px] space-y-4 md:h-[480px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center w-full h-full p-4 transition border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-lg md:gap-11"
            >
              <div className="flex items-center justify-center w-12 h-12 text-2xl bg-gray-200 rounded-md">
                {feature.iconText}
              </div>
              <div className="ml-4">
                <p className="text-xl font-bold">{feature.title}</p>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full max-w-[520px] space-y-4 md:h-[480px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center w-full h-full p-4 transition border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-lg md:gap-11"
            >
              <div className="flex items-center justify-center w-12 h-12 text-2xl bg-gray-200 rounded-md">
                {feature.iconText}
              </div>
              <div className="ml-4">
                <p className="text-xl font-bold">{feature.title}</p>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
